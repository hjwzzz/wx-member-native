<template>
  <CustomPage bottom>
    <view class="serveDetail">
      <view class="wrapper">
        <view class="top">
          <view class="top-main">
            <view class="top-mian-left">
              <image class="img" :src="detail.imgUrl" mode="aspectFit" />
              <view class="info">
                <view class="serve-name">
                  {{ detail.name }}
                </view>
                <text class="cost-text">
                  {{ cost }}
                </text>
              </view>
            </view>
            <view
              v-if="
                detail.boolShowServCount &&
                detail.boolShowServCount.code === 'Y'
              "
              class="top-mian-right"
            >
              <view class="label"> 服务次数 </view>
              <view class="num">
                {{ showTotalBook }}
              </view>
            </view>
          </view>
          <view class="tip">
            <image
              v-if="detail.boolBookServ?.code === 'Y'"
              class="img"
              type="image"
              mode="aspectFill"
              :src="`${staticUrl}reservation-service/time.png`"
            />
            <image
              v-else
              class="img"
              type="image"
              mode="aspectFill"
              :src="`${staticUrl}reservation-service/tip.png`"
            />
            {{ detail.tips }}
          </view>
        </view>

        <view class="detail">
          <u-sticky :h5-nav-height="0">
            <view class="bgW">
              <Tabs
                :tabList="tabList"
                v-model:current="current"
                @change="tabChange"
              />
            </view>
          </u-sticky>
          <view class="main">
            <view v-show="current === 0" class="serve-introduce">
              <template v-if="detail.description">
                <view v-html="richImage(detail.description)" />
              </template>
              <view v-else class="no-data">
                <image
                  class="img"
                  mode="aspectFit"
                  :src="`${staticUrl}img/empty/prize.png`"
                />
                <view class="text"> 暂无介绍 </view>
              </view>
            </view>
            <view v-show="current === 1" class="store-list">
              <template v-if="storeList && storeList.length">
                <view
                  v-for="item in storeList"
                  :key="item.distId"
                  class="store-item"
                >
                  <view class="name">
                    <view
                      class="store-name"
                      :class="isAuthGetLocation ? 'hasDis' : 'noDis'"
                    >
                      <view class="storeName">
                        {{ item.storeName }}
                      </view>
                      <view v-if="item.gsResult.code === 'Y'" class="tag bgCM">
                        归属
                      </view>
                    </view>
                    <view v-if="isAuthGetLocation" class="distance">
                      {{ item.range }}km
                    </view>
                  </view>
                  <view class="addr">
                    <image
                      class="img"
                      type="image"
                      mode="aspectFill"
                      :src="`${staticUrl}reservation-service/address.png`"
                    />
                    {{ address(item) }}
                  </view>
                  <view class="phone">
                    <image
                      class="img"
                      type="image"
                      mode="aspectFill"
                      :src="`${staticUrl}reservation-service/phone.png`"
                    />
                    {{ item.tel || '--' }}
                  </view>
                </view>
              </template>
              <view v-else class="no-data">
                <image
                  class="img"
                  mode="aspectFit"
                  :src="`${staticUrl}img/empty/prize.png`"
                />
                <view class="text"> 暂无门店 </view>
              </view>
            </view>
            <view v-show="current === 2" class="serve-evaluate">
              <template v-if="evaluateList.length">
                <view class="serve-evaluate-top">
                  评价内容
                  <view class="more" @click="goEvaluate('')">
                    {{ whetherMoreThanOneHundred(detail.cmtCnt) }}条评价
                    <uni-icons type="arrowright" size="14" color="#B7B8C4" />
                  </view>
                </view>
                <view class="tag-view">
                  <view
                    :class="['tag', { isActive: tagActive === 'all' }]"
                    @click="handleChangeTag('all')"
                  >
                    全部
                  </view>
                  <view
                    :class="['tag', { isActive: tagActive === 'have' }]"
                    @click="handleChangeTag('have')"
                  >
                    有图{{ whetherMoreThanOneHundred(detail.cmtImgCnt) }}
                  </view>
                </view>
                <view class="evaluate-list">
                  <evaluateItem
                    v-for="item in evaluateList"
                    :key="item.id"
                    :info="item"
                  />
                </view>
              </template>
              <view v-else class="no-data">
                <image
                  class="img"
                  mode="aspectFit"
                  :src="`${staticUrl}img/empty/prize.png`"
                />
                <view class="text"> 暂无，期待您的评价 </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="footer">
        <view class="integral clM">
          <template v-if="detail.cost?.code === 'FREE'"> 免费预约 </template>
          <template v-else>
            {{ parseInt(detail.value) }}
            <text class="unit">
              {{ detail.acctName }}
            </text>
          </template>
        </view>

        <button
          :class="['btn', { isActive: detail.boolBookServ?.code === 'Y' }]"
          size="mini"
          @click="appointment"
        >
          立即预约
        </button>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import {
  getServDetails,
  queryCBookCommentPage,
  queryDistStoreBySrvIdList,
} from '@/api/reservation-service';
import { onLoad } from '@dcloudio/uni-app';
import { computed, Ref, ref } from 'vue';
import { mergeFullAddress } from '@/utils/util';
import { staticUrl } from '@/utils/config';
import evaluateItem from '../component/evaluate-item.vue';
import Tabs from '@/components/Tabs/index.vue';

const id = ref('');
const dist: Ref<any> = ref({});
const detail: Ref<any> = ref({});
const tabList: Ref<any[]> = ref([]);
const evaluateList: Ref<any[]> = ref([]);
const storeList: Ref<any[]> = ref([]);
const current = ref(0);
const tagActive = ref('all');
let coordCur = '';
const isAuthGetLocation = ref(true);
onLoad(({ id: i = '', distId, storeName }) => {
  id.value = i;
  dist.value['distId'] = distId;
  dist.value['storeName'] = storeName;
  queryServeDetail();
});
const richImage = (s: string) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  return s.replace(reg, '<img style="max-width: 100%;" src="$1" />');
};
const address = mergeFullAddress;
const cost = computed(() => {
  const { cost, value, acctName } = detail.value;
  if (!cost) return '';
  return cost.code === 'FREE' ? '免费预约' : parseInt(value) + acctName;
});

const showTotalBook = computed(() => {
  const { totalBook } = detail.value;
  return whetherMoreThanOneHundred(totalBook);
});
const whetherMoreThanOneHundred = (e: number | string) => {
  e = e.toString();
  if (parseInt(e) > 99) {
    return `${e[0].padEnd(e.length, '0')}+`;
  }
  return e;
};
const queryServeDetail = async () => {
  const { data } = await getServDetails({ id: id.value });
  detail.value = data;
  if (detail.value.boolShowAppraise.code === 'Y') {
    tabList.value = [
      { name: '服务介绍' },
      { name: '可预约门店' },
      { name: '服务评价' },
    ];
  } else {
    tabList.value = [{ name: '服务介绍' }, { name: '可预约门店' }];
  }
  queryEvaluateList();
};

const queryEvaluateList = async () => {
  const { data } = await queryCBookCommentPage({
    curPage: 1,
    pageSize: 20,
    id: detail.value.id,
    isHaveImg: '',
    sort: { sort: 'DESC' },
  });
  evaluateList.value = data.records.slice(0, 2);
};
const tabChange = (e: any) => {
  current.value = e.index;
  e.index === 1 &&
    uni.getLocation({
      type: 'wgs84',
      success: res => {
        coordCur = `${res.longitude},${res.latitude}`;
        queryStoreList();
        isAuthGetLocation.value = true;
      },
      fail: () => {
        queryStoreList();
        isAuthGetLocation.value = false;
      },
    });
};
const queryStoreList = async () => {
  const res = await queryDistStoreBySrvIdList({
    coordCur,
    id: detail.value.id,
  });
  storeList.value = res.data;
};

const goEvaluate = (val = 'all') => {
  uni.navigateTo({ url: `/reservation-service-pages/serveDetail/serveEvaluate?id=${detail.value.id}&isHaveImg=${val}` });
};
const handleChangeTag = (data: string) => {
  tagActive.value = data;
  goEvaluate(data);
};

const appointment = async () => {
  await queryServeDetail();
  const { boolBookServ, limitStatus, limitMsg, balance, value } = detail.value;
  if (
    boolBookServ.code === 'N' ||
    boolBookServ.code === 'Y' && limitStatus === 'Y'
  ) {
    setTimeout(() => {
      uni.showToast({
        title: limitMsg,
        icon: 'none',
        duration: 3000,
      });
    }, 500);
    return;
  }
  if (+balance < +value) {
    setTimeout(() => {
      uni.showToast({
        title: '积分账户余额不足',
        icon: 'none',
        duration: 3000,
      });
    }, 500);
    return;
  }
  const obj = {
    id: detail.value.id,
    boolShowGuide: detail.value.boolShowGuide.code,
    distId: dist.value.distId,
    storeName: dist.value.storeName,
    startTime: detail.value.allowBookingStartTime,
    endTime: detail.value.allowBookingEndTime,
    acctName: detail.value.acctName,
    value: detail.value.value,
    name: detail.value.name,
    imgUrl: detail.value.imgUrl,
    costCode: detail.value.cost.code,
    balance: detail.value.balance,
  };
  const str = Object.entries(obj)
    .reduce((p, [a, b]) => `${p}${a}=${b}&`, '');

  uni.navigateTo({ url: `/reservation-service-pages/appointmentAppointment/index?${str}` });
};
</script>

<style scoped lang="scss">
.bgW {
  background-color: white;
  border-bottom: 1px solid #ebedf0;
}
.serveDetail {
  height: 100vh;
  position: relative;
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  .wrapper {
    /*height: calc(100vh - 100rpx);*/
    height: 100%;
    overflow-y: auto;
    .top {
      margin: 30rpx;
      padding: 24rpx;
      background: #fff;
      border-radius: 16rpx;
      .top-main {
        display: flex;
        justify-content: space-between;
        .top-mian-left {
          display: flex;
          .img {
            width: 84rpx;
            height: 84rpx;
            border-radius: 16rpx;
            margin-right: 20rpx;
          }
          .info {
            .serve-name {
              font-size: 28rpx;
              font-weight: bold;
              color: #323338;
              margin-bottom: 10rpx;
            }
            .cost-text {
              font-size: 24rpx;
              color: var(--main-color);
            }
          }
        }
        .top-mian-right {
          .label {
            font-size: 24rpx;
            color: #9697a2;
            margin-bottom: 10rpx;
          }
          .num {
            font-size: 32rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #414141;
            text-align: center;
          }
        }
      }
      .tip {
        color: #b7b8c4;
        font-size: 24rpx;
        margin-top: 32rpx;
        .img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
          position: relative;
          top: 4rpx;
        }
      }
    }
    .detail {
      height: calc(100% - 260rpx);

      .main {
        min-height: calc(100% - 82rpx);
        background: #fff;
        padding: 30rpx;
        .store-list {
          .store-item {
            box-shadow: 0 0 16rpx 0 rgba(0, 0, 0, 0.06);
            border-radius: 16rpx;
            padding: 30rpx 24rpx;
            margin-bottom: 30rpx;
            .name {
              font-size: 28rpx;
              font-weight: 400;
              color: #323338;
              display: flex;
              justify-content: space-between;
              line-height: 40rpx;
              .hasDis {
                max-width: calc(100% - 160rpx);
              }
              .noDis {
                max-width: 100%;
              }
              .store-name {
                display: flex;
                align-items: center;

                .storeName {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  flex: 1;
                }
                .tag {
                  margin-left: 12rpx;
                  display: inline-block;
                  width: 66rpx;
                  height: 32rpx;
                  line-height: 32rpx;
                  text-align: center;
                  border-radius: 4rpx;
                  font-size: 20rpx;
                  color: #ffffff;
                  flex-shrink: 0;
                }
              }
              .distance {
                font-size: 24rpx;
                color: #9697a2;
                width: 160rpx;
                text-align: right;
              }
            }
            .addr,
            .phone {
              font-size: 24rpx;
              color: #9697a2;
              margin-top: 16rpx;
              .img {
                width: 28rpx;
                height: 28rpx;
                margin-right: 10rpx;
                margin-right: 10rpx;
                position: relative;
                top: 4rpx;
              }
            }
          }
        }
        .serve-introduce {
          font-size: 28rpx;
          color: #9697a2;
          line-height: 52rpx;
          /*text-align: justify;*/
          word-wrap: break-word;
        }
        .serve-evaluate {
          .serve-evaluate-top {
            font-size: 28rpx;
            font-weight: bold;
            color: #323338;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24rpx;
            .more {
              font-size: 24rpx;
              color: #9697a2;
              font-weight: normal;
            }
          }
          .tag-view {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30rpx;
            .tag {
              padding: 14rpx 24rpx;
              border-radius: 32rpx;
              border: 2rpx solid #ebedf0;
              margin-right: 20rpx;
              font-size: 24rpx;
              color: #323338;
              &.isActive {
                background-color: var(--main-color);
                border-color: var(--main-color);
                color: #fff;
              }
            }
          }
        }
        .no-data {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 100rpx;
          .img {
            width: 300rpx;
            height: 300rpx;
          }
          .text {
            width: 100vw;
            text-align: center;
            color: #b7b8c4;
          }
        }
      }
    }
  }
  .footer {
    box-sizing: border-box;
    position: fixed;
    width: 100vw;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*height: 168rpx;*/
    background: #fff;

    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
    padding: 10rpx 30rpx;
    padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
    .integral {
      font-size: 36rpx;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: bold;
      .unit {
        font-size: 24rpx;
        font-weight: normal;
        margin-left: 10rpx;
      }
    }
    .btn {
      width: 336rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      margin: 0;
      font-size: 28rpx;
      background: #adadad;
      color: white;
      &.isActive {
        background: var(--main-color);
      }
    }
  }
}
</style>
