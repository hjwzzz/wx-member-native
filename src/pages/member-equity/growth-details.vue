<template>
  <CustomPage>
    <view class="main-color"> ddddddddddddddddddddddddddddddd </view>
    <view
      class="growthDetails"
      :style="{ '--color': mainColor, '--transColor': transColor }"
    >
      <scroll-view
        class="wrapper"
        :scroll-y="true"
        :enable-back-to-top="true"
        @scrolltolower="scrolltolower"
      >
        <view class="content">
          <view class="top">
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
          </template>
          <view v-else class="no-data">
            <image class="img" src="../../../static/noIntegral.png" mode="" />
            <view class="tip"> 暂无成长值记录 </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from 'vue';
import { queryAllLevelRights } from '@/api/server';
import { useBasicsData } from '@/store/basicsData';
import CustomPage from '@/components/CustomPage/index.vue';
import { staticUrl } from '@/utils/config';

const initBasicsData = useBasicsData();
const mainColor = computed(() => initBasicsData.mainColor);

const benefitsData: Ref<any> = ref(null);
const curLevelId: Ref<any> = ref(null);
const currentBenefitsData: Ref<any> = ref(null);
const levelList: Ref<any> = ref(null);

const growth = ref(0);
const nextUpgradeGrowth = ref(0);
const currentIndex = ref(0);
const curLevelName = ref('');
const benefitsDataFlag = ref('nodata');

onMounted(() => {
  getAllBenefits();
});

const onChangeSwp = (e: any) => {
  currentIndex.value = e.detail.current;
  currentBenefitsData.value = levelList.value[e.detail.current];
};

// 处理富文本图片
const richImage = (item: any) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  let content = item.replace(reg, '<img style="max-width: 100%;" src="$1" />');
  const regP = /<p.*?>/g;
  content = item.replace(
    regP,
    '<p style="max-width: 100%;word-break:break-all;word-wrap:break-word"  >'
  );
  return content;
};

const getAllBenefits = async () => {
  // 获取会员权益数据
  const params = '';
  const res = await queryAllLevelRights(params);
  benefitsData.value = res.data;
  if (benefitsData.value) {
    curLevelId.value = benefitsData.value.curLevelId;
    curLevelName.value = benefitsData.value.curLevelName;
    growth.value = benefitsData.value.growth;
    nextUpgradeGrowth.value = benefitsData.value.nextUpgradeGrowth;
    levelList.value = benefitsData.value.levelList;

    let hasLevelPage = 0;

    levelList.value.forEach((item: any, index: number) => {
      if (curLevelId.value === item.levelId) {
        currentIndex.value = index;
      }
      if (item.levelId) {
        hasLevelPage++;
      }
    });

    if (hasLevelPage) {
      benefitsDataFlag.value = 'finish';
    } else {
      benefitsDataFlag.value = 'nodata';
    }

    currentBenefitsData.value = levelList.value[currentIndex.value];
  } else {
    benefitsDataFlag.value = 'nodata';
  }
};

const goGrowthDetails = () => {
  uni.navigateTo({ url: '/pages/member-equity/growthDetails' });
};

const currentStyle = computed(() => {
  if (currentBenefitsData.value) {
    const { fontColor, bgColor } = currentBenefitsData.value.style;
    return {
      fontColor,
      bgColor,
    };
  }
  return {
    fontColor: '#333',
    bgColor: '#FFF',
  };
});
</script>

<style lang="scss" scoped>
.main-color {
  color: var(--main-color);
}

.growthDetails {
  // height: 100vh;
  .wrapper {
    height: 100%;
    .content {
      min-height: calc(100% - 113rpx);
      padding: 30rpx 30rpx 0;
      .top {
        width: 100%;
        height: 234rpx;
        // background: url('/static/quality/integar-bg.png') var(--color) center
        //   center / 100% 100% no-repeat;
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
