<template>
  <CustomPage>
    <view class="user-info">
      <view class="wrapper-header">
        <view
          class="header"
          v-for="(item, index) in header"
          :key="index"
          @click="handleUpdate(item)"
        >
          <view class="left"> {{ item.name }} </view>
          <view class="right userImg" v-if="item.code === 'img'">
            <image :src="item.value" mode="aspectFit"></image>
          </view>
          <view class="right" v-else>
            <text>{{ item.value || '' }}</text>
            <uni-icons
              type="arrowright"
              size="14"
              color="#B7B8C4"
              v-if="item.code == 'phone'"
            ></uni-icons>
          </view>
        </view>
      </view>
      <view class="wrapper-info">
        <template v-for="(item, index) in setList">
          <!--				纪念日-->
          <view
            class="info"
            :key="index"
            @click="updateInfo(item)"
            v-if="item.code.code == 'PRIVATE_FIELD_MDAY' && userInfo.annday"
          >
            <view class="left">
              {{ item.code.name }}
            </view>
            <view class="text-info">
              <view class="right text">
                {{ userInfo.annday || '' }}
              </view>
              <uni-icons
                type="arrowright"
                size="14"
                color="#B7B8C4"
                v-if="item.update === 'Y'"
              >
              </uni-icons>
            </view>
          </view>
          <!--				非纪念日-->
          <view
            class="info"
            @click="updateInfo(item)"
            :key="index"
            v-if="item.code.code !== 'PRIVATE_FIELD_MDAY'"
          >
            <view class="left">
              {{ item.code.name }}
              <view
                class="rilian"
                v-if="item.code.code == 'PRIVATE_FIELD_BIRTH'"
              >
                <radio-group class="selecte-redio" @change="radioChange">
                  <label
                    class="selecte-redio"
                    v-for="(radio, index) in items"
                    :key="radio.name"
                    style="transform: scale(0.7)"
                  >
                    <view>
                      <radio
                        :value="radio.value"
                        :checked="radio.value === userInfo.birthKind"
                        :color="initBasicsData.mainColor"
                      />
                    </view>
                    <view>{{ radio.name }}</view>
                  </label>
                </radio-group>
              </view>
            </view>
            <view class="text-info">
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_NAME'"
              >
                {{ userInfo.name || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_EMAIL'"
              >
                {{ userInfo.email || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_BELONG_STORE'"
              >
                <!-- 归属门店 -->
                {{ userInfo.belongDistName || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_SEX'"
              >
                <picker
                  @change="bindPickerChangeGender"
                  :value="genderIndex"
                  :range="gender"
                  v-if="item.update === 'Y'"
                >
                  <view class="uni-input">{{ gender[genderIndex] }}</view>
                </picker>
                <view class="uni-input" v-else>{{ gender[genderIndex] }}</view>
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_BELONG_SELLER'"
              >
                <!-- 专属导购 -->
                {{ userInfo.belongUser || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_LOCATION'"
              >
                {{ userInfo.province ? userInfo.province + '/' : ''
                }}{{ userInfo.city ? userInfo.city + '/' : ''
                }}{{ userInfo.district ? userInfo.district + '/' : ''
                }}{{ userInfo.address || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_CRED_NO'"
              >
                {{ userInfo.identNo || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_PROFESSION'"
              >
                <!-- #ifdef MP -->
                <!-- <picker mode="multiSelector" @columnchange="columnChangePro" :range="cityListPro"
									:value="cityIndexPro" @change="bindCityChangePro" v-if="item.update == 'Y'">
								<view>
									{{profession || '未设置'}}
								</view>
							</picker>
							<view v-else>
								{{profession || '未设置'}}
							</view> -->
                <view>{{ profession || '未设置' }} </view>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <view v-if="item.update == 'Y'">
                  {{ profession || '未设置' }}
                </view>
                <view v-else>
                  {{ profession || '未设置' }}
                </view>
                <!-- #endif -->
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_EDUCATION'"
              >
                <picker
                  @change="bindPickerChange"
                  :value="edcIndex"
                  :range="educations"
                  v-if="item.update === 'Y'"
                >
                  <view class="uni-input">{{
                    educations[edcIndex] || '未设置'
                  }}</view>
                </picker>
                <view class="uni-input" v-else>
                  {{ educations[edcIndex] || '未设置' }}
                </view>
              </view>
              <view
                class="text des-text"
                v-if="item.code.code == 'PRIVATE_FIELD_BIRTH'"
              >
                <text v-if="userInfo.birthKind == 'S'">{{
                  userInfo.birthSolar || ''
                }}</text>
                <text v-else-if="userInfo.birthKind == 'U'">{{
                  userInfo.birthSolar || ''
                }}</text>
                <text v-else>{{ userInfo.birthLunar || '' }}</text>
              </view>
              <!--						<view-->
              <!--							class="right text"-->
              <!--							v-if="item.code.code == 'PRIVATE_FIELD_MDAY' && userInfo.annday"-->
              <!--						>-->
              <!--							{{ userInfo.annday || "" }}-->
              <!--						</view>-->
              <uni-icons
                type="arrowright"
                size="14"
                color="#B7B8C4"
                v-if="item.update === 'Y'"
              >
              </uni-icons>
            </view>
          </view>
        </template>
      </view>
      <view class="rili">
        <uni-calendar
          :date="initDate"
          ref="calendar"
          :lunar="true"
          :insert="false"
          @confirm="confirmDate"
        >
        </uni-calendar>
      </view>
      <u-select
        v-model="show"
        mode="mutil-column-auto"
        :z-index="10"
        :list="selecteList"
        @confirm="confirm"
        :default-value="defaultValue"
      />
      <!-- 产品要求这里的退出登陆 迁移到设置 先藏好， -->
      <view class="logout" @click="handleLogout">退出登录</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import {
  getMemberInfo,
  queryPrivateFieldSetting,
  queryProfessionAsCate,
} from '@/api/server';
import CustomPage from '@/components/CustomPage/index.vue';
import { useBasicsData } from '@/store/basicsData';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import Lunar from '@/utils/date';
import router from '@/utils/router';
import { formatTime } from '@/utils/util';
const initBasicsData = useBasicsData();

const header = ref();
const setList = ref<any[]>([]);
const items = [
  {
    value: 'S',
    name: '阳历',
  },
  {
    value: 'L',
    name: '农历',
  },
];
const genderIndex = ref(2);
const gender = ['男', '女', '未知'];
const edcIndex = 1;
const educations = [
  '小学',
  '初中',
  '高中',
  '专科',
  '本科',
  '硕士',
  '博士',
  '其他',
];
const proCached = ref([]);
const selecteList: any[] = [];
const userInfo = ref<any>({});
const profession = ref();
const initDate = formatTime(new Date())
  .substring(0, 10);
const cityIndexPro = ref([0, 0]);
const current = ref();
const show = ref(false);
const phoneSet = ref({});
const defaultValue = '111';
const handleUpdate = (e: any) => [e];
const updateInfo = ({
  code: { code },
  update,
}: {
  code: { code: string };
  update: string;
}) => {
  // 页面离开时存储归属门店，联动专属导购
  if (code === 'PRIVATE_FIELD_BELONG_STORE') {
    uni.setStorage({
      key: 'belongDistName',
      data: userInfo.value.belongDistName,
    });
  }
  if (update !== 'Y') return;
  const { belongDistId } = userInfo.value;
  if (code === 'PRIVATE_FIELD_PROFESSION') {
    show.value = true;
  }
  if (code === 'PRIVATE_FIELD_BELONG_SELLER' && !belongDistId) {
    uni.showModal({
      content: '请先选门店',
      showCancel: false,
    });
    return;
  }
  switch (code) {
    case 'PRIVATE_FIELD_BELONG_STORE': {
      try {
        router.goCodePage('storeInfo');
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case 'PRIVATE_FIELD_BELONG_SELLER': {
      router.goCodePage('updateGuide');
      break;
    }
    case 'PRIVATE_FIELD_LOCATION': {
      router.goCodePage('location');
      break;
    }
    case 'PRIVATE_FIELD_CRED_NO': {
      router.goCodePage('cert');
      break;
    }
    case 'PRIVATE_FIELD_MDAY': {
      handleOpen({ name: 'mday' });
      break;
    }
    case 'PRIVATE_FIELD_BIRTH': {
      handleOpen({ name: 'birth' });
      break;
    }
    case 'PRIVATE_FIELD_EDUCATION': {
      break;
    }
    case 'PRIVATE_FIELD_EMAIL': {
      router.goCodePage('email');
      break;
    }
    case 'PRIVATE_FIELD_NAME': {
      router.goCodePage('names');
      break;
    }

    default:
      break;
  }

  // selectedItem[code]();
};
const calendar = ref();
const handleOpen = (item: { name: any }) => {
  const { name } = item;
  const mark = 'mday';
  const birthSolar = userInfo.value.birthSolar;
  const annday = userInfo.value.annday;
  //   if (name == mark) {
  //     initDate = annday;
  //     anchor = "A";
  //   } else {
  //     initDate = birthSolar;
  //     anchor = "B";
  //   }
  console.log(calendar.value);

  calendar.value.open();
};
const confirmDate = (e: any) => {
  const nl = `${e.lunar.gzYear} - ${e.lunar.IMonthCn} - ${e.lunar.IDayCn}`;
  if (anchor === 'A') {
    userInfo.value.annday = e.fulldate;
    updateUserIno({ annday: e.fulldate });
  } else if (anchor === 'B') {
    userInfo.value.birthSolar = e.fulldate;
    userInfo.value.birthLunar = nl;
    const kind = items[current.value].value;
    userInfo.value.birthKind = kind;
    updateUserIno({
      birthKind: kind,
      birthSolar: e.fulldate,
    });
  }
};
const radioChange = (e: any) => [e];
const bindPickerChangeGender = (e: any) => [e];
const bindPickerChange = (e: any) => [e];
const confirm = (e: any) => [e];
const handleLogout = (e: any) => [e];
onLoad(() => {
  querySetting();
  queryPro();
});
const querySetting = async () => {
  const { code, data } = await queryPrivateFieldSetting('');
  if (code === 0 && data) {
    const list = data;
    const mark = 'PRIVATE_FIELD_PHONE';
    setList.value = list.filter((i: { code?: any }) => {
      if (i.code.code === mark) {
        phoneSet.value = i;
        return false;
      }
      return true;
    });
  }
};
const queryPro = async () => {
  const parmas = '';
  const { code, data } = await queryProfessionAsCate(parmas);
  if (code === 0 && data?.length) {
    proCached.value = data;
    console.log(data);
  }

  queryUserInfo();
};
const queryUserInfo = async () => {
  const { code, data } = await getMemberInfo('');
  if (code === 0 && data) {
    userInfo.value = data;
    console.log({ ...userInfo.value });

    // 计算农历生日
    if (data.birthSolar) {
      const [a, b, c] = data.birthSolar ? data.birthSolar.split('-') : [];
      const r = Lunar.toLunar(a, b, c);
      data.birthLunar = `${r[3]}-${r[5]}-${r[6]}`;
    }
    const {
      phone,
      avatarUrl,
      nickName,
      // belongDistId,
      // belongUid,
      // belongUser,
      // belongDistName,
      // education,
      proId,
      sex,
      birthKind,
    } = data;

    const list = [
      {
        name: '个人头像',
        value: avatarUrl || 'https://static.jqzplat.com/img/person.png',
        code: 'img',
      },
      {
        name: '昵称',
        value: nickName,
        code: 'nickName',
      },
      {
        name: '手机号',
        value: phone,
        code: 'phone',
      },
    ];
    header.value = list;
    const formatDateType = (i: string) => ({ S: 0, L: 1, U: null }[i] || null);
    current.value = formatDateType(birthKind);
    // const formatGenderType = (i: string) => ({ M: '男', F: '女', U: '未知' }[i] || );
    const formatGenderIndex = (i: string) => ({ M: 0, F: 1, U: 2 }[i] || 2);
    genderIndex.value = formatGenderIndex(sex);
    proCached.value.some((i: any, idx) => {
      i?.professionList?.some((j: any, jIdx: number) => {
        if (j.id === proId) {
          cityIndexPro.value = [idx, jIdx];
          return true;
        }
      });
    });
    // this.cityListPro[1].splice(0, this.cityListPro[1].length);

    // if (this.cityJsonPro && this.cityIndexPro[0]) {
    //   this.cityJsonPro[this.cityIndexPro[0]].map(item => {
    //     this.cityListPro[1].push(item);
    //   });
    // }

    // if (this.cityListPro[1] && this.cityIndexPro[1]) {
    //   this.profession = this.cityListPro[1][this.cityIndexPro[1]][0];
    // }
    !profession.value && (profession.value = data.proName);
  }
};
</script>

<style scoped lang="scss">
.user-info {
  width: 100%;
  height: 100%;
  color: #323338;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx 30rpx 0 30rpx;
  font-size: 28rpx;
  .wrapper-header {
    width: 690rpx;
    // height: 328rpx;
    background: #ffffff;
    border-radius: 16rpx;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1rpx #ebedf0;
      padding: 30rpx;

      .left {
        // width: 112rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323233;
        line-height: 40rpx;
      }

      .right {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #9697a2;
        line-height: 40rpx;
      }

      .userImg {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .header:last-child {
      border-bottom: none;
    }
  }

  .wrapper-info {
    width: 690rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin-top: 30rpx;

    .info {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1rpx #ebedf0;
      padding: 30rpx;

      .left {
        display: flex;
        align-items: center;

        .rilian {
          display: inline-block;
        }

        .selecte-redio {
          display: flex;
          align-items: center;
        }
      }
    }

    .info:last-child {
      border-bottom: none;
    }

    .text-info {
      display: flex;
      align-items: center;
      color: #9697a2;
      .text {
        width: 480rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: right;
      }

      .des-text {
        width: 300rpx;
      }
    }

    .right-write {
      flex: 1;
      text-align: right;
      justify-content: flex-end;

      input {
        width: 100%;
      }
    }
  }

  .logout {
    display: 'none';
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    text-align: center;
    // margin: 0 auto;
    margin-top: 60rpx;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
