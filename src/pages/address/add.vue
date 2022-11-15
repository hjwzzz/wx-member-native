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
                maxlength="20"
                placeholder="请输入收货人姓名"
                type="text"
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
                <picker
                  mode="region"
                  @change="(e:any)=>areaList = e.detail.value"
                  :value="areaList"
                >
                  <view class="uni-input">{{ areaList?.join(' / ') }}</view>
                </picker>
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
              :checked="params.isDefault === 'Y'"
              :color="initBasicsData.mainColor"
              @change="(e:any) => (params.isDefault = e.detail.value?'Y':'N')"
            ></switch>
          </view>
        </view>
      </view>

      <view class="submit" @click="editAddress">
        <view class="btn">保存</view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import CustomPage from '@/components/CustomPage/index.vue';
import { addAddress, updateAddress, getAddressById } from '@/pages/api/address';
import type { IAddress } from '@/pages/api/types/address';
import { onLoad } from '@dcloudio/uni-app';
const initBasicsData = useBasicsData();

const mall = ref(false);
const props = defineProps({ id: { type: String } });
const areaList = ref(['广东省', '深圳市', '罗湖区']);
const params = ref<IAddress>({ isDefault: 'N' } as IAddress);

onLoad(async e => e.id && getData(e.id));
const getData = async (id: string) => {
  uni.setNavigationBarTitle({ title: '修改收货地址' });
  const { data } = await getAddressById(id);
  params.value = data;
  const { city, province, district } = data;
  areaList.value = [province, city, district];
};

const showMap = () => {
  uni.chooseLocation({
    latitude: 22.558244,
    longitude: 114.125444,
    success({ name, address }) {
      if (!name && !address) return;
      params.value.address = name;
      const reg = /.+?(省|市|自治区|自治州|县|区)/g;
      areaList.value = address.match(reg) as string[];
    },
    fail(res) {
      throw new Error(res);
    },
  });
};

const editAddress = async () => {
  // 校验数据
  const phoneReg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  const rules: [string, (e: string) => boolean, string][] = [
    ['receiver', (e: string) => e.length > 1, '请输入收货人姓名'],
    ['phone', (e: string) => phoneReg.test(e), '请输入正确手机号'],
    ['address', (e: string) => e.length > 2, '请输入详细地址'],
  ];
  const haveEmpty = rules.some(([k, v, s]) => {
    if (!v(params.value[k as keyof IAddress] as string)) {
      uni.showModal({
        content: s,
        showCancel: false,
      });
      return true;
    }
  });
  if (haveEmpty) return;
  let url = addAddress;
  // 修改地址时，带上ID
  if (props.id) {
    params.value.id = props.id;
    url = updateAddress;
  }
  const [province, city, district] = areaList.value;

  const { msg, code } = await url({
    ...params.value,
    province,
    city,
    district,
    mid: initBasicsData.useMid,
  });

  if (msg === '成功' || code === 0) {
    uni.showToast({
      title: props.id ? '修改成功' : '保存成功',
      duration: 3000,
    });
    setTimeout(uni.navigateBack, 500);
  }
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

  .enter-adress {
    margin-top: 30rpx;
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
