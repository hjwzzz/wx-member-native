<template>
  <view class="popularity-rank-page">
    <!-- <image class="rank-bg-img" src="https://img.dev.jqzplat.com/12D3868F/COMM/17706d46-20220519.jpg" mode="widthFix"></image> -->
    <view class="popularity-rank-body">
      <!-- <view class="rank-tabs">
				<u-tabs
					:list="tabList"
					:is-scroll="false"
					:current="tabIndex"
					height="94"
					font-size="28"
					bar-width="48"
					active-color="#FC4C39"
					:bar-style="{ bottom: '-6rpx' }"
					@change="changeTab"
				></u-tabs>
			</view> -->
      <view v-show="tabIndex == 0 && !isEmpty" class="rank-list-box">
        <rank-list-template :list="rankList" hasTop />
        <empty-template v-show="rankList.length <= 3" />
      </view>
      <view v-show="tabIndex == 1 && !isEmpty" class="friend-list-box">
        <friend-list-template :list="friendList" />
      </view>
      <empty-template v-show="isEmpty" :type="tabIndex == 0 ? 1 : 2" />
    </view>
    <view class="popularity-rank-footer">
      <image
        class="rank-user-avatar"
        :src="userInfo.avatarUrl"
        mode="aspectFill"
      ></image>
      <view class="rank-user-name">
        <block v-if="isLogin">{{ userInfo.wxNickName }}</block>
        <block v-else>您还未登录</block>
      </view>
      <view class="rank-user-info">
        <view class="rank-user-item">
          我的人气值：<text class="rank-user-num">{{
            userInfo.userPopularityNum
          }}</text>
        </view>
        <view class="rank-user-item">
          当前排名：<text class="rank-user-num">{{ userInfo.userRank }}</text>
        </view>
      </view>
      <button v-if="!isLogin" class="rank-login-btn" @click="onLogin">
        登录
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import RankListTemplate from '../component/RankList/index.vue';
import FriendListTemplate from '../component/FriendList/index.vue';
import EmptyTemplate from '../component/Empty/index.vue';
import {
  getActInfo,
  queryPopularityActivityJoinRecordRanking,
  queryUserPopularityPage,
} from '@/activity-pages/api/popularity';
import { onLoad, onReachBottom, onShow } from '@dcloudio/uni-app';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';

const initBasicsData = useBasicsData();
const actId = ref('');
const openId = ref('');
const optionsInfo = ref('');
const rankList = ref([]);
const friendList = ref([]);
const tabList = ref([
  {
    id: 1,
    name: '人气排名',
  },
  {
    id: 2,
    name: '助力好友',
  },
]);
const tabIndex = ref(0);
const userInfo = reactive({
  avatarUrl: 'https://static.jqzplat.com/popularity/user-bg.png',
  wxNickName: '--',
  userPopularityNum: '--',
  userRank: '--',
});
const isEmpty = ref(false);
const isLogin = ref(false);
const curPage = ref(1);
const pageSize = ref(20);
const total = ref(0);

onLoad((options: any) => {
  optionsInfo.value = options;
  actId.value = options.actId;
  openId.value = uni.getStorageSync('openId') || '';
  if (!openId.value) {
    isLogin.value = initBasicsData.checkLogin;
  } else {
    isLogin.value = true;
  }
  console.log('this.isLogin', isLogin.value);
  if (isLogin.value) {
    getUserInfo();
  }
});
onShow(() => {
  getList();
});
const onLogin = () => {
  Router.goLogin();
  // const params = {
  // 	pages: '/activity/popularity/rank/index',
  // 	...this.options
  // }
  // handleLogin(params)
};
const changeTab = (e: number) => {
  console.log('changeTab', e);
  tabIndex.value = e;
  isEmpty.value = false;
  curPage.value = 1;
  total.value = 0;
  getList();
};
const getList = () => {
  const index = tabIndex.value;
  if (index === 0) getRankList();
  if (index === 1) getFriendList();
};
// 获取活动用户排名
const getUserInfo = () => {
  const params = {
    id: actId.value,
    openId: openId.value,
  };
  getActInfo(params, false)
    .then(res => {
      console.log('res', res);
      if (res.code === 0) {
        const info = res.data;
        info.userPopularityNum = Number(info.userPopularityNum || 0);
        info.userRank = Number(info.userRank || 0);
        // this.userInfo = info
        Object.assign(userInfo, info);
      }
    });
};
// 获取排行榜信息
const getRankList = () => {
  const params = {
    id: actId.value,
    openId: openId.value,
  };
  queryPopularityActivityJoinRecordRanking(params, true)
    .then(res => {
      console.log('res', res);
      if (res.code === 0) {
        const { data = [] } = res;
        rankList.value = data;
        isEmpty.value = data.length === 0;
      }
    });
};
// 获取助力好友信息
const getFriendList = () => {
  const params = {
    actId: actId.value,
    curPage: curPage.value,
    pageSize: pageSize.value,
    openId: openId.value,
  };
  queryUserPopularityPage(params, true)
    .then(res => {
      console.log('res', res);
      if (res.code === 0) {
        const { records = [], totalPage = 0 } = res.data;
        friendList.value = records;
        isEmpty.value = records.length === 0;
        total.value = Number(totalPage);
      }
    });
};
// 上拉加载
onReachBottom(() => {
  if (tabIndex.value === 1 && curPage.value * pageSize.value < total.value) {
    curPage.value += 1;
    getFriendList();
  }
});
</script>
<style lang="scss" scoped>
.popularity-rank-page {
  position: relative;
  padding-top: 350rpx;
  padding-bottom: 124rpx;
  min-height: 100vh;
  background-color: #fff;
  background-image: url('https://img.dev.jqzplat.com/12D3868F/COMM/17706d46-20220519.jpg');
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  box-sizing: border-box;
  .rank-bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .popularity-rank-body {
    position: relative;
    z-index: 2;
    border-radius: 30rpx 30rpx 0 0;
    background-color: #fff;
    overflow: hidden;
  }
  .rank-tabs {
    border-bottom: 1rpx solid #eeeeee;
  }
  :deep(.rank-list-box) {
    padding: 0 68rpx;
    .rank-list {
      padding-bottom: 12rpx;
    }
    .rank-title-item:last-child {
      transform: translateX(-30rpx);
    }
    .rank-item-num:last-child {
      margin-right: 30rpx;
      min-width: 72rpx;
      text-align: center;
    }
  }
  .friend-list-box {
    padding: 38rpx 60rpx 0;
    :deep(.rank-list) {
      padding-bottom: 12rpx;
    }
  }
  :deep(.empty-box) {
    margin-top: 116rpx;
  }
  :deep(.empty-tip) {
    margin-top: 60rpx;
  }

  .popularity-rank-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
    padding: 20rpx;
    padding-left: 146rpx;
    width: 100%;
    height: 124rpx;
    color: #999;
    line-height: 34rpx;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  .rank-user-avatar {
    position: absolute;
    top: 20rpx;
    left: 32rpx;
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
  }
  .rank-user-name {
    color: #333;
    font-size: 28rpx;
    font-weight: bold;
    line-height: 40rpx;
  }
  .rank-user-info {
    display: flex;
    margin-top: 10rpx;
  }
  .rank-user-item {
    margin-right: 34rpx;
    &:last-child {
      margin-right: 0;
    }
  }
  .rank-user-num {
    color: #fc4c39;
  }
  .rank-login-btn {
    display: flex;
    position: absolute;
    top: 50%;
    right: 30rpx;
    width: 152rpx;
    height: 72rpx;
    align-items: center;
    color: #ffe898;
    font-size: 28rpx;
    line-height: 40rpx;
    justify-content: center;
    border-radius: 36rpx;
    background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
    transform: translateY(-50%);
  }
}
</style>
