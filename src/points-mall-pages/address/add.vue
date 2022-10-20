<template>
  <CustomPage bottom>
    <view class="deliver-adress">
      <view class="enter-adress">
        <view class="code code1">
          <view class="size">
            <view class="title">收货人</view>
            <view class="text">
              <input
                :focus="true"
                type="text"
                maxlength="20"
                placeholder="请输入收货人姓名"
                v-model.trim="params.receiver"
              />
            </view>
          </view>
        </view>

        <view class="code">
          <view class="size">
            <view class="title">手机号</view>
            <view class="text">
              <input
                type="tel"
                maxlength="11"
                placeholder="请输入手机号码"
                v-model.trim="params.phone"
              />
            </view>
          </view>
        </view>
        <view class="content">
          <view class="header">
            <view class="left">所在地区</view>
            <view class="right">
              <view class="right-text">
                <view>
                  <picker
                    mode="region"
                    @change="(e:any)=>params.index = e.detail.value"
                    :value="params.index"
                  >
                    <view class="uni-input">{{
                      params.index?.join(' / ')
                    }}</view>
                  </picker>
                </view>
              </view>
              <span @click="showMap" style="color: #9697a2; white-space: nowrap"
                ><u-icon name="map" size="28" color="#9697a2"></u-icon
                >定位</span
              >
            </view>
          </view>
          <view class="detail">
            <view class="detail-wrapper">
              <view class="title">详细地址</view>
              <textarea
                class="address-detail"
                disable-default-padding="true"
                maxlength="50"
                placeholder="街道,楼牌号等"
                placeholder-style="color: #9697a2;"
                style="color: #9697a2"
                v-model="params.address"
              />
            </view>
          </view>
          <view
            class="header headerfooter"
            style="border-top: 1px solid #ebedf0"
            v-if="!mall"
          >
            <view class="left leftlen">设为默认地址</view>
            <switch
              :checked="params.isDefault"
              :color="initBasicsData.mainColor"
              @change="(e:any) => (params.isDefault = e.detail.value)"
            ></switch>
          </view>
        </view>
      </view>

      <view class="submit" @click="handleSelectedGuid">
        <view class="btn">保存</view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import CustomPage from '@/components/CustomPage/index.vue';
const initBasicsData = useBasicsData();

const mall = ref(false);
const params = ref({
  receiver: '',
  phone: '',
  address: '',
  index: ['广东省', '深圳市', '罗湖区'],
  isDefault: false,
});

const showMap = () => {
  uni.chooseLocation({
    latitude: 22.558244,
    longitude: 114.125444,
    success({ name, address }) {
      if (!name && !address) return;
      params.value.address = name;
      const reg = /.+?(省|市|自治区|自治州|县|区)/g;
      params.value.index = address.match(reg) as string[];
    },
    fail(res) {
      console.error('fail', res);
    },
  });
};
const handleSelectedGuid = () => {
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  const rules: [string, (e: string) => boolean, string][] = [
    ['receiver', (e: string) => e.length > 2, '请输入收货人姓名'],
    ['phone', (e: string) => phoneReg.test(e), '请输入正确手机号'],
    ['address', (e: string) => e.length > 2, '请输入详细地址'],
  ];
  rules.some(([k, v, s]) => {
    if (!v(params.value[k])) {
      uni.showModal({
        content: s,
        showCancel: false,
      });
      return true;
    }
  });
  // for (const key:any in rules) {
  //   const { str, v } = rules[key];
  //   if (!v(params.value[key])) {
  //     uni.showModal({
  //         content: str,
  //         showCancel: false,
  //       });
  // }
  console.log(params.value);
};
</script>

<style scoped lang="scss">
.deliver-adress {
  font-size: 28rpx;
  width: 100%;
  // height: 100%;
  height: calc(100vh - (195rpx + constant(safe-area-inset-bottom)));
  height: calc(100vh - (195rpx + env(safe-area-inset-bottom)));
  background: #f5f5f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .adress-list {
    padding: 30rpx;
    .list-item {
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      .top {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        border-bottom: 1px solid #ebedf0;
        .person-info {
          display: flex;
          justify-content: space-between;
          color: #323338;
          font-size: 28rpx;
          margin-bottom: 18rpx;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 30rpx;
        color: #9697a2;
        font-weight: 400;
        .edit-del {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .enter-adress {
    margin-top: 30rpx;
    // min-height: calc(100vh - 250rpx - constant(safe-area-inset-bottom));
    // min-height: calc(100vh - 250rpx - env(safe-area-inset-bottom));
    flex: 1;
    .code {
      width: 690rpx;
      height: 100rpx;
      background: #ffffff;
      margin: 0 auto;
      border-bottom: 1px solid #ebedf0;

      .size {
        display: flex;
        padding: 30rpx;
        border-top-radius: 16rpx;
        .title {
          width: 84rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          line-height: 40rpx;
          margin-right: 50rpx;
        }
      }
      .verify {
        display: flex;
        padding: 30rpx;
        .title {
          width: 84rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          line-height: 40rpx;
          margin-right: 50rpx;
        }
        .tip {
          width: 140rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #ff547b;
          line-height: 40rpx;
        }
      }
    }
    .code1 {
      border-top-left-radius: 16rpx;
      border-top-right-radius: 16rpx;
    }
    .content {
      width: 690rpx;
      min-height: 330rpx;
      background: #ffff;
      border-bottom-left-radius: 16rpx;
      border-bottom-right-radius: 16rpx;
      margin: 0 30rpx 30rpx 30rpx;
      overflow: hidden;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 44rpx 30rpx;
        border-bottom: 1px solid #ebedf0;

        .left {
          width: 56rpx;
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          line-height: 40rpx;
          word-break: keep-all;
        }
        .leftlen {
          width: 168rpx;
        }

        .right {
          display: flex;
          justify-content: space-between;
          flex: 1;
          margin-left: 78rpx;
          .right-text {
            height: 40rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #9697a2;
            line-height: 40rpx;
            margin-right: 16rpx;
            max-width: 510rpx;
          }
        }
      }
      .headerfooter {
        padding: 30rpx;
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
  }

  .no-adress {
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    .address {
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .imgStyle {
        width: 320rpx;
        height: 320rpx;
      }
      .adress-text {
        margin-top: 40rpx;
        font-weight: 400;
        color: #9697a2;
        font-size: 28rpx;
      }
    }
  }

  .submit {
    width: 100%;
    // height: 100rpx;
    // line-height: 100rpx;
    padding-top: 10rpx;
    padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0px;
    display: flex;
    align-items: center;
    background: #ffff;

    .btn {
      width: 686rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: var(--main-color);
      border-radius: 200rpx;
      text-align: center;
      margin: 0 auto;

      font-size: 28rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
