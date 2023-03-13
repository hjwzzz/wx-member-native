<template>
  <view class="grid-list">
    <!--宫格-列表    GONGGE  LIST -->
    <view
      v-if="item.param.showType"
      :class="item.param.showType === 'LIST' ? 'wrapper-list' : 'wrapper-grid'"
    >
      <block v-for="(entry, index) in item.param.linkList" :key="index">
        <view
          class="list-item"
          @click="handleEntryUrl(entry)"
          v-if="entry.showed"
        >
          <view class="item-icon">
            <image
              class="image"
              :src="entry.icoUrl || `${staticUrl}img/item-avatar-default.png`"
              mode="aspectFit"
            />
            <view class="badge" v-if="showRedDot(item, entry, 'GONGGE')" />
          </view>
          <view class="item-name">
            {{ entry.title }}
            <view class="badge" v-if="showRedDot(item, entry, 'LIST')" />
          </view>
          <uni-icons
            v-if="item.param.showType == 'LIST'"
            type="arrowright"
            size="14"
            color="#B7B8C4"
          />
        </view>
      </block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
// import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
// import { onShow } from '@dcloudio/uni-app';
import { handleEntryUrl } from '@/utils/util';
const initBasicsData = useBasicsData();

interface Props {
  // title?: string;
  item?: any;
  // policyListNum?: number;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({}),
  // policyListNum: 0,
});
const emits = defineEmits(['showCode']);

const handleFixedSysUrl = () => {
  uni.navigateTo({ url: '/pages/member-equity/index' });
};

// 显示红点
const showRedDot = (item: any, entry: any, text: string) => {
  const code = ['sign', 'coupon'].includes(entry.code);
  const red = entry.showRedDot === 'Y';
  const showType = item.param.showType === text;
  return code && red && showType;
};

// const showCode = () => {

// };
// const policyList: any = reactive({ totalRecord: 0, records: [] });

// const toDetail = () => {
//   Router.goCodePage('warranty');
// };

// const getPolicyList = async () => {
//   if (!initBasicsData.checkLogin) {
//     return;
//   }
//   const res = await queryWarrantyListPageFront({
//     mid: initBasicsData.useMid,
//     curPage: 1,
//     pageSize: props.policyListNum,
//   });
//   if (res.code === 0 && res.data) {
//     Object.assign(policyList, res.data);
//   }
// };

// onShow(() => {
//   if (initBasicsData.checkLogin) {
//     getPolicyList();
//     return;
//   }
//   policyList.records = [];
//   policyList.totalRecord = 0;
// });
</script>

<style lang="scss" scoped>
.grid-list {
  padding: 20 30rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 30rpx;

  .wrapper-list {
    padding: 0rpx 30rpx;

    .list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: solid 1rpx #f8f8f8;
      // padding: 0 20rpx;
      .item-icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 30rpx;
        overflow: hidden;
        line-height: 48rpx;
        background: #fff;
        border-radius: 12rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        padding-right: 12rpx;
        font-size: 28rpx;
        .badge {
          width: 20rpx;
          height: 20rpx;
          background: #ff4c4c;
          border-radius: 16rpx;
        }
      }

      .more {
        width: 10rpx;
        color: #b7b8c4;
      }
    }

    .list-item:last-child {
      border-bottom: none;
    }
  }

  .wrapper-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 20rpx 0;

    .list-item {
      position: relative;
      display: inline-block;
      width: 25%;
      padding: 20rpx 0;
      text-align: center;

      .badge {
        position: absolute;
        top: 14rpx;
        right: 38rpx;
        z-index: 100;
        width: 20rpx;
        height: 20rpx;
        background: #ff4c4c;
        border-radius: 16rpx;
      }

      .item-icon {
        width: 88rpx;
        height: 88rpx;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 22rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        width: 100%;
        height: 34rpx;
        margin-top: 16rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
