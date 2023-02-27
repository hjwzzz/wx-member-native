<template>
  <CustomPage>
    <view class="address">
      <view>
        <view class="content">
          <view class="header">
            <view class="left">地址</view>
            <view class="right" @click="showregion = true">
              <view class="right-text">
                <picker
                  mode="region"
                  @change="(e:any)=>index = e.target.value"
                  :value="index"
                >
                  <view class="uni-input">{{ index.filter(Boolean).join('/') || '请选择' }}</view>
                </picker>
              </view>
              <uni-icons
                type="arrowright"
                size="14"
                color="#9697a2"
              ></uni-icons>
            </view>
          </view>
          <view class="detail">
            <view class="detail-wrapper">
              <view class="title">详细地址</view>
              <textarea
                class="address-detail"
                disable-default-padding="true"
                focus="true"
                maxlength="50"
                placeholder-style="color: #D8D9E0;"
                v-model="detail"
                placeholder="请输入详细地址"
              />
            </view>
          </view>
        </view>
        <view class="submit" @click="handleSaveAddress">
          <text>确定</text>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { getMemberInfo, updateMemberInfo } from '@/api/server';
import { onMounted, ref } from 'vue';

onMounted(() => {
  queryInfo();
});
const queryInfo = async () => {
  const { code, data } = await getMemberInfo('');
  if (code === 0 && data) {
    const { province, city, district, address } = data;
    detail.value = address;
    if (province && city && district) {
      index.value = [province, city, district];
    }
  }
};
const showregion = ref(false);
const index = ref<string[]>([]);
const detail = ref('');
const handleSaveAddress = async () => {
  const [province, city, district] = index.value;
  const params = {
    province,
    city,
    district,
    address: detail.value,
  };
  const { code } = await updateMemberInfo(params);
  if (code === 0) {
    uni.navigateBack();
  }
};
</script>

<style lang="scss" scoped>
.address {
  width: 100%;
  background: #f5f5f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    width: 690rpx;
    min-height: 330rpx;
    background: #ffff;
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
          // overflow: hidden;

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
      align-items: flex-start;
      border: 30rpx solid #ffffff;

      .detail-wrapper {
        display: flex;
        align-items: flex-start;
        .title {
          font-size: 28rpx;
          width: 112rpx;
          font-weight: 400;
          color: #323338;
          margin-right: 20rpx;
        }

        .address-detail {
          width: 460rpx;
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
    margin-bottom: 44rpx;
    // position: absolute;
    // left: 0;
    // bottom: 0;
  }
}
</style>
