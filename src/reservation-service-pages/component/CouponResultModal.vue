<template>
  <uni-popup
    ref="alertDialog"
    type="dialog"
    is-mask-click
    @maskClick="onMaskClick"
  >
    <view class="dialog-box">
      <view class="dialog-show">
        <image class="modelimg" :src="showImg"></image>
      </view>
      <!-- <view class="dialog-show dialog-text">{{ showText }}</view> -->
      <view class="dialog-show dialog-text">{{ props.title }}</view>

      <view class="dialog-show dialog-text dialog-text-tip"
        >是否订阅提醒服务？</view
      >
      <view class="dialog-box-btn">
        <view class="dialog-box-btn-text" @click="onCancel"> 暂不订阅 </view>
        <view class="dialog-box-btn-text" @click="onConfirm"> 订阅提醒 </view>
      </view>
    </view>
  </uni-popup>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { staticUrl } from '@/utils/config';
interface Props {
  type?: string;
  visible: boolean;
  tmplIdsValue?: any;
  tmplIdsValueing?: any;
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  visible: false,
  title: '',
  tmplIdsValue: () => [],
});
const alertDialog: any = ref(null);
// :src="`${staticUrl}reservation-service/add-img.png`"  reservation-success.png onMounted,
const showImg = computed(() => `${staticUrl}reservation-service/reservation-${
  props.title === '服务预约成功' || props.title === '预约成功'
    ? 'success'
    : 'await'
}.png`);

// const showText = computed(() => {
//   if (props.type === 'success') {
//     return '领取成功';
//   }
//   if (props.type === 'invalid') {
//     return '优惠券已失效';
//   }
//   if (props.type === 'over') {
//     return '优惠券已被领完了';
//   }
//   if (props.type === 'overing') {
//     return '优惠券已领取';
//   }
//   if (props.type === 'self') {
//     return '抱歉，您不可领取自己转赠的优惠券';
//   }
//   return '领取失败';
// });

// onMounted(() => {
//   alertDialog.value.open();
// });

watch(
  () => props.visible,
  (bool: boolean) => {
    if (bool) {
      alertDialog.value.open();
    } else {
      alertDialog.value.close();
    }
  }
);

const emits = defineEmits(['cancel', 'ok']);

const onCancel = () => {
  alertDialog.value.close();
  emits('cancel');
};
const onConfirm = () => {
  // console.log(props.tmplIdsValue);

  const tmpl =
    props.title === '预约成功'
      ? props.tmplIdsValueing
      : props.tmplIdsValue || [];
  // const tmpl: any = [];

  if (tmpl.length === 0) {
    uni.showToast({
      title: '订阅失败，请联系客服添加服务类目',
      duration: 4000,
      icon: 'none',
    });
    setTimeout(() => {
      uni.navigateBack({ delta: 2 });
    }, 4000);
    return;
  }

  uni.requestSubscribeMessage({
    tmplIds: tmpl,
    success(res) {
      alertDialog.value.close();

      const cssel = Object.values(res);
      if (cssel.includes('accept')) {
        emits('ok', true);
      } else {
        emits('ok', false);
      }
      setTimeout(() => {
        uni.navigateBack({ delta: 2 });
      }, 1000);
    },
    fail(eer) {
      emits('ok', false);
      console.log('订阅失败:', eer);
      // console.log('eer', eer);
    },
  });
};
const onMaskClick = () => {
  emits('cancel');
};
</script>

<style lang="scss" scoped>
.dialog-box {
  background-color: white;
  width: 600rpx;
  min-height: 382rpx;
  background: #ffffff;
  border-radius: 32rpx;
  overflow: hidden;

  .dialog-show {
    display: flex;
    justify-content: center;
  }

  .dialog-text {
    height: 90rpx;
    align-items: center;
  }
  .dialog-text-tip {
    font-size: 14px;
    font-weight: 400;
    color: #9697a2;
  }
  .modelimg {
    width: 107rpx;
    height: 107rpx;
    margin-top: 70rpx;
  }
  .dialog-box-btn {
    margin-top: 14rpx;
    border-top: 1rpx solid #f8f7f7;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    color: #323338;

    .dialog-box-btn-text {
      line-height: 100rpx;
      width: 50%;
      text-align: center;
    }
    .dialog-box-btn-text:last-child {
      color: var(--main-color);
    }
    .dialog-box-btn-text:nth-child(2) {
      border-left: 1px solid #f8f7f7;
    }
  }
}
</style>
