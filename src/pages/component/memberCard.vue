<template>
  <view
    class="member-card"
    :class="`member-card-style${userInfo.doOut?.fixedStyle + 1}`"
  >
    <!--  -->
    <view class="member-card-top">
      <view
        class="member-card-top-user"
        @click="handleEntryUrl({ code: 'userInfo' })"
      >
        <view class="member-card-avatar">
          <image
            class="member-card-avatar-image"
            :src="
              initBasicsData.checkLogin && userInfo.avatarUrl
                ? userInfo.avatarUrl
                : staticUrl + 'img/person.png'
            "
            mode="scaleToFill"
          />
        </view>
        <text class="member-card-name nowrap" v-if="initBasicsData.checkLogin">
          {{ userInfo.nickName || '' }}
        </text>
        <view v-else class="info-btn" @click.stop="Router.goCodePage('reg')">
          请先登录
        </view>
      </view>
      <view class="member-card-top-right">
        <!-- sing-style1-2     sing-style0-3  sign-->
        <view
          class="member-card-top-right-sing"
          :class="
            userInfo.doOut?.fixedStyle === 0 || userInfo.doOut?.fixedStyle === 1
              ? 'sing-style1-2'
              : 'sing-style0-3'
          "
          @click="handleEntryUrl({ code: 'sign' })"
          v-if="userInfo.showSignIn"
        >
          <image
            v-if="
              userInfo.doOut?.fixedStyle === 0 ||
              userInfo.doOut?.fixedStyle === 1
            "
            class="member-card-top-right-sing-image"
            :src="staticUrl + 'img/sign-icon1.png'"
            mode="scaleToFill"
          />
          <image
            v-else
            class="member-card-top-right-sing-image"
            :src="staticUrl + 'img/sign-icon2.png'"
            mode="scaleToFill"
          />
          <!-- sign-icon2 -->
          <text class="member-card-top-right-sing-text"> 签到</text>
        </view>
        <image
          class="member-card-top-right-image"
          :src="staticUrl + `img/qr-icon${showIcon.qrIcon}.png`"
          mode="scaleToFill"
          @click="emits('showCode')"
          v-if="initBasicsData.checkLogin"
        />
        <image
          class="member-card-top-right-image"
          :src="staticUrl + `img/set-icon${showIcon.qrIcon}.png`"
          mode="scaleToFill"
          @click="handleEntryUrl({ code: 'installCenter' })"
        />
      </view>
    </view>
    <view class="member-card-list">
      <!-- {{ props.loginList }} -->
      <block v-for="(item, index) in props.loginList" :key="index">
        <!-- {{ item }} -->
        <view
          class="member-card-list-item"
          v-if="item.showed"
          @click="handleEntryUrl(item)"
        >
          <view class="member-card-list-item-price nowrap"
            >{{ item.accountValue !== ' ' ? item.accountValue : 0 }}
          </view>
          <view class="member-card-list-item-name"> {{ item.title }} </view>
        </view>
      </block>
    </view>
    <block v-if="initBasicsData.checkLogin">
      <view
        class="member-card-bottom"
        v-if="
          userInfo.doOut?.fixedStyle === 0 || userInfo.doOut?.fixedStyle === 1
        "
      >
        <view class="member-card-bottom-box">
          <view class="card-start-center">
            <image
              class="member-card-bottom-member-icon"
              :src="staticUrl + 'img/member-icon1.png'"
              mode="scaleToFill"
            />
            <text class="member-card-bottom-member-name nowrap">
              {{ userInfo.curLevelName || '' }}
            </text>
          </view>
          <view class="card-start-center" @click="handleFixedSysUrl()">
            <text class="member-card-bottom-member-ri-text"> 查看权益</text>
            <image
              class="member-card-bottom-member-ri"
              :src="staticUrl + 'img/member-r2.png'"
              mode="scaleToFill"
            />
          </view>
        </view>
        <!-- showGrowthValue: false
showSignIn: false -->
        <view class="" v-if="userInfo.showGrowthValue">
          <view class="member-card-bottom-bar">
            <view
              class="member-card-bottom-bar-act"
              :style="{ width: memberLevel.percentage }"
            >
            </view>
          </view>
          <view class="member-card-bottom-other">
            <text
              >成长值{{ memberLevel.growth }}/{{ memberLevel.allGrowth }}
            </text>
            <text>距下一等级还需{{ memberLevel.nextUpgradeGrowth }} </text>
          </view>
        </view>
        <!--  memberLevel.growth: 0,
  nextUpgradeGrowth: 0,
  allGrowth: computed(() => memberLevel.growth + memberLevel.nextUpgradeGrowth), -->
      </view>
      <!--  -->
      <view class="member-card-bottom-style-btn" v-else>
        <view class="member-card-bottom-btn">
          <view class="card-start-center member-card-bottom-btn-zz">
            <image
              class="member-card-bottom-member-icon"
              :src="staticUrl + 'img/member-icon1.png'"
              mode="scaleToFill"
            />
            <text class="member-card-bottom-member-name nowrap">
              {{ userInfo.curLevelName || '' }}
            </text>
          </view>
          <view class="" v-if="userInfo.showGrowthValue">
            <view class="member-card-bottom-bar">
              <!-- percentage -->
              <view
                class="member-card-bottom-bar-act"
                :style="{ width: memberLevel.percentage }"
              >
              </view>
            </view>
            <!--  <text
              >成长值{{ memberLevel.growth }}/{{ memberLevel.allGrowth }}
            </text>
            <text>距下一等级还需{{ memberLevel.nextUpgradeGrowth }} </text> -->
            <view class="member-card-bottom-other">
              <text>
                成长值{{ memberLevel.growth }}/{{ memberLevel.allGrowth }}
              </text>
              <text>距下一等级还需{{ memberLevel.nextUpgradeGrowth }} </text>
            </view>
          </view>
        </view>
        <view class="member-card-bottom-style-btn-text">
          <text class="member-card-bottom-member-btn-text"> 查看权益</text>
          <image
            class="member-card-bottom-member-ri"
            :src="staticUrl + 'img/member-r1.png'"
            mode="scaleToFill"
          />
        </view>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { computed, reactive } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import { handleEntryUrl } from '@/utils/util';
import { getMemberLevelRights } from '@/pages/api/member-equity';

const initBasicsData = useBasicsData();

interface Props {
  userInfo: any;
  loginList: any;
}
const props = withDefaults(defineProps<Props>(), {
  userInfo: () => ({}),
  loginList: () => [],
});
const emits = defineEmits(['showCode']);

onShow(() => {
  getMemberLevel();
  // console.log('getMemberLevel1111111111111111');
});

const memberLevel: any = reactive({
  growth: 0,
  nextUpgradeGrowth: 0,
  allGrowth: computed(() => memberLevel.growth + memberLevel.nextUpgradeGrowth),
  percentage: computed(() => {
    if (memberLevel.allGrowth > 0) {
      const allGr = memberLevel.growth / memberLevel.allGrowth * 100;
      return `${allGr}%`;
    }
    return '0%';
  }),
});
const getMemberLevel = async () => {
  // initBasicsData
  if (initBasicsData.checkLogin) {
    const res = await getMemberLevelRights('');
    memberLevel.growth = res.data?.growth || 0;
    memberLevel.nextUpgradeGrowth = res.data?.nextUpgradeGrowth || 0;
  }
  // getMemberLevelRights
};
// getMemberLevel();

const handleFixedSysUrl = () => {
  uni.navigateTo({ url: '/pages/member-equity/index' });
};

// showIcon.qrIcon
const showIcon = computed(() => {
  if (props.userInfo.doOut?.fixedStyle === 0) {
    return { qrIcon: 2 };
  }
  if (props.userInfo.doOut?.fixedStyle === 1) {
    return { qrIcon: 3 };
  }
  if (props.userInfo.doOut?.fixedStyle === 2) {
    return { qrIcon: 1 };
  }
  return { qrIcon: 2 };
});
</script>

<style lang="scss" scoped>
.info-btn {
  width: 176rpx;
  height: 60rpx;
  margin-left: 20rpx;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 60rpx;
  color: #fff;
  text-align: center;
  background: #ff547b;
  border-radius: 30rpx;
}

.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.member-card-style1 {
  background: linear-gradient(90deg, #ffeed3, #ffe1bc);
  color: #323338;
  .member-card-list-item-name {
    color: #32333869;
  }
}

.member-card-style2 {
  background: linear-gradient(90deg, #3d3e40, #2b2d31);
  color: #fbe7c3;
}

.member-card-style3 {
  // background: linear-gradient(90deg, #ff56436b, rgba(255, 255, 255, 0.7));
  color: #323338;
}

.member-card {
  // margin-bottom: 30rpx;
  font-size: 28rpx;
  min-height: 300rpx;
  border-radius: 16rpx;

  .card-start-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .member-card-top {
    padding-top: 10rpx;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24rpx;
    padding-right: 24rpx;

    .member-card-top-user {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .member-card-avatar {
      width: 80rpx;
      height: 80rpx;
      border: 4rpx solid #ffffff;
      border-radius: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .member-card-avatar-image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }
    .member-card-name {
      font-size: 32rpx;
      font-weight: 700;
      margin-left: 20rpx;
      width: 250rpx;
    }
    .member-card-top-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .member-card-top-right-image {
      width: 48rpx;
      height: 48rpx;
      margin-left: 24rpx;
    }
    .sing-style1-2 {
      background: #f8e1b6;
      color: #965b10;
    }
    .sing-style0-3 {
      // background: #f8e1b6;
      background-color: rgba(255, 255, 255, 0.5);
      color: #323338;
    }
    .member-card-top-right-sing {
      width: 130rpx;
      height: 60rpx;

      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .member-card-top-right-sing-image {
      width: 32rpx;
      height: 32rpx;
    }
    .member-card-top-right-sing-text {
      font-size: 24rpx;
      font-weight: 400;

      margin-left: 8rpx;
    }
  }
  .member-card-list {
    padding-bottom: 20rpx;
    height: 130rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12rpx;
    padding-right: 12rpx;
    .member-card-list-item {
      min-width: 25%;
      flex-grow: 1;
    }
    .member-card-list-item-price {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50rpx;
      font-size: 32rpx;
      font-weight: 700;
    }
    .member-card-list-item-name {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
    }
  }
  .member-card-bottom {
    padding-left: 24rpx;
    padding-right: 24rpx;
    // width: 355px;

    background: linear-gradient(0deg, #0b0b0d, #474138);
    border-radius: 16rpx;
    color: #fbe7c3;

    .member-card-bottom-box {
      height: 88rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .member-card-bottom-member-icon {
      height: 40rpx;
      width: 40rpx;
    }
    .member-card-bottom-member-name {
      font-weight: 800;
      color: #fbe7c3;
      margin-left: 12rpx;
      width: 280rpx;
    }
    .member-card-bottom-member-ri {
      height: 24rpx;
      width: 24rpx;
    }
    .member-card-bottom-member-ri-text {
      font-size: 24rpx;
      font-weight: 400;
      color: #fbe7c3;
      margin-right: 12rpx;
    }
    .member-card-bottom-bar {
      height: 4rpx;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4rpx;
      .member-card-bottom-bar-act {
        width: 100px;
        height: 4rpx;
        background: #fbe7c3;
        border-radius: 4rpx;
      }
    }
    .member-card-bottom-other {
      height: 76rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20rpx;
      color: #fbe7c3;
    }
  }
  //
  .member-card-bottom-style-btn {
    padding-left: 24rpx;
    padding-right: 24rpx;
    background: linear-gradient(0deg, #ff5543, #ff523f);
    border-radius: 16rpx;
    color: #fbe7c3;
    min-height: 108rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .member-card-bottom-btn-zz {
      height: 80rpx;
    }
    .member-card-bottom-btn {
      flex-grow: 1;
      padding-right: 24rpx;
    }

    .member-card-bottom-style-btn-text {
      width: 176rpx;
      height: 60rpx;
      background: linear-gradient(90deg, #fee6cc, #fee6cc);
      border-radius: 30rpx;
      color: #71393d;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .member-card-bottom-member-icon {
      height: 40rpx;
      width: 40rpx;
    }
    .member-card-bottom-member-name {
      font-weight: 800;
      color: #fbe7c3;
      margin-left: 12rpx;
      width: 280rpx;
    }
    .member-card-bottom-member-ri {
      height: 24rpx;
      width: 24rpx;
    }
    .member-card-bottom-member-btn-text {
      font-size: 24rpx;
      font-weight: 400;
      margin-right: 12rpx;
      color: #71393d;
    }
    .member-card-bottom-bar {
      height: 4rpx;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4rpx;
      .member-card-bottom-bar-act {
        width: 100px;
        height: 4rpx;
        background: #fbe7c3;
        border-radius: 4rpx;
      }
    }
    .member-card-bottom-other {
      height: 76rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20rpx;
      color: #fbe7c3;
    }
  }
}
</style>
