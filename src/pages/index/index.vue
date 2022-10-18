<template>
  <CustomPage :bottom="true">
    <view class="tab-page">
      <!-- 首页轮播图 -->
      <view
        class="banner-show-background"
        :style="{
          marginBottom: dataList.bannerList?.length > 0 ? '54rpx' : '30rpx',
        }"
      >
        <view
          class="back-img"
          :style="{
            background: topBgImageUrl,
          }"
        >
        </view>
      </view>

      <view class="customer-diy">
        <block
          v-for="(items, index) in dataList.wmMainRspVo?.panelList"
          :key="index"
        >
          <!-- 提示 -->
          <view class="bulletin" v-if="items.kind === 'NOTICE'">
            <view class="bulletin-box">
              <text
                :style="{ color: mainColor }"
                class="iconfont icon-gonggao icon-text"
              >
              </text>
              <text class="bulletin-text">{{ items.param.title }}</text>
            </view>
            <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
          </view>
          <!-- 广告图 -->
          <view
            class="ad-banner-list"
            v-else-if="items.kind === 'BANNER' && adBannerList.length"
          >
            <swiper
              style="height: 180rpx"
              class="banner"
              :indicator-dots="adBannerList.length > 1"
              indicator-color
              indicator-active-color="#FF547B"
              autoplay
            >
              <block v-for="(item, index) in adBannerList" :key="index">
                <swiper-item>
                  <image
                    class=""
                    style="height: 180rpx"
                    :src="item.image"
                    mode="aspectFill"
                  ></image>
                </swiper-item>
              </block>
            </swiper>
          </view>
          <!-- 快捷导航 -->
          <view
            class="quick-nav"
            v-else-if="items.kind === 'QUICK_NAV' && swiperVav.length"
          >
            <swiper
              :style="{ height: swiperVavHeight + 'rpx' }"
              class=""
              :indicator-dots="swiperVav.length > 1"
              indicator-color
              indicator-active-color="#FF547B"
            >
              <swiper-item v-for="(navs, index) in swiperVav" :key="index">
                <view
                  class="item-shop"
                  v-for="(item, index) in navs"
                  :key="index"
                >
                  <view class="item-header">
                    <image :src="item.icoUrl" mode=""></image>
                  </view>
                  <view class="item-text">{{ item.title }}</view>
                </view>
              </swiper-item>
            </swiper>
          </view>
          <!-- 富文本 -->
          <view class="des-html" v-else-if="items.kind === 'RICH_TEXT'">
            <view
              v-if="items.param.content"
              v-html="richImage(items.param.content)"
            >
            </view>
            <NoneData v-else> </NoneData>
          </view>
          <!-- 今日金价 -->
          <TodayGoldPrice
            v-else-if="items.kind === 'GOLD_PRICE'"
            :showed="todayGoldPriceShowed"
            :goldPrice="goldPrice"
            :title="items.param.title"
          ></TodayGoldPrice>
          <!-- 积分商城推荐  -->
          <ContentMall
            v-else-if="items.kind === 'REC_GIFTS'"
            :title="items.param.title"
          ></ContentMall>
        </block>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, computed } from 'vue';
import { queryGoldPriceByPage } from '@/api/server';
import { wxmemberIndex, getIndexAdBannerList } from '@/api/index';
import { useBasicsData } from '@/store/basicsData';
import CustomPage from '@/components/CustomPage/index.vue';
import NoneData from '../component/NoneData.vue';
import TodayGoldPrice from '../component/TodayGoldPrice.vue';
import ContentMall from '../component/ContentMall.vue';

const initBasicsData = useBasicsData();
const mainColor = initBasicsData.mainColor;

onMounted(() => {
  getPageDate();
  getAdBannerList();
  getGoldPriceByPage();
});

const bannerList: Ref<any> = ref([]);
const swiperVav: Ref<any> = ref([]);
const swiperVavHeight = ref(196);
const dataList: Ref<any> = ref({});
const adBannerList: Ref<any> = ref([]);
const goldPrice: Ref<any> = ref([]);
const todayGoldPriceShowed = ref(false);
// 页面数据
const getPageDate = async () => {
  const result = await wxmemberIndex('');
  const banner = result.data?.bannerList || [];

  dataList.value = result.data;
  bannerList.value = banner;

  // console.log('bannerList', bannerList.value);
  // console.log(result);
  uni.setNavigationBarTitle({
    // 设置顶部bar的标题
    title: result.data.wmMainRspVo?.param?.title,
  });

  getPanelList();
};
// QUICK_NAV
const getPanelList = () => {
  const panelList = dataList.value.wmMainRspVo?.panelList;
  if (panelList) {
    const quickNav: any = panelList.filter((p: any) => p.kind === 'QUICK_NAV');
    const linkList = quickNav[0].param.linkList;
    const swiperVavList: any = [];
    for (let i = 0; i < linkList.length; i += 8) {
      swiperVavList.push(linkList.slice(i, i + 8));
    }
    if (swiperVavList.length) {
      const len = swiperVavList[0]?.length;
      const num = Number(String(len / 4)
        .split('.')[0]) + 1 || 0;
      const height = (len % 4 === 0 ? len / 4 : num) * 196;
      swiperVavHeight.value = height;
    }
    swiperVav.value = swiperVavList;
  }
};
// 获取广告
const getAdBannerList = async () => {
  const result = await getIndexAdBannerList('');
  if (result?.data && result?.data.length) {
    const list =
      result?.data.map((item: any) => ({
        image: item.imgUrl,
        title: item.title,
        url: item.url,
      })) || [];
    // console.log('list', adBannerList.value);
    adBannerList.value = list;
  }
};

// 获取今日金价
const getGoldPriceByPage = async () => {
  if (!initBasicsData.checkLogin) {
    return;
  }
  const res = await queryGoldPriceByPage('WM_HOME');
  if (res.code === 0 && res.data) {
    const { branPriceList, param, uiParam: todayGoldPrice } = res.data;
    // this.uiParam = uiParam;
    const { showNum } = param;
    const result: any = [];

    branPriceList.map((item: unknown, index: number) => {
      if (index < showNum) {
        result.push(item);
      }
    });

    todayGoldPriceShowed.value = todayGoldPrice;
    goldPrice.value = result;
    // console.log('goldPrice', result);
  }
};

const richImage = (item: string) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  const content = item.replace(
    reg,
    '<img style="max-width: 100%;" src="$1" />'
  );
  return content;
};

const topBgImageUrl = computed(() => {
  const imageUrl = dataList.value.wmMainRspVo?.param?.topBgImageUrl;
  if (imageUrl) {
    return `url(${imageUrl}) center top / 100% auto no-repeat`;
  }
  return 'linear-gradient(121deg, #fff0eb 0%, #dce2fb 100%)';
});
</script>

<style lang="scss" scoped>
.tab-page {
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
}

.tab-page {
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}

.banner-show-background {
  position: relative;
  height: 306rpx;

  .back-img {
    width: 750rpx;
    height: 256rpx;
  }

  .banner {
    position: absolute;
    top: 30rpx;
    left: 30rpx;
    width: 690rpx;
    height: 300rpx;
    border-radius: 16rpx;

    image {
      width: 100%;
      border-radius: 10rpx;
    }
  }
}

.customer-diy {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 60rpx);
  // margin: 0 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;

  .iconfont {
    margin-right: 10px;
    font-size: 16px;
  }

  .ad-banner-list {
    width: 100%;
    height: 180rpx;
    margin-bottom: 30rpx;
    background-color: #323338;
    border-radius: 16rpx;

    image {
      width: 100%;
      border-radius: 10rpx;
    }

    swiper-item {
      overflow: hidden;
      border-radius: 10rpx;
    }
  }

  .quick-nav {
    // width: 100%;
    padding: 50rpx 20rpx 20rpx;
    margin-bottom: 30rpx;
    background: #fff;
    border-radius: 16rpx;

    .item-shop {
      display: inline-block;
      width: 162rpx;
      margin-bottom: 30rpx;
      text-align: center;
    }

    .item-header {
      display: inline-block;
      width: 88rpx;
      height: 88rpx;
      border-radius: 22rpx;
    }

    .item-header image {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .item-text {
      height: 34rpx;
      margin-top: 16rpx;
      margin-bottom: 25rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      color: #323338;
    }

    swiper-item {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .des-html {
    width: 630rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #646771;
    background: #fff;
    border-radius: 16rpx;
  }

  .des-html img {
    width: 50%;
  }
}

.bulletin {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 72rpx;
  margin-bottom: 30rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 72rpx;
  color: #323338;
  background: #fff;
  border-radius: 16rpx;
}

.bulletin-box {
  width: 550rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bulletin-text {
  font-size: 24rpx;
  color: #323338;
}
</style>
