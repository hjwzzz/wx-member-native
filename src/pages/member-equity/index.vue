<template>
  <CustomPage :backgroundColor="currentStyle.bgColor">
    <view class="benefits">
      <view
        class="containner"
        v-if="benefitsDataFlag === 'finish'"
        :style="{
          backgroundColor: currentStyle.bgColor,
          color: currentStyle.fontColor,
        }"
      >
        <view class="cont-inner">
          <view class="bf-swiper-wrap">
            <swiper
              class="swiper"
              :autoplay="false"
              :current="currentIndex"
              :circular="false"
              previous-margin="30rpx"
              next-margin="30rpx"
              @change="onChangeSwp"
            >
              <swiper-item v-for="(item, index) in levelList" :key="index">
                <view class="swiper-item">
                  <view
                    class="inner"
                    v-if="item.param"
                    :style="{
                      backgroundImage: 'url(' + item.param.bannerImageUrl + ')',
                    }"
                  >
                  </view>
                  <view
                    class="inner"
                    v-else
                    :style="{
                      backgroundImage: `url(${staticUrl}img/benifits_inni_banner.png)`,
                    }"
                  >
                    <view class="title">
                      {{ item.levelName }}
                    </view>
                    <view class="sub-title" v-if="item.curLeveled === 'Y'">
                      恭喜您已享有专属特权
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </view>

          <view class="bf-growth-value">
            <view class="">
              我的等级：<text class="numb" :style="{ color: mainColor }">{{
                curLevelName || '--'
              }}</text>
            </view>
            <view class="" @click="goGrowthDetails">
              成长值：
              <text
                class="numb"
                :style="{ color: mainColor }"
                v-if="levelList[0].curLeveled !== 'Y'"
              >
                {{ growth }}
              </text>
              距升级还差
              <text class="numb" :style="{ color: mainColor }">
                {{ nextUpgradeGrowth }} </text
              >成长值
            </view>
          </view>

          <view class="bf-legal-list">
            <view
              class="grid-item"
              v-if="
                currentBenefitsData.param &&
                currentBenefitsData.param.modualList.length
              "
            >
              <view
                class="grid-item-icon"
                v-for="(item, index) in currentBenefitsData.param.modualList"
                :key="index"
              >
                <view>
                  <view class="show-image">
                    <image class="image-icon" :src="item.icoUrl" />
                  </view>
                  <view class="grid-text">{{ item.name }}</view>
                </view>
              </view>
            </view>

            <view class="no-data-inner" v-else>
              <view v-if="!currentBenefitsData.description">
                <view class="icon">
                  <image
                    class="tip-image"
                    mode="aspectFill"
                    :src="staticUrl + 'img/noneStatus.png'"
                  ></image>
                </view>
                <text>暂无会员权益</text>
              </view>
            </view>
          </view>

          <view
            class="bf-explain"
            v-if="currentBenefitsData && currentBenefitsData.description"
          >
            <view class="title"> 权益说明 </view>
            <view v-html="richImage(currentBenefitsData.description)"></view>
          </view>
        </view>
      </view>

      <!-- 商家尚未开任何会员权益 -->
      <view class="bf-no-data" v-if="benefitsDataFlag === 'nodata'">
        <view class="inner">
          <view class="icon">
            <image
              class="tip-image"
              mode="aspectFill"
              :src="staticUrl + 'img/wukaidong.png'"
            ></image>
          </view>
          <text>抱歉！商家尚未开通会员权益 </text>
        </view>
      </view>
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
  uni.navigateTo({ url: '/pages/member-equity/growth-details' });
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
.benefits {
  .containner {
    position: relative;
    padding: 30rpx 0 0;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff9f1;
    .cont-inner {
      padding: 0 0 80rpx;
    }
  }
  .image-icon {
    width: 88rpx;
    height: 88rpx;
  }
  .grid-item {
    margin-top: 10rpx;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .grid-item-icon {
      display: flex;
      justify-content: center;
      width: 25vw;
      margin-top: 35rpx;
      margin-bottom: 35rpx;
      .show-image {
        display: flex;
        justify-content: center;
      }
    }
  }
  .tip-image {
    height: 320rpx;
    width: 320rpx;
  }
}
.swiper {
  .swiper-item {
    color: #fff;
    height: 100%;
    padding: 0 10rpx;
  }
  .inner {
    box-sizing: border-box;
    height: 100%;
    border-radius: 16rpx;
    padding: 30rpx;
    background-color: #d8d9e0;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    .title {
      font-size: 40rpx;
      font-weight: 800;
      color: #fff;
      margin-bottom: 10rpx;
    }
    .sub-title {
      font-size: 28rpx;
      font-weight: 400;
    }
  }
  .uni-bg-red {
    background: #ff0000;
  }
  .uni-bg-green {
    background: #4cd964;
  }
  .uni-bg-blue {
    background: #007aff;
  }
}
.bf-growth-value {
  padding: 20rpx 40rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #323338;
  .numb {
    font-size: 28rpx;
    font-weight: 800;
    color: #ff547b;
  }
}
.bf-legal-list {
  .grid-text {
    width: 20vw;
    text-align: center;
    font-size: 24rpx;
    margin-top: 14rpx;
    font-weight: 400;
    color: #323338;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.bf-explain {
  padding: 20rpx 40rpx 20rpx;
  .title {
    font-size: 32rpx;
    font-weight: 800;
    color: #323338;
    text-align: center;
    margin-bottom: 20rpx;
  }
  img {
    max-width: 100%;
  }
}
.no-data-inner {
  .icon {
    width: 320rpx;
    margin: 0 auto 20rpx;
  }
  text-align: center;
  font-size: 28rpx;
  font-weight: 400;
  color: #9697a2;
}
.bf-no-data {
  padding: 100rpx 0 0;
  .inner {
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #9697a2;
  }
  .icon {
    width: 320rpx;
    margin: 0 auto 20rpx;
  }
}
</style>
