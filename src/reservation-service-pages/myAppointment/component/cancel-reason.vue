<template>
  <uni-popup
    class="cancel-reason"
    ref="popUp"
    background-color="white"
    @change="(e: any)=>emits('update:popupShow',e.show)"
    type="bottom"
  >
    <view class="popup-header">取消原因</view>
    <scroll-view
      :scroll-y="true"
      class="popup-body"
      :scroll-into-view="scrollIntoView"
    >
      <!--			<view ref="popupBodyMain">-->
      <view id="popup-body-main">
        <radio-group @change="radioChange">
          <label
            class="uni-list-cell uni-list-cell-pd"
            v-for="item in reasonList"
            :key="item.id"
          >
            <view class="label">{{ item.reason }}</view>
            <radio
              :color="initBasicsData.mainColor"
              :value="item.id"
              :checked="checked === item.id"
              :disabled="loading"
            />
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="label">其他</view>
            <radio
              value="other"
              :checked="checked === 'other'"
              :color="initBasicsData.mainColor"
              :disabled="loading"
            />
          </label>
        </radio-group>
        <view class="reason" v-if="checked === 'other'">
          <input
            v-model="reason"
            class="reason-input"
            id="reason-input"
            type="text"
            :maxlength="200"
            placeholder="请输入原因"
            :cursor-spacing="50"
          />
        </view>
      </view>
    </scroll-view>
    <view class="popup-footer">
      <button
        :class="['btn', checked ? 'bgCM' : 'disable']"
        @click="submit"
        :disabled="!checked || loading"
      >
        确认
      </button>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import {
  queryCancelReasonList,
  updateCancelBookServ,
} from '@/api/reservation-service';
import { nextTick, Ref, ref, toRef, unref, watch } from 'vue';
import { useBasicsData } from '@/store/basicsData';
const initBasicsData = useBasicsData();
const emits = defineEmits(['update:popupShow', 'ok']);
const props = defineProps({
  popupShow: {
    type: Boolean,
    default: false,
  },
  recordId: {
    required: true,
    type: String,
    default: '',
  },
});
const visible = ref(false);
const loading = ref(false);
const checked = ref('');
const reason = ref('');
const id = ref('');
const popUp: Ref<any> = ref(null);
const scrollIntoView = ref('');
// /['预约有误', '临时有事', '其他']
const reasonList: Ref<any[]> = ref([]);
watch(toRef(props, 'popupShow'), val => {
  visible.value = val;
  if (!val) {
    checked.value = '';
    popUp.value?.close();
  } else {
    popUp.value?.open();
  }
});
watch(toRef(props, 'recordId'), val => {
  id.value = val;
});

const queryReasonList = async () => {
  const res = await queryCancelReasonList('');
  reasonList.value = res.data;
};
const radioChange = async (e: any) => {
  checked.value = e.detail.value;
  nextTick(() => {
    scrollIntoView.value = e.detail.value === 'other' ? 'reason-input' : '';
  });
};
const close = () => {
  emits('update:popupShow', false);
};
queryReasonList();
const submit = async () => {
  if (!checked.value) {
    uni.showToast({
      icon: 'none',
      title: '请选择',
      duration: 3000,
    });
    return;
  }
  const res =
    checked.value === 'other'
      ? reason
      : reasonList.value.find(item => item.id === checked.value).reason;
  if (!res) {
    return setTimeout(() => {
      uni.showToast({
        icon: 'none',
        title: '请输入取消原因',
        duration: 3000,
      });
    }, 500);
  }
  loading.value = true;
  try {
    await updateCancelBookServ({
      id: id.value,
      reason: unref(res),
    });
    close();
    setTimeout(() => {
      uni.showToast({
        title: '取消成功',
        duration: 3000,
      });
    }, 500);
    setTimeout(() => {
      loading.value = false;
      emits('ok');

      id.value = '';
      checked.value = '';
      reason.value = '';
    }, 3000);
  } catch (err) {
    loading.value = false;
  }
};
</script>
<style scoped lang="scss">
.cancel-reason {
  .popup-header {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    color: #323338;
    text-align: center;
    font-weight: bold;
  }
  .popup-body {
    max-height: 750rpx;
    /*overflow-y: auto;*/
    .uni-list-cell + .uni-list-cell {
      border-top: 2rpx solid #ebedf0;
    }
    .uni-list-cell {
      height: 100rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      .label {
        font-size: 28rpx;
        color: #323338;
      }
    }
    .reason {
      padding: 24rpx 30rpx;
      border-top: 2rpx solid #ebedf0;
      .reason-input {
        padding: 10rpx 20rpx;
        border-radius: 8rpx;
        border: 1px solid #dcdee0;
      }
    }
  }
  .popup-footer {
    height: 100rpx;
    padding: 10rpx 30rpx;
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      font-size: 28rpx;
      &.disable {
        color: #dedede;
        background-color: #adadad;
      }
      &.bgCM {
        color: white;
      }
    }
  }
}
</style>
