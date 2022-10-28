// 时间格式format
export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber)
    .join('/')} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(':')}`;
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : `0${s}`;
};

/**
 * 对象中提取地址信息，合并出完整信息
 * @param i  对象
 * @param prefix 前缀(选填) 如dist = distProvince
 * @returns string 完整地址
 */
export const mergeFullAddress = (i: any, prefix = ''): string => {
  const {
    [prefix ? `${prefix}Province` : 'province']: province,
    [prefix ? `${prefix}City` : 'city']: city,
    [prefix ? `${prefix}District` : 'district']: district,
    [prefix ? `${prefix}Address` : 'address']: address,
  } = i;
  // 详细地址
  return [province + city + district + address].filter(Boolean)
    .join('');
};

// 防抖
export const debounce = (fn: (...args: any) => any, wait = 600) => {
  let timeout: number | null = null;
  return (...args: unknown[]) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(args);
    }, wait);
  };
};

// 处理富文本图片
export const richImage = (item: any) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  let content = item.replace(reg, '<img style="max-width: 100%;" src="$1" />');
  const regP = /<p.*?>/g;
  content = item.replace(
    regP,
    '<p style="max-width: 100%;word-break:break-all;word-wrap:break-word"  >'
  );
  return content;
};
