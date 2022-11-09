<template>
  <view class="invite" :style="{ background: indexData.page.topImgBgColor }">
    <view class="invite-content">
      <view class="invite-content-box">
        <view v-if="hasTop" class="invite-content-box-timer">
          <TimeCountDown
            :data="{
              date: indexData.endTime,
              isOpenActCountdown: indexData.page.isOpenActCountdown,
              isShowJoinNum: indexData.page.isShowJoinNum,
              number: indexData.allJoinNum,
            }"
            ref="timer"
          />
        </view>
        <!-- 操作项 -->
        <options-template
          ref="optionsTemplateRef"
          :actId="actId"
          :main-color="indexData.page.topImgBgColor"
          :has-top="hasTop"
          :show-rule="
            indexData.page.isOpenActRule === 'Y' &&
            !!indexData.page.actRuleContent
          "
          :show-music="indexData.page.isOpenBgMusic === 'Y'"
          :rule-text="indexData.page.actRuleContent"
          :music-src="indexData.page.bgMusicUrl"
          @showRule="onShowRule"
        />
        <view class="invite-content-bac">
          <image
            :src="indexData.page.topImgUrl"
            mode="widthFix"
            class="invite-content-bac-img"
          />
        </view>
        <view
          class="invite-content-box-notice"
          v-if="indexData.page.isOpenInviterCarousel"
        >
          <uni-notice-bar
            v-if="trendsList.length"
            mode="horizontal"
            :text="trendsList.join(',')"
            color="#fff"
            background-color="transparent"
            :speed="80"
            scrollable
            single
          ></uni-notice-bar>
          <image
            src="https://static.jqzplat.com/invitegift/prize-box.png"
            mode="widthFix"
            class="invite-content-box-notice-bac"
          />
        </view>
        <view class="invite-content-box-btnBox">
          <view
            class="invite-content-box-btnBox-invite"
            @click="showInvite = !showInvite"
            >立即邀请</view
          >
          <view
            class="invite-content-box-btnBox-faceInvite"
            @click="inviteHandle(true)"
            >面对面邀请</view
          >
          <view class="invite-content-box-btnBox-inviteNumber">
            <image
              src="https://static.jqzplat.com/invitegift/page-left.png"
              mode="widthFix"
              class="invite-content-box-btnBox-inviteNumber-left"
            />
            <text class="invite-content-box-btnBox-inviteNumber-mid">
              已成功邀请
              <text style="font-weight: bold; padding: 0 10rpx">{{
                indexData.userInviteNum
              }}</text
              >人
            </text>
            <image
              src="https://static.jqzplat.com/invitegift/page-ringht.png"
              mode="widthFix"
              class="invite-content-box-btnBox-inviteNumber-right"
            />
          </view>
          <image
            src="https://static.jqzplat.com/invitegift/redbag.png"
            mode="widthFix"
            class="invite-content-box-btnBox-redbag"
          />
        </view>
        <view
          class="invite-content-box-rank"
          v-if="indexData.page.isOpenRanking"
        >
          <Rank @change="getRankData" :rankData="rankData" />
        </view>
        <view
          class="invite-content-box-actDetail"
          v-if="indexData.page.isOpenActDetail"
        >
          <view class="invite-content-box-actDetail-title">活动详情</view>
          <view
            class="invite-content-box-actDetail-con"
            v-html="richImageFun(indexData.page.actDetail)"
          ></view>
        </view>
      </view>
      <!-- <view
        class="invite-content-rulebtn"
        v-if="indexData.page.isOpenActRule === 'Y'"
        @click="showRule = true"
        >规则</view
      >
      <view class="invite-content-prizebtn" @click="goPrizeList">奖励</view>
      <image
        v-if="indexData.page.isOpenBgMusic === 'Y'"
        :src="playStatus ? musicIcon : musicIconC"
        mode="widthFix"
        class="invite-content-music"
        :class="playStatus ? 'rotate' : ''"
        @click="play"
      /> -->
    </view>
    <!-- <Rule v-model:showRule="showRule" :data="indexData.page.actRuleContent" />
    <audio
      v-if="isH5 === 'H5'"
      id="audio"
      :src="indexData.page.bgMusicUrl"
      :loop="true"
      :controls="false"
    ></audio> -->
    <Invite
      v-model:showInvite="showInvite"
      :showInviteList="{
        showP: indexData.page.isOpenInviteByPoster,
        showC: indexData.page.isOpenInviteByH5,
      }"
      @copy="copyUrl"
      @showPosterPop="getPoster"
    />
    <Poster v-model:showPoster="showPoster" :poster="posterUrl" />
    <Code v-model:showCode="showCode" :code="qrCodeData.qrcodeUrl" />
    <view class="invite-footer">
      <view class="invite-footer-one">
        本活动由
        <image
          :src="indexData.page.brandLogo"
          mode="widthFix"
          class="invite-footer-one-img"
        />
        <text class="invite-footer-one-company">{{
          indexData.page.brandName
        }}</text
        >举办
      </view>
      <view class="invite-footer-two">
        <text class="invite-footer-two-company">金千枝数智云</text>提供技术支持
      </view>
    </view>
    <!-- 提示 -->
    <toast-template
      v-model:visible="toastVisible"
      :message="toastMsg"
    ></toast-template>
    <!-- 活动规则 -->
    <rule-template
      v-if="indexData.page.actRuleContent"
      v-model:showRule="showRulePopup"
      :data="indexData.page.actRuleContent"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import {
  getInviteActInfo,
  queryInviteTargetRecordPage,
  queryUserInviteActivityDetailPage,
  queryInviteActivityJoinRecordRanking,
  getQrcodeInfo,
  getInviteActPoster,
  getIdByNumber,
} from '@/activity-pages/api/invite-gift';
import Router from '@/utils/router';
import TimeCountDown from '../component/TimeCountDown/index.vue';
import Rank from './component/Rank/index.vue';
import Invite from './component/Invite/index.vue';
import Poster from './component/Poster/index.vue';
import Code from './component/Code/index.vue';
import {
  onHide,
  onLoad,
  onShareAppMessage,
  onShow,
  onUnload,
} from '@dcloudio/uni-app';
import { richImage, copyText } from '@/utils/util';
import { useBasicsData } from '@/store/basicsData';
import OptionsTemplate from '../component/Options/index.vue';
import RuleTemplate from '../component/Rules/index.vue';
import ToastTemplate from '../component/Toast/index.vue';

const initBasicsData = useBasicsData();
const showInvite = ref(false);
const showPoster = ref(false);
const showCode = ref(false);
const actId = ref('');
const indexData = reactive<any>({
  actId: '',
  allJoinNum: 0,
  endTag: '',
  endTime: '',
  isMember: true,
  page: {
    actDetail: '',
    actRuleContent: '',
    bgMusicName: '',
    bgMusicUrl: '',
    brandLogo: '',
    brandName: '',
    isOpenActCountdown: true,
    isOpenActRule: 'Y',
    isOpenBgMusic: 'Y',
    isOpenInviteByH5: true,
    isOpenInviteByPoster: true,
    isOpenInviterCarousel: true,
    isOpenRanking: true,
    isShowJoinNum: true,
    topImgBgColor: '',
    topImgUrl: '',
  },
  share: {
    shareContent: '',
    shareImgUrl: '',
    shareTitle: '',
  },
  userInviteNum: 0,
});
const trendsList = ref([]);
const rankData = reactive({
  inviteDetail: [],
  rankDetail: [],
});
const qrCodeData = reactive({
  invteH5Url: '',
  qrcodeUrl: '',
  regParam: '',
  invteMiniUrl: '',
});
const posterUrl = ref('');
const hasTop = ref(false);
const showRulePopup = ref(false); // 规则说明显示
const optionsTemplateRef = ref();
const isInit = ref(true);

onLoad((options: any) => {
  // #ifdef H5
  // this.setParamData(options);
  // #endif
  // #ifdef MP
  const scene = String(options?.scene || uni.getLaunchOptionsSync().scene);
  const actNum = options?.num;
  if (scene?.includes('num')) {
    const data = scene.replace('num=', '')
      .replace('num%3D', '');
    uni.setStorageSync('actNum', data);
    getParamData(data);
  } else if (actNum) {
    uni.setStorageSync('actNum', actNum);
    getParamData(actNum, options);
  } else {
    const data = uni.getStorageSync('actNum');
    getParamData(data);
  }
  // #endif
});
onShow(() => {
  if (!isInit.value) {
    getIndexData('update', false);
  }
});
onHide(() => {
  // console.log('隐藏');
  if (optionsTemplateRef.value?.pauseMusic) {
    optionsTemplateRef.value.pauseMusic();
  }
});
onUnload(() => {
  optionsTemplateRef.value?.clearFun();
});

// const isEnd = () => {
//   setTimeout(() => {
//     uni.showToast({
//       title: indexData?.endTag || '活动已结束',
//       icon: 'none',
//       duration: 3000,
//     });
//   }, 500);
// };
const getParamData = async (scene: string, ops = {}) => {
  const res = await getIdByNumber(scene);
  setParamData({ ...ops, actId: res.data });
};
const setParamData = (options: any) => {
  options?.actId && uni.setStorageSync('actId', options?.actId);
  actId.value = uni.getStorageSync('actId');
  getIndexData();
  // const params = {
  //   pages: '/activity/inviteGift/index',
  //   ...options,
  // };
  // console.log('initBasicsData.checkLogin', initBasicsData.checkLogin);
  if (initBasicsData.checkLogin) {
    inviteHandle();
  } else {
    Router.goLogin();
  }
  // initBasicsData.checkLogin && inviteHandle();
  // setTimeout(() => {
  //   Router.goLogin();
  //   // handleLogin(params);
  // }, 500);
};
const copyUrl = () => {
  copyText(qrCodeData.invteH5Url);
  uni.showToast({
    icon: 'none',
    title: '复制成功',
    duration: 3000,
  });
};
const getPoster = async () => {
  showPoster.value = true;
  const res = await getInviteActPoster(actId.value);
  posterUrl.value = res.data;
};
const inviteHandle = async (face = false) => {
  if (face) {
    showCode.value = !showCode.value;
  } else {
    const res = await getQrcodeInfo(actId.value);
    // qrCodeData.value = res.data;
    Object.assign(qrCodeData, res.data);
    return true;
  }
};
const getRankData = async (type = 0) => {
  const res =
    type === 0
      ? await queryUserInviteActivityDetailPage({
        actId: actId.value,
        curPage: 1,
        pageSize: 1000,
      })
      : await queryInviteActivityJoinRecordRanking(actId.value);
  type === 0
    ? Object.assign(rankData, {
      inviteDetail: res.data?.records || [],
      rankDetail: [],
    })
    : Object.assign(rankData, {
      inviteDetail: [],
      rankDetail: res.data,
    });
};
const richImageFun = (str: any) => richImage(str);
const getIndexData = async (type = 'first', isLoading = true) => {
  const res = await getInviteActInfo({ actId: actId.value }, isLoading);
  // console.log('res', res);
  // this.indexData = res.data || this.indexData;
  Object.assign(indexData, res.data || indexData);
  hasTop.value =
    indexData.page.isOpenActCountdown || indexData.page.isShowJoinNum;
  // playStatus.value = indexData.page.isOpenBgMusic === 'Y';
  // console.log('indexData', indexData);
  if (indexData.page.isOpenInviterCarousel) {
    queryInviteTargetRecord();
  }
  if (indexData.page.isOpenRanking && initBasicsData.checkLogin) {
    getRankData();
  }
  // if (indexData?.activityStatus === 'ENDED') {
  //   isEnd();
  // }
  if (type === 'update') {
    // 针对音乐开关状态更新，音乐播放异常问题
    if (indexData.page.isOpenBgMusic === 'N') optionsTemplateRef.value.pauseMusic();
    if (indexData.page.isOpenBgMusic === 'Y') {
      setTimeout(() => {
        optionsTemplateRef.value.audioAutoPlay();
      });
    }
    return;
  }
  if (indexData.page.isOpenBgMusic === 'Y') {
    nextTick(() => {
      // console.log('optionsTemplateRef', optionsTemplateRef.value);
      optionsTemplateRef.value.audioAutoPlay();
    });
  }
  if (indexData.conditionErrorMsg) {
    // 活动提示
    showToast(indexData.conditionErrorMsg);
  }
  isInit.value = false;
  // #ifdef MP
  // this.musicPlay(this.playStatus);
  // #endif
  // #ifdef H5
  // if (checkHasLogined()) {
  //   const resInit = await this.initJsapiSign();
  //   if (resInit) {
  //     jweixin.ready(() => {
  //       jweixin.hideMenuItems({
  //         // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  //         menuList: [
  //           'menuItem:share:qq',
  //           'menuItem:share:QZone',
  //           'menuItem:openWithSafari',
  //           'menuItem:share:weiboApp',
  //           'menuItem:share:facebook',
  //           'menuItem:copyUrl',
  //           'menuItem:share:timeline',
  //           'menuItem:favorite',
  //         ],
  //       });
  //       that.musicPlay(this.playStatus);
  //       jweixin.updateAppMessageShareData({
  //         title: this.indexData.share.shareTitle, // 分享标题
  //         desc: this.indexData.share.shareContent, // 分享描述
  //         link:
  //           this.qrCodeData.invteH5Url ||
  //           `${window.location.href}?appId=${uni.getStorageSync('jqzAppid')}`, // 分享链接，即要进入的页面的链接（其中的域名）必须与当前页面对应的公众号JS安全域名一致
  //         imgUrl: this.indexData.share.shareImgUrl, // 分享图标
  //       });
  //     });
  //     jweixin.error(res => {
  //       console.log('签名失败', res);
  //     });
  //   }
  // }
  // #endif
};
const queryInviteTargetRecord = async () => {
  const res = await queryInviteTargetRecordPage(actId.value);
  trendsList.value = res?.data.map((item: any) => `${item?.wxNickName}邀请达标获得${item?.level}级奖励！`);
};
// 提示
const toastVisible = ref(false);
const toastMsg = ref('');
const showToast = (str = '') => {
  toastMsg.value = str;
  toastVisible.value = true;
};
const onShowRule = () => {
  showRulePopup.value = true;
};
onShareAppMessage(() => ({
  title: indexData.share.shareTitle,
  content: indexData.share.shareContent,
  path: qrCodeData.invteMiniUrl,
  imageUrl: indexData.share.shareImgUrl,
}));
</script>
<style lang="scss" scoped>
.invite {
  &-content {
    overflow: hidden;
    position: relative;
    &-box {
      width: 100%;
      min-height: 1150rpx;
      &-timer {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
      }
      &-notice {
        position: relative;
        :deep(.uni-noticebar) {
          width: 615rpx !important;
          margin: 0 auto;
          padding: 14rpx 24rpx !important;
          position: absolute;
          left: 90rpx;
          top: -6rpx;
          z-index: 1;
          font-size: 26rpx;
        }
        &-bac {
          width: 640rpx;
          height: 68rpx;
          margin: 0 auto;
          display: block;
        }
      }
      &-btnBox {
        margin: 0 auto;
        width: 690rpx;
        height: 356rpx;
        background: #ffffff;
        box-shadow: 0px 2rpx 15rpx 0rpx rgba(147, 86, 11, 0.4);
        border-radius: 18rpx;
        text-align: center;
        position: relative;
        overflow: hidden;
        &-invite {
          display: inline-block;
          width: 580rpx;
          height: 88rpx;
          background: linear-gradient(90deg, #ff4700 0%, #ffd170 100%);
          border-radius: 88rpx;
          line-height: 86rpx;
          font-size: 34rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          margin-top: 40rpx;
        }
        &-faceInvite {
          display: inline-block;
          width: 580rpx;
          height: 88rpx;
          background: #fff;
          border: 2rpx solid #ff4700;
          border-radius: 88rpx;
          line-height: 86rpx;
          font-size: 34rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #ff4700;
          text-align: center;
          margin-top: 30rpx;
        }
        &-inviteNumber {
          display: inline-block;
          margin-top: 33rpx;
          &-left,
          &-right {
            width: 112rpx;
          }
          &-mid {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #87460b;
            margin: 0 20rpx;
          }
        }
        &-redbag {
          width: 330rpx;
          position: relative;
          top: 17rpx;
        }
      }
      &-actDetail {
        margin: 0 auto;
        padding: 20rpx;
        width: 690rpx;
        min-height: 200rpx;
        background: #ffffff;
        box-shadow: 0px 2rpx 15rpx 0rpx rgba(147, 86, 11, 0.4);
        border-radius: 18rpx;
        margin-top: 30rpx;
        box-sizing: border-box;
        &-title {
          line-height: 60rpx;
          font-size: 34rpx;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #191919;
          text-align: center;
        }
        &-con {
          word-break: break-all;
        }
      }
      &-rank {
        margin: 0 auto;
        // padding: 0 0 20rpx;
        width: 690rpx;
        min-height: 200rpx;
        background: #ffffff;
        box-shadow: 0px 2rpx 15rpx 0rpx rgba(147, 86, 11, 0.4);
        border-radius: 18rpx;
        margin-top: 30rpx;
        overflow: hidden;
      }
    }
    &-rulebtn,
    &-prizebtn {
      width: 72rpx;
      height: 44rpx;
      background: rgba(0, 0, 0, 0.55);
      border-radius: 22rpx;
      font-size: 22rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #fae067;
      text-align: center;
      line-height: 44rpx;
      position: fixed;
      top: 100rpx;
      right: 28rpx;
      z-index: 1000;
    }
    &-prizebtn {
      top: 160rpx;
    }
    &-bac {
      min-height: 200rpx;
      &-img {
        width: 100%;
      }
    }
    &-music {
      width: 60rpx;
      position: fixed;
      right: 28rpx;
      top: 220rpx;
      z-index: 1000;
    }
    .rotate {
      -webkit-animation: rotate 3s linear infinite;
    }
  }
  &-footer {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    font-size: 20rpx;
    text-align: center;
    &-one {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100rpx;
      &-img {
        width: 36rpx;
      }
      &-company {
        color: #1a85ff;
      }
    }
    &-two {
      padding: 10rpx 20rpx 20rpx;
      &-company {
        color: #1a85ff;
      }
    }
  }
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
.name2 {
  color: rgb(192, 196, 204);
}
.name1 {
  color: #666;
  width: 300rpx;
  flex: 1;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.toast-box {
  padding: 10rpx 20rpx;
  max-width: 400rpx;
  border-radius: 12rpx;
  background-color: #fff;
}
</style>
