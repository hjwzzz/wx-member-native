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
  content = content.replace(reg, '<img style="max-width: 100%;" src="$1" />');
  //
  const regP = /<p.*?>/g;
  content = content.replace(
    regP,
    '<p style="max-width: 100%;word-break:break-all;word-wrap:break-word"  >'
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

export async function compress (files: any) {
  return new Promise(resolve => {
    // #ifdef H5
    if (files.type === 'image/gif') {
      resolve(files)
    }
    const imgNode = new Image()
    imgNode.src = URL.createObjectURL(files)
    imgNode.onload = function (res) {
      const myCanvas = document.createElement('canvas')
      const width = imgNode.width
      const height = imgNode.height
      myCanvas.width = width
      myCanvas.height = height
      const painting: any = myCanvas.getContext('2d')
      painting.drawImage(imgNode, 0, 0, width, height)
      const base64 = myCanvas.toDataURL('image/jpeg', 0.4)
      var arr: any[] = base64.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      resolve(new window.File([new Blob([u8arr], { type: mime })], files.name, { type: files.type }))
    }
    // #endif

    // #ifdef MP-WEIXIN
    uni.compressImage({
      src: files.path,
      quality: 40,
      success: res => {
        resolve(res.tempFilePath)
      }
    })
    // #endif
  })
}
