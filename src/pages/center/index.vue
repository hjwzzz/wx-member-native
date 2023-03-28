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
// import { queryServiceBookPageFront } from '@/api/reservation-service';
import { getByOpsIdAndKind } from '@/api/server';
// import Storage from '@/utils/storage';
// import { queryGoldPriceByPage } from '@/api/server';
// import { bannerListClick, handleEntryUrl } from '@/utils/util';
import { staticUrl } from '@/utils/config';
// import { useBasicsData } from '@/store/basicsData';
// import Router from '@/utils/router';
import Tabbar from '@/components/Tabbar/index.vue';
import CustomFitUp from '../component/CustomFitUp/index.vue';

import BrCode128 from '@/utils/barcode.js';
import memberCard from '../component/memberCard.vue';

const imageUrl = staticUrl;
// const initBasicsData = useBasicsData();
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
  console.log('1111111111111111111getPageDate11');
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
const userInfo: any = reactive({
  avatarUrl: '',
  nickName: '',
  name: '',
  curLevelName: '',
  memberCardInfo: '',
  showGrowthValue: false,
  showSignIn: false,
  doOut: {
    fixedStyle: 0,
    special: {
      color: '#8c7373',
      fontSize: '32rpx',
    },
    style: {
      borderRadius: '10rpx',
      marginBottom: '30rpx',
      marginLeft: '30rpx',
      marginRight: '30rpx',
      marginTop: '30rpx',
      background: '#fff',
    },
  },
  background: '',
});
const loginList: Ref<any> = ref([]);

const getPageDate = async () => {
  const { data } = await getByOpsIdAndKind('WM_CENTER');
  const { param, panelList } = data;
  pageBackground.value = param?.doOut?.style?.background || '#f5f5f5';
  loginList.value = param?.quickNavList || [];

  if (param) {
    userInfo.avatarUrl = param.avatarUrl;
    userInfo.curLevelName = param.curLevelName;
    userInfo.nickName = param.nickName;
  }

  //  获取基本信息
  const getMenber = (item: { kind: string }) => item.kind === 'MEM_CARD';
  const memberCardInfo = panelList.find(getMenber) || {};
  if (!memberCardInfo.param) {
    return;
  }
  userInfo.showGrowthValue = memberCardInfo.param.showGrowthValue || false;
  userInfo.showSignIn = memberCardInfo.param.showSignIn || false;
  userInfo.doOut = memberCardInfo.param.doOut;

  // if (!memberCardInfo.param.doOut) {
  //   userInfo.doOut = {
  //     fixedStyle: 0,
  //     special: {
  //       color: '#8c7373',
  //       fontSize: '32rpx',
  //     },
  //     style: {
  //       borderRadius: '10rpx',
  //       marginBottom: '30rpx',
  //       marginLeft: '30rpx',
  //       marginRight: '30rpx',
  //       marginTop: '30rpx',
  //       background: '#fff',
  //     },
  //   };
  // }

  console.log('userInfo1', memberCardInfo.param);
  console.log('userInfo2', userInfo);
  userInfo.background =
    userInfo.doOut?.fixedStyle === 2
      ? null
      : memberCardInfo.param.doOut.style.background;

  if (memberCardInfo.param.doOut.style.background) {
    delete memberCardInfo.param.doOut.style.background;
  }
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
