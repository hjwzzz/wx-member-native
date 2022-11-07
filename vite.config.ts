import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import setEnvAppId from './src/utils/setAppId';
//  修改 manifest.json 的 appid 为环境变量
setEnvAppId(loadEnv);

// vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: { preprocessorOptions: {} },
});
