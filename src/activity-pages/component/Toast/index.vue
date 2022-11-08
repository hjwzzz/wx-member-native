<template>
  <uni-popup
    ref="toastRef"
    :animation="false"
    :is-mask-click="false"
    mask-background-color="rgba(0,0,0,0)"
  >
    <view class="toast-box">{{ message }}</view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:visible']);

const toastRef = ref();
watch(
  () => props.visible,
  val => {
    if (val) {
      toastRef.value.open();
      setTimeout(() => {
        toastRef.value.close();
        emits('update:visible', false);
      }, 3000);
      //
    }
  }
);
</script>
<style lang="scss" scoped>
.toast-box {
  padding: 10rpx 20rpx;
  min-width: 150rpx;
  max-width: 400rpx;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  border-radius: 12rpx;
  background-color: rgba(24, 24, 24, 0.95);
}
</style>
