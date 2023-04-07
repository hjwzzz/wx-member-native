<template>
  <view class="grid-list" :style="props.items?.param?.doOut?.style">
    <view
      :class="
        props.items.param.doOut.fixedStyle === 3
          ? 'wrapper-list'
          : 'wrapper-grid'
      "
    >
      <block
        v-for="(entry, index) in props.items?.param?.linkList"
        :key="index"
      >
        <view
          class="list-item"
          @click="handleEntryUrl(entry)"
          v-if="entry.showed"
        >
          <!-- class="item-icon" -->
          <view :class="showClass">
            <image
              class="image"
              :src="entry.icoUrl || `${staticUrl}img/item-avatar-default.png`"
              mode="aspectFit"
            />
            <view
              class="badge"
              v-if="
                showRedDot(entry) && props.items.param.doOut.fixedStyle === 2
              "
            />
          </view>
          <view
            class="item-name"
            :style="{
              color: props.items?.param?.doOut?.special?.color,
            }"
          >
            {{ entry.title }}
            <view
              class="badge"
              v-if="
                showRedDot(entry) && props.items.param.doOut.fixedStyle === 3
              "
            />
          </view>

          <!--   v-if="item.param.showType == 'LIST'"   props.items.param.doOut.fixedStyle === 3-->
          <uni-icons
            v-if="props.items.param.doOut.fixedStyle === 3"
            type="arrowright"
            size="14"
            :color="props.items?.param?.doOut?.special?.color || '#B7B8C4'"
          />
        </view>
      </block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
// import { useBasicsData } from '@/store/basicsData';
// import Router from '@/utils/router';
// import { onShow } from '@dcloudio/uni-app';
import { handleEntryUrl } from '@/utils/util';
// const initBasicsData = useBasicsData();

interface Props {
  // title?: string;
  items?: any;
  // policyListNum?: number;
}
const props = withDefaults(defineProps<Props>(), {
  items: () => ({}),
  // policyListNum: 0,
});
//
// :class="showSize === 0 ? 'item-header-s' : ' item-header'"
// const showSize = computed(() => props.items?.param?.doOut?.special?.size || 0);
//  props.items.param.doOut.fixedStyle === 3
// ? 'wrapper-list'
//           : 'wrapper-grid'

// props.items?.param?.doOut?.special?.size || 0
const showClass = computed(() => {
  if (props.items.param.doOut.fixedStyle === 3) {
    return 'item-icon';
  }
  const showSize = props.items?.param?.doOut?.special?.size || 0;
  return showSize === 0 ? 'item-icon-s' : 'item-icon';
});

// const emits = defineEmits(['showCode']);

// const handleFixedSysUrl = () => {
//   uni.navigateTo({ url: '/pages/member-equity/index' });
// };
// 显示红点
const showRedDot = (entry: any) => {
  const code = ['sign', 'coupon'].includes(entry.code);
  const red = entry.showRedDot === 'Y';
  // const showType = item.param.showType === text;
  return code && red;
};
</script>

<style lang="scss" scoped>
.grid-list {
  padding: 20 30rpx;
  overflow: hidden;
  // background: #fff;
  // border-radius: 16rpx;
  // margin-bottom: 30rpx;

  .wrapper-list {
    padding: 0rpx 30rpx;

    .list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: solid 1rpx rgba(255, 255, 255, 0.3);
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

      .item-icon-s {
        width: 48rpx;
        height: 48rpx;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 12rpx;

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
