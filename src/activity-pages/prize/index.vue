<template>
  <view class="giftList" :class="empty ? '' : 'noEmpty'">
    <view class="giftList-empty" v-if="empty">
      <image
        class="giftList-empty-img"
        mode="widthFix"
        :src="staticUrl + 'prize/Noprize.png'"
      />
      <view class="giftList-empty-text">暂无奖品信息</view>
    </view>
    <view class="giftList-content">
      <view class="giftList-content-con" v-if="!empty">
        <view v-for="(item, index) in data" :key="index">
          <view v-if="item.kind === 'COUPON'">
            <view class="giftList-content-con-item">
              <view class="giftList-content-con-item-left">
                <image
                  :src="item.imageUrl || icon.coupon"
                  mode="scaleToFill"
                  class="giftList-content-con-item-left-img"
                />
                <view class="giftList-content-con-item-left-msg">
                  <view class="giftList-content-con-item-left-msg-title">
                    <view class="title">{{ item.name }}</view>
                    <view class="num">x{{ item.num }}</view>
                  </view>
                  <view class="giftList-content-con-item-left-msg-price">
                    <view class="coupon-prize">
                      <!-- 随机券、满减券 -->
                      <template
                        v-if="
                          item.prodCode == 'random_money_coupon' ||
                          item.prodCode == 'full_reduction_coupon'
                        "
                      >
                        <text class="coupon-prize-num">{{ item.discount }}</text
                        >元
                      </template>
                      <!-- 折扣券 -->
                      <template v-if="item.prodCode == 'discount_coupon'">
                        <text class="coupon-prize-num">{{ item.discount }}</text
                        >折
                      </template>
                      <!-- 工费抵扣券 -->
                      <template
                        v-if="item.prodCode == 'labor_cost_deduction_coupon'"
                      >
                        <text class="coupon-prize-num">{{ item.discount }}</text
                        >元每{{ item.laborChargesType == 'g' ? '克' : '件' }}
                      </template>
                      <!-- 工费折扣券 -->
                      <template
                        v-if="item.prodCode == 'labor_cost_discount_coupon'"
                      >
                        <text class="coupon-prize-num">{{ item.discount }}</text
                        >折每{{ item.laborChargesType == 'g' ? '克' : '件' }}
                      </template> </view
                    >{{ item.desc }}
                  </view>
                  <view class="giftList-content-con-item-left-msg-time">
                    <template v-if="item.afterDay > 0"
                      >有效期至{{ item.expireTime }}</template
                    >
                    <template v-else
                      >有效期{{ item.validTime }}至{{
                        item.expireTime
                      }}</template
                    >
                  </view>
                </view>
              </view>
              <view class="giftList-content-con-item-right">
                <view
                  class="giftList-content-con-item-right-text"
                  @click="goCouponList"
                  v-if="item.a"
                  >待发放</view
                >
                <view
                  class="giftList-content-con-item-right-btn"
                  @click="goCouponList(item)"
                  v-else
                  :style="{ background: color || '' }"
                  >查看</view
                >
              </view>
            </view>
          </view>
          <view v-if="item.kind === 'PRIZE'">
            <view class="giftList-content-con-item">
              <view class="giftList-content-con-item-left">
                <image
                  :src="item.imageUrl || icon.prize"
                  mode="scaleToFill"
                  class="giftList-content-con-item-left-img"
                />
                <view class="giftList-content-con-item-left-msg">
                  <view class="giftList-content-con-item-left-msg-title">
                    <view class="title">{{ item.name }}</view>
                    <view class="num">x{{ item.num }}</view>
                  </view>
                  <view class="giftList-content-con-item-left-msg-price"
                    >领取门店：<text
                      :class="
                        item.exchangeShopName ? '' : 'price-exchange-status'
                      "
                    >
                      {{ item.exchangeShopName || '待兑换' }}
                    </text></view
                  >
                  <view class="giftList-content-con-item-left-msg-time">
                    <template v-if="item.afterDay > 0"
                      >有效期至{{ item.expireTime }}</template
                    >
                    <template v-else
                      >有效期{{ item.validTime }}至{{
                        item.expireTime
                      }}</template
                    >
                  </view>
                </view>
              </view>
              <view class="giftList-content-con-item-right">
                <view
                  class="giftList-content-con-item-right-btn"
                  @click="goPrizeList(item)"
                  :style="{ background: color || '' }"
                  >查看</view
                >
              </view>
            </view>
          </view>
          <view v-if="item.kind === 'POINT'">
            <view class="giftList-content-con-item">
              <view class="giftList-content-con-item-left1">
                <image
                  :src="item.imageUrl || icon.integral"
                  mode="scaleToFill"
                  class="giftList-content-con-item-left1-img"
                />
                <view class="giftList-content-con-item-left1-title">
                  <text class="giftList-content-con-item-left1-title-num">{{
                    item.num
                  }}</text>
                  {{ item.unit }}
                </view>
              </view>
              <view class="giftList-content-con-item-right">
                <view
                  class="giftList-content-con-item-right-btn"
                  @click="goPointList(item)"
                  :style="{ background: color || '' }"
                  >查看</view
                >
              </view>
            </view>
          </view>
          <view v-if="item.kind === 'DEP'">
            <view class="giftList-content-con-item">
              <view class="giftList-content-con-item-left1">
                <image
                  :src="item.imageUrl || icon.balance"
                  mode="scaleToFill"
                  class="giftList-content-con-item-left1-img"
                />
                <view class="giftList-content-con-item-left1-title">
                  {{ item.name }}
                  <text class="giftList-content-con-item-left1-title-num">{{
                    item.num
                  }}</text>
                  {{ item.unit }}
                </view>
              </view>
              <view class="giftList-content-con-item-right">
                <view
                  class="giftList-content-con-item-right-btn"
                  @click="goDepositList(item)"
                  :style="{ background: color || '' }"
                  >查看</view
                >
              </view>
            </view>
          </view>
          <view v-if="item.kind === 'GROWTH'">
            <view class="giftList-content-con-item">
              <view class="giftList-content-con-item-left1">
                <image
                  :src="item.imageUrl || icon.growth"
                  mode="scaleToFill"
                  class="giftList-content-con-item-left1-img"
                />
                <view class="giftList-content-con-item-left1-title">
                  <text class="giftList-content-con-item-left1-title-num">{{
                    item.num
                  }}</text
                  >成长值
                </view>
              </view>
              <view class="giftList-content-con-item-right">
                <view
                  class="giftList-content-con-item-right-btn"
                  @click="goMemberList()"
                  :style="{ background: color || '' }"
                  >查看</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="giftList-btn">
      <view
        class="giftList-btn-btn"
        @click="backHome"
        :style="{ background: color || '' }"
        >返回活动</view
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import Router from '@/utils/router';
import { queryAllLevelRights } from '@/api/server';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { queryCommonUserActivityAwardList } from '@/activity-pages/api/inviteGift';
import { staticUrl } from '@/utils/config';

const actId = ref('');
const color = ref('');
const data = reactive<any[]>([]);
const icon = reactive({
  coupon: 'https://static.jqzplat.com/img/coupon.png',
  balance: 'https://static.jqzplat.com/img/balance.png',
  goldBean: 'https://static.jqzplat.com/img/goldBean.png',
  integral: 'https://static.jqzplat.com/img/integral.png',
  growth: 'https://static.jqzplat.com/img/growth.png',
  prize:
    'https://static.jqzplat.com/img/2d3238eb-f694-4461-935d-997093358f34.png',
});
const empty = computed(() => !data?.length);

onLoad((options: any) => {
  color.value = options.c;
  actId.value = options.actId;
});
onShow(() => {
  getPrize();
});
const getPrize = async () => {
  const { data: info } = await queryCommonUserActivityAwardList(actId.value);
  Object.assign(data, info);
};
const goCouponList = (item: any) => {
  let pages = '/pages/center/ticket/index';
  if (item.id) {
    pages = `/pages/center/ticket/detail?id=${item.id}&status=${item.couponStatus.code}`;
  }
  uni.setStorageSync('pages', pages);
  Router.go(pages);
};
const goPrizeList = (item: any) => {
  const { id, status, recvManner } = item;
  let pages = '';
  switch (status.code || '') {
    case 'TEXC': // 待兑换
      pages = '/pages/center/user-theprize/to_convert/exchange';
      pages += `?id=${id}&code=${recvManner.code}&name=${recvManner.name}&flag=true`;
      break;
    // case 'CLOSED': // 已失效
    // case 'FINISHED': // 已领取
    //   break
    default:
      if (Number(recvManner.code) === 1) {
        pages = '/pages/center/user-theprize/state/dailingqu';
        pages += `?id=${id}&name=${status.name}`;
      } else {
        pages = '/pages/center/user-theprize/state/get_theview';
        pages += `?id=${id}&name=${status.name}`;
      }
  }
  uni.setStorageSync('pages', pages);
  Router.go(pages);
};
// 跳转积分
const goPointList = (item: any) => {
  // const pages = `/myAssets/integral/index?selectId=${item.kindRelatedId}`;
  // uni.setStorageSync('pages', pages);
  // Router.go(pages);
  Router.goCodePage('point', `?selectId=${item.kindRelatedId}`);
};
// 跳转储值类型
const goDepositList = (item: any) => {
  // const pages = `/myAssets/thebalance/index?selectId=${item.kindRelatedId}`;
  // uni.setStorageSync('pages', pages);
  // Router.go(pages);
  Router.goCodePage('balance', `?selectId=${item.kindRelatedId}`);
};
// 跳转成长值
const goMemberList = async () => {
  const pages = '/pages/center/member-benefits/index';
  const res = await queryAllLevelRights('');
  if (!res.data) {
    Router.goCodePage('wm_center');
  }
  uni.setStorageSync('pages', pages);
  Router.go(pages);
};
const backHome = () => {
  uni.navigateBack({ delta: 1 });
};
</script>
<style lang="scss" scoped>
.noEmpty {
  padding-bottom: 120rpx;
}
.giftList {
  &-time {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #8b8b8b;
    padding: 20rpx;
  }
  &-empty {
    margin-top: 312rpx;
    text-align: center;
    &-img {
      width: 320rpx;
    }
    &-text {
      margin-top: 32rpx;
      color: #9697a2;
    }
    &-btn {
      display: inline-block;
      margin-top: 32rpx;
      width: 320rpx;
      height: 100rpx;
      background: linear-gradient(90deg, #ff4700 0%, #ffd170 100%);
      border-radius: 88rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 36rpx;
      color: #fff;
    }
  }
  &-content {
    &-con {
      padding: 0 20rpx 20rpx;
      &-box {
        display: flex;
        align-items: center;
        justify-content: center;
        &-empty {
          width: 300rpx;
        }
      }
      &-item {
        width: 100%;
        height: 170rpx;
        background: #fff;
        border-radius: 12rpx;
        display: flex;
        padding: 20rpx;
        margin-bottom: 30rpx;
        box-sizing: border-box;
        &:nth-child(1) {
          margin-top: 30rpx;
        }
        &-right {
          width: 20%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
          &-btn {
            width: 100rpx;
            height: 48rpx;
            background: linear-gradient(180deg, #fe734d 0%, #ec3f38 100%);
            border-radius: 28rpx;
            color: #fff;
            font-size: 24rpx;
            text-align: center;
            line-height: 48rpx;
          }
          &-text {
            color: #dc1716;
          }
        }
        &-left1 {
          flex: 1;
          display: flex;
          align-items: center;
          &-img {
            width: 120rpx;
            height: 120rpx;
            flex-shrink: 0;
            border-radius: 16rpx;
          }
          &-title {
            margin-left: 20rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            white-space: normal !important;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            &-num {
              color: #dc1716;
              font-size: 32rpx;
            }
          }
        }
        &-left {
          flex: 1;
          display: flex;
          align-items: center;
          &-img {
            width: 120rpx;
            height: 120rpx;
            flex-shrink: 0;
            border-radius: 16rpx;
          }
          &-msg {
            margin-left: 20rpx;
            &-title {
              font-size: 28rpx;
              font-family: PingFang SC;
              font-weight: bold;
              display: flex;
              color: #323338;
              align-items: center;
              .title {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                white-space: normal !important;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .num {
                display: flex;
                justify-content: flex-end;
                color: #9697a2;
                font-size: 24rpx;
                font-weight: normal;
                margin-left: 10rpx;
              }
            }
            &-price {
              font-size: 24rpx;
              font-family: PingFang SC;
              color: #9697a2;
              margin-top: 4rpx;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: normal !important;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            &-time {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 400;
              color: #9697a2;
              margin-top: 4rpx;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: normal !important;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
  &-btn {
    background: #fff;
    height: 120rpx;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &-btn {
      width: 686rpx;
      height: 80rpx;
      background: linear-gradient(180deg, #fe734d 0%, #ec3f38 100%);
      border-radius: 200px;
      line-height: 80rpx;
      text-align: center;
      color: #fff;
    }
  }
}
.coupon-prize {
  // display: flex;
  display: inline-block;
  margin-right: 16rpx;
  // align-items: baseline;
  color: #dc1716;
}
.coupon-prize-num {
  margin-right: 4rpx;
  font-size: 42rpx;
  font-weight: bold;
  line-height: 58rpx;
}
.price-exchange-status {
  color: #dc1716;
}
</style>
