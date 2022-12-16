<template>
  <view class="rank">
    <view class="rank-top">
      <view
        class="rank-top-detail"
        v-for="(item, index) in tabs"
        :key="index"
        :class="active === index ? 'active' : ''"
        @click="select(index)"
        >{{ item }}</view
      >
    </view>
    <view class="rank-content">
      <view class="rank-content-detail" v-if="active === 0">
        <view v-if="rankData.inviteDetail.length">
          <view class="rank-content-detail-header">
            <view class="rank-content-detail-header-seq">排序</view>
            <view class="rank-content-detail-header-seq">好友</view>
            <view class="rank-content-detail-header-seq">注册时间</view>
          </view>
          <view class="rank-content-detail-content">
            <view
              class="rank-content-detail-content-box"
              v-for="(item, index) in rankData.inviteDetail"
              :key="index"
            >
              <view class="rank-content-detail-content-box-text">{{
                index + 1
              }}</view>
              <view class="rank-content-detail-content-box-text">
                <image
                  :src="item.avatarUrl || defineAvatarUrl"
                  class="rank-content-detail-content-box-text-img"
                  mode="aspectFill"
                >
                  <!-- <view slot="error" style="display: flex">
                    <image
                      src="https://static.jqzplat.com/img/67d3c46a-4409-43f1-9698-6b9454f541a1.png"
                      mode="widthFix"
                      class="rank-content-detail-content-box-text-img"
                    />
                  </view> -->
                </image>
                <view class="rank-content-detail-content-box-text-text">{{
                  item.wxNickName
                }}</view>
              </view>
              <view class="rank-content-detail-content-box-text">{{
                item.createTime
              }}</view>
            </view>
          </view>
        </view>
        <Empty msg="暂无邀请数据，再接再厉哦~" v-else />
      </view>
      <view class="rank-content-detail" v-else>
        <view v-if="rankData.rankDetail.length">
          <view class="rank-content-detail-header">
            <view class="rank-content-detail-header-seq">排名</view>
            <view class="rank-content-detail-header-seq">微信昵称</view>
            <view class="rank-content-detail-header-seq">邀请人数</view>
          </view>
          <view class="rank-content-detail-content">
            <view
              class="rank-content-detail-content-box"
              v-for="(item, index) in rankData.rankDetail"
              :key="index"
            >
              <view
                class="rank-content-detail-content-box-text"
                v-if="index > 2"
                >{{ index + 1 }}</view
              >
              <view class="rank-content-detail-content-box-text" v-else>
                <image
                  :src="rankIcon[index]"
                  mode="widthFix"
                  class="rank-content-detail-content-box-text-rankIcon"
                />
              </view>
              <view class="rank-content-detail-content-box-text">
                <image
                  :src="item.avatarUrl || defineAvatarUrl"
                  class="rank-content-detail-content-box-text-img"
                >
                  <!-- <view slot="error" style="display: flex">
                    <image
                      src="https://static.jqzplat.com/img/67d3c46a-4409-43f1-9698-6b9454f541a1.png"
                      mode="widthFix"
                      class="rank-content-detail-content-box-text-img"
                    />
                  </view> -->
                </image>
                <view class="rank-content-detail-content-box-text-text">{{
                  item.wxNickName
                }}</view>
              </view>
              <view class="rank-content-detail-content-box-text">{{
                item.inviteNum
              }}</view>
            </view>
          </view>
        </view>
        <Empty msg="暂无排名数据，赶紧去抢沙发吧~" v-else />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Empty from '../Empty/index.vue';

defineProps({
  rankData: {
    type: Object,
    default: () => ({
      inviteDetail: [],
      rankDetail: [],
    }),
  },
});
const emits = defineEmits(['change']);

const active = ref(0);
const tabs = ref(['邀请明细', '邀请排名']);
const rankIcon = ref([
  'https://static.jqzplat.com/img/7d132741-a2b6-4a61-ac65-2b382b637688.png',
  'https://static.jqzplat.com/img/e8b5d62d-2c86-4670-b778-895c16caaf0e.png',
  'https://static.jqzplat.com/img/23030c55-54d1-4c27-b04d-bac0e6864fc1.png',
]);
const defineAvatarUrl =
  'https://static.jqzplat.com/img/67d3c46a-4409-43f1-9698-6b9454f541a1.png';
const select = (index: number) => {
  active.value = index;
  emits('change', index);
};
</script>
<style lang="scss" scoped>
.rank {
  .active {
    background: #fff;
    font-weight: bold;
  }
  &-top {
    display: flex;
    justify-content: space-between;

    &-detail {
      text-align: center;
      width: 50%;
      height: 100rpx;
      line-height: 100rpx;
      background: #fff6eb;
    }
  }
  &-content {
    &-detail {
      &-header {
        padding: 35rpx 35rpx 35rpx 20rpx;
        display: flex;
        &-seq {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #8b8b8b;
          &:nth-child(1) {
            width: 78rpx;
            text-align: center;
          }
          &:nth-child(3) {
            width: 178rpx;
            text-align: right;
          }
          &:nth-child(2) {
            flex: 1;
            text-align: left;
            padding-left: 30rpx;
          }
        }
      }
      &-content {
        padding: 35rpx 35rpx 35rpx 20rpx;
        max-height: 940rpx;
        overflow: auto;

        &-box {
          display: flex;
          align-items: center;
          padding: 15rpx 0;
          border-bottom: 1rpx solid #eee;
          &:last-child {
            border-bottom: none;
          }
          &-text {
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #8b8b8b;
            text-align: left;
            width: 100%;
            &:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 78rpx;
              font-size: 24rpx;
              font-family: HelveticaNeue-Bold, HelveticaNeue;
              font-weight: bold;
              color: #595959;
              flex-shrink: 0;
            }
            &:nth-child(3) {
              width: 240rpx;
              text-align: right;
              flex-shrink: 0;
            }
            &:nth-child(2) {
              flex: 1;
              font-size: 28rpx;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #191919;
              display: flex;
              align-items: center;
            }
            &-img {
              width: 60rpx !important;
              height: 60rpx !important;
              margin-right: 10rpx;
              flex-shrink: 0;
              border-radius: 100% !important;
            }
            &-rankIcon {
              width: 40rpx;
              height: 40rpx;
              margin-right: 5rpx;
              flex-shrink: 0;
            }
            &-text {
              flex: 1;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: normal !important;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>
