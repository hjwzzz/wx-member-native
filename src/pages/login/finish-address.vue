<template>
  <CustomPage>
    <view class="address">
      <view class="content">
        <view class="header">
          <view class="left">地址</view>
          <view class="right">
            <view class="right-text">
              <picker mode="region" @change="bindPickerChange" :value="index">
                <view class="uni-input">{{ index.filter(item => !!item).join('/') || '请选择' }}</view>
              </picker>
            </view>
            <uni-icons type="arrowright" size="14"></uni-icons>
          </view>
        </view>
        <view class="detail">
          <view class="detail-wrapper">
            <view class="title">详细地址</view>
            <textarea
              class="address-detail"
              focus="true"
              maxlength="50"
              disable-default-padding="true"
              placeholder-style="color: #D8D9E0;"
              v-model="detail"
            />
          </view>
        </view>
      </view>
      <view style="margin-bottom: 20rpx">
        <view class="submit" @click="handleSaveAddress">
          <text>确定</text>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, unref } from 'vue';

onLoad((e: any) => {
  detail.value = e.address;
  index.value = e.area.split(',');
});
const index = ref([]);
const detail = ref('');
const bindPickerChange = (e: any) => index.value = e.target.value;
const handleSaveAddress = () => {
  const [province, city, district] = index.value;
  uni.$emit('chooseAddress', {
    address: unref(detail),
    province,
    city,
    district,
  });
  uni.navigateBack();
};
</script>

<style scoped lang="scss">
.address {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    width: 690rpx;
    min-height: 330rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin: 30rpx;
    overflow: hidden;

    .header {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 1px solid #ebedf0;

      .left {
        width: 56rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
        line-height: 40rpx;
      }

      .right {
        display: flex;
        align-items: center;

        .right-text {
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #9697a2;
          line-height: 40rpx;
          margin-right: 16rpx;
          max-width: 510rpx;
          overflow: hidden;

          .uni-input {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
    }

    .detail {
      width: 100%;
      display: flex;
      padding: 30rpx;

      .detail-wrapper {
        display: flex;
        align-items: flex-start;

        .title {
          width: 112rpx;
          height: 40rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          margin-right: 20rpx;
        }

        .address-detail {
          width: 460rpx;
          line-height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          padding-top: 5rpx;
        }
      }
    }
  }

  .submit {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    text-align: center;
    margin: 0 auto;
    margin-top: 60rpx;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
  }

  .footer {
    width: 100%;
    height: 64rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #d8d9e0;
    line-height: 64rpx;
    text-align: center;
  }
}
</style>
