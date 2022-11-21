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
      <!--  @clear="handleClear" -->
      <uni-search-bar
        v-model="searchValue"
        cancelButton="none"
        placeholder="搜一搜预约服务"
        radius="20"
        class="searchBar"
        @input="handleInput"
      >
      </uni-search-bar>
      <text class="search-text" @click="handleSearch">搜索</text>
    </view>

    <view class="wrapper">
      <scroll-view
        class="scroll-view"
        :scroll-y="true"
        @scrolltolower="loadMore"
      >
        <view class="body_view">
          <template v-if="serveProList.length > 0">
            <view class="scroll-box">
              <view class="wrapper-header">
                <text class="break-word">
                  {{
                    data.mode
                      ? `${data.storeName}的预约服务`
                      : '选择要预约的服务'
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
                          item.cost === 'FREE'
                            ? '免费预约'
                            : parseInt(item.value) + item.acctName
                        }}
                      </text>
                    </view>
                  </view>
                  <view class="tip">
                    <image
                      class="img"
                      type="image"
                      mode="aspectFill"
                      :src="codeImage(item)"
                    />
                    {{ item.tips }}
                  </view>
                </view>
              </view>
              <!-- <uni-load-more status="moreStatus" color="#D8D9E0"></uni-load-more> -->
            </view>
          </template>
          <view v-else class="no-data">
            <view class="view">
              <image
                class="image"
                mode="aspectFit"
                :src="staticUrl + 'img/Noprize.png'"
              />
              <view class="view">暂无数据</view>
            </view>
          </view>
        </view>
        <ScrollViewFooter> </ScrollViewFooter>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
import { onMounted, ref, Ref } from 'vue';
import { debounce } from '@/utils/util';
import ScrollViewFooter from '@/components/ScrollViewFooter/index.vue';
import { queryServicePageFront } from '../api/api';
import { staticUrl } from '@/utils/config';
import { onLoad } from '@dcloudio/uni-app';

const codeImage = (item: any) => {
  if (item.boolBookServ === 'Y') {
    return `${staticUrl}reservation-service/time.png`;
  }
  return `${staticUrl}reservation-service/tip.png`;
};

const searchValue = ref('');
// const more = ref('more');
const moreStatus = ref('more');
const curPage = ref(1);
const pageSize = ref(50);
const serveProList: Ref<any> = ref([]);
const data: Ref<any> = ref({});

onLoad((obj: any) => {
  data.value = obj;
});

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
  uni.navigateTo({ url: '/reservation-service-pages/reservation-service/store-pattern' });
};
const loadMore = () => {
  if (moreStatus.value === 'no-more') return;
  moreStatus.value = 'loading';
  curPage.value++;
  Object.keys(data.value).length
    ? queryServeProList(searchValue.value, data.value.distId)
    : queryServeProList(searchValue.value);
};

const goDetail = ({ id }: { id: string }) => {
  uni.navigateTo({ url: `/reservation-service-pages/serveDetail/index?id=${id}&distId=${data.value.distId}&storeName=${data.value.storeName}` });
};

// 查询预约服务项目列表
const queryServeProList = async (name = '', distId = '') => {
  const { data: { records, totalRecord } } = await queryServicePageFront({
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
    totalRecord === serveProList.value.length ? 'no-more' : 'more';
};
//  debounce
const handleInput = debounce(() => {
  handleSearch();
});
// const handleClear = (i: any) => {
//   console.log('handleClear', i);
// };
</script>

<style lang="scss" scoped>
.search-serve {
  padding-top: 140rpx;
  .search-bar {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    right: 0rpx;
    z-index: 99;
    height: 104rpx;
    background-color: #fff;
    padding: 16rpx 30rpx;
    display: flex;
    .searchBar {
      width: calc(100% - 80rpx);
    }
    .search-text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: var(--main-color);
      display: flex;
      align-items: center;
    }
  }
  & > .wrapper {
    // padding-bottom: calc(94rpx + constant(safe-area-inset-bottom));
    // padding-bottom: calc(94rpx + env(safe-area-inset-bottom));
    // height: calc(100vh - 185rpx - constant(safe-area-inset-bottom));
    // height: calc(100vh - 185rpx - env(safe-area-inset-bottom));

    width: 100vw;
    background: #f5f5f5;
    /*overflow-y: auto;*/
    .scroll-view {
      // box-sizing: border-box;
      // height: 100%;
      height: calc(100vh - 250rpx - constant(safe-area-inset-bottom));
      height: calc(100vh - 250rpx - env(safe-area-inset-bottom));
      .body_view {
        min-height: calc(
          100vh - 250rpx - 112rpx - constant(safe-area-inset-bottom)
        );
        min-height: calc(100vh - 250rpx - 112rpx - env(safe-area-inset-bottom));
      }
      .scroll-box {
        padding-bottom: 50rpx;
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
        padding-top: 100rpx;
        height: calc(100vh - 460rpx - constant(safe-area-inset-bottom));
        height: calc(100vh - 460rpx - env(safe-area-inset-bottom));
        .image {
          width: 300rpx;
          height: 300rpx;
        }
        .view {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          width: 100vw;
          text-align: center;
          color: #b7b8c4;
        }
      }
    }
  }
}
</style>
