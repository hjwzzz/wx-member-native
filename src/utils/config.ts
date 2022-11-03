const env = import.meta.env.VITE_APP_ENV;
const baseUrl = import.meta.env.VITE_APP_BASEURL;
const h5Url = import.meta.env.VITE_APP_WXURL;
const imgUrl = import.meta.env.VITE_APP_IMGBASEURL;
// const basePath = 'https://backend.dev.jqzplat.com';
// const basePath = 'https://backend.fat.jqzplat.com';
// const basePath =  "https://backend.uat.jqzplat.com";
// const basePath =  "https://backend.jqzplat.com";

// const h5Path = 'https://wx.dev.jqzplat.com';
// const h5Path = 'https://wx.fat.jqzplat.com';
// const h5Path =  "https://wx.uat.jqzplat.com";
// const h5Path =  "https://wx.jqzplat.com";

// 图片的地址-到时可以换线上图片
const staticUrl = '/static/';
export { baseUrl, staticUrl, h5Url, imgUrl, env };
