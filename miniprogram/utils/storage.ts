// 

const appId = wx.getAccountInfoSync().miniProgram.appId
class Storage {
    //   import storage from "@/common/utils/storage";

    //   storage.setJqzAppId()   storage.setMid()   storage.setEpid()  storage.setToken()

    //   storage.getJqzAppId()   storage.getMid()   storage.getEpid()  storage.getToken()
    static getJqzAppId() {
        return appId
    }
}

export default Storage