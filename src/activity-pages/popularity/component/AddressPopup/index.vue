<template>
  <uni-popup
    ref="popupRef"
    class="address-popup"
    v-model="visible"
    type="bottom"
    @maskClick="onClosePopup"
  >
    <scroll-view scroll-y="true" style="height: 70vh" class="address-body">
      <address-template :list="list" :distId="distId" @onCheck="onCheck" />
    </scroll-view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import AddressTemplate from '../Address/index.vue';
import { queryNearStore } from '@/api/server';
import { onReady } from '@dcloudio/uni-app';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  distId: {
    type: String,
    default: '',
  },
  initSelect: {
    // 初始选中第一个
    type: Boolean,
    default: false,
  },
  relatedId: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['onCheck', 'onChange']);

const popupRef = ref();
const visible = ref(false);
const list = ref([]);
watch(
  () => props.show,
  val => {
    visible.value = val;
    // console.log('val', val);
    if (val) {
      popupRef.value.open();
    } else {
      popupRef.value.close();
    }
  }
);
watch(
  () => visible.value,
  val => {
    emits('onChange', val);
  }
);
onReady(() => {
  // console.log('this.list', list.value);
  getLocation();
});
const getLocation = () => {
  // const that = this;
  // return new Promise((resolve, reject) => {
  // const longitude = uni.getStorageSync('longitude');
  // const latitude = uni.getStorageSync('latitude');
  // if (!longitude && !latitude) {
  uni.getLocation({
    type: 'wgs84',
    success(res) {
      // console.log('res222', res);
      uni.setStorageSync('longitude', res.longitude);
      uni.setStorageSync('latitude', res.latitude);
      queryShop(res);
      // resolve(true)
    },
    fail: () => {
      queryShop();
      // console.log('res111 res', res);
      // resolve(false)
    },
  });
  // } else {
  // resolve(true)
  // }
  // })
};
const queryShop = async (location = {} as any) => {
  // await this.getLocation()
  // console.log('location', location);
  // console.log('res2222');
  const { longitude: lo = '', latitude: la = '' } = location;
  const parmas = {
    coordCur: lo && la ? `${lo},${la}` : '',
    storeName: '',
    distId: '',
    relatedId: props.relatedId,
  };
  const res = await queryNearStore(parmas);
  list.value = res.data || [];
  if (props.initSelect && list.value.length) {
    emits('onCheck', list.value[0]);
  }
};
const onCheck = (item: any) => {
  // console.log('onCheck2', item);
  emits('onCheck', item);
};
const onClosePopup = () => {
  visible.value = false;
};
</script>
<style lang="scss" scoped>
.address-popup {
  .address-body {
    border-radius: 30rpx;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #fff;
  }
}
</style>
