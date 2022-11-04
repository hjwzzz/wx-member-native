<template>
  <u-popup
    class="cancel-reason"
    v-model="visible"
    mode="bottom"
    :safe-area-inset-bottom="true"
    :closeable="true"
    :border-radius="20"
    :negative-top="100"
    @close="close"
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
              :value="item.id"
              :checked="checked === item.id"
              :color="mainColor"
              :disabled="loading"
            />
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
            <view class="label">其他</view>
            <radio
              value="other"
              :checked="checked === 'other'"
              :color="mainColor"
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
      <!-- :style="{ background: checked ? mainColor : '#adadad' }" -->
      <button
        type="primary"
        class="btn"
        @click="submit"
        :disabled="!checked || loading"
      >
        确认
      </button>
    </view>
  </u-popup>
</template>

<script lang="ts" setup>
import { ref, Ref, withDefaults, watch, nextTick } from 'vue';
// import mainColor from "@/common/utils/mainColor";
import {
  queryCancelReasonList,
  updateCancelBookServ,
} from '@/api/reservation-service';

interface Props {
  recordId: string;
  popupShow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  recordId: '',
  popupShow: false,
});
const emits = defineEmits(['update:popupShow', 'ok']);
const visible: Ref<boolean> = ref(false);
const reasonList: Ref<any> = ref(['预约有误', '临时有事', '其他']);
const checked: Ref<string | null> = ref(null);
const reason: Ref<string> = ref('');
const id: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);
const scrollIntoView: Ref<string> = ref('');

watch(props.popupShow, (val: boolean) => {
  console.log(111, val);
  visible.value = val;
  if (!val) {
    checked.value = null;
  }
});
watch(props.recordId, (val: string) => {
  console.log(222, val);
  id.value = val;
});

const queryReasonList = async () => {
  const res = await queryCancelReasonList('');
  reasonList.value = res.data;
};
queryReasonList();
const radioChange = async (e: any) => {
  checked.value = e.detail.value;
  nextTick(() => {
    scrollIntoView.value = e.detail.value === 'other' ? 'reason-input' : '';
  });
};
const close = () => {
  emits('update:popupShow', false);
};
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
      ? reason.value
      : reasonList.value.find((item: any) => item.id === checked.value).reason;
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
      reason: res,
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
      checked.value = null;
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
    }
  }
}
</style>
