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

        <u-form ref="myForm" :model="form">
          <u-form-item label-width="120rpx" label="预约门店" required>
            <template #right>
              <view class="right-value" @click="selectStore">
                {{ form.storeName ? form.storeName : '请选择' }}
                <uni-icons
                  class="icon"
                  type="arrowright"
                  size="14"
                  color="#B7B8C4"
                />
              </view>
            </template>
          </u-form-item>
          <u-form-item label-width="120rpx" label="预约时间" required>
            <template #right>
              <view class="right-value" @click="selectDateTime">
                {{ form.dataTime || '请选择' }}
                <uni-icons
                  class="icon"
                  type="arrowright"
                  size="14"
                  color="#B7B8C4"
                />
              </view>
            </template>
          </u-form-item>
          <u-form-item
            v-if="data.boolShowGuide === 'Y'"
            label-width="120rpx"
            label="预约导购"
          >
            <template #right>
              <view class="right-value" @click="selectGuide">
                {{ form.guideName ? form.guideName : '请选择' }}
                <uni-icons
                  class="icon"
                  type="arrowright"
                  size="14"
                  color="#B7B8C4"
                />
              </view>
            </template>
          </u-form-item>
        </u-form>

        <u-form label-position="top">
          <u-form-item :model="form" label="备注" class="form-remark">
            <uni-easyinput
              v-model="form.remark"
              type="textarea"
              placeholder="请输入"
              :maxlength="200"
              :input-border="false"
              :styles="{ textAlign: 'justify' }"
            />
            <view class="numbers"> {{ form.remark?.length ?? 0 }}/200 </view>
          </u-form-item>
        </u-form>

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
              <view class="close" @click="removeImg(index)">
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
        <button class="btn bgCM" :disabled="loading" @click="appointment">
          立即预约
        </button>
      </view>

      <u-modal
        v-model="modelShow"
        title="确认支付"
        :content="modelContent"
        show-cancel-button
        @confirm="submitAppointment"
      />
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { staticUrl } from '@/utils/config';
import { saveImmeBookServ } from '@/api/reservation-service';
import { onLoad } from '@dcloudio/uni-app';

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
const loading = ref(false);
const modelShow = ref(false);
const modelContent = ref('');
onLoad((e: any) => data.value = e);
const selectStore = () => {
  uni.navigateTo({ url: `/reservation-service-pages/appointmentAppointment/store?id=${data.value.id}&distId=${form.value.distId}` });
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
  uni.navigateTo({ url: `/reservation-service-pages/appointmentAppointment/dateTime?startTime=${startTime}&endTime=${endTime}&id=${id}&distId=${distId}&selectedTime=${selectedTime}&timeId=${timeId}` });
};
const previewImage = (index: any) => {
  uni.previewImage({
    current: index,
    urls: form.value.imgUrlList.map((item: { value: any }) => item.value),
  });
};
const removeImg = (n: any) => {
  const { imgUrlList } = form.value;
  form.value.imgUrlList = imgUrlList.filter((item: any, index: any) => index !== n);
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
  uni.navigateTo({ url: `/reservation-service-pages/appointmentAppointment/guide?distId=${form.value.distId}&uid=${form.value.uid}` });
};

const uploadImg1 = () => {
  uni.chooseImage({
    count: 6 - form.value.imgUrlList.length,
    sizeType: 'compressed',
    sourceType: ['album', 'camera'],
    success: async ({ tempFiles }) => {
      for (const val of tempFiles as any[]) {
        form.value.imgUrlList.length < 6 &&
          (form.value.imgUrlList = [
            ...form.value.imgUrlList,
            {
              key: val.path,
              value: '',
            },
          ]);
        const size = Math.floor(val.size / 1024 / 1024 * 100) / 100;
        let compressValue;
        // let compressValue = await compress(val)
        if (size <= 1) {
          compressValue = val.path;
        } else {
          const { tempFilePath }: any = await uni.compressImage({
            src: val.path,
            quality: 40,
          });
          compressValue = tempFilePath;
        }
        uni.uploadFile({
          url: `${staticUrl}/upload/uploadImageFile`,
          filePath: compressValue,
          name: 'file',
          formData: { user: 'test' },
          header: {
            category: 'COMM',
            epid: uni.getStorageSync(`epid${uni.getStorageSync('jqzAppid')}`),
            token: uni.getStorageSync(`token${uni.getStorageSync('jqzAppid')}`),
          },
          success: uploadFileRes => {
            const upload = JSON.parse(uploadFileRes.data);
            for (let i = 0; i < form.value.imgUrlList.length; i++) {
              if (form.value.imgUrlList[i].key === val.path) {
                form.value.imgUrlList.splice(i, 1, {
                  key: val,
                  value: upload.data.fullPathUrl,
                });
                break;
              }
            }
          },
        });
      }
    },
  });
};
const appointment = () => {
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
      if (+data.value.balance < +data.value) {
        throw `账户${data.value.costName}余额不足`;
      }
      modelShow.value = true;
      modelContent.value = `确定消耗${parseInt(data.value)}${
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
      saveImmeBookServ({
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
</script>

<style scoped lang="scss">
.appointmentAppointment {
  height: 100vh;
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
    .u-form {
      background: #fff;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      .u-form-item {
        line-height: 100rpx;
        padding: 0 30rpx 0 46rpx;
        .u-form-item--left__content__label {
          width: 160rpx !important;
          line-height: 30rpx;
          /*padding-top: 30rpx;*/
        }
        .u-form-item--right__content__slot {
          display: inline-block;
        }
        .right-value {
          text-align: right;
          color: #9697a2;
          font-size: 28rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 468rpx;
          padding-right: 28rpx;
          position: relative;
          .icon {
            position: absolute;
            right: 0;
          }
        }
      }
      .form-remark {
        padding-bottom: 30rpx;
        .u-form-item {
          padding-bottom: 30rpx;
        }
        .u-form-item--left__content__label {
          line-height: 30rpx;
          padding-top: 30rpx;
        }
        .numbers {
          line-height: 32rpx;
          font-size: 24rpx;
          color: #999999;
          text-align: right;
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
