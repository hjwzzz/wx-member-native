<template>
  <view
    class="scraping-card-page"
    :style="{ backgroundColor: styleObj.page.topImgBgColor }"
  >
    <view v-if="hasTop" class="prize-top">
      <TimeCountDown
        :data="{
          date:
            styleObj.activityStatus == 'NOTAT'
              ? styleObj.validTime
              : styleObj.endTime,
          isOpenActCountdown: styleObj.page.isOpenActCountdown,
          isShowJoinNum: styleObj.page.isShowJoinNum,
          number: styleObj.allJoinNum,
        }"
        color="#fff"
        bgColor="rgba(0, 0, 0, .2)"
        :timeText="styleObj.activityStatus == 'NOTAT' ? '距离开始' : '距离结束'"
        ref="timeCountDownRef"
      />
    </view>
    <!-- 操作项 -->
    <options-template
      ref="optionsTemplateRef"
      :actId="id"
      :main-color="styleObj.page.topImgBgColor"
      :has-top="hasTop"
      :show-rule="styleObj.page.isOpenActRule && !!styleObj.page.actRuleContent"
      :show-music="styleObj.page.isOpenBgMusic"
      :rule-text="styleObj.page.actRuleContent"
      :music-src="styleObj.page.bgMusicUrl"
      @showRule="onShowRule"
    />
    <!-- <image class="top-img" :src="styleObj.page.topImgUrl" mode="widthFix"></image> -->

    <view class="banner-swiper-box">
      <swiper
        class="banner-swiper"
        :autoplay="true"
        :interval="3000"
        :circular="true"
        @change="changBannerSwiper"
      >
        <swiper-item v-for="v in bannerList" :key="v.id">
          <image
            class="banner-swiper-img"
            mode="scaleToFill"
            :src="v.image"
          ></image>
        </swiper-item>
      </swiper>
      <view class="banner-swiper-indicator" v-if="bannerList.length > 1">
        <view
          v-for="(v, i) in bannerList"
          :key="i"
          class="banner-swiper-indicator-item"
          :class="{ active: bannerIndex === i }"
        ></view>
      </view>
    </view>
    <view
      v-if="styleObj.page.isOpenCarousel && noticeList.length"
      class="barrage"
      style="top: 13vw"
    >
      <view v-for="(v, i) in noticeList" :key="i" class="barrage-item">
        <image class="barrage-item-img" :src="v.avatarUrl"></image>
        {{ v.wxNickName }}兑换了{{ v.awardContent }}
      </view>
    </view>

    <view
      v-if="styleObj.page.isOpenCarousel && noticeListTwo.length"
      class="barrage"
      style="top: 25vw; animation-delay: 1s; animation-duration: 11s"
    >
      <view v-for="(v, i) in noticeListTwo" :key="i" class="barrage-item">
        <image class="barrage-item-img" :src="v.avatarUrl"></image>
        {{ v.wxNickName }}兑换了{{ v.awardContent }}
      </view>
    </view>
    <view class="body-box">
      <view class="user-box">
        <image
          class="user-avatar"
          :src="styleObj.avatarUrl || defaultUserAvatar"
        ></image>
        <view class="user-name">
          <text v-if="isLogin">{{ styleObj.wxNickName || '--' }}</text>
          <button v-else class="login-btn" @click="onShowAuth">登录</button>
        </view>
        <view class="user-info">
          <view class="user-count">
            <text>人气值：</text>
            <text class="user-num">{{
              toNumberFun(styleObj.userPopularityNum)
            }}</text>
          </view>
          <view class="user-rank">
            <text>当前排名：</text>
            <text class="user-num">
              {{
                toNumberFun(styleObj.userRank) > 999
                  ? '999+'
                  : toNumberFun(styleObj.userRank)
              }}
            </text>
          </view>
        </view>
        <button
          v-if="styleObj.page.isOpenRanking"
          class="rank-btn"
          @click="toLink(2)"
        >
          排行榜
        </button>
      </view>

      <view class="prize-box">
        <view class="prize-title">
          <view class="prize-title-left">
            <image
              class="prize-icon"
              src="https://static.jqzplat.com/popularity/prize-icon.png"
              mode="widthFix"
            />
            活动奖励
          </view>
          <view class="prize-title-right" @click="toLink()">
            我的奖励
            <image
              class="prize-right-icon"
              src="https://static.jqzplat.com/popularity/right-icon.png"
              mode="widthFix"
            />
          </view>
        </view>
        <view class="prize-list">
          <view v-for="(v, i) in prizeList" :key="i" class="prize-item">
            <image class="prize-cover" :src="v.url" mode="aspectFill" />
            <image
              v-if="v.status == 1"
              class="prize-success"
              src="https://static.jqzplat.com/popularity/prize-success.png"
              mode="widthFix"
            />
            <view class="prize-name text-line-one">{{ v.name }}</view>
            <view class="prize-price">
              需人气值：<text class="prize-num">{{ v.popularityNum }}</text>
            </view>
            <view class="prize-need">
              <template v-if="v.status < 1">
                还差<text class="prize-num">{{ v.needPopularityNum }}</text
                >个人气
              </template>
            </view>
            <view v-if="styleObj.page.isOpenprogress" class="prize-exchange">
              <template v-if="v.kind == 'COUPON' || v.kind == 'PRIZE'">
                <view class="prize-exchange-count">
                  已兑{{ v.exchangeNum }}/剩余{{ v.giveNum }}
                </view>
                <view class="prize-exchange-progress">
                  <text
                    class="prize-exchange-percentage"
                    :style="{ width: v.progressPercent }"
                  ></text>
                </view>
              </template>
              <template v-else>
                <view class="prize-exchange-num">已兑{{ v.exchangeNum }}</view>
              </template>
            </view>
            <button v-if="v.giveNum == 0" class="prize-exchange-btn disabled">
              已兑完
            </button>
            <button
              v-else-if="v.status == 0"
              class="prize-exchange-btn disabled"
            >
              立即兑换
            </button>
            <button
              v-else-if="v.status == 1"
              class="prize-exchange-btn"
              @click="onExchange(v)"
            >
              立即兑换
            </button>
            <button
              v-else-if="v.status > 1"
              class="prize-exchange-btn disabled"
            >
              已兑换
            </button>
          </view>
        </view>
      </view>
      <view v-if="styleObj.page.isOpenActDetail" class="detail-box">
        <view class="detail-title">
          <image
            class="detail-title-adorn"
            mode="widthFix"
            :src="adornIcon"
          ></image>
          <text class="detail-title-value">活动详情</text>
          <image
            class="detail-title-adorn"
            mode="widthFix"
            :src="adornIcon"
          ></image>
        </view>
        <view v-if="styleObj.page.actDetail" class="detail-desc">
          <!-- <rich-text :nodes="styleObj.page.actDetail"></rich-text> -->
          <view v-html="richImageFun(styleObj.page.actDetail)"></view>
        </view>
        <empty-template v-else :type="2" />
      </view>
      <view v-if="styleObj.page.isOpenRanking" class="detail-box">
        <view class="detail-title">
          <image
            class="detail-title-adorn"
            mode="widthFix"
            :src="adornIcon"
          ></image>
          <text class="detail-title-value">排行榜</text>
          <image
            class="detail-title-adorn"
            mode="widthFix"
            :src="adornIcon"
          ></image>
        </view>
        <view v-if="rankList.length" class="detail-desc">
          <rank-list-template :list="rankList" />
          <view class="rank-more-box" @click="toLink(2)">
            查看更多排名
            <image
              class="rank-more-icon"
              src="https://static.jqzplat.com/popularity/right-icon-2.png"
              mode="aspectFill"
            ></image>
          </view>
        </view>
        <empty-template v-else />
      </view>
      <view class="prize-footer">
        <view class="prize-initiator">
          <view>本活动由</view>
          <image
            v-if="styleObj.page.brandLogo"
            class="prize-footer-logo"
            :src="styleObj.page.brandLogo"
          />
          <view
            ><text class="prize-highlight">{{ styleObj.page.brandName }}</text
            >举办</view
          >
        </view>
        <view class="prize-company">
          <text class="prize-highlight">金千枝数智云</text>提供技术支持
        </view>
      </view>
    </view>
    <!-- 失败弹窗 -->
    <!-- <fail-popup v-model="showPopup" ref="failPopup" /> -->
    <!-- 提示 -->
    <!-- <u-toast ref="uToast" :duration="3000" /> -->
    <toast-template
      v-model:visible="toastVisible"
      :message="toastMsg"
    ></toast-template>
    <!-- 活动规则 -->
    <rule-template
      v-if="styleObj.page.actRuleContent"
      v-model:showRule="showRulePopup"
      :data="styleObj.page.actRuleContent"
    />
    <!-- 授权弹窗 -->
    <auth-popup
      :show="showAuthPopup"
      @onChange="e => (showAuthPopup = e)"
      @onSubmit="onLogin"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue';
import {
  getActInfo,
  queryTargetRecordList,
  queryPopularityActivityJoinRecordRanking,
  chgAward,
  checkChgAward,
} from '@/activity-pages/api/popularity';
import TimeCountDown from '../component/TimeCountDown/index.vue';
import { richImage } from '@/utils/util';
import OptionsTemplate from '../component/Options/index.vue';
import EmptyTemplate from './component/Empty/index.vue';
import RankListTemplate from './component/RankList/index.vue';
import RuleTemplate from '../component/Rules/index.vue';
import AuthPopup from './component/AuthPopup/index.vue';
import Router from '@/utils/router';
import { onHide, onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { useBasicsData } from '@/store/basicsData';
import ToastTemplate from '../component/Toast/index.vue';
import Storage from '@/utils/storage';

const initBasicsData = useBasicsData();
const id = ref('');
const openId = ref('');
const optionsInfo = ref('');
// const startIcon = 'https://static.jqzplat.com/lucky/start.png';
// const startDisabledIcon = 'https://static.jqzplat.com/lucky/start-disabled.png';
// const musicIcon = 'https://static.jqzplat.com/lucky/music-1.png';
// const musicDisabledIcon = 'https://static.jqzplat.com/lucky/music-2.png';
const adornIcon = 'https://static.jqzplat.com/scrapingCard/adorn.png';
const hasTop = ref(false);
const styleObj = reactive<any>({
  endTime: '', // 活动结束时间
  endTag: '', // 活动结束语
  allJoinNum: 0, // 所有参与人员数量
  page: {
    actDetail: '', // 活动详情
    actRuleContent: '', // 活动规则
    bgMusicName: '', // 背景音乐名称
    bgMusicUrl: '', // 背景音乐url
    brandLogo: '', // 品牌logo
    brandName: '', // 活动主办方品牌名
    isOpenActCountdown: false, // 活动倒计时
    isOpenActDetail: false, // 是否显示活动详情
    isOpenActRule: false, // 是否开启活动规则
    isOpenBgMusic: false, // 是否开启背景音乐
    isOpenCarousel: false, // 邀请动态轮播
    isShowJoinNum: false, // 是否显示参与人数
    isOpenRanking: false, // 排行榜
    topImgBgColor: '', // 顶部宣传图背景颜色
    topImgUrl: '', // 顶部宣传图
  },
  share: {
    shareContent: '', // 分享内容
    shareImgUrl: '', // 分享图片
    shareTitle: '', // 分享标题
  },
  avatarUrl: '', // 微信头像
  wxNickName: '', // 微信昵称
  userPopularityNum: '', // 用户人气值
  userRank: '', // 用户人气排名
});
// const musicPlay = ref(true); // 是否播放音乐
// const musicDom = ref(null); // 音乐Dom
const noticeList = ref<any[]>([]); // 中奖名单
const noticeListTwo = ref<any[]>([]);
// const showPopup = ref(true); // 中奖弹窗显示
// const showRule = ref(true); // 活动规则显示
// const qrShow = ref(true); // 二维码显示
// const canvasCtx = ref(null);
// const canvasImg = ref('');
// const isFinish = ref(false);
// const prizeInfo = ref(''); // 奖品信息
const prizeList = ref<any[]>([]); // 奖品列表
const bannerList = ref<any[]>([]);
const rankList = ref([]);
const defaultUserAvatar = 'https://static.jqzplat.com/popularity/user-bg.png';
const isLogin = ref(false); // 是否登录
const showRulePopup = ref(false); // 规则说明显示
const showAuthPopup = ref(false); // 授权弹窗
const isInit = ref(true);
const optionsTemplateRef = ref();
const timeCountDownRef = ref();

onLoad((options: any) => {
  optionsInfo.value = { ...options };
  // console.log('options', options);
  id.value = options.actId || uni.getStorageSync('actId');
  openId.value = options.openId || uni.getStorageSync('openId');
  uni.setStorageSync('actId', id.value);
  uni.setStorageSync('openId', openId.value);
  if (!openId.value) {
    isLogin.value = initBasicsData.checkLogin;
  } else {
    isLogin.value = true;
  }
  getDetail();
});
onShow(() => {
  if (!isInit.value) {
    getDetail('update', false);
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

const onLogin = () => {
  Router.goLogin();
  // const params = {
  // 	pages: '/activity/popularity/index',
  // 	...this.options
  // }
  // handleLogin(params, false)
};
// 获取活动详情
const getDetail = (type = 'first', isLoading = true) => {
  const params = {
    id: id.value,
    openId: openId.value,
  };
  getActInfo(params, isLoading)
    .then((res: any) => {
    // console.log('res', res);
      if (res.code === 0) {
        const info = res.data;
        const { page, awards = [] } = info;
        for (const key in info) {
          styleObj[key] = info[key];
        }
        // console.log('this.styleObj', styleObj);
        hasTop.value = page.isOpenActCountdown || page.isShowJoinNum;

        awards.map((v: any) => {
          v.url = getPrizeCover(v.kind) || v.url;
          v.name = getPrizeName(v);
          v.popularityNum = toNumberFun(v.popularityNum);
          v.needPopularityNum = toNumberFun(v.needPopularityNum);
          v.giveNum = toNumberFun(v.giveNum);
          v.exchangeNum = Number(v.notrecv || 0) + Number(v.received || 0); // 待领取数量 + 已领取数量
          v.progressPercent = `${calcProgressPercent(v.exchangeNum, v.giveNum)}%`;
        });
        prizeList.value = awards;

        const { topImgUrl = [] } = page;
        const bannerListNew = [] as any[];
        topImgUrl.map((v: any, i: number) => {
          bannerListNew.push({
            id: i + 1,
            image: v.topImgUrl,
          });
        });
        bannerList.value = bannerListNew;

        if (page.isOpenCarousel) {
          getNoticeList();
        }
        if (page.isOpenRanking) {
          getRankList();
        }
        // console.log('page', page);
        if (type === 'update') {
        // 针对音乐开关状态更新，音乐播放异常问题
          if (!page.isOpenBgMusic) optionsTemplateRef.value.pauseMusic();
          if (page.isOpenBgMusic) {
            setTimeout(() => {
              optionsTemplateRef.value.audioAutoPlay();
            });
          }
          return;
        }
        if (info.wxLoginRspVo) {
        // 自动授权用户信息
          setUserInfo(info.wxLoginRspVo);
        }
        if (page.isOpenBgMusic) {
          nextTick(() => {
            optionsTemplateRef.value.audioAutoPlay();
          });
        }
        if (info.conditionErrorMsg) {
        // 活动提示
          showToast(info.conditionErrorMsg);
        }
        isInit.value = false;
      }
    });
};
// 获取排行榜信息
const getRankList = () => {
  const params = {
    id: id.value,
    openId: openId.value,
  };
  queryPopularityActivityJoinRecordRanking(params)
    .then(res => {
    // console.log('res', res);
      if (res.code === 0) {
        const { data = [] } = res;
        rankList.value = data.filter((v: any, i: number) => i < 10);
      }
    });
};
// 提示
const toastVisible = ref(false);
const toastMsg = ref('');
const showToast = (str: string) => {
  toastMsg.value = str;
  toastVisible.value = true;
};
// 获取中奖信息列表
const getNoticeList = () => {
  const params = {
    id: id.value,
    openId: openId.value,
  };
  queryTargetRecordList(params)
    .then((res: any) => {
    // console.log('noticeList', res);
      if (res.code === 0) {
        const list = res.data || [];
        // for (let i = 0; i < 10; i++) {
        //   list.push({
        //     id: i + 1,
        //     wxNickName: `**备${i}`,
        //     awardContent: '优惠券',
        //     avatarUrl:
        //     'https://img.dev.jqzplat.com/12D3868F/COMM/c0f5607d-20220519.png',
        //   });
        // }
        const oneList = [] as any[];
        const twoList = [] as any[];
        list.map((v: any, i: number) => {
          if (i % 2 === 0) {
            oneList.push(v);
          } else {
            twoList.push(v);
          }
        });
        noticeList.value = oneList;
        noticeListTwo.value = twoList;
      }
    });
};
// 跳转
const toLink = (type = 1) => {
  switch (type) {
    case 1:
      Router.goCodePage(
        'activiy_prize',
        `?actId=${id.value}&c=${styleObj.page.topImgBgColor}`
      );
      // uni.navigateTo({ url: `/activity/inviteGift/prize?actId=${id.value}&c=${styleObj.page.topImgBgColor}` });
      break;
    case 2:
      Router.go(`/activity-pages/popularity/rank/index?actId=${id.value}`);
      // uni.navigateTo({ url: `/activity/popularity/rank/index?actId=${id.value}` });
      break;
  }
};

// 计算奖品进度条百分比
const calcProgressPercent = (hasGiven: string, activeStorageNum: string) => {
  const sum = Number(hasGiven) + Number(activeStorageNum); // 已领取 + 剩余总数
  const int = sum / 30; // 每等分
  // 占比多少等分
  const intSum = Math.ceil(Number(hasGiven) / int);
  const s = 100 / 30 * intSum;
  return s >= 90 && s < 100 ? s : Math.ceil(s / 6.6) * 6.6;
};
const toNumberFun = (str: string) => Number(str || 0);
// 获取奖品封面图
const getPrizeCover = (code: string) => {
  const iconObj = {
    coupon: 'https://static.jqzplat.com/popularity/coupon.png',
    balance: 'https://static.jqzplat.com/popularity/balance.png',
    integral: 'https://static.jqzplat.com/popularity/integral.png',
    growth: 'https://static.jqzplat.com/popularity/growth.png',
  };
  let result = '';
  switch (code) {
    case 'POINT':
      result = iconObj.integral;
      break;
    case 'DEPOSIT':
      result = iconObj.balance;
      break;
    case 'GROWTH':
      result = iconObj.growth;
      break;
    case 'COUPON':
      result = iconObj.coupon;
      break;
  }
  return result;
};
// 获取奖品标题
const getPrizeName = (item: any) => {
  const { kind, awardNum, name } = item;
  let result = '';
  if (kind === 'COUPON' || kind === 'PRIZE') {
    result = name;
  } else {
    result = awardNum + name;
  }
  return result;
};
// 兑换奖品
const onExchange = (item: any) => {
  const { page, wxLoginRspVo } = styleObj;
  const color = page.topImgBgColor;
  // console.log('wxLoginRspVo', wxLoginRspVo);
  if (!wxLoginRspVo) {
    uni.setStorageSync('popularityPrizeInfo', item);
    uni.navigateTo({ url: `/activity-pages/popularity/exchange/index?actId=${id.value}&color=${color}` });
    return;
  }
  onReceivePrize(item);
};
const checkPrize = (info: any, params: any) => {
  const { memberPrizeId: id, recvManner } = info;
  checkChgAward(params)
    .then(res => {
      if (res.code === 0) {
      // this.showToast('兑换成功')
      // if (item.kind == 'PRIZE') {
      // 	const url = '/pages/center/user-theprize/index'
      // 	uni.setStorageSync('pages', url)
      // 	router.go(url)
      // } else {
      // 	const url = `/activity/inviteGift/prize?actId=${ actId }&c=${ color }`
      // 	uni.setStorageSync('pages', url)
      // 	router.go(url)
      // }
        let url = '/my-assets-pages/my-prize/prize-detail';
        url += `?id=${id}&code=${recvManner.code}&name=${recvManner.name}&flag=true`;
        // uni.setStorageSync('pages', url);
        Router.go(url);
      }
    });
};
const onReceivePrize = (item: any) => {
  const color = styleObj.page.topImgBgColor;
  const params = {
    actId: id.value,
    conId: item.conId,
    openId: openId.value,
  };
  chgAward(params, true)
    .then(res => {
      if (res.code === 0) {
        showToast('兑换成功');
        const { chgAwardRspVo } = res.data;
        if (item.kind === 'PRIZE') {
          checkPrize(chgAwardRspVo, params);
        } else {
        // const url = `/activity/inviteGift/prize?actId=${id.value}&c=${color}`;
        // uni.setStorageSync('pages', url);
        // Router.go(url);
          Router.goCodePage('activiy_prize', `?actId=${id.value}&c=${color}`);
        }
      }
    });
};
const onShowRule = () => {
  showRulePopup.value = true;
};
const onShowAuth = () => {
  showAuthPopup.value = true;
};
// 缓存用户信息
const setUserInfo = (info: any) => {
  const list = Object.keys(info);
  // console.log('kist', list);
  list.map(item => {
    if (info[item]) {
      // uni.setStorageSync(item, info[item]);
      if (item === 'token') {
        Storage.setToken(info[item]);
        // uni.setStorageSync(item + uni.getStorageSync('jqzAppid'), info[item]);
      } else if (item === 'mid') {
        initBasicsData.setUseMid(info[item]);
        // uni.setStorageSync(item + uni.getStorageSync('jqzAppid'), info[item]);
      } else if (item === 'epid') {
        Storage.setEpid(info[item]);
        // uni.setStorageSync(item + uni.getStorageSync('jqzAppid'), info[item]);
      } else {
        uni.setStorageSync(item, info[item]);
      }
    }
  });
};
const richImageFun = (item: any) => richImage(item);
const bannerIndex = ref(0);
const changBannerSwiper = (e: any) => {
  bannerIndex.value = e.detail.current;
};
</script>
<style lang="scss" scoped>
.scraping-card-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  .top-img {
    width: 100%;
  }
  .banner-swiper-box {
    position: relative;
  }
  :deep(.banner-swiper) {
    height: 750rpx;
    .u-indicator-item-round {
      width: 20rpx;
      height: 6rpx;
      border-radius: 7rpx;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .u-indicator-item-round-active {
      width: 40rpx;
      background-color: #fbc95e;
    }
    .u-swiper-indicator {
      bottom: 20rpx !important;
    }
  }
  .banner-swiper-img {
    width: 100%;
    height: 100%;
  }
  .banner-swiper-indicator {
    position: absolute;
    bottom: 12rpx;
    z-index: 1;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
  .banner-swiper-indicator-item {
    width: 20rpx;
    height: 6rpx;
    margin: 0 6rpx;
    border-radius: 7rpx;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.5s;
    &.active {
      width: 40rpx;
      background-color: #fbc95e;
    }
  }
  .prize-top {
    // display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    // padding: 0 20rpx;
    width: 100%;
    // height: 56rpx;
    align-items: center;
    color: #fff;
    font-size: 22rpx;
    // justify-content: space-between;
    // background-color: rgba(0, 0, 0, 0.2);
  }

  @keyframes enter {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  .barrage {
    display: flex;
    z-index: 1;
    position: absolute;
    top: 13vw;
    transform: translateX(100vw);
    width: max-content;
    animation-timing-function: linear;
    animation-name: enter;
    animation-duration: 12s;
    animation-iteration-count: infinite;
  }
  .barrage-item {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 1vw 2.5vw 1vw 1vw;
    border-radius: 5vw;
    color: #ffffff;
    font-size: 2.7vw;
  }
  .barrage-item:not(:last-of-type) {
    margin-right: 5vw;
  }
  .barrage-item-img {
    width: 5.3vw;
    height: 5.3vw;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
    margin-right: 3vw;
  }

  .body-box {
    padding: 0 30rpx;
  }

  .user-box {
    position: relative;
    margin-top: 30rpx;
    padding: 30rpx;
    padding-left: 136rpx;
    padding-right: 212rpx;
    width: 100%;
    min-height: 146rpx;
    font-size: 24rpx;
    line-height: 32rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-sizing: border-box;
  }
  .user-avatar {
    position: absolute;
    top: 30rpx;
    left: 30rpx;
    width: 86rpx;
    height: 86rpx;
    border-radius: 50%;
  }
  .user-name {
    color: #333;
    font-size: 32rpx;
    font-weight: bold;
    line-height: 44rpx;
  }
  .user-info {
    display: flex;
    margin-top: 10rpx;
    color: #999;
  }
  .user-num {
    color: #fc4c39;
  }
  .user-rank {
    margin-left: 30rpx;
  }
  .rank-btn {
    display: flex;
    position: absolute;
    top: 50%;
    right: 30rpx;
    width: 152rpx;
    height: 64rpx;
    align-items: center;
    color: #ffe898;
    font-size: 24rpx;
    line-height: 32rpx;
    justify-content: center;
    border: 0;
    border-radius: 32rpx;
    background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
    transform: translateY(-50%);
  }
  .login-btn {
    display: inline-block;
    padding: 0 32rpx;
    height: 44rpx;
    color: #ffe898;
    font-size: 24rpx;
    font-weight: normal;
    line-height: 44rpx;
    vertical-align: bottom;
    border-radius: 28rpx;
    background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
  }

  .prize-box {
    margin: 30rpx 0;
    border-radius: 20rpx;
    overflow: hidden;
  }
  .prize-title {
    display: flex;
    padding: 0 30rpx;
    height: 100rpx;
    align-items: center;
    color: #751b0a;
    justify-content: space-between;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
  }
  .prize-title-left,
  .prize-title-right {
    display: flex;
    align-items: center;
  }
  .prize-title-left {
    font-size: 32rpx;
    font-weight: 600;
    line-height: 36rpx;
  }
  .prize-icon {
    margin-right: 16rpx;
    width: 32rpx;
  }
  .prize-title-right {
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .prize-right-icon {
    margin-left: 10rpx;
    width: 28rpx;
  }
  .prize-list {
    padding: 30rpx 0;
    background-color: #fff;
  }
  .prize-item {
    position: relative;
    padding-left: 228rpx;
    padding-right: 30rpx;
    min-height: 174rpx;
    color: #999;
    font-size: 24rpx;
    line-height: 32rpx;
    & + .prize-item {
      margin-top: 40rpx;
    }
  }
  .prize-success {
    position: absolute;
    top: 0;
    right: 0;
    width: 100rpx;
  }
  .prize-cover {
    position: absolute;
    top: 0;
    left: 30rpx;
    width: 174rpx;
    height: 174rpx;
    border-radius: 12rpx;
    object-fit: cover;
  }
  .prize-exchange-btn {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 30rpx;
    width: 152rpx;
    height: 64rpx;
    align-items: center;
    color: #ffe898;
    font-size: 24rpx;
    line-height: 34rpx;
    justify-content: center;
    border: 0;
    border-radius: 32rpx;
    background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
    cursor: pointer;
    &.disabled {
      color: #fff;
      background: linear-gradient(180deg, #dddddd 0%, #aaaaaa 100%);
      cursor: no-drop;
    }
  }
  .prize-name {
    color: #333;
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
  }
  .prize-num {
    color: #ff4646;
  }
  .prize-price {
    margin-top: 8rpx;
  }
  .prize-need {
    margin-top: 8rpx;
    font-size: 22rpx;
    height: 32rpx;
  }
  .prize-exchange {
    margin-top: 10rpx;
    width: 240rpx;
    color: #c56e28;
    font-size: 22rpx;
  }
  .prize-exchange-progress {
    position: relative;
    margin-top: 4rpx;
    width: 100%;
    height: 8rpx;
    border-radius: 12rpx;
    background-color: #eadecd;
    overflow: hidden;
  }
  .prize-exchange-percentage {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 12rpx;
    background-color: #f5c073;
    transition: width 0.25s linear;
  }
  .prize-exchange-num {
    display: inline-block;
    margin-top: 14rpx;
    padding: 0 8rpx;
    height: 40rpx;
    color: #c56e28;
    font-size: 22rpx;
    line-height: 40rpx;
    border-radius: 4rpx;
    background-color: #fff4db;
  }

  .detail-box {
    margin-top: 30rpx;
    padding: 30rpx;
    padding-bottom: 0;
    color: #646771;
    font-size: 28rpx;
    line-height: 44rpx;
    text-align: center;
    border-radius: 20rpx;
    background-color: #fff;
    overflow: auto;
  }
  .detail-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .detail-title-adorn {
    width: 48rpx;
  }
  .detail-title-value {
    position: relative;
    margin: 0 20rpx;
    color: #323338;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 50rpx;
  }
  .detail-desc {
    margin-top: 30rpx;
    padding-bottom: 30rpx;
    text-align: left;
    word-break: break-word;
    :deep(img) {
      max-width: 100%;
    }
  }

  .rank-more-box {
    display: flex;
    margin-top: 30rpx;
    align-items: center;
    color: #c56e28;
    font-size: 28rpx;
    line-height: 40rpx;
    justify-content: center;
  }
  .rank-more-icon {
    margin-left: 8rpx;
    width: 24rpx;
    height: 24rpx;
  }

  .prize-footer {
    // position: absolute;
    padding: 30rpx 0;
    width: 100%;
    color: rgba(0, 0, 0, 0.65);
    font-size: 24rpx;
    line-height: 36rpx;
    text-align: center;
  }
  .prize-highlight {
    color: #125ffa;
  }
  .prize-footer-logo {
    margin: 0 12rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
  }
  .prize-initiator {
    display: flex;
    margin-bottom: 18rpx;
    align-items: center;
    justify-content: center;
  }
  .prize-company {
    font-size: 20rpx;
    line-height: 24rpx;
    color: rgba(0, 0, 0, 0.45);
  }

  .toast-info {
    background-color: #fff;
  }
}
</style>
