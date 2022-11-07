<template>
  <CustomPage>
    <view class="detail">
      <view class="wrapper">
        <view class="top">
          <image
            v-if="detail?.status === 'NEW'"
            class="img"
            mode="aspectFill"
            :src="staticUrl + 'reservation-service/stay.png'"
          />
          <image
            v-if="['CFD', 'FTF', 'FIN'].includes(detail?.status)"
            class="img"
            mode="aspectFill"
            :src="staticUrl + 'reservation-service/success.png'"
          />
          <image
            v-if="['CLOSE', 'CANCEL'].includes(detail?.status)"
            class="img"
            mode="aspectFill"
            :src="staticUrl + 'reservation-service/close-2.png'"
          />
          <view class="status">
            {{ statusFun }}
            <view class="desc">
              {{ detail.statusTips || '--' }}
            </view>
          </view>
        </view>
        <view class="group">
          <view class="serve-info">
            <view class="title"> 服务信息 </view>
            <view class="serve-name" @click="goServeDetail">
              <image class="img" mode="aspectFill" :src="detail.imgUrl" />
              <view>
                <view class="name">
                  {{ detail.name }}
                </view>
                <view class="cost">
                  {{
                    !detail.acctId
                      ? '免费预约'
                      : parseInt(detail.value) + detail.acctName
                  }}
                </view>
              </view>
              <uni-icons
                class="icon"
                type="forward"
                size="24"
                color="#B7B8C4"
              />
            </view>
            <view class="info-item">
              <view class="label"> 预约门店 </view>
              <view class="value">
                {{ detail.storeName }}
              </view>
            </view>
            <view class="info-item">
              <view class="label"> 预约时间 </view>
              <view class="value">
                {{ detail.bookServTime }}
              </view>
            </view>
            <view class="info-item">
              <view class="label"> 预约导购 </view>
              <view class="value">
                {{ detail.guideName || '--' }}
              </view>
            </view>
            <view class="info-item">
              <view class="label"> 门店地址 </view>
              <view class="value">
                <uni-row :gutter="30">
                  <uni-col :span="detail.tel && addressFun ? 18 : 20">
                    <view class="addr">
                      {{ addressFun || '--' }}
                    </view>
                  </uni-col>
                  <uni-col :span="detail.tel && addressFun ? 6 : 4">
                    <div class="icon-box">
                      <image
                        v-if="addressFun"
                        class="icon"
                        :src="staticUrl + 'reservation-service/address.png'"
                        mode=""
                        @click="viewLocation(detail)"
                      />
                      <image
                        v-if="detail.tel"
                        class="icon"
                        :src="staticUrl + 'reservation-service/phone.png'"
                        mode=""
                        @click="callPhone(detail.tel)"
                      />
                    </div>
                  </uni-col>
                </uni-row>
              </view>
            </view>
          </view>
        </view>
        <view class="group submit-info">
          <view class="title"> 提交信息 </view>
          <view class="info-item">
            <view class="label"> 提交时间 </view>
            <view class="value">
              {{ detail.createTime }}
            </view>
          </view>
          <view class="info-item">
            <view class="label"> 预约单号 </view>
            <view class="value">
              {{ detail.number }}
            </view>
          </view>
          <view class="info-item">
            <view class="label"> 备注 </view>
            <view class="value">
              {{ detail.remark || '--' }}
            </view>
          </view>
          <view class="img-list">
            <image
              v-for="(item, index) in detail.bookImageList"
              :key="index"
              class="img"
              mode="aspectFill"
              :src="item"
              @click="previewImage(index)"
            />
          </view>
        </view>
      </view>
			<ScrollViewFooter></ScrollViewFooter>

      <view
        v-if="
          ['NEW', 'CFD', 'FTF'].includes(detail?.status) ||
          (detail.boolShowAppraiseBtn === 'Y' && detail?.status === 'FIN')
        "
        class="footer"
      >
        <view
          v-if="['NEW', 'CFD'].includes(detail?.status)"
          class="btn"
          @click="cancel"
        >
          取消预约
        </view>
        <view v-if="detail?.status === 'FTF'" class="btn" @click="complete">
          已完成
        </view>
        <view
          v-if="detail.boolShowAppraiseBtn === 'Y' && detail?.status === 'FIN'"
          class="btn"
          @click="goEvaluate"
        >
          评价
        </view>
      </view>
      <cancelReason
        v-model:popup-show="popupShow"
        :record-id="detail.id"
        @ok="popupOk"
      />
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue';
import cancelReason from './component/cancel-reason.vue';
import ScrollViewFooter from '@/components/ScrollViewFooter/index.vue';
import {
  queryCBookServPage,
  updateFinishBookServ,
} from '@/api/reservation-service';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { staticUrl } from '@/utils/config';

const popupShow: Ref<boolean> = ref(false);
const data = ref<any>({});
const detail = ref<any>({});

onLoad((obj: any) => {
  data.value = obj;
  queryDetails();
});
onShow(() => {
  queryDetails();
});

const statusFun = computed(() => {
  const enabled = detail.value?.status;
  const status: string =
    enabled === 'NEW'
      ? '待确认'
      : ['CFD', 'FTF'].includes(enabled)
        ? '已预约'
        : enabled === 'FIN'
          ? '已完成'
          : enabled === 'CLOSE'
            ? '已关闭'
            : '已取消';

  return status;
});
const addressFun = computed(() => {
  const province = detail.value?.province || '';
  const city = detail.value?.city || '';
  const district = detail.value?.district || '';
  const str = province + city + district;
  return str + (detail.value?.address || '');
});

const queryDetails = async () => {
  const res = await queryCBookServPage({ id: data.value?.id });
  detail.value = res.data.records[0];
};

const goServeDetail = () => {
  uni.navigateTo({ url: `/reservation-service-pages/serveDetail/index?id=${detail.value.svcId}` });
};
const cancel = () => {
  popupShow.value = true;
};
const complete = () => {
  uni.showModal({
    title: '完成服务',
    content: '是否确认完成服务',
    success: res => {
      if (res.confirm) {
        // 完成服务逻辑
        updateFinishBookServ({ id: detail.value.id })
          .then(async () => {
            await queryDetails();
            setTimeout(() => {
              uni.showToast({
                icon: 'none',
                title: '操作完成',
                duration: 3000,
              });
            }, 500);
          });
      }
    },
  });
};
const goEvaluate = () => {
  uni.navigateTo({ url: `/reservation-service-pages/myAppointment/evaluate?id=${detail.value.id}` });
};
const popupOk = () => {
  queryDetails();
};
const previewImage = (index: number) => {
  uni.previewImage({
    current: index,
    urls: detail.value.bookImageList,
  });
};
const callPhone = (tel: string) => {
  uni.makePhoneCall({ phoneNumber: tel });
};
const viewLocation = (obj: any) => {
  const arr = obj.coord.split(',');
  const latitude = +arr[1];
  const longitude = +arr[0];
  uni.openLocation({
    latitude,
    longitude,
    address: obj.province + obj.city + obj.district + obj.address,
  });
};

/**/
</script>

<style lang="scss" scoped>
.detail {
  height: 100%;
  .wrapper {
    height: 100%;
    padding: 30rpx;
    overflow-y: auto;
    .top {
      background: #ffffff;
      border-radius: 20rpx;
      padding: 40rpx 30rpx;
      display: flex;
      align-items: center;
      .img {
        width: 72rpx;
        height: 72rpx;
        margin-right: 30rpx;
      }
      .status {
        font-size: 36rpx;
        font-weight: 800;
        color: #323338;
        .desc {
          font-size: 28rpx;
          font-weight: normal;
          color: #9697a2;
        }
      }
    }
    .group {
      margin: 30rpx 0;
      background: #ffffff;
      border-radius: 16rpx;
      .serve-info {
        padding: 30rpx;
      }
      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #414141;
      }
      .serve-name {
        margin: 30rpx 0;
        display: flex;
        position: relative;
        .img {
          width: 84rpx;
          height: 84rpx;
          border-radius: 16rpx;
          margin-right: 20rpx;
        }
        .name {
          font-size: 28rpx;
          font-weight: bold;
          color: #323338;
          line-height: 40rpx;
        }
        .cost {
          font-size: 24rpx;
          font-weight: normal;
          line-height: 46rpx;
          color: var(--main-color);
        }
        .icon {
          position: absolute;
          right: 0;
          top: 14rpx;
        }
      }
      .info-item {
        display: flex;
        font-size: 28rpx;
        line-height: 40rpx;

        .label {
          width: 120rpx;
          color: #9697a2;
          margin-right: 40rpx;
        }
        .value {
          color: #323338;
          width: calc(100% - 160rpx);
          word-wrap: break-word;
        }
        .addr {
          font-size: 28rpx;
          color: #323338;
          line-height: 44rpx;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon {
            width: 40rpx;
            height: 42rpx;
          }
        }
      }
      .info-item + .info-item {
        margin-top: 24rpx;
      }
    }
    .submit-info {
      padding: 30rpx;
      .title {
        margin-bottom: 20rpx;
      }
      .img-list {
        display: grid;
        grid-template-columns: 142rpx 142rpx 142rpx 142rpx;
        grid-column-gap: 20rpx;
        grid-row-gap: 20rpx;
        margin-top: 24rpx;
        .img {
          width: 142rpx;
          height: 142rpx;
          border-radius: 16rpx;
        }
      }
    }
  }

  .footer {
		box-sizing: border-box;
    width: 100vw;
    position: fixed;
		bottom: 0;
    left: 0;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
    padding: 20rpx 30rpx;
    padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    display: flex;
    justify-content: flex-end;
    margin-top: 20rpx;
    .btn {
			box-sizing: border-box;
      height: 64rpx;
      text-align: center;
      border-radius: 32rpx;
      border: 2rpx solid #ebedf0;
      padding: 10rpx 32rpx;
      margin-left: 20rpx;
      font-size: 28rpx;
      color: #323338;
    }
  }
}
</style>
