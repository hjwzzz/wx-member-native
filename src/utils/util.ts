import Router from '@/utils/router';
import { useBasicsData, useActiveTab } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';

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
  return [province, city, district, address].filter(Boolean)
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
  if (!item) {
    return '';
  }
  let content = item;
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  content = content.replace(
    reg,
    '<img style="max-width: 100%; vertical-align: bottom;" src="$1" />'
  );
  //
  const regP = /<p.*?>/g;
  content = content.replace(
    regP,
    '<p style="max-width: 100%;word-break:break-all;word-wrap:break-word"  >'
  );
  const regBlockquote = /<blockquote.*?>/g;
  content = content.replace(
    regBlockquote,
    '<blockquote style="display: block; border-left: 8px solid #d0e5f2; padding: 5px 10px; margin: 10px 0; line-height: 1.4; font-size: 100%; background-color: #f1f1f1;" >'
  );
  return content;
};

// 处理优惠券的分享
export const onShareCoupon = (res: any) => {
  let sUrl = '/my-assets-pages/my-coupon/receive';
  if (res.from === 'button' && res.target) {
    // 来自页面内分享按钮
    const {
      couponmemberid,
      donateid,
      couponname,
      prodcode,
      discount,
      randomamount,
    } = res.target.dataset;
    const val = `prodCode=${prodcode}&discount=${discount}&randomAmount=${randomamount}&mIDdataaset${donateid}`;
    sUrl = `${sUrl}?couponMemberId=${couponmemberid}&donateId=${donateid}&couponName=${couponname}&${val}`;
  }

  return {
    title: '好友送您一张优惠券',
    path: sUrl,
    imageUrl: 'https://static.dev.jqzplat.com/img/share-img.png',
    // 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4
    // desc: '送你一张优惠券', // 自定义分享描述
  };
};

export async function compress(files: any) {
  return new Promise(resolve => {
    uni.compressImage({
      src: files.path,
      quality: 40,
      success: res => {
        resolve(res.tempFilePath);
      },
    });
  });
}

/**
 * 深克隆
 * @param target：克隆的目标对象
 */
export function cloneDeep(target: any) {
  let result: any;
  const type = Object.prototype.toString.call(target)
    .slice(8, -1);
  if (type === 'Object') {
    result = {};
    for (const key in target) {
      result[key] = cloneDeep(target[key]);
    }
  } else if (type === 'Array') {
    result = [];
    target.forEach((item: any, index: number) => {
      result[index] = cloneDeep(item);
    });
  } else {
    result = target;
  }
  return result;
}

export function copyText(val: string) {
  const oInput = document.createElement('input');
  oInput.value = val;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  document.body.removeChild(oInput); // 删除临时实例
}

export const bannerListClick = (item: any) => {
  const url = JSON.parse(item.url || {});
  const code = url.code || url.systemUrl;
  if (!code && url.appletUrl) {
    const miniUrl = item.miniUrl || url.appletUrl;
    Router.goNoCodePage(miniUrl);
    return;
  }
  if (!code && url.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(url.h5Url)}` });
    return;
  }
  let param = item.miniUrl?.split('?')?.[1];
  if (param) {
    param = `?${param}`;
  } else {
    param = '';
  }
  Router.goCodePage(code, param);
};

export const bannerListClickImage = (item: any) => {
  const url = item;
  const code = url.code || url.systemUrl;
  if (!code && url.appletUrl) {
    const miniUrl = item.miniUrl || url.appletUrl;
    Router.goNoCodePage(miniUrl);
    return;
  }
  if (!code && url.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(url.h5Url)}` });
    return;
  }
  let param = item.miniUrl?.split('?')?.[1];
  if (param) {
    param = `?${param}`;
  } else {
    param = '';
  }
  Router.goCodePage(code, param);
};

export const handleEntryUrl = (item: any) => {
  console.log('22222222222', item);
  // uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(e.href)}` });
  if (item.urlKind === 'CUSTOMIZE') {
    if (item.miniUrl) {
      Router.goNoCodePage(item.miniUrl);
      return;
    }
    if (item.h5Url) {
      uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.h5Url)}` });
      return;
    }
    return;
  }
  if (!item.code && item.miniUrl) {
    Router.goNoCodePage(item.miniUrl);
    return;
  }
  if (!item.code && item.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.h5Url)}` });
    return;
  }
  const initBasicsData = useBasicsData();
  const initActiveTab = useActiveTab();

  if (['wm_center', 'wm_index'].includes(item.code)) {
    const active = initBasicsData.bottomNavList.findIndex(({ code }: any) => code === item.code);
    initActiveTab.setCurrent(active);
  }

  let param = item.miniUrl?.split('?')?.[1];
  if (param) {
    param = `?${param}`;
  } else {
    param = '';
  }
  Router.goCodePage(item.code, param);
};
