<template>
  <CustomPage bottom>
    <view class="appointmentAppointment">
      <view class="main">
        <view class="top">
          <image class="img" mode="aspectFit" :src="data.imgUrl" />
          <view class="top-right">
            <view class="name">
              {{ data.name }}
            </view>
            <view class="integral">
              {{
                data.costCode === 'FREE'
                  ? '免费预约'
                  : parseInt(data.value) + data.acctName
              }}
            </view>
          </view>
        </view>
        <uni-forms :modelValue="form" ref="myForm">
          <uni-forms-item label-width="166rpx" label="预约门店" required>
            <view class="right-value" @click="selectStore">
              {{ form.storeName ? form.storeName : '请选择' }}
              <uni-icons
                class="icon"
                type="arrowright"
                size="14"
                color="#B7B8C4"
              />
            </view>
          </uni-forms-item>
          <uni-forms-item label-width="166rpx" label="预约时间" required>
            <view class="right-value" @click="selectDateTime">
              {{ form.dataTime || '请选择' }}
              <uni-icons
                class="icon"
                type="arrowright"
                size="14"
                color="#B7B8C4"
              />
            </view>
          </uni-forms-item>
          <uni-forms-item
            label-width="166rpx"
            label="预约导购"
            v-if="data.boolShowGuide === 'Y'"
          >
            <view class="right-value" @click="selectGuide">
              {{ form.guideName ? form.guideName : '请选择' }}
              <uni-icons
                class="icon"
                type="arrowright"
                size="14"
                color="#B7B8C4"
              />
            </view>
          </uni-forms-item>
        </uni-forms>
        <view class="form-remark">
          <uni-forms
            label-position="top"
            class="form-remark"
            :modelValue="form"
          >
            <uni-forms-item label="备注">
              <uni-easyinput
                v-model="form.remark"
                type="textarea"
                placeholder="请输入"
                :maxlength="200"
                :input-border="false"
                :styles="{ textAlign: 'justify' }"
              />
              <view class="numbers"> {{ form.remark?.length ?? 0 }}/200 </view>
            </uni-forms-item>
          </uni-forms>
        </view>

        <view class="img-list">
          <template>
            <view
              v-for="(item, index) in form.imgUrlList"
              :key="index"
              class="img-item"
            >
              <image
                class="img"
                mode="aspectFill"
                :src="item.value"
                @click="previewImage(index)"
              />
              <view class="close" @click="form.imgUrlList.splice(index, 1)">
                <uni-icons
                  class="icon-close"
                  type="closeempty"
                  size="13"
                  color="#fff"
                />
              </view>
            </view>
          </template>
          <view
            v-if="form.imgUrlList?.length < 6"
            class="upload"
            @click="uploadImg1"
          >
            <image
              class="img"
              mode="aspectFit"
              :src="`${staticUrl}reservation-service/add-img.png`"
            />
            <view class="text"> 添加图片 </view>
          </view>
        </view>
      </view>
      <view class="footer">
        <view class="integral">
          <template v-if="data.costCode === 'FREE'"> 免费预约 </template>
          <template v-else>
            {{ parseInt(data.value) }}
            <text class="unit">
              {{ data.acctName }}
            </text>
          </template>
        </view>
        <button class="btn bgCM" :loading="loading" @click="appointment">
          立即预约
        </button>
      </view>

      <uni-popup ref="alertDialogRef" type="dialog">
        <uni-popup-dialog
          cancelText="关闭"
          confirmText="确认"
          title="确认支付"
          :content="modelContent"
          @confirm="submitAppointment"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
// import { staticUrl } from '@/utils/config';
// import { saveImmeBookServ } from '@/api/reservation-service';
import { onLoad } from '@dcloudio/uni-app';
import router from '@/utils/router';
// import { imgBaseUrl } from '@/api/quality';
import { staticUrl, imgUrl } from '@/utils/config';
import { saveBookingFront } from '../api/api';

const alertDialogRef = ref();
const data: Ref<any> = ref({});
const imgUrlList: any[] = [];
const form = ref({
  distId: '',
  dataTime: '',
  storeName: '',
  uid: '',
  remark: '',
  imgUrlList,
  selectedTime: '',
  timeId: '',
  guideName: '',
});
const loading: Ref<boolean> = ref(false);
// const modelShow = ref(false);
const modelContent = ref('');
onLoad((e: any) => data.value = e);
const selectStore = () => {
  uni.$once('chooseStore', e => {
    Object.assign(form.value, {
      distId: e.distId,
      storeName: e.storeName,
      dataTime: '',
      selectedTime: '',
      timeId: '',
      uid: '',
      guideName: '',
    });
  });
  uni.navigateTo({ url: `/my-assets-pages/my-prize/store-list?id=${form.value.distId ?? ''}` });
};
const selectDateTime = () => {
  const { distId, selectedTime, timeId } = form.value;
  if (!distId) {
    uni.showToast({
      title: '请选择门店',
      icon: 'none',
      duration: 3000,
    });
    return;
  }
  const { startTime, endTime, id } = data.value;
  uni.$once('chooseDateTime', e => {
    Object.assign(form.value, e);
  });
  uni.navigateTo({ url: `/reservation-service-pages/appointmentAppointment/date-time?startTime=${startTime}&endTime=${endTime}&id=${id}&distId=${distId}&selectedTime=${selectedTime}&timeId=${timeId}` });
};

const selectGuide = () => {
  if (!form.value.distId) {
    uni.showToast({
      title: '请选择门店',
      icon: 'none',
      duration: 3000,
    });
    return;
  }

  uni.$once('updateGuide', e => {
    if (!e.uid) return;
    form.value.uid = e.uid;
    form.value.guideName = e.name;
  });

  router.goCodePage(
    'updateGuide',
    `?id=${form.value.distId}&uid=${form.value.uid}`
  );
};

const uploadImg1 = () => {
  const { imgUrlList } = form.value;
  uni.chooseImage({
    count: 6 - imgUrlList.length,
    sizeType: 'compressed',
    sourceType: ['album', 'camera'],
    success: async ({ tempFiles }) => {
      for (const val of tempFiles as any[]) {
        imgUrlList.push({
          key: val.path,
          value: '',
        });
        const size = Math.floor(val.size / 1024 / 1024 * 100) / 100;
        let filePath = val.path;
        if (size > 1) {
          const { tempFilePath }: any = await uni.compressImage({
            src: val.path,
            quality: 40,
          });
          filePath = tempFilePath;
        }
        uni.uploadFile({
          url: `${imgUrl}/upload/uploadImageFile`,
          filePath,
          name: 'file',
          formData: { user: 'test' },
          header: {
            category: 'COMM',
            epid: uni.getStorageSync('epid'),
            token: uni.getStorageSync('token'),
          },
          success: uploadFileRes => {
            const upload = JSON.parse(uploadFileRes.data);
            imgUrlList.some(i => {
              if (i.key === val.path) {
                i.value = upload.data.fullPathUrl;
                return true;
              }
            });
          },
        });
      }
    },
  });
};
const appointment = () => {
  if (loading.value) {
    return;
  }
  try {
    if (!form.value.distId) {
      throw '请选择门店';
    }
    if (!form.value.selectedTime && !form.value.timeId) {
      throw '请选择预约时间';
    }
    if (data.value.costCode === 'FREE') {
      submitAppointment();
    } else {
      if (Number(data.value.balance) < Number(data.value)) {
        throw `账户${data.value.costName}余额不足`;
      }
      // modelShow.value = true;
      alertDialogRef.value.open();
      modelContent.value = `确定消耗${Number(data.value.value)}${
        data.value.acctName
      }，用于预约服务吗？`;
    }
  } catch (err) {
    setTimeout(() => {
      uni.showToast({
        title: err as string,
        icon: 'none',
        duration: 3000,
      });
    }, 500);
  }
};
const submitAppointment = () => {
  try {
    const list = form.value.imgUrlList.map((item: { value: any }) => item.value);
    list.forEach((item: any) => {
      if (!item) throw '图片未加载完成';
    });
    loading.value = true;
    try {
      saveBookingFront({
        originChan: 'WM',
        distId: form.value.distId,
        selectedTime: form.value.selectedTime,
        svcId: data.value.id,
        timeId: form.value.timeId,
        imgUrlList: form.value.imgUrlList.map((item: { value: any }) => item.value),
        remark: form.value.remark,
        uid: form.value.uid,
      })
        .then(res => {
          setTimeout(() => {
            uni.showToast({
              title: res.data,
              duration: 3000,
            });
          }, 500);
          setTimeout(() => {
            loading.value = false;
            // uni.navigateBack()
            uni.navigateBack({
              delta: 2,
              complete: () => {
                setTimeout(() => {
                  uni.navigateTo({ url: '/reservationService/myAppointment/index' });
                }, 500);
              },
            });
          }, 3000);
        })
        .catch(() => {
          loading.value = false;
        });
    } catch (err) {
      loading.value = false;
    }
  } catch (err) {
    setTimeout(() => {
      uni.showToast({
        icon: 'none',
        title: err as string,
        duration: 3000,
      });
    }, 500);
  }
};
const previewImage = (index: any) => {
  uni.previewImage({
    current: index,
    urls: form.value.imgUrlList.map((item: { value: any }) => item.value),
  });
};
</script>

<style scoped lang="scss">
.appointmentAppointment {
  // height: 100vh;
  position: relative;
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  .main {
    height: 100%;
    padding: 30rpx 30rpx 30rpx 30rpx;
    overflow: auto;
    .top {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 24rpx;
      display: flex;
      margin-bottom: 30rpx;
      .img {
        width: 84rpx;
        height: 84rpx;
        margin-right: 20rpx;
        border-radius: 16rpx;
      }
      .top-right {
        .name {
          font-size: 28rpx;
          font-weight: bold;
          color: #323338;
        }
        .integral {
          color: var(--main-color);
          font-size: 24rpx;
          margin-top: 12rpx;
        }
      }
    }
    :deep(.uni-forms) {
      box-sizing: border-box;
      background: #fff;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      .uni-forms-item {
        box-sizing: border-box;
        line-height: 100rpx;
        padding: 0 30rpx;
        margin-bottom: 0;
        border-bottom: solid 1px #ebedf0;
        .uni-forms-item__label {
          line-height: 100rpx;
          height: 100rpx;
          color: #323338 !important;
        }
        .right-value {
          text-align: right;
          color: #9697a2;
          font-size: 28rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 28rpx;
          position: relative;
          .icon {
            position: absolute;
            right: 0;
          }
        }
      }
    }
    .form-remark {
      :deep(.uni-forms) {
        .uni-forms-item__label {
          padding-top: 30rpx;
          height: 60rpx;
          color: #323338 !important;
        }
        .numbers {
          line-height: 32rpx;
          font-size: 24rpx;
          color: #999999;
          text-align: right;
          padding-bottom: 30rpx;
        }
      }
    }
    .img-list {
      display: grid;
      grid-template-columns: 156rpx 156rpx 156rpx 156rpx;
      grid-column-gap: 20rpx;
      grid-row-gap: 20rpx;
      .img-item {
        width: 156rpx;
        height: 156rpx;
        border-radius: 16rpx;
        overflow: hidden;
        position: relative;
        margin-right: 20rpx;
        .img {
          width: 100%;
          height: 100%;
        }
        .close {
          width: 64rpx;
          height: 64rpx;
          background: #9697a2;
          border-radius: 32rpx;
          position: absolute;
          top: -32rpx;
          right: -32rpx;
          .icon-close {
            position: absolute;
            left: 4rpx;
            bottom: 4rpx;
          }
        }
      }
      .upload {
        box-sizing: border-box;
        width: 156rpx;
        height: 156rpx;
        background: #ffffff;
        border-radius: 16rpx;
        text-align: center;
        padding: 34rpx 0;
        .img {
          width: 44rpx;
          height: 44rpx;
          margin: 0 auto;
        }
        .text {
          font-size: 22rpx;
          color: #b7b8c4;
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
    padding: 10rpx 30rpx;
    padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .integral {
      color: var(--main-color);
      font-size: 36rpx;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: bold;
      .unit {
        font-size: 24rpx;
        font-weight: normal;
        margin-left: 10rpx;
      }
    }
    .btn {
      margin: 0;
      color: white;
      width: 336rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      font-size: 28rpx;
    }
  }
}
</style>
