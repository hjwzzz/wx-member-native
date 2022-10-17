import Storage from './storage';
/**
 * 拦截 page 及内部周期 添加部分方法
 * @func $set 通过setData({k:v}) 设置 data-k="v" 到 data 中
 * @func $set 
 */
export default function () {
  const originalPage = Page;
  Page = function (config: any) {
    const {
      onLoad, // 每个页面启动前设置状态栏高和检查更新
      // $set,
      // $setkv,
      // onPullDownRefresh, // 刷新方法 添加默认选项
      // onReachBottom, // 加载方法 添加默认选项
      // //自定义常用方法
      // dt_nav_to, // data-url  navgation to 跳转
      // dt_get_location, // 获取经纬度和地名
      // dt_fix, // 根据data名字 修改  page.data数据
      // dt_fix_kv, // 设置  key 路径的 page。data 中的数据
      // dt_get_formId, // 保存formId,
      // dt_showtotal, //提示信息
      // dt_no, //不做任何操作
      // dt_request, //网络请求
      // dt_loading, //加载数据 计算页数
      // dt_queryAuthorize, //先检查权限 后调用
      // dt_previewImage, //预览图片

    } = config
    config.onLoad = function (d = {}) {
      this.setData({
        mainColor: Storage.getMainColor(),
      })
      console.log(Storage.getMainColor());

      onLoad && typeof onLoad === 'function' ? onLoad.call(this, d) : ""
    }
    // config.$set = function () {
    //   console.log("$set .. ");

    // }
    // //  修改 data 数据
    // config.$set = function (e) {
    //   this.setData(e.currentTarget.dataset)
    //   $set && typeof $set === 'function' ? $set.call(this, e) : ""
    // }
    // //  点击修改数据方法
    // config.dt_fix_kv = function (e) {
    //   this.setData({
    //     [e.currentTarget.dataset.key]: e.currentTarget.dataset.value
    //   })
    //   e.dt_type = "end" // 请求后

    //   dt_fix_kv && typeof dt_fix_kv === 'function' ? dt_fix_kv.call(this, e) : ""
    // }
    return originalPage(config)
  }
}