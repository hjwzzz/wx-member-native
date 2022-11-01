const env = import.meta.env.VITE_APP_ENV;
const url = import.meta.env.VITE_APP_BASEURL;
const h5 = import.meta.env.VITE_APP_WXURL;

// const basePath = 'https://backend.dev.jqzplat.com';
const basePath = 'https://backend.fat.jqzplat.com';
// const basePath =  "https://backend.uat.jqzplat.com";
// const basePath =  "https://backend.jqzplat.com";

// const h5Path = 'https://wx.dev.jqzplat.com';
const h5Path = 'https://wx.fat.jqzplat.com';
// const h5Path =  "https://wx.uat.jqzplat.com";
// const h5Path =  "https://wx.jqzplat.com";

const baseUrl = env ? url : basePath;
const h5Url = env ? h5 : h5Path;

// 图片的地址-到时可以换线上图片
const staticUrl = '/static/';
export { baseUrl, staticUrl, h5Url };
