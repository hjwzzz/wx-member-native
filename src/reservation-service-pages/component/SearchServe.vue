<template>
  <view class="search-serve">
    <view class="search-bar">
      <!-- <u-search
        v-model="searchValue"
        placeholder="搜一搜预约服务"
        :action-style="{
          color: mainColor,
        }"
        @search="handleSearch"
        @custom="handleSearch"
      /> -->
    </view>

    <view class="wrapper">
      <scroll-view
        class="scroll-view"
        :scroll-y="true"
        @scrolltolower="loadMore"
      >
        <template v-if="serveProList.length > 0">
          <view class="scroll-box">
            <view class="wrapper-header">
              <text>
                {{
                  data.mode ? `${data.storeName}的预约服务` : '选择要预约的服务'
                }}
              </text>
              <view v-if="!data.mode" class="btn" @click="goStore">
                <image
                  class="img"
                  :src="staticUrl + 'reservation-service/toggle.png'"
                  mode="aspectFit"
                />
                门店模式
              </view>
            </view>
            <view class="serve-list">
              <view
                v-for="item in serveProList"
                :key="item.id"
                class="serve-item"
                @click="goDetail(item)"
              >
                <view class="container">
                  <image
                    class="image"
                    type="image"
                    mode="aspectFill"
                    :src="item.imgUrl"
                  />
                  <view class="container-right">
                    <view class="view">{{ item.name }}</view>
                    <text class="integral">
                      {{
                        item.cost.code === 'FREE'
                          ? '免费预约'
                          : parseInt(item.value) + item.acctName
                      }}
                    </text>
                  </view>
                </view>
                <view class="tip">
                  <image
                    v-if="item.boolBookServ.code === 'Y'"
                    class="img"
                    type="image"
                    mode="aspectFill"
                    :src="staticUrl + 'reservation-service/time.png'"
                  />
                  <image
                    v-else
                    class="img"
                    type="image"
                    mode="aspectFill"
                    :src="staticUrl + 'reservation-service/tip.png'"
                  />
                  {{ item.tips }}
                  <!--<u-icon
											v-if="item.boolBookServ.code === 'Y'"
											:label="item.tips" color="#B7B8C4" labelColor="#B7B8C4"
											size="34" labelSize="24" name="clock"
									></u-icon>
									<u-icon
											v-else
											:label="item.tips" color="#B7B8C4" labelColor="#B7B8C4"
											size="34" labelSize="24" name="info-circle"
									></u-icon>-->
                </view>
              </view>
            </view>
            <!-- <u-loadmore :status="moreStatus" color="#D8D9E0" margin-top="20" /> -->
          </view>
        </template>
        <view v-else class="no-data">
          <image
            class="image"
            mode="aspectFit"
            :src="staticUrl + 'img/Noprize.png'"
          />
          <view class="view">暂无数据</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
import { computed, onMounted, ref, Ref } from 'vue';
import { queryServicePage } from '@/api/reservation-service';
import { staticUrl } from '@/utils/config';
//   staticUrl reservation-service  staticUrl+'reservation-service/tip.png'

const searchValue = ref('');
const more = ref('more');
const moreStatus = ref('loadmore');
const curPage = ref(1);
const pageSize = ref(30);
const serveProList: Ref<any> = ref([]);
const data: Ref<any> = ref({});

onMounted(() => {
  Object.keys(data.value).length
    ? queryServeProList('', data.value.distId)
    : queryServeProList();
});

const handleSearch = () => {
  curPage.value = 1;
  Object.keys(data.value).length
    ? queryServeProList(searchValue.value, data.value.distId)
    : queryServeProList(searchValue.value);
};

const goStore = () => {
  uni.navigateTo({ url: '/reservationService/reservationService/storePattern' });
};
const loadMore = () => {
  if (moreStatus.value === 'noMore') return;
  moreStatus.value = 'loading';
  curPage.value++;
  Object.keys(data.value).length
    ? queryServeProList(searchValue.value, data.value.distId)
    : queryServeProList(searchValue.value);
};

const goDetail = ({ id }: { id: string }) => {
  uni.navigateTo({ url: `/reservationService/serveDetail/index?id=${id}&distId=${data.value.distId}&storeName=${data.value.storeName}` });
};

// 查询预约服务项目列表
const queryServeProList = async (name = '', distId = '') => {
  const { data: { records, totalRecord } } = await queryServicePage({
    curPage: curPage.value,
    pageSize: pageSize.value,
    name,
    distId,
    storeModel: data.value.hasOwnProperty('mode') ? 'Y' : 'N',
  });
  if (curPage.value === 1) {
    serveProList.value = records;
  } else {
    serveProList.value.push(...records);
  }
  moreStatus.value =
    totalRecord === serveProList.value.length ? 'noMore' : 'loadmore';
};
</script>

<style lang="scss" scoped>
.search-serve {
  height: 100%;
  .search-bar {
    height: 104rpx;
    background-color: #fff;
    padding: 16rpx 30rpx;
  }
  & > .wrapper {
    height: calc(100% - 104rpx);
    width: 100vw;
    background: #f5f5f5;
    /*overflow-y: auto;*/
    .scroll-view {
      box-sizing: border-box;
      height: 100%;
      .scroll-box {
        min-height: calc(100% - 112rpx);
      }
      .wrapper-header {
        font-size: 28rpx;
        font-weight: bold;
        color: #323338;
        padding: 30rpx 30rpx 0 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 176rpx;
          height: 56rpx;
          font-size: 24rpx;
          color: #9697a2;
          font-weight: normal;
          background-color: #fff;
          border-radius: 28rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .img {
            display: inline-block;
            width: 24rpx;
            height: 24rpx;
            margin-right: 4rpx;
          }
        }
      }
      .serve-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 30rpx;
        .serve-item {
          width: 330rpx;
          height: 196rpx;
          border-radius: 16rpx;
          background-color: #fff;
          margin-top: 30rpx;
          // padding: 24rpx 20rpx;
          .container {
            display: flex;
            margin-bottom: 32rpx;
            padding-left: 20rpx;
            padding-top: 20rpx;
            .image {
              width: 84rpx;
              height: 84rpx;
              border-radius: 16rpx;
              margin-right: 20rpx;
            }
            .integral {
              color: var(--main-color);
              font-size: 24rpx;
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            &-right {
              width: calc(100% - 104rpx);
              .view {
                font-size: 28rpx;
                font-weight: bold;
                color: #323338;
                margin-bottom: 10rpx;
              }
              // text {
              //   font-size: 24rpx;
              //   display: block;
              //   overflow: hidden;
              //   white-space: nowrap;
              //   text-overflow: ellipsis;
              // }
            }
          }
          .tip {
            padding-left: 20rpx;
            color: #b7b8c4;
            font-size: 24rpx;
            line-height: 20rpx;
            display: flex;
            align-items: center;
            .img {
              width: 28rpx;
              height: 28rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
      .no-data {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-top: 100rpx;
        .image {
          width: 300rpx;
          height: 300rpx;
        }
        .view {
          width: 100vw;
          text-align: center;
          color: #b7b8c4;
        }
      }
    }
  }
}
</style>
