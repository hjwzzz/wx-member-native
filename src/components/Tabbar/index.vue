<template>
  <view class="tarbar">
    <view
      class="tarbar-list"
      :style="{
        background: tabBarStyle.backgroundColor,
        color: tabBarStyle.color,
        borderTop: '1rpx solid #f1f1f1',
      }"
    >
      <view class="tarbar-list-ul">
        <view
          class="tarbar-list-li"
          v-for="(item, index) in tabBarList"
          :key="index"
          @click="setSelected(index, item)"
        >
          <template>
            <view class="tarbar-list-li-icon">
              <view
                class="iconfont icon-style"
                :class="item.icoUrl"
                :style="{
                  color: selected == index ? tabBarStyle.selectedColor : '',
                }"
              ></view>
            </view>
            <view
              :style="
                selected == index ? 'color:' + tabBarStyle.selectedColor : ''
              "
              class="tarbar-list-li-name"
              >{{ item.title }}</view
            >
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
interface Props {
  current?: number | string;
  tabBar?: any;
}
const props = withDefaults(defineProps<Props>(), {
  current: 0,
  tabBar: () => ({}),
});

const tabBarList = computed(() => initBasicsData.bottomNavList);
const tabBarStyle = reactive({
  color: '#323338',
  selectedColor: computed(() => initBasicsData.mainColor),
  borderStyle: '#f1f1f1',
  backgroundColor: '#fff',
  position: 'bottom',
});

const emits = defineEmits(['change']);
const selected = ref(props.current);
const setSelected = (index: number, item: any) => {
  if (selected.value === index) {
    return;
  }
  emits('change', index, item);
};
</script>

<style lang="scss" scoped>
.tarbar {
  // min-height: 100rpx;
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  background: rgba(255, 255, 255, 1);
}

.tarbar-list {
  width: 100%;
  /* height: 98rpx; */
  // background: #4d586f;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}

.tarbar-list-ul {
  width: 100%;
  height: 100%;
  padding: 20rpx 60rpx 10rpx;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.tarbar-list-li {
  width: 110rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tarbar-list-li-icon {
  width: 50rpx;
  height: 50rpx;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tarbar-list-li-icon image {
  width: 36rpx;
  height: 36rpx;
}

.tarbar-list-li-name {
  width: 100%;
  text-align: center;
  line-height: 30rpx;
  font-size: 24rpx;
  height: 30rpx;
  margin-bottom: 14rpx;
}

.tarbar-list-li-center {
  width: 100rpx;
}
.icon-style {
  font-size: 44rpx;
}
</style>
