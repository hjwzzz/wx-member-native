<template>
  <CustomPage>
    <view class="user-info">
      <view class="wrapper-header">
        <view class="text-info" @click="gotoPage('userInfo')">
          <view class="avatarInfo">
            <view class="userImg">
              <image
                v-if="accountInfo.avatarUrl"
                :src="accountInfo.avatarUrl"
                mode="aspectFill"
              />
              <image
                v-else
                :src="`${staticUrl}/img/person.png`"
                mode="scaleToFill"
              />
            </view>
            <view class="nickName">
              {{ accountInfo.nickName }}
            </view>
          </view>
          <view class="text">
            <uni-icons type="arrowright" size="14" color="#B7B8C4" />
          </view>
        </view>
        <view class="text-info" @click="gotoPage('addressList')">
          <view
            class="avatarInfo"
            style="color: #323338; font-weight: 400; font-size: 28rpx"
          >
            收货地址
          </view>
          <view class="text">
            <uni-icons type="arrowright" size="14" color="#B7B8C4" />
          </view>
        </view>
        <view class="text-info" @click="againAuth">
          <view
            class="avatarInfo"
            style="color: #323338; font-weight: 400; font-size: 28rpx"
          >
            重新授权个人信息
          </view>
          <view class="text">
            <uni-icons type="arrowright" size="14" color="#B7B8C4" />
          </view>
        </view>
      </view>
      <view class="logout" @click="handleLogout"> 退出登录 </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { getMemberInfo, updateMemberBaseInfo } from '@/api/server';
import Router from '@/utils/router';
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';
const initBasicsData = useBasicsData();
const accountInfo = ref<any>({});
const gotoPage = (code: string) => Router.goCodePage(code);

const againAuth = async () => {
  const { userInfo }: any = await uni.getUserProfile({ desc: 'weixin' });

  accountInfo.value.avatarUrl = userInfo.avatarUrl;
  accountInfo.value.nickName = userInfo.nickName;
  updateMemberBaseInfo({
    avatarUrl: userInfo.avatarUrl,
    nickName: userInfo.nickName,
  })
    .then(() => {
      queryUserInfo();
    });
};
const queryUserInfo = async () => {
  const { code, data } = await getMemberInfo('');
  if (code === 0 && data) {
    accountInfo.value = data;
  }
};
queryUserInfo();
const handleLogout = () => {
  initBasicsData.setUseMid('');
  uni.showToast({
    title: '退出成功',
    icon: 'none',
  });
  setTimeout(() => {
    Router.goCodePage('wm_index');
  }, 500);
};
</script>

<style scoped lang="scss">
.user-info {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 90vh;
  background: #f5f5f5;
  padding: 30rpx 30rpx 0 30rpx;
  display: flex;
  flex-direction: column;
  .wrapper-header {
    background: #ffffff;
    border-radius: 16rpx;
    .avatarInfo {
      display: flex;
      align-items: center;
    }
    .text-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx;
      .userImg {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        overflow: hidden;
        margin-right: 20rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .nickName {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .text-info + .text-info {
      border-top: 1rpx solid #ebedf0;
    }
  }

  .logout {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    text-align: center;
    margin: 0 auto;
    margin-top: 60rpx;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
