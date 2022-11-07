<template>
  <view>
    <uni-popup ref="rulesRef" mode="center" class="guize">
      <view class="content">
        <view class="content-con">
          <view class="content-con-title">活动规则</view>
          <scroll-view
            @touchmove.stop.prevent="moveStop"
            scroll-y="true"
            class="prize"
          >
            <view class="prize-content">{{ data }}</view>
          </scroll-view>
          <image
            src="/static/img/home-close.png"
            @click="close"
            class="content-con-close"
            mode="widthFix"
          >
          </image>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts">
export default { name: '' };
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showRule: {
    type: Boolean,
    default: false,
  },
  data: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:showRule']);
const rulesRef = ref();
const close = () => {
  emits('update:showRule', false);
};
const moveStop = () => {
  //
};
watch(
  () => props.showRule,
  val => {
    if (val) {
      rulesRef.value.open();
    } else {
      rulesRef.value.close();
    }
  }
);
</script>
<style lang="scss" scoped>
:deep(.guize) {
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 28rpx;
    &-con {
      background-color: #fff;
      position: relative;
      width: 660rpx;
      border-radius: 32rpx;

      &-title {
        padding: 20rpx;
        color: #191919;
        font-size: 32rpx;
        font-weight: bold;
        text-align: center;
      }
      .prize {
        min-height: 100rpx;
        max-height: 600rpx;
        padding-bottom: 30rpx;
        &-content {
          padding: 0 30rpx 30rpx;
          white-space: pre-wrap;
        }
      }
      &-close {
        width: 60rpx;
        height: 60rpx;
        position: absolute;
        bottom: -120rpx;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
