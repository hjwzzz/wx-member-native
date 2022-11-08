import fs from 'fs';
const manifestPath = './src/manifest.json';
//  动态修改 manifest.json

function replaceManifest(path: string, value: any, Manifest: string) {
  const arr = path.split('.');
  const len = arr.length;
  const lastItem = arr[len - 1];
  let isUpdate = false;

  let i = 0;
  const ManifestArr = Manifest.split(/\n/);
  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index];
    if (new RegExp(`"${arr[i]}"`)
      .test(item)) ++i;
    if (i === len) {
      // appid 没变化时不修改
      if (path === 'mp-weixin.appid' && ManifestArr[index].includes(value)) break;
      const hasComma = /,/.test(item);
      ManifestArr[index] = item.replace(
        new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`
      );
      isUpdate = true;
      break;
    }
  }
  Manifest = ManifestArr.join('\n');

  return [Manifest, isUpdate] as [string, boolean];
}

export default (loadEnv: (arg0: string, arg1: string) => any) => {
  const {
    argv,
    env: { NODE_ENV },
  } = process;
  const model = argv.includes('--mode')
    ? argv[argv.indexOf('--mode') + 1]
    : NODE_ENV || '';
  const env = loadEnv(model, process.cwd());
  // 使用
  const Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });

  console.log('当前环境 appid为 ', env.VITE_APP_APPID, model);
  if (!env.VITE_APP_APPID) {
    throw new Error('当前环境，没有找到对应的 AppID，请检查您的Evn文件');
  }

  const [fileStr, isUpdate] = replaceManifest(
    'mp-weixin.appid',
    `"${env.VITE_APP_APPID}"`,
    Manifest
  );
  if (isUpdate) {
    fs.writeFileSync(manifestPath, fileStr, { flag: 'w' });
  }
};
