<template>
  <CustomPage bottom>
    <view class="user">
      <view class="login-info">
        <view class="user-info">
          <view class="info-left" @click="handleQuickUrl({ code: 'userInfo' })">
            <view class="info-img">
              <image
                class="image"
                v-if="initBasicsData.checkLogin && userInfo.avatarUrl"
                :src="userInfo.avatarUrl"
                mode="scaleToFill"
              />
              <image
                v-else
                class="avatar"
                :src="imageUrl + 'img/person.png'"
                mode="scaleToFill"
              />
            </view>
            <view v-if="initBasicsData.checkLogin" class="use-info">
              <text>{{ userInfo.nickName || '' }}</text>
            </view>
            <view v-else class="info-btn" @click.stop="Router.goCodePage('reg')"
              >请先登录</view
            >
          </view>
          <view
            class="info-right"
            @click="handleQuickUrl({ code: 'installCenter' })"
          >
            <image
              class="setting"
              :src="imageUrl + 'img/setInfo.png'"
              mode="scaleToFill"
            />
          </view>
        </view>
        <!--  -->
        <view class="login-list">
          <block v-for="(item, index) in loginList" :key="index">
            <view
              class="login-item"
              v-if="item.showed"
              @click="handleQuickUrl(item)"
            >
              <view class="item-num">{{
                item.accountValue !== ' ' ? item.accountValue : 0
              }}</view>
              <view class="login-list-item-name">{{ item.title }}</view>
            </view>
          </block>
        </view>
      </view>
      <!-- 查看权益 @click="handleFixedSysUrl('benefits')" -->
      <view
        class="boot-equity"
        v-if="initBasicsData.checkLogin"
        @click="handleFixedSysUrl()"
      >
        <view class="boot-equity-left">
          <!-- <view class="icon">
            <image
              class="image"
              :src="staticUrl + 'img/level.png'"
              mode="aspectFit"
            />
          </view> -->
          <image
            class="icon-image"
            :src="staticUrl + 'img/level.png'"
            mode="aspectFit"
          />
          <view class="text">{{ userInfo.curLevelName || '' }}</view>
        </view>
        <view class="boot-equity-right">
          <text class="text">查看权益</text>
          <uni-icons type="arrowright" size="14" color="#975d17"></uni-icons>
        </view>
      </view>
    </view>
    <view class="reveal-grid">
      <block v-for="(item, index) in panelList" :key="index">
        <view class="grid-list" v-if="item.kind === entryType.EN">
          <!-- GONGGE  LIST -->
          <view
            :class="
              item.param.showType === 'LIST' ? 'wrapper-list' : 'wrapper-grid'
            "
            v-if="item.param.showType"
          >
            <block v-for="(entry, index) in item.param.linkList" :key="index">
              <view
                class="list-item"
                @click="handleQuickUrl(entry)"
                v-if="entry.showed"
              >
                <view class="item-icon">
                  <image
                    class="image"
                    :src="
                      entry.icoUrl || `${staticUrl}img/item-avatar-default.png`
                    "
                    mode="aspectFit"
                  />
                </view>
                <view class="item-name">{{ entry.title }}</view>
                <uni-icons
                  v-if="item.param.showType == 'LIST'"
                  type="arrowright"
                  size="14"
                  color="#B7B8C4"
                />
              </view>
            </block>
          </view>
        </view>
        <view
          class="grid-ad"
          v-else-if="item.kind === entryType.BA && bannerList.length > 0"
        >
          <swiper
            style="height: 180rpx"
            :indicator-dots="bannerList.length > 1"
            indicator-color="#D8D9E0"
            :indicator-active-color="initBasicsData.mainColor"
            autoplay
            circular
          >
            <block v-for="(entry, index) in bannerList" :key="index">
              <swiper-item>
                <image
                  @click.stop="bannerListClick(entry)"
                  class="image"
                  style="height: 180rpx"
                  :src="entry.image || entry.imgUrl"
                  mode="aspectFill"
                ></image>
              </swiper-item>
            </block>
          </swiper>
        </view>
        <!-- 今日金价 -->
        <TodayGoldPrice
          v-else-if="item.kind === entryType.GO"
          :title="item.param.title"
          type="WM_CENTER"
        />
        <!-- 积分商品推荐 -->
        <ContentMall v-else-if="item.kind === entryType.RE" />
        <!-- 我的奖品 -->
        <MyPrizes
          v-else-if="item.kind === entryType.MY"
          :item="item"
          :title="item.param.title"
          @handle="handleMyPrizes"
        />
        <!-- 预约服务 -->
        <MyService
          v-else-if="item.kind === entryType.RES"
          :title="item.param.title"
          :srvProshowNum="srvProshowNum"
        />
        <!-- 质保单 -->
        <MyQuality
          v-else-if="item.kind === entryType.WA"
          :title="item.param.title"
          :item="item"
          :policyListNum="policyListNum"
        />
      </block>
    </view>
  </CustomPage>
  <Tabbar code="wm_center"> </Tabbar>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ref, reactive, Ref, inject } from 'vue';
// import { getIndexAdBannerList } from '@/api/center';
import {
  getMemberCenterIndex,
  queryMemberCenterBannerListFront,
} from '@/pages/api/center';
//
// import { queryGoldPriceByPage } from '@/api/server';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import Tabbar from '@/components/Tabbar/index.vue';
import TodayGoldPrice from '../component/TodayGoldPrice.vue';
import ContentMall from '../component/ContentMall.vue';
import MyPrizes from '../component/MyPrizes.vue';
import MyService from '../component/MyService.vue';
import MyQuality from '../component/MyQuality.vue';

const imageUrl = staticUrl;
const initBasicsData = useBasicsData();
const entryType = {
  BA: 'BANNER',
  EN: 'ENTRANCE',
  GO: 'GOLD_PRICE',
  MY: 'MY_AWARD',
  NO: 'NOTICE',
  QR: 'ORDER',
  QU: 'QUICK_NAV',
  RE: 'REC_GIFTS',
  REC: 'REC_GOODS',
  RES: 'RES_SVC',
  RI: 'RICH_TEXT',
  WA: 'WARRANTY',
};
const userInfo = reactive({
  avatarUrl: '',
  nickName: '',
  name: '',
  curLevelName: '',
});
const loginList: Ref<any> = ref([]);
const panelList: Ref<any> = ref([]);
const bannerList: Ref<any> = ref([]);
// const goldPrice: Ref<any> = ref([]);
// const todayGoldPriceShowed = ref(false);
const srvProshowNum = ref(1);
const policyListNum = ref(0);

// const login = () => {
//   uni.navigateTo({ url: '/pages/login/index' });
// };

// onMounted(() => {
//   console.log('onMounted-onShow');
// });

const reState: any = inject('reState');
onShow(() => {
  getMemberCentertIndex();
  getBannerData();
  // getGoldPriceByPage();
  // uni.$emit('refreshComponent');
  reState.value = !reState.value;
});

const getMemberCentertIndex = async () => {
  const res = await getMemberCenterIndex('');
  if (res.code === 0 && res.data) {
    const { avatarUrl, nickName, name, wmCenterRspVo, curLevelName } = res.data;
    const quickNavList = wmCenterRspVo.param?.quickNavList || [];
    const panelListItem: any = wmCenterRspVo.panelList;
    const srvObj =
      panelListItem.find((item: any) => item.kind === entryType.RES) || {};
    const policyList =
      panelListItem.find((item: any) => item.kind === entryType.WA) || {};

    srvProshowNum.value = srvObj.param?.showNum || 1;
    policyListNum.value = policyList.param?.showNum || 0;
    userInfo.avatarUrl = avatarUrl || '';
    userInfo.nickName = nickName || name;
    userInfo.curLevelName = curLevelName;
    loginList.value = quickNavList;
    panelList.value = panelListItem;
  }
};

// 获取广告
const getBannerData = async () => {
  const res = await queryMemberCenterBannerListFront('');
  if (res.code === 0 && res.data) {
    const result: any = [];
    res.data.map((item: any) => {
      result.push({
        image: item.imgUrl,
        title: '',
        h5Url: item.h5Url,
        miniUrl: item.miniUrl,
        url: item.url,
      });
    });
    bannerList.value = result;
  }
};
const bannerListClick = (item: any) => {
  const url = JSON.parse(item.url || {});
  if (!url.code && !url.systemUrl && url.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(url.h5Url)}` });
    return;
  }
  let param = item.miniUrl?.split('?')?.[1];
  if (param) {
    param = `?${param}`;
  } else {
    param = '';
  }
  Router.goCodePage(url.code || url.systemUrl, param);
};

// 获取今日金价
// const getGoldPriceByPage = async () => {
//   if (!initBasicsData.checkLogin) {
//     return;
//   }
//   const res = await queryGoldPriceByPage('WM_CENTER');
//   if (res.code === 0 && res.data) {
//     const { branPriceList, param, uiParam: todayGoldPrice } = res.data;
//     // this.uiParam = uiParam;
//     const { showNum } = param;
//     const result: any = [];

//     branPriceList.map((item: any, index: number) => {
//       if (index < showNum) {
//         result.push(item);
//       }
//     });
//     todayGoldPriceShowed.value = todayGoldPrice.todayGoldPriceShowed === 'Y';
//     goldPrice.value = result;
//   }
// };

const handleFixedSysUrl = () => {
  uni.navigateTo({ url: '/pages/member-equity/index' });
};
const handleMyPrizes = (index: number) => {
  Router.goCodePage('my_prize', `?tab=${index}`);
};
const handleQuickUrl = (item: any) => {
  // if (initBasicsData.checkLogin) {
  let param = item.miniUrl?.split('?')?.[1];
  if (param) {
    param = `?${param}`;
  } else {
    param = '';
  }
  Router.goCodePage(item.code, param);
  // }
};
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 400rpx;
  background-image: url('https://static.jqzplat.com/web/c_default_center_bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .login-info {
    height: 295rpx;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40rpx 30rpx;

    .info-left {
      display: flex;
      align-items: center;

      .info-img {
        width: 100rpx;
        height: 100rpx;
        overflow: hidden;
        border: 4rpx solid #fff;
        border-radius: 70rpx;

        .image {
          width: 100rpx;
          height: 100rpx;
        }

        .avatar {
          width: 100%;
          height: 100%;
        }
      }

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

      .use-info {
        margin-left: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .info-right {
      width: 64rpx;
      height: 64rpx;
      overflow: hidden;
      background: rgb(255 255 255 / 50%);
      border-radius: 32rpx;

      .setting {
        width: 100%;
        height: 100%;
      }
    }
  }

  .login-list {
    display: flex;
    justify-content: space-around;

    .login-item {
      text-align: center;

      .item-num {
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }

      .login-list-item-name {
        height: 28rpx;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #b7b8c4;
      }
    }
  }
}

.boot-equity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 630rpx;
  height: 104rpx;
  padding: 0 30rpx;
  margin: 0 auto;
  background: linear-gradient(90deg, #ffefd2 0%, #ffddad 100%);
  border-radius: 16rpx 16rpx 0rpx 0rpx;

  .boot-equity-left {
    display: flex;
    align-items: center;
    height: 104rpx;

    .icon-image {
      width: 32rpx;
      height: 32rpx;
    }
    // .icon {
    //   // display: inline-block;
    //   width: 32rpx;
    //   height: 32rpx;
    //   // overflow: hidden;
    //   margin-top: -4 + rpx;
    //   .image {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }

    .text {
      height: 40rpx;
      margin-left: 12rpx;
      font-size: 28rpx;
      font-weight: 800;
      line-height: 40rpx;
      color: #975d17;
    }
  }

  .boot-equity-right {
    display: flex;
    align-items: center;
    height: 104rpx;
    // :deep(.uni-icons) {
    //   margin-top: -8rpx;
    // }
    .text {
      width: 96rpx;
      height: 32rpx;
      margin-right: 6rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 32rpx;
      color: #975d17;
      margin-top: 2rpx;
    }
  }
}

.reveal-grid {
  position: relative;
  z-index: 999;
  // width: 750rpx;
  // padding: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 35rpx;
  margin-top: -5rpx;
  background: #f5f5f5;
  box-shadow: 0px -10rpx 20rpx -10rpx rgba(0, 0, 0, 0.1);
  border-radius: 16rpx 16rpx 0px 0px;
}

.grid-list {
  padding: 20 30rpx;
  overflow: hidden;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 30rpx;

  .wrapper-list {
    padding: 0rpx 30rpx;

    .list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      border-bottom: solid 1rpx #f8f8f8;
      // padding: 0 20rpx;
      .item-icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 30rpx;
        overflow: hidden;
        line-height: 48rpx;
        background: #fff;
        border-radius: 12rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        padding-right: 12rpx;
        font-size: 28rpx;
        .badge {
          width: 20rpx;
          height: 20rpx;
          background: #ff4c4c;
          border-radius: 16rpx;
        }
      }

      .more {
        width: 10rpx;
        color: #b7b8c4;
      }
    }

    .list-item:last-child {
      border-bottom: none;
    }
  }

  .wrapper-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 20rpx 0;

    .list-item {
      position: relative;
      display: inline-block;
      width: 25%;
      padding: 20rpx 0;
      text-align: center;

      .badge {
        position: absolute;
        top: 14rpx;
        right: 38rpx;
        z-index: 100;
        width: 20rpx;
        height: 20rpx;
        background: #ff4c4c;
        border-radius: 16rpx;
      }

      .item-icon {
        width: 88rpx;
        height: 88rpx;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 22rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .item-name {
        width: 100%;
        height: 34rpx;
        margin-top: 16rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.grid-ad {
  width: 690rpx;
  // height: 180rpx;
  margin: 30rpx 0rpx;
  overflow: hidden;
  // line-height: 180rpx;
  border-radius: 16rpx;

  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
