<template>
  <CustomPage>
    <view class="gift">
      <view class="gift-page">
        <view class="gift-top">
          <view
            v-if="data.actParam.pageSetting.isOpenActRule"
            class="gift-top-guize"
            @click="showPop('g')"
          >
            活动规则
          </view>
          <view
            class="gift-top-guize"
            :class="{ prize: data.actParam.pageSetting.isOpenActRule }"
            @click="toPrize()"
          >
            我的奖品
          </view>
          <image
            :src="data.actParam.pageSetting.bgImageUrl"
            mode="widthFix"
          ></image>
          <view class="gift-top-action">
            <view class="gift-top-action-left">
              <view class="gift-top-action-left-top">
                已连续签到<text>{{ data.seriesSignDay }}</text
                >天
              </view>
              <view
                class="gift-top-action-left-b"
                @click="showMore"
                :style="{
                  maxHeight: over2lows ? '32px' : '',
                  overflow: over2lows ? 'hidden' : 'auto',
                }"
                >{{ todayGift }}
                <view class="arrow" v-if="over2lows" :style="{ bottom: 0 }">
                  ...<image
                    :src="staticUrl + 'gift/arrow-l.png'"
                    class="arrow-img"
                    mode="widthFix"
                  ></image>
                </view>
              </view>
            </view>
            <view class="gift-top-action-right">
              <view
                class="gift-top-action-right-btn btn"
                v-if="data.todaySigned === 'Y'"
                >已签到</view
              >
              <view class="gift-top-action-right-btn" @click="signIn" v-else
                >立即签到</view
              >
            </view>
          </view>
        </view>
        <view class="gift-calendar">
          <Calendar
            @getMonth="getMonth"
            :showData="showData"
            @clickGift="clickGift"
            @openNotice="openNotice"
          />
        </view>
        <view
          v-if="data.actParam.pageSetting.isOpenActDetail"
          class="gift-detail"
        >
          <view
            v-html="richImageFun(data.actParam.pageSetting.actDetail)"
          ></view>
        </view>
        <view class="gift-ad" v-if="hasAd">
          <swiper>
            <swiper-item
              v-for="(v, i) in data.wxappActivityAdvertList"
              :key="v.id"
              @click="goDetail(i)"
            >
              <image mode="aspectFit" :src="v.imgUrl"></image>
            </swiper-item>
          </swiper>
        </view>
        <!-- 签到成功提示 -->
        <uni-popup
          ref="toastRef"
          mask-background-color="rgba(0,0,0,0)"
          :is-mask-click="false"
          class="toast"
        >
          <view class="content">
            <image
              :src="staticUrl + 'gift/success.png'"
              mode="widthFix"
            ></image>
            签到成功
          </view>
        </uni-popup>
        <!-- 活动规则、签到奖励内容 -->
        <uni-popup ref="guizeRef" :show="showPopou" mode="center" class="guize">
          <view class="content">
            <view class="content-con">
              <view class="content-con-title">{{
                showGuize ? '活动规则' : `${giftDetail.seriesDay}天礼包`
              }}</view>
              <image
                class="content-con-topbg"
                src="https://static.dev.jqzplat.com/img/2x.png"
                mode="widthFix"
              >
              </image>
              <view class="content-con-text">
                <scroll-view
                  @touchmove.stop.prevent="moveStop"
                  scroll-y="true"
                  class="content-con-text-text"
                >
                  <view v-if="showGuize" class="content-con-text-text-con">{{
                    data.actParam.pageSetting.rule
                  }}</view>
                  <view class="giftDetail" v-else>
                    <view class="giftDetail-item title">
                      <text>奖励内容</text>
                      <text>数量</text>
                    </view>
                    <view
                      class="giftDetail-item"
                      v-for="(item, index) in giftDetail.awardList"
                      :key="index"
                    >
                      <text>{{ item.name }}</text>
                      <text>{{ item.give }}</text>
                    </view>
                  </view>
                </scroll-view>
              </view>
              <image
                :src="staticUrl + 'img/home-close.png'"
                @click="close"
                class="content-con-close"
                mode="widthFix"
              >
              </image>
            </view>
          </view>
        </uni-popup>
        <!-- 额外奖励 -->
        <uni-popup ref="guizeTwoRef" mode="center" class="guize">
          <view class="content">
            <view class="content-con con">
              <scroll-view
                @touchmove.stop.prevent="moveStop"
                scroll-y="true"
                class="content-con-text-text text"
              >
                <view>{{ todayGift }}</view>
              </scroll-view>
              <view class="sure" @click="closeMore">确定</view>
            </view>
          </view>
        </uni-popup>
      </view>
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, computed } from 'vue';
import {
  addMemberSignActivity,
  getUserSignActivityById,
  udpateUserNoticed,
} from '@/activity-pages/api/sign-in';
import { staticUrl } from '@/utils/config';
import { richImage } from '@/utils/util';
import Router from '@/utils/router';
import Calendar from './component/Calendar/index.vue';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
const showData = ref({});
const toastRef = ref();
const guizeRef = ref();
const showPopou = ref(false);
const showGuize = ref(true);

const data = reactive<any>({
  id: '',
  actParam: {
    afterSignType: '',
    incred: '',
    memberType: '',
    notified: '',
    pageSetting: {
      bgImageUrl:
        'https://www.jqzjop.com/ftp_images/test01/photos/f0231c40bf774ca0.jpg',
      rule: '',
      shareContent: '',
      shareImageUrl: '',
      shareTitle: '',
    },
  },
  h5ActivityAdvertList: [],
  serialSignAward: {
    afterDay: 0,
    awardList: [
      {
        awardKind: '',
        give: 0,
        name: '',
        number: '',
        unit: '',
      },
    ],
  },
  seriesSignDay: 0,
  signDayList: [],
  todayOrTomorrowAward: {},
  todaySigned: '',
  userNotified: '',
  wxappActivityAdvertList: [],
});
const over2lows = ref(false);
const guizeTwoRef = ref();
const giftDetail = ref<any>({});
onShareAppMessage(() => ({
  title: data.actParam.pageSetting.shareTitle,
  content: data.actParam.pageSetting.shareContent,
  path: '/activity-pages/sign-in/index',
}));
const hasAd = computed(() => data?.h5ActivityAdvertList?.length || data?.wxappActivityAdvertList?.length);
const todayGift = computed(() => {
  let text = data.todaySigned === 'N' ? '今日签到获得' : '明日签到获得';
  data.todayOrTomorrowAward?.awardList?.forEach((item: any, index: number) => text +=
        item.give +
        item.name +
        (index === data.todayOrTomorrowAward.awardList.length - 1 ? '' : '，'));
  return text;
});
onShow(() => {
  if (!initBasicsData.checkLogin) {
    return Router.goLogin();
  }
  getUserSignActivityByIdFun();
});
const moveStop = () => {
  //
};

const getMonth = (val: any) => {
  getUserSignActivityByIdFun(val);
};
// 签到
const signIn = async () => {
  const res = await addMemberSignActivity({});
  const { code } = res;
  if (res && !code) {
    if (data.firstSign) {
      uni.requestSubscribeMessage({
        tmplIds: [''],
        success() {
          openNotice('s');
        },
      });
    }
    toastRef.value.open();
    setTimeout(() => {
      toastRef.value.close();
    }, 3000);
    getUserSignActivityByIdFun();
  }
};
const showPop = (val: any = '') => {
  if (val === 'g') {
    showGuize.value = true;
  } else {
    showGuize.value = false;
  }
  showPopou.value = true;
  guizeRef.value.open();
};
const close = () => {
  showPopou.value = false;
  guizeRef.value.close();
};
// 查看签到奖励
const clickGift = (val: any) => {
  showPop();
  giftDetail.value =
    typeof val === 'string'
      ? data.serialSignAwardList.find((item: any) => item.seriesDate === val) ||
        {}
      : val;
};
// 签到提醒切换
const openNotice = async (val: any) => {
  await udpateUserNoticed('');
  if (val) {
    setShowData(true);
  }
};
const showMore = () => {
  if (over2lows.value) {
    guizeTwoRef.value.open();
  }
};
const closeMore = () => {
  guizeTwoRef.value.close();
};
// 获取签到信息
const getUserSignActivityByIdFun = async (month: number | string = '') => {
  const { data: info } = await getUserSignActivityById({
    month:
      month ||
      `${new Date()
        .getFullYear()}-${
        new Date()
          .getMonth() + 1 >= 10
          ? new Date()
            .getMonth() + 1
          : `0${new Date()
            .getMonth() + 1}`
      }`,
  });
  data.userNotified = info.userNotified !== 'N';
  Object.assign(data, info);
  data?.h5ActivityAdvertList.forEach((item: any) => {
    item.imgUrl = item.promotionImgUrlList.length
      ? item.promotionImgUrlList[0]
      : '';
  });
  data?.wxappActivityAdvertList.forEach((item: any) => {
    item.imgUrl = item.promotionImgUrlList.length
      ? item.promotionImgUrlList[0]
      : '';
  });
  Object.assign(showData.value, { giftDate: [], signInDate: [] });
  setTimeout(() => {
    setShowData();
  }, 0);
  nextTick(() => {
    const query = uni.createSelectorQuery();
    query
      .selectAll('.gift-top-action-left-b')
      .boundingClientRect(function (rect: any) {
        rect.forEach((v: any) => {
          if (v.height > 36) {
            over2lows.value = true;
          }
        });
      })
      .exec();
  });
};
const setShowData = (val = false) => {
  showData.value = {
    giftDate:
      data?.serialSignAwardList?.map((item: any) => item.seriesDate) || [],
    signInDate: data.signDayList || [],
    userNotified: val || data.userNotified || false,
    notified: data.actParam.notified || 'N',
    incred: data.actParam.incred || 'N',
    award: data.serialSignAwardList?.length
      ? data.serialSignAwardList[0]
      : null,
  };
};
const goDetail = (index: number) => {
  const url = data.wxappActivityAdvertList[index].url;

  Router.go(url);
};
const toPrize = () => {
  Router.goCodePage('activiy_prize', `?actId=${data.id}&c=`);
};
const richImageFun = (item: any) => richImage(item);
</script>
<style lang="scss" scoped>
.gift-page {
  min-height: calc(100vh - 110rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 110rpx - env(safe-area-inset-bottom));
}
.gift {
  background-color: #f5f5f5;

  &-top {
    height: 440rpx;
    width: 100%;
    background: #eee;
    margin-bottom: 25rpx;
    position: relative;

    &-guize {
      width: 138rpx;
      height: 56rpx;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 28px;
      color: #fff;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      position: absolute;
      right: 0;
      text-align: center;
      line-height: 56rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      z-index: 1;
      top: 30rpx;
      &.prize {
        top: 106rpx;
      }
    }

    image {
      max-height: 440rpx;
      width: 100%;
    }

    &-action {
      display: flex;
      align-items: center;
      padding: 26rpx;
      width: 690rpx;
      background: #fff;
      border-radius: 16rpx;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -90%);
      justify-content: space-between;

      &-left {
        width: 400rpx;

        &-top {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #333333;
          position: relative;

          text {
            color: #ff394e;
          }
        }

        &-b {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #b7b8c4;
          margin-top: 10rpx;
          position: relative;
        }
        .arrow {
          position: absolute;
          right: 0rpx;
          background: #fff;
          bottom: 0rpx;
          color: #b7b8c4;
          padding: 0 0 0 20rpx;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.2),
            #fff 25%
          );
          &-img {
            transform: rotate(180deg);
            width: 20rpx;
            height: 20rpx;
            position: relative;
            top: 5rpx;
          }
        }
      }

      &-right {
        width: 200rpx;

        &-btn {
          width: 100%;
          height: 88rpx;
          background: #ff394e;
          border-radius: 88rpx;
          text-align: center;
          line-height: 88rpx;
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #ffffff;
        }

        .btn {
          background: #b7b8c4;
        }
      }
    }
  }

  &-calendar {
    padding: 30rpx 30rpx 0 30rpx;
  }

  &-ad {
    padding: 30rpx 30rpx 0 30rpx;

    swiper {
      height: 180rpx;
    }
    image {
      max-height: 180rpx;
      width: 100%;
      border-radius: 16rpx;
    }
  }

  :deep(.toast) {
    .u-mask {
      background-color: transparent !important;
    }

    .uni-popup__wrapper {
      min-height: 30rpx;
      padding: 18rpx 24rpx;
      border-radius: 4rpx;
      box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
        0px 6px 16px 0px rgba(0, 0, 0, 0.08),
        0px 3px 6px -4px rgba(0, 0, 0, 0.12);

      .content {
        display: flex;
        align-items: center;
        font-size: 28rpx;

        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
  .content-con {
    border-radius: 16px;
  }
  :deep(.guize) {
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .con {
        padding: 40rpx 0 0;
        border-radius: 32rpx;
        .sure {
          text-align: center;
          height: 96rpx;
          line-height: 96rpx;
          border-top: 1px solid #ebedf0;
          font-size: 34rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a85ff;
        }
        .text {
          padding-bottom: 40rpx;
          font-size: 34rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #191919;
          line-height: 56rpx;
        }
      }
      &-con {
        background-color: #fff;
        position: relative;

        &-title {
          position: absolute;
          z-index: 1;
          font-size: 36rpx;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: #ffffff;
          top: -48rpx;
          left: 50%;
          transform: translate(-50%, 0);
        }

        &-topbg {
          width: 460rpx;
          height: 140rpx;
          position: absolute;
          top: -61rpx;
          left: 50%;
          transform: translate(-50%, 0);
        }

        &-text {
          width: 530rpx;
          max-height: 800rpx;
          overflow: auto;
          padding: 94rpx 0 40rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;

          &-text {
            max-height: 600rpx;
            overflow: auto;
            padding: 0 40rpx;
            width: 450rpx;
            &-con {
              white-space: pre-wrap;
            }
            .giftDetail {
              .title {
                background: #fafafa;
                font-size: 26rpx;
                font-family: PingFang-SC-Heavy, PingFang-SC;
                font-weight: 800;
                color: #666666;
              }
              &-item {
                display: flex;
                justify-content: space-between;
                padding: 16rpx 20rpx;
              }
            }
          }
        }

        &-close {
          width: 52rpx;
          height: 52rpx;
          position: absolute;
          bottom: -80rpx;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
  }

  .gift-detail {
    margin: 30rpx;
    margin-bottom: 0;
    padding: 30rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }
}
</style>
