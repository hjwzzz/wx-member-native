<template>
  <uni-popup ref="alertDialog" type="dialog">
    <view class="dialog-box">
      <view class="dialog-show">
        <image class="modelimg" :src="showImg"></image>
      </view>
      <view class="dialog-show dialog-text">{{ showText }}</view>
      <view class="dialog-box-btn">
        <view
          class="dialog-box-btn-text"
          v-if="props.type === 'success'"
          @click="onCancel"
        >
          继续领取
        </view>
        <view class="dialog-box-btn-text" @click="onConfirm">
          {{ props.type === 'success' ? '查看' : '关闭' }}
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { staticUrl } from '@/utils/config';
interface Props {
  type?: string;
  visible: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  visible: false,
});
const alertDialog: any = ref(null);
const showImg = computed(() => `${staticUrl}img/${props.type === 'success' ? 'chenggong' : 'jinggao'}.png`);
const showText = computed(() => {
  if (props.type === 'success') {
    return '领取成功';
  }
  if (props.type === 'invalid') {
    return '优惠券已失效';
  }
  if (props.type === 'over') {
    return '优惠券已被领完了';
  }
  if (props.type === 'self') {
    return '抱歉，您不可领取自己转赠的优惠券';
  }
  return '领取失败';
});

watch(
  () => props.visible,
  (bool: boolean) => {
    if (bool) {
      alertDialog.value.open();
    } else {
      alertDialog.value.close();
    }
  }
);

const emits = defineEmits(['cancel', 'ok']);

const onCancel = () => {
  alertDialog.value.close();
  emits('cancel');
};
const onConfirm = () => {
  alertDialog.value.close();
  emits('ok');
};
</script>

<style lang="scss" scoped>
.dialog-box {
  background-color: white;
  width: 600rpx;
  height: 382rpx;
  background: #ffffff;
  border-radius: 32rpx;
  overflow: hidden;

  .dialog-show {
    display: flex;
    justify-content: center;
  }

  .dialog-text {
    height: 90rpx;
    align-items: center;
  }
  .modelimg {
    width: 107rpx;
    height: 107rpx;
    margin-top: 70rpx;
  }
  .dialog-box-btn {
    margin-top: 14rpx;
    border-top: 1rpx solid #f8f7f7;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    color: #323338;

    .dialog-box-btn-text {
      line-height: 100rpx;
      width: 50%;
      text-align: center;
    }
    .dialog-box-btn-text:last-child {
      color: var(--main-color);
    }
    .dialog-box-btn-text:nth-child(2) {
      border-left: 1px solid #f8f7f7;
    }
  }
}
</style>
