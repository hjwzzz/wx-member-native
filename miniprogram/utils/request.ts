import Storage from "../utils/storage";
import { debounce } from "../utils/util";
import { baseUrl } from "../utils/config";

const BASEURL = `${baseUrl}/gshld-platform/enterprise/enterpriseApplicationParameter/getEAppIdByWAppId`;
// 网络错误的页面
// "/no-wifi/disabled-serve"
// "/no-wifi/index"

// 默认
const defaultParam={
  cliVersion: "",
  sign: "",
  signType: "",
  source: "",
  timestamp: 0,
  version: "",
}

let requestCount = 0;
// 加载
const loading = debounce(function () {
    if (requestCount) {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
    } else {
      wx.hideLoading();
    }
  }, 200);
//

const getEpid=async()=>{
  const [res] :any= await wx.request({
    method: "POST",
    url:  BASEURL,
    data: {
      appId: Storage.getJqzAppId() || "",
      param:Storage.getWXAppId(),
     ...defaultParam
    },
  });
    const { appId, appType, epid } = res?.data?.data;
    if (appId && appType && epid) {
      Storage.setJqzAppId(appId)
      Storage.setEpid(epid)
    }
    return epid;
}




// 请求
const request = async (
  url: any,
  args: any,
  method:any = "POST" ,
  isLoading = true
) => {
  console.log(url);
  console.log(args);
  console.log(method);
  console.log(isLoading);
  console.log(Storage.getJqzAppId());
  // 没有网络的情况
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == "none") {
        wx.showLoading({
          title: "加载中",
          mask: true,
        });
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateTo({
            url: "/no-wifi/index",
          });
          return;
        }, 5000);
      }
    },
  });
  //
  if (isLoading) requestCount++;
  if (requestCount) {
    loading();
  }
  try{
    const [error, res] :any= await wx.request({
      header: {
        appId: Storage.getJqzAppId() || "",
        wxAppid: Storage.getWXAppId(),
        token: Storage.getToken,
        sessionKey: '',
        refreshToken:'',
        epid:  Storage.getEpid() || getEpid(),
      },
      method,
      url,
      data: {
        appId:Storage.getJqzAppId() || "",
        param: args,
        ...defaultParam
      },
    });

    console.log(error)
    console.log(res)

  }catch{
  


  }


};

export default request;
