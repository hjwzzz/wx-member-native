<template>
  <CustomPage>
    <view class="user-info">
      <view class="wrapper-header">
        <view
          class="header"
          v-for="item in header"
          :key="item.code"
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
        <template v-for="item in setList" :key="item.code.code">
          <!--				纪念日-->
          <view
            class="info"
            :key="item.code.code"
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
            :key="item.code.code"
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
                    v-for="radio in items"
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
                  :disabled="item.update === 'N'"
                >
                  <view class="uni-input">{{ gender[genderIndex] }}</view>
                </picker>
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
                {{ userInfo.fullAddress }}
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
                <picker
                  mode="multiSelector"
                  :range="showProfession"
                  range-key="name"
                  @change="professionChange"
                  @columnchange="(e: any) => professionsIdx[e.detail.column] = e.detail.value"
                >
                  <view>{{ userInfo.proName || '未设置' }} </view>
                </picker>
              </view>
              <view
                class="right text"
                v-if="item.code.code == 'PRIVATE_FIELD_EDUCATION'"
              >
                <picker
                  @change="(e:any)=>updateUserIno({education:  parseInt(e.target.value) *10 })"
                  :value="edcIndex"
                  :range="educations"
                  :disabled="item.update === 'N'"
                >
                  <view class="uni-input">{{
                    educations[edcIndex] || '未设置'
                  }}</view>
                </picker>
              </view>
              <view
                class="text des-text"
                v-if="item.code.code == 'PRIVATE_FIELD_BIRTH'"
              >
                <!-- 农历、公历切换显示 -->
                <text v-if="['S', 'U'].includes(userInfo.birthKind)">{{
                  userInfo.birthSolar || ''
                }}</text>
                <text v-else>{{ userInfo.birthLunar || '' }}</text>
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
      <uni-popup ref="popup" :maskClick="popup?.close?.()" type="dialog">
        <uni-popup-dialog
          mode="input"
          :value="dialogValue"
          :title="dialogTitle"
          placeholder="请输入"
          is-mask-click
          confirmText="确认"
          :before-close="true"
          @close="popup.close()"
          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>

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
  updateMemberInfo,
} from '@/api/server';
import CustomPage from '@/components/CustomPage/index.vue';
import { useBasicsData } from '@/store/basicsData';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
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

const selecteList: any[] = [];
const userInfo = ref<any>({});

const current = ref();
const show = ref(false);
const phoneSet = ref({});
const defaultValue = '111';
const handleUpdate = (e: any) => [e];

const popup = ref();
const dialogTitle = ref('');
const dialogValue = ref('');
const dialogKey = ref('');
const updateInfo = ({
  code: { code },
  update,
}: {
  code: { code: string };
  update: string;
}) => {
  if (update !== 'Y') return;
  switch (code) {
    case 'PRIVATE_FIELD_BELONG_STORE': {
      // 选择门店时，更新归属门店
      uni.$once('chooseStore', e => {
        updateUserIno({
          belongDistId: e.distId,
          belongDistName: e.storeName,
          // 切换门店时候，清空导购信息
          ...userInfo.value.belongDistId !== e.distId && {
            belongUid: null,
            belongUser: null,
          },
        });
      });
      router.goCodePage(
        'storeInfo',
        `?belong=true&id=${userInfo.value.belongDistId}`
      );
      break;
    }
    case 'PRIVATE_FIELD_BELONG_SELLER': {
      // 更新导购
      uni.$once('updateGuide', e => {
        if (!e.uid) return;
        updateUserIno({
          belongUid: e.uid,
          belongUser: e.name,
        });
      });
      if (userInfo.value.belongDistId) {
        router.goCodePage('updateGuide', `?id=${userInfo.value.belongDistId}`);
        return;
      }
      uni.showModal({
        content: '请先选门店',
        showCancel: false,
      });
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
      dialogTitle.value = '修改邮箱';
      dialogKey.value = 'email';
      dialogValue.value = userInfo.value.email;
      popup.value.open();
      // router.goCodePage('email');
      break;
    }
    case 'PRIVATE_FIELD_NAME': {
      dialogKey.value = 'name';
      dialogTitle.value = '修改姓名';
      dialogValue.value = userInfo.value.name;
      popup.value.open();
      break;
    }

    default:
      break;
  }

  // selectedItem[code]();
};
// 弹框修改姓名、邮箱等信息
const dialogConfirm = (e: string) => {
  let str = '';
  const reg =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (dialogKey.value === 'name' && e.length < 1) {
    str = '请输入姓名';
  } else if (dialogKey.value === 'email' && !reg.test(e)) {
    str = '请输入合法邮箱';
  } else {
    updateUserIno({ [dialogKey.value]: e });
    popup.value.close();
    return;
  }
  uni.showToast({
    icon: 'none',
    title: str,
  });
};
// 日期修改（日历选择器）
const calendar = ref();
const isBirthDay = ref(false);
const initDate = ref(formatTime(new Date())
  .substring(0, 10));
const handleOpen = (item: { name: any }) => {
  const { name } = item;
  const mark = 'mday';
  const birthSolar = userInfo.value.birthSolar;
  const annday = userInfo.value.annday;
  isBirthDay.value = name !== mark;
  if (name === mark) {
    initDate.value = annday;
  } else {
    initDate.value = birthSolar;
  }
  calendar.value.open();
};
const updateUserIno = async (item: any, refresh = false) => {
  const { code } = await updateMemberInfo(item);
  if (code === 0) {
    Object.assign(userInfo.value, item);
    refresh && querySetting();
  }
};
const confirmDate = (e: any) => {
  const nl = `${e.lunar.gzYear} - ${e.lunar.IMonthCn} - ${e.lunar.IDayCn}`;
  if (!isBirthDay.value) {
    updateUserIno({ annday: e.fulldate });
  } else {
    userInfo.value.birthLunar = nl;
    updateUserIno({
      birthKind: items[current.value].value,
      birthSolar: e.fulldate,
    });
  }
};
const radioChange = (e: any) => {
  userInfo.value.birthKind = e.detail.value;
  current.value = items.findIndex(i => i.value === e.detail.value);
};
const bindPickerChangeGender = (e: any) => {
  genderIndex.value = e.detail.value;
  updateUserIno({ sex: ['M', 'F', 'U'][genderIndex.value] });
};

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
    // 分离出电话号码栏
    setList.value = list.filter((i: { code?: any }) => {
      if (i.code.code !== mark) return true;
      phoneSet.value = i;
    });
  }
};

// 用户职业
const professions = ref<any[]>([]);
const professionsIdx = ref([0, 0]);
const showProfession = computed(() => {
  const one: any = professions.value[professionsIdx.value[0]];
  return [professions.value ?? [], one?.professionList ?? []];
});
const queryPro = async () => {
  const parmas = '';
  const { code, data } = await queryProfessionAsCate(parmas);
  if (code === 0 && data?.length) {
    professions.value = data;
  }
  queryUserInfo();
};
const professionChange = (e: any) => {
  const [one, two] = e.detail.value;
  const item =
    professions.value[one].professionList?.[two] ?? professions.value[one];

  updateUserIno({
    proName: item.name,
    proId: item.id,
  });
};

const queryUserInfo = async () => {
  const { code, data } = await getMemberInfo('');
  if (code === 0 && data) {
    // 拼接完整地址
    const { province, city, district, address } = data;
    data.fullAddress =
      [province, city, district, address].filter(Boolean)
        .join('/') ?? '';

    userInfo.value = data;

    // 计算农历生日
    if (data.birthSolar) {
      const [a, b, c] = data.birthSolar ? data.birthSolar.split('-') : [];
      const r = Lunar.toLunar(a, b, c);
      data.birthLunar = `${r[3]}-${r[5]}-${r[6]}`;
    }
    const { phone, avatarUrl, nickName, proId, sex, birthKind } = data;
    header.value = [
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

    // 日期类型（公历/农历）
    const formatDateType = (i: string) => ({ S: 0, L: 1, U: null }[i] ?? null);
    current.value = formatDateType(birthKind);

    // 性别
    const formatGenderIndex = (i: string) => ({ M: 0, F: 1, U: 2 }[i] ?? 2);
    genderIndex.value = formatGenderIndex(sex);
    professions.value.some((i: any, idx) => i?.professionList?.some((j: any, jIdx: number) => {
      if (j.id === proId) {
        professionsIdx.value = [idx, jIdx];
        return true;
      }
    }));
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
    display: none;
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
:deep(.uni-button-color) {
  color: var(--main-color);
}
</style>
