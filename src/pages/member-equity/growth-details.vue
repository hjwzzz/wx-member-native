<template>
  <CustomPage>
    <view class="growthDetails" :style="{ '--transColor': transColor }">
      <scroll-view
        class="wrapper"
        :scroll-y="true"
        :enable-back-to-top="true"
        @scrolltolower="scrolltolower"
      >
        <view class="content">
          <view class="content-top" :style="{ background: backgroundStyle }">
            <view class="box">
              <view class="title"> 我的成长值 </view>
              <view class="num">
                {{ growth }}
              </view>
            </view>
          </view>
          <template v-if="true">
            <view class="record-list">
              <view
                v-for="item in growthList"
                :key="item.id"
                class="record-item"
              >
                <view class="left">
                  <view class="source">
                    {{ item.remark }}
                  </view>
                  <view class="time">
                    {{ item.createTime }}
                  </view>
                </view>
                <view
                  class="num"
                  :class="{ expenditure: item.opKind.code === 'SUB' }"
                >
                  {{
                    item.opKind.code === 'ADD'
                      ? `+${item.realValue}`
                      : item.realValue
                  }}
                </view>
              </view>
            </view>

            <!-- <u-loadmore
              :status="status"
              :icon-type="iconType"
              :load-text="loadText"
              :font-size="24"
              margin-top="30"
              color="#D8D9E0"
            /> -->
            <uni-load-more :status="status" color="#D8D9E0"></uni-load-more>
          </template>
          <view v-else class="no-data">
            <image
              class="img"
              :src="staticUrl + 'img/noIntegral.png'"
              mode=""
            />
            <view class="tip"> 暂无成长值记录 </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { queryGrowthCount, queryMemberGrowthHistoryPage } from '@/api/center';
import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';

const initBasicsData = useBasicsData();

const backgroundStyle = `url('${staticUrl}quality/integar-bg.png') var(--main-color) center center / 100% 100% no-repeat`;

const growth = ref(0);
const total = ref(0);
const curPage = ref(1);
const status = ref('loading');
const transColor = ref('');
const growthList: Ref<any> = ref([]);

// 将hex颜色转成rgb
const hexToRgba = (hex: string, opacity: number) => `rgba(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(`0x${hex.slice(3, 5)}`)},${parseInt(`0x${hex.slice(5, 7)}`)}, ${opacity})`;

const getGrowthCount = async () => {
  const res = await queryGrowthCount(initBasicsData.useMid);
  growth.value = res.data.growth || 0;
};
//
const queryGrowthHistoryList = async () => {
  const res = await queryMemberGrowthHistoryPage({
    curPage: curPage.value,
    pageSize: 50,
    mid: initBasicsData.useMid,
  });
  growthList.value = res.data.records;
  total.value = res.data.totalRecord;
  status.value = growthList.value.length < total.value ? 'more' : 'no-more';
};

const scrolltolower = () => {
  if (status.value === 'no-more') {
    return;
  }
  curPage.value++;
  queryGrowthHistoryList();
};

onMounted(() => {
  transColor.value = hexToRgba(initBasicsData.mainColor, 0.2);
  getGrowthCount();
  queryGrowthHistoryList();
});
</script>

<style lang="scss" scoped>
.growthDetails {
  // height: 100vh;
  .wrapper {
    height: 100%;
    .content {
      min-height: calc(100% - 113rpx);
      padding: 30rpx 30rpx 0;
      .content-top {
        width: 100%;
        height: 234rpx;

        box-shadow: 0 16rpx 30rpx 0 var(--transColor);
        border-radius: 20rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30rpx;
        .box {
          display: inline-block;
          text-align: center;
          .title {
            font-size: 24rpx;
          }
          .num {
            font-size: 72rpx;
            font-family: PingFang-SC-Heavy, PingFang-SC;
            font-weight: 800;
            color: #ffffff;
          }
        }
      }
      .record-list {
        min-height: calc(100vh - 474rpx);
        background: #fff;
        border-radius: 16rpx;
        .record-item + .record-item {
          border-top: 2rpx solid #ebedf0;
        }
        .record-item {
          padding: 24rpx 30rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .source {
            font-size: 28rpx;
            color: #323338;
          }
          .time {
            font-size: 24rpx;
            color: #b7b8c4;
            margin-top: 8rpx;
          }
          .num {
            font-size: 28rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #323338;
          }
          .expenditure {
            /*color: var(--color);*/
            color: #fa5252;
          }
        }
      }
      .no-data {
        height: calc(100vh - 406rpx);
        background: #fff;
        text-align: center;
        padding-top: 100rpx;
        .img {
          width: 320rpx;
          height: 320rpx;
        }
        .tip {
          margin-top: 40rpx;
          font-size: 28rpx;
          color: #9697a2;
        }
      }
    }
  }
}
</style>
