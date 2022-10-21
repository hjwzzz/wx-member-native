<template>
  <CustomPage>
    <view class="thebalance">
      <view v-if="dataList.length" class="thebalance-list">
        <view
          v-for="(item, index) in dataList"
          :key="index"
          class="item"
          :style="{
            background: item.item,
          }"
          @click="userRbalaancep(item)"
        >
          <image
            class="card-bg"
            :src="staticUrl + 'quality/integar-bg.png'"
            alt=""
          >
          </image>
          <view class="title">
            <view class="top" :style="{ color: item.top, opacity: 0.7 }">
              {{ item.name }}总余额({{ item.unit || '' }})
            </view>
            <view class="bottom" :style="{ color: item.bottom }">
              {{ item.totalValue || 0 }}
            </view>
          </view>
          <view class="foolt">
            <view class="left">
              <view class="topTo" :style="{ color: item.topTo, opacity: 0.7 }">
                储值金额({{ item.unit || '' }})
              </view>
              <view class="bottomTo" :style="{ color: item.bottomTo }">
                {{ item.value || 0 }}
              </view>
            </view>
            <view class="right">
              <view class="topTo" :style="{ color: item.topTo, opacity: 0.7 }">
                赠送金额({{ item.unit || '' }})
              </view>
              <view class="bottomTo" :style="{ color: item.bottomTo }">
                {{ item.bonus || 0 }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="imagewu">
        <image class=".image" :src="staticUrl + 'img/wuyuer.png'" mode="" />
        <view class="wujilu"> 暂无交易记录 </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryDepList } from '@/api/center';
import { onLoad } from '@dcloudio/uni-app';
import { onMounted, ref, Ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';
const initBasicsData = useBasicsData();
const dataList: Ref<any> = ref([
  {
    total: '0',
    balance: '0',
    give: '0',
    item: '',
    top: '',
    bottom: '',
    topTo: '',
    bottomTo: '',
  },
]);

const styleList: Ref<any> = ref([
  {
    item: '#191919',
    top: '#FFFFFF',
    bottom: '#e2b87c',
    topTo: '#FFFFFF',
    bottomTo: '#E2B87C',
  },
  {
    item: '#faad2f',
    top: '#fffff',
    bottom: '#FFFFFF',
    topTo: '#ffff',
    bottomTo: '#FFFFFF',
  },
  {
    item: '#e3bb82',
    top: '#fffff',
    bottom: '#FFFFFF',
    topTo: '#fffff',
    bottomTo: '#FFFFFF',
  },
]);

const selectId = ref('');

onLoad((options: any) => {
  const { selectId: id = '' } = options;
  selectId.value = id;
});

onMounted(() => {
  queryDepListFun();
});

const userRbalaancep = (item: any, type = '') => {
  uni.setStorageSync('balance', item);
  const url = '/my-assets-pages/thebalance/use-balance';
  if (type === 'redirectTo') {
    uni.redirectTo({ url });
    return;
  }
  uni.navigateTo({ url });
};

const queryDepListFun = async () => {
  const res = await queryDepList(initBasicsData.useMid);
  dataList.value = res?.data || [];
  // 大于3个账户的时候追加多个样式
  if (dataList.value.length > 3) {
    let styleArr: any = [];
    for (let i = 0; i < 5; i++) {
      styleArr = styleArr.concat(styleList.value);
    }
    styleList.value = styleArr;
  }

  dataList.value = dataList.value.map((item: any, index: number) => {
    // const arr = this.styleList[Math.floor(Math.random() * this.styleList.length)];
    const styleItem = styleList.value[index];
    return {
      ...item,
      ...styleItem,
    };
  });
  // console.log('dataList.value', dataList.value);
  if (selectId.value) {
    dataList.value.map((v: any) => {
      if (v.acctId === selectId.value) userRbalaancep(v, 'redirectTo');
    });
  }
  if (dataList.value.length === 1) {
    userRbalaancep(dataList.value[0], 'redirectTo');
  }
};
</script>

<style lang="scss" scoped>
.thebalance {
  padding-top: 30rpx;
  background-color: #f5f5f5;
  .imagewu {
    min-height: calc(100vh - 180rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 180rpx - env(safe-area-inset-bottom));
  }
  .thebalance-list {
    padding-left: 30rpx;
    padding-right: 30rpx;

    .item {
      height: 300rpx;
      background-color: #191919;
      text-align: center;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      position: relative;
      .card-bg {
        height: 300rpx;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
      }

      .top {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #ffffff;
      }

      .bottom {
        margin-top: 4rpx;
        font-size: 72rpx;
        color: #e2b87c;
      }
      .title {
        z-index: 99;
        padding-top: 30rpx;
      }
      .foolt {
        z-index: 99;
        padding: 0 74rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        .topTo {
          font-size: 24rpx;
          color: #ffffff;
        }
        .bottomTo {
          margin-top: 8rpx;
          font-size: 32rpx;
          color: #e2b87c;
        }
      }
    }
  }
  .imagewu {
    text-align: center;
    margin-top: 80rpx;

    /* margin-bottom: ; */
    .image {
      width: 320rpx;
      height: 320rpx;
    }

    .wujilu {
      font-size: 28rpx;
      color: #9697a2;
      margin: 40rpx 0 148rpx 0;
    }
  }
}
</style>
