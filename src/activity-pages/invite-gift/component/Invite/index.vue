<template>
  <uni-popup ref="shareRef" type="bottom" @close="close" safe-area>
    <view class="popup-body">
      <view class="title">选择邀请方式</view>
      <view class="icon">
        <view
          class="icon-item"
          v-for="(item, index) in inviteList"
          :key="index"
          @click="clickItem(item)"
        >
          <button open-type="share" v-if="!index">
            <image :src="item.icon" mode="widthFix" class="icon-item-img" />
            <view>{{ item.name }}</view>
          </button>
          <view v-else>
            <image :src="item.icon" mode="widthFix" class="icon-item-img" />
            <view>{{ item.name }}</view>
          </view>
        </view>
      </view>
      <view class="close" @click="close">取消</view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showInvite: {
    type: Boolean,
    default: false,
  },
  showInviteList: {
    type: Object,
    default: () => ({
      showP: true,
      showC: true,
    }),
  },
});
const emits = defineEmits(['update:showInvite', 'showPosterPop']);

const shareRef = ref();
const allInviteList = ref([
  {
    icon: 'https://static.jqzplat.com/img/67d3c46a-4409-43f1-9698-6b9454f541a1.png',
    name: '分享好友',
    type: 'F',
  },
  {
    icon: 'https://static.jqzplat.com/img/2d3238eb-f694-4461-935d-997093358f34.png',
    name: '生成海报',
    type: 'P',
  },
  // {
  //   icon: 'https://static.jqzplat.com/img/c41bdd0d-b3e4-4b6e-9674-83e2f1bb1490.png',
  //   name: '复制链接',
  //   type: 'C',
  // },
]);
const inviteList = ref<any[]>([]);
watch(
  () => props.showInvite,
  val => {
    if (val) {
      if (props.showInviteList.showP) {
        inviteList.value = [...allInviteList.value];
      } else {
        inviteList.value = [allInviteList.value[0]];
      }
      shareRef.value.open();
    } else {
      shareRef.value.close();
    }
  }
);
const close = () => {
  emits('update:showInvite', false);
};
const clickItem = (item: any) => {
  emits('update:showInvite', false);
  switch (item.type) {
    // case 'F':
    //   if (this.platform === 'H5') {
    //     this.show = true;
    //   }
    //   break;
    case 'P':
      emits('showPosterPop');
      break;
      // case 'C':
      //   this.$emit('copy')
      //   break;

    default:
      break;
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  text-align: center;
  padding: 35rpx;
}
.icon {
  padding: 0 20rpx 30rpx;
  overflow: hidden;
  &-item {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4c4c4c;
    float: left;
    padding: 0 30rpx;
    line-height: 32rpx;
    button {
      background: #fff;
      font-size: 24rpx;
      font-weight: 400;
      color: #4c4c4c;
      padding: 0;
      line-height: 32rpx;
      &::after {
        border: none;
      }
    }
    &-img {
      width: 96rpx;
      margin-bottom: 10rpx;
    }
  }
}
.close {
  text-align: center;
  height: 112rpx;
  line-height: 112rpx;
  font-size: 34rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #191919;
  border-top: 16rpx solid #f5f5f6;
}
.popup-body {
  border-radius: 40rpx 40rpx 0 0;
  background-color: #fff;
}
</style>
