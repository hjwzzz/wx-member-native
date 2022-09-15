import Storage from "../utils/storage";
import { debounce } from "../utils/util";

// 网络错误的页面
// "/no-wifi/disabled-serve"
// "/no-wifi/index"
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

const request = async (
  url: any,
  args: any,
  method = "POST",
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
};

export default request;
