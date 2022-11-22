<template>
  <button
    open-type="chooseAvatar"
    @click="openAvatar"
    @chooseavatar="chooseavatar"
    class="btn-view inpu-item"
    :disabled="props.disabled"
  >
    <slot>
      <view class="input-left">
        <text v-show="props.required === 'Y'" class="input-icon">*</text>
        <text class="input-name">{{ props.name }}</text>
      </view>
      <image
        class="user-avatar"
        v-if="props.modelValue"
        :src="props.modelValue"
        mode="scaleToFill"
      />
      <view v-else class="input-right">
        {{ props.modelValue ? '' : '请选择头像' }}
      </view>
      <uni-icons class="pR30" type="arrowright" size="14" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { imgUrl } from '@/utils/config';

const props = defineProps({
  required: { type: String, default: 'N' },
  disabled: { type: Boolean },
  name: {
    type: String,
    default: '个人头像',
  },
  modelValue: { type: String },
});
const emit = defineEmits(['update:modelValue']);

// 头像填充
const chooseavatar = (e: any) => upImg(e.detail.avatarUrl);
// 低版本使用图片上传
const openAvatar = async () => {
  if (uni.canIUse('button.open-type.chooseAvatar')) return;
  const { tempFiles: [val] }: any = await uni.chooseImage({
    count: 1,
    sizeType: 'compressed',
  });

  const size = Math.floor(val.size / 1024 / 1024 * 100) / 100;
  let compressValue = val.path;
  if (size > 1) {
    const { tempFilePath }: any = await uni.compressImage({
      src: val.path,
      quality: 40,
    });
    compressValue = tempFilePath;
  }
  upImg(compressValue);
};

const upImg = (url: any) => {
  uni.uploadFile({
    url: `${imgUrl}/upload/uploadImageFile`,
    filePath: url,
    name: 'file',
    formData: { user: 'test' },
    header: {
      category: 'COMM',
      epid: uni.getStorageSync('epid'),
      token: uni.getStorageSync('token'),
    },
    success: uploadFileRes => {
      const upload = JSON.parse(uploadFileRes.data);
      emit('update:modelValue', upload.data.fullPathUrl);
    },
  });
};
</script>

<style lang="scss" scoped>
.inpu-item {
  display: flex;
  width: 100%;
  height: 80rpx;
  padding: 0rpx !important;
  position: relative;
  align-items: center;
  font-size: 28rpx;
  text-align: left;
  background-color: #fff;
  &::after {
    border: none;
    border-color: none;
  }
  &[disabled]:not([type]) {
    background-color: white;
  }
  .input-icon {
    font-size: 28rpx;
    font-weight: 400;
    color: #fa5252;
    margin-right: 6rpx;
  }

  .input-name {
    font-size: 28rpx;
    font-weight: 400;
    color: #323338;
  }

  .input-left {
    flex: 1;
    overflow: hidden;
    padding-left: 30rpx;
  }

  .input-right {
    color: #808080;
    font-size: 28rpx;
  }
  .pR30 {
    padding-right: 30rpx;
  }
}
.user-avatar {
  width: 60rpx;
  height: 60rpx;
  margin-right: 10rpx;
  border-radius: 50%;
}
</style>
