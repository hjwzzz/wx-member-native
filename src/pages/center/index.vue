<template>
  <page-meta
    :page-style="'overflow:' + (menberCodePopupVisible ? 'hidden' : 'visible')"
  ></page-meta>
  <!-- pageBackground.value -->
  <CustomPage :background="pageBackground || '#949494'" bottom>
    <view
      class="page-top-show"
      :style="{
        background: userInfo.background || `url( ${showToImageBG} )`,
        paddingTop: headHeight + 'rpx',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <view
        class="page-top-title"
        :style="{
          top: menuInfoTopShow + 'px',
          height: menuInfoHeightShow + 'px',
        }"
      >
        个人中心
      </view>
      <memberCard
        :userInfo="userInfo"
        :loginList="loginList"
        @showCode="showMenberCodePopup"
      >
      </memberCard>
    </view>
    <CustomFitUp types="WM_CENTER" />
  </CustomPage>
  <Tabbar code="wm_center"> </Tabbar>

  <uni-popup
    class="menber-code-popup"
    ref="MenberCodePopupRef"
    :mask-click="false"
    :animation="false"
  >
    <view class="menber-code-popup-content">
      <view class="avatar">
        <image
          class="avatar-image"
          mode="aspectFit"
          :src="userInfo.avatarUrl || `${imageUrl}img/person.png`"
        />
      </view>
      <view class="content">
        <view class="content-text">
          <view class="content-text-code">{{ menberCode }}</view>
          <view class="content-text-desc">
            <img
              class="icon"
              v-if="!showFullMenberCode"
              @click="viewFullMenberCode"
              :src="`${imageUrl}img/%E7%9C%BC%E7%9D%9B-close.png`"
            />
            <img
              class="icon"
              v-else
              :src="`${imageUrl}img/%E7%9C%BC%E7%9D%9B-open.png`"
              @click="hideFullMenberCode"
            />
          </view>
        </view>
        <view class="content-qrcode">
          <canvas
            id="barCode"
            canvas-id="barCode"
            style="width: 610rpx; height: 200rpx"
          />
        </view>
        <view class="content-desc">门店消费时使用，每30秒自动更新</view>
      </view>

      <view class="close" @click="hideMenberCodePopup">
        <image
          mode="widthFix"
          class="close-icon"
          :src="`${imageUrl}img/home-close.png`"
        />
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ref, reactive, Ref, watch, computed } from 'vue';
// import { getIndexAdBannerList } from '@/api/center';
import {
  // getMemberCenterIndex,
  queryMemberCenterBannerListFront,
  getBarCodeRequest,
  GetBarCodeRequestRes,
  sendKeyExpiredBarCodeRequest,
} from '@/pages/api/center';
import { queryServiceBookPageFront } from '@/api/reservation-service';
import { getByOpsIdAndKind } from '@/api/server';
import Storage from '@/utils/storage';
// import { queryGoldPriceByPage } from '@/api/server';
// import { bannerListClick, handleEntryUrl } from '@/utils/util';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import Tabbar from '@/components/Tabbar/index.vue';
import CustomFitUp from '../component/CustomFitUp/index.vue';

import BrCode128 from '@/utils/barcode.js';
import memberCard from '../component/memberCard.vue';

const imageUrl = staticUrl;
const initBasicsData = useBasicsData();
// const entryType = {
//   BA: 'BANNER',
//   EN: 'ENTRANCE',
//   GO: 'GOLD_PRICE',
//   MY: 'MY_AWARD',
//   NO: 'NOTICE',
//   QR: 'ORDER',
//   QU: 'QUICK_NAV',
//   RE: 'REC_GIFTS',
//   REC: 'REC_GOODS',
//   RES: 'RES_SVC',
//   RI: 'RICH_TEXT',
//   WA: 'WARRANTY',
// };

// const panelList: Ref<any> = ref([]);
const bannerList: Ref<any> = ref([]);
// const goldPrice: Ref<any> = ref([]);
// const todayGoldPriceShowed = ref(false);
// const srvProshowNum = ref(1);
// const policyListNum = ref(0);

// "navigationStyle": "custom" height
const headHeight: any = ref(100);
const menuInfoTopShow: any = ref(0);
const menuInfoHeightShow: any = ref(0);
onShow(() => {
  getPageDate();
  // getMemberCentertIndex();
  getBannerData();
  uni.getSystemInfo({
    success: res => {
      const rr = uni.getMenuButtonBoundingClientRect();
      const menuInfoTop = rr.top;
      const menuInfoBottom = rr.bottom;
      menuInfoTopShow.value = menuInfoTop;
      menuInfoHeightShow.value = rr.height;

      const showHeight =
        Number(menuInfoTop) +
        Number(menuInfoBottom) -
        Number(res.statusBarHeight) +
        10;
      headHeight.value = showHeight * 2;
    },
  });
});
const deFImage1 = 'https://static.jqzplat.com/wx_%20applet/img/bg-img-002.png';
const showToImageBG = ref(deFImage1);

// const deFImage = 'https://static.jqzplat.com/web/c_default_center_bg.jpg';
// const showToImage = ref(deFImage);
// const getMemberCentertIndex = async () => {
//   const res = await getMemberCenterIndex('');
//   if (res.code === 0 && res.data) {
//     const { avatarUrl, nickName, name, wmCenterRspVo, curLevelName } = res.data;
//     const quickNavList = wmCenterRspVo.param?.quickNavList || [];
//     const panelListItem: any = wmCenterRspVo.panelList;
//     showToImage.value = wmCenterRspVo.param.topBgImageUrl || deFImage;
//     const srvObj =
//       panelListItem.find((item: any) => item.kind === entryType.RES) || {};
//     const policyList =
//       panelListItem.find((item: any) => item.kind === entryType.WA) || {};

//     srvProshowNum.value = srvObj.param?.showNum || 1;
//     policyListNum.value = policyList.param?.showNum || 0;
//     userInfo.avatarUrl = avatarUrl || '';
//     userInfo.nickName = nickName || name;
//     userInfo.curLevelName = curLevelName;
//     loginList.value = quickNavList;
//     panelList.value = panelListItem;
//     getMemberRecommend();
//   }
// };

const pageBackground = ref('#f5f5f5');
const userInfo = reactive({
  avatarUrl: '',
  nickName: '',
  name: '',
  curLevelName: '',
  memberCardInfo: '',
  showGrowthValue: false,
  showSignIn: false,
  doOut: { style: {}, fixedStyle: 0 },
  background: '',
});
const loginList: Ref<any> = ref([]);

const getPageDate = async () => {
  const { data } = await getByOpsIdAndKind('WM_CENTER');
  const { param, panelList } = data;
  pageBackground.value = param?.doOut?.style?.background || '#f5f5f5';
  loginList.value = param?.quickNavList || [];

  //  获取基本信息
  const getMenber = (item: { kind: string }) => item.kind === 'MEM_CARD';
  const memberCardInfo = panelList.find(getMenber) || {};
  userInfo.memberCardInfo = memberCardInfo.param.title;
  userInfo.showGrowthValue = memberCardInfo.param.showGrowthValue;
  userInfo.showSignIn = memberCardInfo.param.showSignIn;
  userInfo.doOut = memberCardInfo.param.doOut;

  userInfo.avatarUrl = param.avatarUrl;
  userInfo.curLevelName = param.curLevelName;
  userInfo.nickName = param.nickName;

  console.log('userInfo', memberCardInfo.param);

  userInfo.background =
    userInfo.doOut?.fixedStyle === 2
      ? null
      : memberCardInfo.param.doOut.style.background;

  if (memberCardInfo.param.doOut.style.background) {
    delete memberCardInfo.param.doOut.style.background;
  }
  // doOut doOut

  // console.log('parddddddddddddam', memberCardInfo);
  // console.log('param', param);
  // console.log('panelList', panelList);
  //
};

// 预约服务
// const srvProList: Ref<any> = ref([]);
// const getMemberRecommend = async () => {
//   if (initBasicsData.checkLogin) {
//     const servPage = await queryServiceBookPageFront({
//       mid: initBasicsData.useMid,
//       curPage: 1,
//       pageSize: srvProshowNum.value,
//       status: '',
//     });
//     srvProList.value = servPage.data?.records || [];
//   } else {
//     srvProList.value = [];
//   }
// };

// 获取广告
const getBannerData = async () => {
  const res = await queryMemberCenterBannerListFront('');
  if (res.code === 0 && res.data) {
    const result: any = [];
    res.data.map((item: any) => {
      result.push({
        image: item.imgUrl,
        title: '',
        h5Url: item.h5Url,
        miniUrl: item.miniUrl,
        url: item.url,
      });
    });
    bannerList.value = result;
  }
};

// 显示红点
// const showRedDot = (item: any, entry: any, text: string) => {
//   const code = ['sign', 'coupon'].includes(entry.code);
//   const red = entry.showRedDot === 'Y';
//   const showType = item.param.showType === text;
//   return code && red && showType;
// };

// const handleFixedSysUrl = () => {
//   uni.navigateTo({ url: '/pages/member-equity/index' });
// };
// const handleMyPrizes = (index: number) => {
//   Router.goCodePage('my_prize', `?tab=${index}`);
// };

const MenberCodePopupRef = ref<any>();

const menberCodePopupVisible = ref(false);

watch(menberCodePopupVisible, () => {
  if (menberCodePopupVisible.value) {
    MenberCodePopupRef.value.open();
  } else {
    MenberCodePopupRef.value.close();
  }
});

const menberCodeInfo = reactive<GetBarCodeRequestRes>({
  barCode: '',
  number: '',
  polishing: '',
});

let barCodeCanvasContent: any = null;

// const instance = getCurrentInstance();

const getBarCode = async () => {
  const getBarCodeRequestRes = await getBarCodeRequest();

  if (getBarCodeRequestRes.code !== 0) {
    return;
  }

  Object.assign(menberCodeInfo, getBarCodeRequestRes.data);
};

const drawCanvas = () => {
  if (!barCodeCanvasContent) {
    barCodeCanvasContent = uni.createCanvasContext('barCode');
  }

  barCodeCanvasContent.clearRect(0, 0, 1000, 1000);

  const { windowWidth } = uni.getSystemInfoSync();

  const dpi = windowWidth / 375;

  BrCode128(barCodeCanvasContent, menberCodeInfo.barCode, 305 * dpi, 110);
};

const GetBarCodeIntervalId = ref(0);

const setIntervalForGetBarCode = () => {
  GetBarCodeIntervalId.value = setInterval(async () => {
    if (menberCodePopupVisible.value) {
      await getBarCode();
      drawCanvas();
    } else {
      clearInterval(GetBarCodeIntervalId.value);
    }
  }, 30 * 1000);
};

const showMenberCodePopup = async () => {
  menberCodePopupVisible.value = true;
  await getBarCode();
  drawCanvas();
  setIntervalForGetBarCode();
};

const hideMenberCodePopup = async () => {
  menberCodePopupVisible.value = false;
  showFullMenberCode.value = false;
  clearInterval(GetBarCodeIntervalId.value);
  sendKeyExpiredBarCodeRequest(menberCodeInfo.barCode);
};

const showFullMenberCode = ref(false);

const menberCode = computed(() => {
  if (showFullMenberCode.value) {
    if (menberCodeInfo.number && menberCodeInfo.polishing) {
      return menberCodeInfo.number.replace('***', menberCodeInfo.polishing);
    }
  }
  return menberCodeInfo.number;
});

const viewFullMenberCode = () => {
  showFullMenberCode.value = true;
};

const hideFullMenberCode = () => {
  showFullMenberCode.value = false;
};
</script>

<style lang="scss" scoped>
.page-top-show {
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-bottom: 30rpx;
  width: calc(100vw - 60rpx);
  min-height: 330rpx;
  // background: linear-gradient(180deg, #f5debb, #f4f5f7);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .page-top-title {
    position: absolute;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    font-weight: 500;
    color: #000000;
  }
}

.user {
  width: 100%;
  height: 400rpx;
  // background-image: url('https://static.jqzplat.com/web/c_default_center_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-info {
    height: 295rpx;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx 30rpx;

    .info-left {
      display: flex;
      align-items: center;

      .info-img {
        width: 100rpx;
        height: 100rpx;
        overflow: hidden;
        border: 4rpx solid #fff;
        border-radius: 70rpx;

        .image {
          width: 100rpx;
          height: 100rpx;
        }

        .avatar {
          width: 100%;
          height: 100%;
        }
      }

      .info-btn {
        width: 176rpx;
        height: 60rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 60rpx;
        color: #fff;
        text-align: center;
        background: #ff547b;
        border-radius: 30rpx;
      }

      .use-info {
        margin-left: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .info-right {
      display: flex;
      align-items: center;

      .menber-code {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        padding: 16rpx 24rpx 18rpx 22rpx;
        box-sizing: border-box;
        margin-right: 20rpx;

        .menber-code-icon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 12rpx;
        }
        .menber-code-desc {
          font-size: 24rpx;
          color: #323338;
          line-height: 1;
        }
      }

      .setting {
        width: 64rpx;
        height: 64rpx;
        background: rgb(255 255 255 / 50%);
        border-radius: 32rpx;
      }
    }
  }

  .login-list {
    display: flex;
    justify-content: space-around;

    .login-item {
      text-align: center;

      .item-num {
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }

      .login-list-item-name {
        height: 28rpx;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #b7b8c4;
      }
    }
  }
}

.boot-equity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 630rpx;
  height: 104rpx;
  padding: 0 30rpx;
  margin: 0 auto;
  background: linear-gradient(90deg, #ffefd2 0%, #ffddad 100%);
  border-radius: 16rpx 16rpx 0rpx 0rpx;

  .boot-equity-left {
    display: flex;
    align-items: center;
    height: 104rpx;

    .icon-image {
      width: 32rpx;
      height: 32rpx;
    }
    // .icon {
    //   // display: inline-block;
    //   width: 32rpx;
    //   height: 32rpx;
    //   // overflow: hidden;
    //   margin-top: -4 + rpx;
    //   .image {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }

    .text {
      height: 40rpx;
      margin-left: 12rpx;
      font-size: 28rpx;
      font-weight: 800;
      line-height: 40rpx;
      color: #975d17;
    }
  }

  .boot-equity-right {
    display: flex;
    align-items: center;
    height: 104rpx;
    // :deep(.uni-icons) {
    //   margin-top: -8rpx;
    // }
    .text {
      width: 96rpx;
      height: 32rpx;
      margin-right: 6rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #975d17;
      margin-top: 2rpx;
    }
  }
}

.reveal-grid {
  position: relative;
  // z-index: 999;
  // width: 750rpx;
  // padding: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 35rpx;
  margin-top: -5rpx;
  background: #f5f5f5;
  box-shadow: 0px -10rpx 20rpx -10rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx 16rpx 0px 0px;
}

.grid-list {
  padding: 20 30rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 30rpx;

  .wrapper-list {
    padding: 0rpx 30rpx;

    .list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: solid 1rpx #f8f8f8;
      // padding: 0 20rpx;
      .item-icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 30rpx;
        overflow: hidden;
        line-height: 48rpx;
        background: #fff;
        border-radius: 12rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        padding-right: 12rpx;
        font-size: 28rpx;
        .badge {
          width: 20rpx;
          height: 20rpx;
          background: #ff4c4c;
          border-radius: 16rpx;
        }
      }

      .more {
        width: 10rpx;
        color: #b7b8c4;
      }
    }

    .list-item:last-child {
      border-bottom: none;
    }
  }

  .wrapper-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 20rpx 0;

    .list-item {
      position: relative;
      display: inline-block;
      width: 25%;
      padding: 20rpx 0;
      text-align: center;

      .badge {
        position: absolute;
        top: 14rpx;
        right: 38rpx;
        z-index: 100;
        width: 20rpx;
        height: 20rpx;
        background: #ff4c4c;
        border-radius: 16rpx;
      }

      .item-icon {
        width: 88rpx;
        height: 88rpx;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 22rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        width: 100%;
        height: 34rpx;
        margin-top: 16rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.grid-ad {
  width: 690rpx;
  // height: 180rpx;
  margin: 30rpx 0rpx;
  overflow: hidden;
  // line-height: 180rpx;
  border-radius: 16rpx;

  .image {
    width: 100%;
    height: 100%;
  }
}
.menber-code-popup {
  :deep(.uni-popup) {
    z-index: 99999;
  }
}

.menber-code-popup-content {
  width: 690rpx;
  // height: 552rpx;
  background: #ffffff;
  border-radius: 32rpx;
  position: relative;

  .avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 70rpx;
    background: #ffffff;
    border: 4rpx solid #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    width: 100rpx;
    height: 100rpx;

    .avatar-image {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    padding: 148rpx 40rpx 80rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28rpx;
    color: #b7b8c4;
    line-height: 40rpx;

    .content-text {
      display: flex;
      align-items: center;
      .content-text-code {
        font-size: 36rpx;
        font-weight: 700;
        color: #323338;
        line-height: 50rpx;
      }
      .content-text-desc {
        padding-left: 8px;
        .icon {
          width: 16px;
          height: 16px;
          display: block;
        }
      }
    }

    .content-qrcode {
      margin: 24rpx 0 30rpx;
    }

    // .content-desc {
    // font-size: 28rpx;
    // color: #b7b8c4;
    // line-height: 40px;
    // }
  }

  .close {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translate(-50%, 0);

    .close-icon {
      width: 64rpx;
      height: 64rpx;
    }
  }
}
</style>
