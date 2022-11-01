<template>
  <CustomPage hide>
    <Tabs
      :tabList="tabList"
      v-model:current="currentIndex"
      @change="changeTabs"
      fixed
    />
    <scroll-view style="height: 100vh" scroll-y>
      <view class="coupon-list">
        <CouponItem
          v-for="(item, index) in couponListData"
          :item="item"
          :key="index"
          :showStatus="item.couponStatus === 'EFFECTIVE'"
          @event="onCouponDetail(item)"
        >
          <template #btn>
            <view @click.stop="">
              <button
                v-if="
                  item.couponStatus === 'EFFECTIVE' && item.present.code === 'Y'
                "
                class="share-btn"
                :style="{
                  color: item.style.topBgColorTop,
                  background: item.style.mainColor,
                }"
                open-type="share"
                :data-couponMemberId="item.couponMemberId"
                :data-donateId="initBasicsData.useMid"
                :data-couponName="item.couponName"
                :data-prodCode="item.prodCode.code"
                :data-discount="item.paramVo.discount"
                :data-randomAmount="item.memberCouponParam?.randomAmount"
              >
                转赠
              </button>
            </view>
          </template>
          <template #image>
            <image
              v-if="item.couponStatus === 'EXPIRED'"
              :src="staticUrl + 'img/overTime.png'"
              class="status-image"
              mode=""
            ></image>
            <image
              v-else-if="item.couponStatus === 'USED'"
              :src="staticUrl + 'img/over.png'"
              class="status-image"
              mode=""
            ></image>
          </template>
          <template #bottom-left>
            <text> 等后端处理 </text>
          </template>
          <template #bottom-rigth>
            <view class="arrow-right">
              <text> 详情 </text>
              <uni-icons type="arrowright" size="14" color="#B7B8C4" />
            </view>
          </template>
        </CouponItem>
        <!-- couponListData  loadingTop && !loadingTop-->
        <view v-if="couponListData.length == 0" class="preferential">
          <view>
            <view style="flex: 1" />
            <image
              class="image"
              :src="staticUrl + 'img/Salesperson.png'"
              mode=""
            />
            <view class="text"> 暂无优惠券 </view>
          </view>
        </view>
      </view>
      <ScrollViewFooter bottom />
    </scroll-view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { onShareAppMessage, onLoad } from '@dcloudio/uni-app';
import { onMounted, ref, Ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import Tabs from '@/components/Tabs/index.vue';
import { queryMyCouponList } from '@/api/coupon-center';
import CouponItem from '@/my-assets-pages/component/CouponItem/index.vue';
import ScrollViewFooter from '@/components/ScrollViewFooter/index.vue';
import { staticUrl } from '@/utils/config';
import { onShareCoupon } from '@/utils/util';
// import Storage from '@/utils/storage';
onLoad(() => {
  uni.hideShareMenu({ hideShareItems: ['shareAppMessage', 'shareTimeline'] });
});
const initBasicsData = useBasicsData();
const tabList = [
  { name: '待使用', status: 'EFFECTIVE' },
  { name: '已使用', status: 'USED' },
  { name: '已失效', status: 'EXPIRED' },
];
const currentIndex = ref(0);
const changeTabs = ({ item }: any) => {
  couponStatus.value = item.status;
  getCouponList();
};

onMounted(() => {
  getCouponList();
});
// 分享或者转赠优惠券
onShareAppMessage((res: any) => onShareCoupon(res));

const status = ref('');
const page = ref(1);
const pageSize = ref(10000);
const couponStatus = ref('EFFECTIVE');
const couponListData: Ref<any> = ref([]);

//  INEFFEC:待使用 EFFECTIVE:未使用 USING:使用中 USED:已使用 GIFTED:已赠送 INVALID:已失效 EXPIRED:已过期
// 我的优惠券列表
const getCouponList = async () => {
  if (!initBasicsData.checkLogin) {
    uni.redirectTo({ url: '/pages/login/index' });
    return;
  }
  const params = {
    curPage: page.value,
    mid: initBasicsData.useMid,
    couponStatus: couponStatus.value,
    pageSize: pageSize.value,
    sort: {
      field: '',
      sort: '',
    },
  };
  // this.loading = true;
  const res = await queryMyCouponList(params);
  if (res.code === 0 && res.data) {
    const { curPage, totalPage, records } = res.data;

    if (pageSize.value > totalPage) {
      status.value = 'nomore';
    }

    if (curPage) {
      couponListData.value = records;
    } else {
      // couponListData.value = [...couponListData.value, ...records];
      couponListData.value.push(...records);
    }
  }

  // console.log('res', res);
  // if (res.code === 0) {
  //   if (this.page === 1) this.listData = [];
  //   const resData = res.data;
  //   this.totalPage = resData.totalPage;
  //   this.listData = this.listData.concat(resData.records);
  //   this.listData.forEach(item => {
  //     item.willEnd = false;
  //     item.countdown = '';
  //   });
  //   if (this.page >= this.totalPage) this.status = 'nomore';
  //   else this.status = 'loading';

  // }
  // this.loading = false;
  // this.loadingTop = false;
};

const onCouponDetail = (item: any) => {
  uni.setStorageSync('ticketInfo', item);
  uni.navigateTo({ url: '/my-assets-pages/my-coupon/detail' });
};
</script>

<style lang="scss" scoped>
.coupon-list {
  min-height: calc(100vh - 334rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 334rpx - env(safe-area-inset-bottom));
  padding-top: 125rpx;
  padding-bottom: 60rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  .status-image {
    width: 116rpx;
    height: 96rpx;
  }

  .share-btn {
    font-size: 24rpx;
    padding: 0 30rpx;
    line-height: 48rpx;
    font-weight: 400;
    height: 48rpx;
    background: #ffffff;
    border-radius: 28rpx;

    &::after {
      border: none;
    }
  }
  .arrow-right {
    display: flex;
    align-items: center;
    color: #b7b8c4;
  }

  .preferential {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20vh;
    text-align: center;
    .image {
      width: 320rpx;
      height: 320rpx;
    }

    .text {
      font-size: 28rpx;
      color: #9697a2;
    }
  }
}
</style>
