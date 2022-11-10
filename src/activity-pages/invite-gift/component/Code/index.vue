<template>
  <uni-popup ref="guizeRef" class="guize" @click="close">
    <view class="content">
      <view class="content-con">
        <image
          :src="
            code ||
            'https://static.jqzplat.com/img/2d3238eb-f694-4461-935d-997093358f34.png'
          "
          @click="close"
          class="content-con-code"
          mode="widthFix"
        />
        <view class="content-con-title">使用微信扫一扫</view>
        <image
          :src="staticUrl + 'img/home-close.png'"
          @click="close"
          class="content-con-close"
          mode="widthFix"
        >
        </image>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { staticUrl } from '@/utils/config';

const props = defineProps({
  showCode: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:showCode']);

const guizeRef = ref();
const close = () => {
  emits('update:showCode', false);
};
watch(
  () => props.showCode,
  val => {
    if (val) {
      guizeRef.value.open();
    } else {
      guizeRef.value.close();
    }
  }
);
</script>
<style lang="scss">
.guize {
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    &-con {
      background-color: #fff;
      position: relative;
      width: 440rpx;
      border-radius: 32rpx;
      text-align: center;
      padding: 40rpx;
      box-sizing: border-box;

      &-title {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4c4c4c;
        text-align: center;
      }
      &-code {
        width: 360rpx;
        margin-bottom: 20rpx;
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
