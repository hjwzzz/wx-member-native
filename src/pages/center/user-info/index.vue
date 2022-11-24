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
          <view class="left" style="flex: 1"> {{ item.name }} </view>
          <UserIcon
            :disabled="!FieldObj[IInfoField.avatar]"
            style="height: 80rpx"
            :modelValue="userInfo.avatarUrl"
            @update:modelValue="(e: any) =>updateUserIno({ avatarUrl: e })"
            v-if="item.key === 'avatarUrl'"
          >
            <image
              class="userImg"
              :src="userInfo.avatarUrl"
              mode="aspectFill"
            ></image>
            <uni-icons
              v-if="FieldObj[IInfoField.avatar]"
              type="arrowright"
              size="14"
              color="#B7B8C4"
            ></uni-icons>
          </UserIcon>
          <view class="right" v-else>
            <text>{{ userInfo[item.key] || '' }}</text>
          </view>
          <uni-icons
            type="arrowright"
            size="14"
            v-if="FieldObj[item.code] && item.code !== IInfoField.avatar"
            color="#B7B8C4"
          ></uni-icons>
        </view>
      </view>
      <view class="wrapper-info">
        <template v-for="item in setList" :key="item.code">
          <!--				纪念日-->
          <view
            class="info"
            :key="item.code"
            @click="updateInfo(item)"
            v-if="item.code == IInfoField.Mday && userInfo.annday"
          >
            <view class="left">
              {{ item.codeName }}
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
            :key="item.code"
            v-if="
              !['PRIVATE_FIELD_MDAY', 'PRIVATE_FIELD_SEX'].includes(item.code)
            "
          >
            <view class="left">
              {{ item.codeName }}
              <view class="rilian" v-if="item.code == 'PRIVATE_FIELD_BIRTH'">
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
                        :disabled="item.update === 'N'"
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
              <view class="right text" v-if="item.code == 'PRIVATE_FIELD_NAME'">
                {{ userInfo.name || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_EMAIL'"
              >
                {{ userInfo.email || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_BELONG_STORE'"
              >
                <!-- 归属门店 -->
                {{ userInfo.belongDistName || '' }}
              </view>
              <view class="right text" v-if="item.code == 'PRIVATE_FIELD_SEX'">
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
                v-if="item.code == 'PRIVATE_FIELD_BELONG_SELLER'"
              >
                <!-- 专属导购 -->
                {{ userInfo.belongUser || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_LOCATION'"
              >
                {{ mergeFullAddress(userInfo) }}
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_CRED_NO'"
              >
                {{ userInfo.identNo || '' }}
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_PROFESSION'"
              >
                <picker
                  mode="multiSelector"
                  :range="showProfession"
                  range-key="name"
                  :disabled="item.update === 'N'"
                  @change="professionChange"
                  @columnchange="(e: any) => professionsIdx[e.detail.column] = e.detail.value"
                >
                  <view>{{ userInfo.proName || '未设置' }} </view>
                </picker>
              </view>
              <view
                class="right text"
                v-if="item.code == 'PRIVATE_FIELD_EDUCATION'"
              >
                <picker
                  @change="updateEdu"
                  :value="edcIndex"
                  :range="educations"
                  range-key="code"
                  :disabled="item.update === 'N'"
                >
                  <view class="uni-input">{{
                    educations[edcIndex]?.code || '未设置'
                  }}</view>
                </picker>
              </view>
              <view
                class="text des-text"
                v-if="item.code == 'PRIVATE_FIELD_BIRTH'"
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
          <picker
            @change="bindPickerChangeGender"
            :value="genderIndex"
            :range="gender"
            :disabled="item.update === 'N'"
            key="PRIVATE_FIELD_SEX"
            v-else-if="item.code === 'PRIVATE_FIELD_SEX'"
          >
            <view class="info bB1">
              <view class="left">
                {{ item.codeName }}
              </view>
              <view class="text-info">
                <view class="right text">
                  <view class="uni-input">{{ gender[genderIndex] }}</view>
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
          </picker>
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
      <uni-popup
        ref="popup"
        input
        :nickname="dialogKey === 'nickName'"
        @maskClick="popup?.close"
        type="dialog"
      >
        <uni-popup-dialog
          v-if="dialogTitle"
          :key="dialogKey"
          mode="input"
          :value="dialogValue"
          :title="dialogTitle"
          placeholder="请输入"
          :nickname="dialogKey === 'nickName'"
          is-mask-click
          confirmText="确认"
          :before-close="true"
          @close="popup.close()"
          @confirm="dialogConfirm"
        ></uni-popup-dialog>
      </uni-popup>

      <!-- 产品要求这里的退出登陆 迁移到设置 先藏好， -->
      <!-- <view class="logout" @click="handleLogout">退出登录</view> -->
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
import { onShow } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import Lunar from '@/utils/date';
import router from '@/utils/router';
import { formatTime, mergeFullAddress } from '@/utils/util';
import { IPrivateFieldItem, IInfoField } from '@/api/types/server';
import UserIcon from '@/pages/login/UserIcon.vue';
const initBasicsData = useBasicsData();

const header = computed(() => [
  {
    name: '个人头像',
    code: IInfoField.avatar,
    key: 'avatarUrl',
  },
  {
    name: '昵称',
    code: IInfoField.nickName,
    key: 'nickName',
  },
  {
    name: '手机号',
    code: IInfoField.Phone,
    key: 'phone',
  },
].filter(({ code }) => showObj.value[code]));

const setList = ref<IPrivateFieldItem[]>([]);
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
const edcIndex = ref(0);
const educations = [
  {
    code: '小学',
    value: 10,
  },
  {
    code: '初中',
    value: 20,
  },
  {
    code: '高中',
    value: 30,
  },
  {
    code: '专科',
    value: 40,
  },
  {
    code: '本科',
    value: 50,
  },
  {
    code: '硕士',
    value: 60,
  },
  {
    code: '博士',
    value: 70,
  },
  {
    code: '其他',
    value: 0,
  },
];

onShow(() => {
  querySetting();
  queryPro();
});

const userInfo = ref<any>({});
const FieldObj = ref<{ [key: string]: boolean }>({});
const showObj = ref<{ [key: string]: boolean }>({});
const current = ref();
const handleUpdate = async ({ code, key }: any) => {
  if (!FieldObj.value[code]) return;
  const value = userInfo.value[key];
  if (key === 'phone') {
    router.goCodePage('updatePhone', `?phone=${value}`);
  } else if (key === 'nickName') {
    openPopupInput('nickName', '修改昵称', value);
  }
};
const openPopupInput = (key: string, title: string, value: string) => {
  dialogKey.value = key;
  dialogTitle.value = title;
  dialogValue.value = value;
  setTimeout(popup.value.open, 0);
};
const popup = ref();
const dialogTitle = ref('');
const dialogValue = ref('');
const dialogKey = ref('');
const updateInfo = async ({
  code,
  update,
}: {
  code: string;
  update: string;
}) => {
  if (update !== 'Y') return;
  switch (code) {
    case IInfoField.Store: {
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
        'chooseStore',
        `?belong=true&id=${userInfo.value.belongDistId || ''}`
      );
      break;
    }
    case IInfoField.Seller: {
      // 更新导购
      uni.$once('updateGuide', e => {
        if (!e.uid) return;
        const { belongDistId, belongDistName } = userInfo.value;
        updateUserIno({
          belongDistId,
          belongDistName,
          belongUid: e.uid,
          belongUser: e.name,
        });
      });
      if (userInfo.value.belongDistId) {
        router.goCodePage('chooseGuide', `?id=${userInfo.value.belongDistId}`);
        return;
      }
      uni.showModal({
        content: '请先选门店',
        showCancel: false,
      });
      break;
    }
    case IInfoField.Location: {
      router.goCodePage('location');
      break;
    }
    case IInfoField.CredNo: {
      router.goCodePage('cert');
      break;
    }
    case IInfoField.Mday: {
      handleOpen({ name: 'mday' });
      break;
    }
    case IInfoField.BirthDay: {
      handleOpen({ name: 'birth' });
      break;
    }
    case IInfoField.Education: {
      break;
    }
    case IInfoField.Email: {
      openPopupInput('email', '修改邮箱', userInfo.value.email);

      break;
    }
    case IInfoField.Name: {
      openPopupInput('name', '修改姓名', userInfo.value.name);

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
    dialogTitle.value = '';
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
const updateEdu = (e: any) => {
  edcIndex.value = e.detail.value;
  const { value } = educations[e.detail.value];
  updateUserIno({ education: value });
};
const updateUserIno = async (item: any, refresh = false) => {
  const { code } = await updateMemberInfo(item);
  if (code === 0) {
    Object.assign(userInfo.value, item);
    refresh && querySetting();
    uni.showToast({ title: '更新成功' });
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

const querySetting = async () => {
  const { code, data } = await queryPrivateFieldSetting('');
  if (code === 0 && data) {
    setList.value = data.filter(i => {
      FieldObj.value[i.code] = i.update === 'Y';
      showObj.value[i.code] = i.show === 'Y';
      // 分离出电话号码、头像、昵称等三栏
      if (
        ![IInfoField.Phone, IInfoField.nickName, IInfoField.avatar].includes(i.code as IInfoField)
      ) return true;
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
    data.avatarUrl ||= 'https://static.jqzplat.com/img/person.png';
    userInfo.value = data;
    // 计算农历生日
    if (data.birthSolar) {
      const [a, b, c] = data.birthSolar ? data.birthSolar.split('-') : [];
      const r = Lunar.toLunar(a, b, c);
      data.birthLunar = `${r[3]}-${r[5]}-${r[6]}`;
    }
    // 日期类型（公历/农历） 默认公历
    if (!data.birthKind || data.birthKind === 'U') data.birthKind = 'S';
    const { proId, sex, birthKind, education } = data;
    edcIndex.value = educations.findIndex(i => i.value === education);
    current.value = birthKind === 'S' ? 0 : 1;

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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #323338;
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
    .bB1 {
      border-bottom: solid 1rpx #ebedf0 !important;
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
