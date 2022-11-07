<template>
  <uni-popup
    ref="popupRef"
    class="auth-popup"
    v-model="visible"
    border-radius="20"
    :safe-area-inset-bottom="true"
  >
    <view class="auth-body">
      <image
        class="auth-banner"
        src="https://static.jqzplat.com/popularity/authorize.png"
        mode="widthFix"
      ></image>
      <view class="auth-tip"> 授权登录后可查看更多活动信息 </view>
      <view class="auth-btns">
        <button class="auth-btn cancel" @click="onCancel">取消</button>
        <button class="auth-btn submit" @click="onSubmit">授权登录</button>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['onSubmit', 'onChange']);

const popupRef = ref();
const visible = ref(false);
watch(
  () => props.show,
  val => {
    visible.value = val;
    if (val) {
      popupRef.value.open();
    } else {
      popupRef.value.close();
    }
  }
);
watch(
  () => visible.value,
  val => {
    emits('onChange', val);
  }
);
const onCancel = () => {
  visible.value = false;
};
const onSubmit = () => {
  onCancel();
  emits('onSubmit', true);
};
</script>
<style lang="scss" scoped>
.auth-popup {
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  .auth-body {
    border-radius: 20rpx;
    background-color: #fff;
    overflow: hidden;
  }
  .auth-banner {
    display: block;
    width: 640rpx;
  }
  .auth-tip {
    margin: 60rpx 0;
    color: #666;
    text-align: center;
  }
  .auth-btns {
    display: flex;
    padding: 0 30rpx 30rpx;
  }
  .auth-btn {
    flex: 1;
    display: flex;
    height: 88rpx;
    align-items: center;
    // font-weight: bold;
    justify-content: center;
    border-radius: 44rpx;
    background-color: transparent;
    &.cancel {
      color: #fc4c39;
      border: 2rpx solid #fc4c39;
    }
    &.submit {
      color: #ffe898;
      background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
    }
    & + .auth-btn {
      margin-left: 20rpx;
    }
  }
}
</style>
