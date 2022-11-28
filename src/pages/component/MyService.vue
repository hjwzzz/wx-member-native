<template>
  <view class="grid-serve">
    <view class="header">
      <view class="left">
        <text class="title">{{ props.title }}</text>
      </view>
      <view class="right" @click="handleSysUrl">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>
    <view class="content">
      <view
        class="grid-serve-item"
        v-for="(serve, index) in props.srvProList"
        :key="index"
        @click="handleDetailUrl(serve)"
      >
        <image class="grid-serve-item-img" :src="serve.imgUrl" alt="" />
        <view class="grid-serve-item-wrapper">
          <view class="grid-serve-item-wrapper-name">{{ serve.name }}</view>
          <view class="grid-serve-item-wrapper-btn">
            {{
              !serve.acctId ? '免费' : parseInt(serve.value) + serve.acctName
            }}
          </view>
          <uni-icons
            class="icon"
            type="arrowright"
            size="18"
            color="#b7b8c4"
          ></uni-icons>
        </view>
      </view>
      <NoneData v-if="props.srvProList.length === 0" />
    </view>
  </view>
</template>

<script setup lang="ts">
// import { Ref, inject } from 'vue';
// import { queryServiceBookPageFront } from '@/api/reservation-service';
// import { useBasicsData } from '@/store/basicsData';
import NoneData from './NoneData.vue';
import Router from '@/utils/router';
// import { debounce } from '@/utils/util';

// const initBasicsData = useBasicsData();

interface Props {
  title?: string;
  item?: any;
  // srvProshowNum?: number;
  srvProList: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '预约服务',
  item: () => ({}),
  srvProList: () => ({}),
  // srvProshowNum: 0,
});

// const srvProList: Ref<any> = ref([]);
// const getMemberRecommend = async () => {
//   if (initBasicsData.checkLogin) {
//     const servPage = await queryServiceBookPageFront({
//       mid: initBasicsData.useMid,
//       curPage: 1,
//       pageSize: props.srvProshowNum,
//       status: '',
//     });
//     srvProList.value = servPage.data?.records || [];
//   }
// };
const handleSysUrl = () => {
  Router.goCodePage('my_reservation_detail');
};
const handleDetailUrl = ({ id }: any) => {
  Router.goCodePage('reservation_detail', `?id=${id}`);
};

// const refreshState = inject('reState') as Ref<boolean>;

// const initInfo = debounce(() => {
//   if (initBasicsData.checkLogin) {
//     getMemberRecommend();
//   } else {
//     srvProList.value = [];
//   }
// }, 1000);
// srvProshowNum有值再去请求
// watch(
//   () => props.srvProshowNum,
//   () => {
//     initInfo();
//   },
//   { immediate: true }
// );
// 刷新
// watch(refreshState, () => {
//   initInfo();
// });
// 登录请求-刷新
// watch(
//   () => initBasicsData.checkLogin,
//   () => initInfo()
// );
</script>

<style lang="scss" scoped>
.grid-serve {
  // width: 690rpx;
  min-height: 180rpx;
  padding: 30rpx;
  margin: 30rpx 0rpx;
  background: #fff;
  border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      .title {
        width: 160rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }

      .number {
        width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        line-height: 40rpx;
        color: #ff547b;
      }
    }

    .right {
      .more {
        width: 48rpx;
        height: 34rpx;
        margin-right: 2rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }

      .icon {
        width: 10rpx;
        height: 18rpx;
        color: #b7b8c4;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    .grid-serve-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40rpx;

      /* padding: 0 20px; */
      font-size: 28rpx;
      border-radius: 10rpx;

      &-img {
        width: 84rpx;
        height: 84rpx;
        background: #eee;
        border-radius: 16rpx;
      }

      &-wrapper {
        position: relative;
        width: calc(100% - 52px);

        &-name {
          font-size: 28rpx;
        }

        &-btn {
          font-size: 24rpx;
          color: var(--main-color);
        }

        .icon {
          position: absolute;
          top: 16rpx;
          right: 0;
        }
      }
    }
  }
}
</style>
