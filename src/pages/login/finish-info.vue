<template>
  <page-meta
    :page-style="'overflow:' + (birthCalendarPickerShow ? 'hidden' : 'visible')"
  ></page-meta>
  <CustomPage>
    <view class="info">
      <view
        v-for="(info, index) in showList"
        :key="info.code"
        class="list"
        :class="{ last: index === list.length - 1, first: index === 0 }"
      >
        <view
          v-if="
            ![
              IRegistField.Name,
              IRegistField.nickName,
              IRegistField.avatar,
            ].includes(info.code)
          "
          :key="info.code"
          class="list-item"
          @click="handle(info)"
        >
          <!-- 生日 农历 阴历    -->
          <view class="selected-item">
            <view class="left">
              <view v-show="info.required == 'Y'" class="left-icon"> * </view>
              <view class="left-text">
                {{ info.name }}
              </view>
              <!--						生日-->
              <view v-show="info.code == BIRTH_DAY" class="radio">
                <radio-group class="selecte-redio" @change="radioChange">
                  <label
                    v-for="item in items"
                    :key="item.value"
                    class="selecte-redio"
                    style="transform: scale(0.7)"
                  >
                    <view>
                      <radio
                        :disabled="!inactiveMemberControl.canModifyBirth"
                        :value="item.value"
                        :checked="item.value === memberInfo.birthKind"
                        :color="initBasicsData.mainColor"
                      />
                    </view>
                    <view>{{ item.name }}</view>
                  </label>
                </radio-group>
              </view>
              <!--						婚姻-->
            </view>
            <view class="right">
              <!-- 生日 -->
              <view v-show="info.code == BIRTH_DAY" class="date-format">
                <view class="wrapper">
                  <text v-if="memberInfo.birthKind === 'L'">
                    {{ memberInfo.birthLunar || '' }}
                  </text>
                  <text v-else>
                    {{ memberInfo.birthSolar || '' }}
                  </text>
                </view>
              </view>
              <!-- 纪念日 -->
              <view
                v-show="info.code === MDAY && memberInfo.annday"
                class="guid"
              >
                <text>{{ showAnnday || memberInfo.annday }}</text>
              </view>
              <!-- 导购 -->
              <view
                v-show="
                  info.code === 'REGIST_REQUIRED_SELLER' &&
                  memberInfo.belongUser
                "
                class="guid"
              >
                <text>{{ memberInfo.belongUser }}</text>
              </view>
              <view
                v-show="info.code === 'REGIST_REQUIRED_ADDRESS'"
                class="guid"
              >
                <text class="letter">
                  {{ memberInfoAddressDet }}
                </text>
              </view>
              <!-- 性别 -->
              <view v-show="info.code === GENDER" class="guid">
                <picker
                  @change="bindPickerChangeGender"
                  :value="showSex"
                  range-key="label"
                  :range="selecteList"
                  :disabled="!inactiveMemberControl.canModifySex"
                >
                  <view class="uni-input">{{
                    selecteList[showSex].label
                  }}</view>
                </picker>
              </view>
              <!--婚姻-->
              <view v-show="info.code === maritalCode" class="guid">
                <picker
                  :disabled="!inactiveMemberControl.canModifyMarital"
                  @change="maritalChange"
                  :value="maritalValue"
                  :range="['已婚', '未婚']"
                >
                  <view class="uni-input">{{
                    ['已婚', '未婚'][parseInt(maritalValue)]
                  }}</view>
                </picker>
              </view>
              <view
                v-show="
                  info.code === 'REGIST_REQUIRED_AREA' && memberInfoAddressDet
                "
                class="guid"
              >
                <text>{{ memberInfoAddressDet }}</text>
              </view>
              <uni-icons color="#B7B8C4" type="arrowright" size="14" />
            </view>
          </view>
          <view
            v-show="info.code == shop"
            v-if="
              selectedShop.tel ||
              selectedShop.storeName ||
              selectedShop.range ||
              selectedShop.fullAddress
            "
            class="item-shop"
          >
            <view class="shop-name">
              <view class="name-left text-break">
                {{ selectedShop.storeName || '' }}
              </view>
              <view class="name-right">
                <text v-show="selectedShop.range">
                  {{ selectedShop.range }} km
                </text>
              </view>
            </view>
            <view v-if="selectedShop.fullAddress" class="shop-address">
              <image
                class="address-icon"
                :src="`${staticUrl}prize/store/address.png`"
                mode="scaleToFill"
              />

              <view class="address-text">
                {{ selectedShop.fullAddress }}
              </view>
            </view>
            <view v-if="selectedShop.tel" class="shop-phone">
              <image
                class="phone-icon"
                :src="`${staticUrl}prize/store/phone.png`"
                mode="scaleToFill"
              />

              <view class="phone-code">
                {{ selectedShop.tel }}
              </view>
            </view>
          </view>
        </view>
        <view v-else-if="info.code === IRegistField.Name" class="inpu-item">
          <view class="input-left">
            <text v-show="info.required == 'Y'" class="input-icon"> * </text>
            <text class="input-name">
              {{ info.name }}
            </text>
          </view>
          <view class="input-right">
            <input
              class="cR"
              v-model="memberInfo.name"
              type="text"
              maxlength="20"
              placeholder-style="color:#d8d9e0;font-size:28rpx;"
              :placeholder="'请输入' + info.name"
              :disabled="!inactiveMemberControl.canModifyName"
            />
          </view>
        </view>

        <userIcon
          v-else-if="info.code === IRegistField.avatar"
          :name="info.name"
          :required="info.required"
          v-model="memberInfo.avatarUrl"
        ></userIcon>

        <view v-else-if="info.code === IRegistField.nickName" class="inpu-item">
          <view class="input-left">
            <text v-show="info.required == 'Y'" class="input-icon">*</text>
            <text class="input-name">{{ info.name }}</text>
          </view>
          <view class="input-right">
            <input
              class="cR"
              v-model="memberInfo.nickName"
              @input="changeNickName"
              type="nickname"
              maxlength="32"
              placeholder-style="color:var(--main-color);font-size:28rpx;"
              placeholder="设置昵称"
            />
          </view>
        </view>
      </view>

      <view class="next" @click="handleStep"> 下一步 </view>
    </view>

    <CalendarPicker
      :date="birthCalendarPickerDate"
      :calendar-type="memberInfo.birthKind"
      @confirmDialog="confirmBirthCalendarPicker"
      @close-dialog="closeBirthCalendarPicker"
      ref="BirthCalendarPickerRef"
    />
    <CalendarPicker
      :date="memberInfo.annday"
      :calendar-type="CALENDAR_TYPE.SOLAR"
      @confirmDialog="confirmAnndayCalendarPicker"
      @close-dialog="closeAnndayCalendarPicker"
      :select-lunar="false"
      ref="AnndayCalendarPickerRef"
    />
  </CustomPage>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, reactive } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { onLoad } from '@dcloudio/uni-app';
import { IRegistField } from '@/api/types/server';
import {
  completeInfo,
  getMemberInfo,
  getMemberInfoUseActiveRequest,
  queryRegistRequiredSettingNew,
} from '@/api/server';

import { getNearStore } from '@/pages/api/nearby-store';
import router from '@/utils/router';
import { mergeFullAddress } from '@/utils/util';
import { staticUrl } from '@/utils/config';
import userIcon from './UserIcon.vue';
import Lunar from '@/utils/date';
import CalendarPicker from '@/components/Birthcalendar/index.vue';
import { CALENDAR_TYPE } from '@/components/Birthcalendar/index.type';
import Storage from '@/utils/storage';

const initBasicsData = useBasicsData();

const BirthCalendarPickerRef = ref();

const birthCalendarPickerShow = ref(false);

const birthCalendarPickerDate = ref('');

watch(
  () => birthCalendarPickerShow.value,
  () => {
    if (birthCalendarPickerShow.value) {
      BirthCalendarPickerRef.value?.open();
    } else {
      BirthCalendarPickerRef.value?.close();
    }
  }
);

const AnndayCalendarPickerRef = ref();

const anndayCalendarPickerShow = ref(false);

watch(
  () => anndayCalendarPickerShow.value,
  () => {
    if (anndayCalendarPickerShow.value) {
      AnndayCalendarPickerRef.value?.open();
    } else {
      AnndayCalendarPickerRef.value?.close();
    }
  }
);

const list = ref<any>([]);
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

const selecteList = [
  {
    label: '男',
    value: 'M',
  },
  {
    label: '女',
    value: 'F',
  },
  {
    label: '未知',
    value: 'U',
  },
];

const shop = 'REGIST_REQUIRED_STORE';
const saler = 'REGIST_REQUIRED_SELLER';
const MDAY = 'REGIST_REQUIRED_MDAY';
const BIRTH_DAY = 'REGIST_REQUIRED_BIRTH';
const GENDER = 'REGIST_REQUIRED_GENDER';
const maritalCode = 'REGIST_MARITAL_STATUS';
const current = ref(0);
const maritalValue = ref('0');
const memberInfo = ref<any>({});
const selectedShop = ref<any>({});
const memberInfoAddressDet = computed(() => {
  const {
    province = '',
    city = '',
    district = '',
    address = '',
  } = memberInfo.value;
  return [province, city, district, address].filter(Boolean)
    .join('/');
});
const showAnnday = ref('');
const showSex = ref(0);

const activeData = ref<any>({});
const isActivity = ref(false);
const lastPage = ref('');
const isInactiveMember = ref(uni.getStorageSync('isMember') === 'Y');
const inactiveMemberControl = reactive({
  canModifyDist: true,
  canModifySaler: true,
  canModifyBirth: true,
  canModifyName: true,
  canModifySex: true,
  canModifyAnnday: true,
  canModifyMarital: true,
  canModifyAddress: true,
});

// 欢迎语进入导购Id
const guideData = ref<string>('');
onLoad(async e => {
  lastPage.value = e.p || '';
  guideData.value = Storage.getRegData();
  if (guideData.value) {
    Storage.removeRegData();
  }
  const channel = uni.getStorageSync('c');

  // const  = 'WELCOME_MSG';
  // const guideUid = '1281D5F2-1C91-E399-D46C-0761DCD3BB89';

  const num = uni.getStorageSync('num');
  const inviteMid = uni.getStorageSync('inviteMid');
  isActivity.value = !!(channel && num);
  await queryMemeberInfo();
  if (channel && num) {
    queryWriteInfo({
      channel,
      num,
      inviteMid,
    });
  } else if (guideData.value) {
    // console.log(444);
    queryWriteInfo({
      channel: 'WELCOME_MSG',
      guideUid: guideData.value,
      inviteMid,
    });
  } else {
    queryWriteInfo({});
  }
});
const queryMemeberInfo = async () => {
  let data: any;

  if (isInactiveMember.value) {
    const res = await getMemberInfoUseActiveRequest(uni.getStorageSync('phone'));

    data = res.data;

    Object.assign(
      inactiveMemberControl,
      {
        canModifyBirth: !data.birthSolar,
        canModifyName: !data.name,
        canModifySex: !data.sex,
        canModifyMarital: !data.annday,
        canModifyAnnday: !data.annday,
        canModifyAddress: !(
          data.province ||
          data.city ||
          data.district ||
          data.address
        ),
      },
      isActivity.value
        ? {
          canModifyDist: true,
          canModifySaler: true,
        }
        : {
          canModifyDist: !(data.belongDistId && data.belongDistName),
          canModifySaler: !(data.belongUid && data.belongUser),
        }
    );
  } else {
    const res = await getMemberInfo('');
    data = res.data;
  }

  data.sex ||= 'M';

  const sexIndex = selecteList.findIndex(item => item.value === data.sex);

  showSex.value = sexIndex === -1 ? 2 : sexIndex;

  if (!data.birthKind || data.birthKind === 'U') data.birthKind = 'S';
  data.birthLunar = '';
  data.nickName === '微信用户' && (data.nickName = '');
  if (data) {
    selectedShop.value.storeName = data.belongDistName || '';
    selectedShop.value.distId = data.belongDistId || '';

    if (data.birthSolar) {
      birthCalendarPickerDate.value = data.birthSolar;
      const [a, b, c] = data.birthSolar ? data.birthSolar.split('-') : [];
      const r = Lunar.toLunar(Number(a), Number(b), Number(c));
      data.birthLunar = `${a}-${r[5]}-${r[6]}`;
    }
    memberInfo.value = data;
  }
};
// 获取附近门店
const queryNearShop = async (distId: any) => {
  const lo = uni.getStorageSync('longitude');
  const la = uni.getStorageSync('latitude');
  const parmas = {
    coordCur: lo && la ? `${lo},${la}` : '',
    storeName: '',
    distId,
  };
  const res = await getNearStore(parmas);
  if (!res.code && res.data?.length) {
    selectedShop.value = res.data[0];
  } else {
    selectedShop.value.distId = '';
  }
};
const distListArr = ref<any>([]);
const queryWriteInfo = async (p = {}) => {
  const { code, data } = await queryRegistRequiredSettingNew(p);
  if (code === 0 && data) {
    const {
      list: l,
      canModifySaler,
      canModifyDist,
      uid: belongUid,
      uname: belongUser,
      distId,
      distName: storeName,
      distList,
    } = data;
    distListArr.value = distList;
    const index = l.findIndex((item: any) => item.code === MDAY);

    if (index !== -1) {
      l.splice(index, 0, {
        show: 'Y',
        required: 'N',
        code: maritalCode,
        name: '婚姻',
      });
    }

    list.value = l;
    Object.assign(activeData.value, {
      canModifySaler,
      canModifyDist,
      belongUid,
      belongUser,
      distId: distList?.length >= 1 ? distList[0]?.distId : '',
      storeName: distList?.length >= 1 ? distList[0]?.distName : '',
    });

    // 如果是未激活会员，且是扫推广码的
    if (isInactiveMember.value && isActivity.value) {
      if (
        selectedShop.value.storeName &&
        selectedShop.value.distId &&
        memberInfo.value.belongUid &&
        memberInfo.value.belongUser
      ) {
        return;
      }
      // 如果未激活会员没有门店和导购，用推广码的门店和导购
      if (
        (!selectedShop.value.storeName || !selectedShop.value.distId) &&
        (!memberInfo.value.belongUid || !memberInfo.value.belongUser)
      ) {
        belongUid && (memberInfo.value.belongUid = belongUid);
        belongUser && (memberInfo.value.belongUser = belongUser);
        // storeName && (selectedShop.value.storeName = storeName);
        selectedShop.value.storeName =
          distList?.length >= 1 ? distList[0]?.distName : '';
        // distId && (selectedShop.value.distId = distId);
        selectedShop.value.distId =
          distList?.length >= 1 ? distList[0]?.distId : '';
        // 如果未激活会员有门店没有导购，
      } else if (
        selectedShop.value.storeName &&
        selectedShop.value.distId &&
        (!memberInfo.value.belongUid || !memberInfo.value.belongUser)
      ) {
        // 判断推广码的门店是不是跟未激活会员的门店相同
        // 相同，用推广码的导购
        // if (distId && selectedShop.value.distId === distId) {
        if (
          selectedShop.value.distId ===
          (distList?.length >= 1 ? distList[0]?.distId : '')
        ) {
          belongUid && (memberInfo.value.belongUid = belongUid);
          belongUser && (memberInfo.value.belongUser = belongUser);
        }
        // 如果未激活会员有导购没有门店，
      } else if (
        (!selectedShop.value.storeName || !selectedShop.value.distId) &&
        memberInfo.value.belongUid &&
        memberInfo.value.belongUser
      ) {
        // 判断推广码的导购是不是跟未激活会员的导购相同
        // 相同，用推广码的门店
        if (belongUid && memberInfo.value.belongUid === belongUid) {
          // storeName && (selectedShop.value.storeName = storeName);
          selectedShop.value.storeName =
            distList?.length >= 1 ? distList[0]?.distName : '';
          // distId && (selectedShop.value.distId = distId);
          selectedShop.value.distId =
            distList?.length >= 1 ? distList[0]?.distId : '';
        }
      }
    } else {
      belongUid && (memberInfo.value.belongUid = belongUid);
      belongUser && (memberInfo.value.belongUser = belongUser);
      // storeName && (selectedShop.value.storeName = storeName);
      selectedShop.value.storeName =
        distList?.length >= 1 ? distList[0]?.distName : '';
      // distId && (selectedShop.value.distId = distId);
      selectedShop.value.distId =
        distList?.length >= 1 ? distList[0]?.distId : '';
    }

    if (!isInactiveMember.value && isActivity.value) {
      distList?.length >= 1 && await queryNearShop(distList[0]?.distId);
    }

    if (!selectedShop.value.distId && !selectedShop.value.storeName) {
      inactiveMemberControl.canModifyDist = true;
    }

    if (!memberInfo.value.belongUid && !memberInfo.value.belongUser) {
      inactiveMemberControl.canModifySaler = true;
    }
  }
};

const handle = (item: any) => {
  console.log('item', item);
  if (isInactiveMember.value) {
    if (item.code === BIRTH_DAY && !inactiveMemberControl.canModifyBirth) {
      return;
    }
    if (item.code === MDAY && !inactiveMemberControl.canModifyAnnday) {
      return;
    }
    if (
      item.code === 'REGIST_REQUIRED_ADDRESS' &&
      !inactiveMemberControl.canModifyAddress
    ) {
      return;
    }

    if (item.code === shop) {
      if (selectedShop.value.storeName && selectedShop.value.distId) {
        if (isActivity.value) {
          // 判断覆盖后的门店是否可以修改
          // 如果可以修改，读配置
          if (inactiveMemberControl.canModifyDist) {
            if (!activeData.value.canModifyDist) {
              return;
            }
          } else {
            return;
          }
          // 如果不是活动进来的
        } else if (!inactiveMemberControl.canModifyDist) {
          return;
        }
      } else {
        activeData.value.canModifyDist = true;
        inactiveMemberControl.canModifyDist = true;
      }
      // 如果是活动进来的
    }
    if (item.code === saler) {
      if (memberInfo.value.belongUid && memberInfo.value.belongUser) {
        // 如果是活动进来的
        if (isActivity.value) {
          // 判断覆盖后的导购是否可以修改
          // 如果可以修改，读配置
          if (inactiveMemberControl.canModifySaler) {
            if (!activeData.value.canModifySaler) {
              return;
            }
          } else {
            return;
          }
          // 如果不是活动进来的
        } else if (!inactiveMemberControl.canModifySaler) {
          return;
        }
      }
    }
    // 如果是活动进来的
  } else if (isActivity.value) {
    // 点击门店
    if (item.code === shop) {
      // 如果活动有门店，此时是否可以修改门店受按钮状态控制
      if (activeData.value.distId && activeData.value.storeName) {
        if (!activeData.value.canModifyDist) {
          return;
        }
      }
    }
    // 点击导购
    if (item.code === saler) {
      // 如果配置有返回导购
      if (memberInfo.value.belongUid && memberInfo.value.belongUser) {
        if (!activeData.value.canModifySaler) {
          return;
        }
      }
    }
  }

  switch (item.code) {
    case 'REGIST_REQUIRED_STORE': {
      // 选择门店时，更新归属门店
      uni.$once('chooseStore', e => {
        Storage.removeDistList();
        if (e.distId !== selectedShop.value.distId) {
          activeData.value.canModifySaler = true;
          inactiveMemberControl.canModifySaler = true;
          if (!guideData.value) {
            Object.assign(memberInfo.value, {
              belongUid: '',
              belongUser: '',
            });
					}
        }
        e.fullAddress = mergeFullAddress(e);
        selectedShop.value = e;
      });
      Storage.setDistList(distListArr.value);
      router.goCodePage(
        'chooseStore',
        `?belong=true&id=${selectedShop.value.distId || ''}&t=user_info`
      );
      break;
    }
    case 'REGIST_REQUIRED_SELLER': {
      if (!guideData.value) {
        // 更新导购
        uni.$once('updateGuide', e => {
          if (!e.uid) return;
          Object.assign(memberInfo.value, {
            belongUid: e.uid,
            belongUser: e.name,
          });
        });
        if (selectedShop.value.distId) {
          router.goCodePage(
            'chooseGuide',
            `?id=${selectedShop.value.distId}&uid=${
              memberInfo.value.belongUid || ''
            }`
          );
          return;
        }
        uni.showModal({
          content: '请先选门店',
          showCancel: false,
        });
			}
      break;
    }
    case BIRTH_DAY: {
      handleOpen({ name: 'birth' });
      break;
    }
    case MDAY: {
      handleOpen({ name: 'mday' });
      break;
    }
    case 'REGIST_REQUIRED_ADDRESS': {
      uni.$once('chooseAddress', (e: any) => Object.assign(memberInfo.value, e));
      const { address, province, city, district } = memberInfo.value;
      router.goCodePage(
        'finishAddress',
        `?address=${address || ''}&area=${province || ''},${city || ''},${
          district || ''
        }`
      );
      break;
    }
    case 'REGIST_REQUIRED_AREA': {
      break;
    }
    default:
      break;
  }
};
// 过滤不显示和未婚的纪念日
const showList = computed(() => list.value.filter((item: any) => {
  if (item.show === 'N') return false;
  if (item.code === MDAY && maritalValue.value === '1') return false;
  return true;
}));
const radioChange = (e: any) => {
  memberInfo.value.birthKind = e.detail.value;
  current.value = items.findIndex(i => i.value === e.detail.value);
  openBirthCalendarPicker();
};
const maritalChange = (e: any) => {
  maritalValue.value = e.detail.value;
  if (e.detail.value === '1') {
    memberInfo.value.annday = '';
    showAnnday.value = '';
  }
};
const handleStep = async () => {
  const {
    name,

    nickName,
    province,
    city,
    district,
    address,
    annday,
    belongUid: activeUid,
    birthKind,
    birthSolar,
    sex,
    avatarUrl,
  } = memberInfo.value;
  const phone = memberInfo.value.phone || uni.getStorageSync('phone') || '';
  const params = {
    name,
    nickName,
    activeDistId: selectedShop.value.distId || null,
    activeUid,
    province,
    city,
    avatarUrl,
    district,
    address,
    inviteCode: name, // 验证码，已废弃
    annday,
    sex,
    phone,
    wmid: uni.getStorageSync('wmid') || '',
    relateKind: uni.getStorageSync('c') || undefined,
    relateNumber: uni.getStorageSync('num') || undefined,
    inviteMid: uni.getStorageSync('inviteMid') || undefined,
    birthKind: birthKind === 'U' ? 'S' : birthKind,
    birthLunar: '',
    birthSolar,
  };
  const verifyData = list.value.some((i: any) => {
    if (i.required !== 'Y') return;
    switch (i.code) {
      case 'REGIST_REQUIRED_STORE': {
        if (!params.activeDistId) {
          uni.showModal({
            content: '请选择门店',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_SELLER': {
        if (!params.activeUid) {
          uni.showModal({
            content: '请选择导购',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_BIRTH': {
        if (!params.birthSolar) {
          uni.showModal({
            content: '请选择生日',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_GENDER': {
        if (!['M', 'F', 'U'].includes(params.sex)) {
          uni.showModal({
            content: '请选择性别',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_MDAY': {
        if (maritalValue.value === '0' && !params.annday) {
          uni.showModal({
            content: '请选择纪念日',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_ADDRESS': {
        if (!params.address && !params.province) {
          uni.showModal({
            content: '请填写地址',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_INVITE_CODE': {
        if (!params.inviteCode) {
          uni.showModal({
            content: '请输入验证码',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case 'REGIST_REQUIRED_NAME': {
        if (!params.name) {
          uni.showModal({
            content: '请输入姓名',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case IRegistField.avatar: {
        if (!params.avatarUrl) {
          uni.showModal({
            content: '请设置头像',
            showCancel: false,
          });
          return true;
        }
        break;
      }
      case IRegistField.nickName: {
        if (!params.nickName) {
          uni.showModal({
            content: '请设置昵称',
            showCancel: false,
          });
          return true;
        }
        break;
      }

      default:
        // todo 未限制项
        break;
    }
  });
  if (verifyData) return;
  params.nickName ||= `${phone.substr(0, 4)}***${phone.substr()
    .substr(-3, 3)}`;
  params.avatarUrl ||=
    'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132';
  const { code, data } = await completeInfo(params);
  if (code === 0) {
    data && initBasicsData.setUseMid(data);
    router.fromLoginBack(lastPage.value);
    uni.removeStorageSync('c');
    uni.removeStorageSync('num');
    uni.removeStorageSync('pages');
    uni.removeStorageSync('inviteMid');
    uni.removeStorageSync('isMember');
  }
};

// 日期修改（日历选择器）
const handleOpen = (item: { name: any }) => {
  const { name } = item;
  const mark = 'mday';
  if (name === mark) {
    openAnndayCalendarPicker();
  } else {
    openBirthCalendarPicker();
  }
};

const bindPickerChangeGender = (e: any) => {
  showSex.value = e.detail.value;
  memberInfo.value.sex = selecteList[showSex.value].value;
};

const openBirthCalendarPicker = () => {
  birthCalendarPickerShow.value = true;
};

const closeBirthCalendarPicker = () => {
  birthCalendarPickerShow.value = false;
};

const openAnndayCalendarPicker = () => {
  anndayCalendarPickerShow.value = true;
};

const closeAnndayCalendarPicker = () => {
  anndayCalendarPickerShow.value = false;
};

const confirmBirthCalendarPicker = ({
  value: { year, month, day },
  type,
  lunarDesc,
}: any) => {
  memberInfo.value.birthKind = type;
  birthCalendarPickerDate.value = `${year}-${month}-${day}`;
  memberInfo.value.birthSolar = `${year}-${String(month)
    .padStart(
      2,
      '0'
    )}-${String(day)
    .padStart(2, '0')}`;
  memberInfo.value.birthLunar = lunarDesc;
  closeBirthCalendarPicker();
};

const confirmAnndayCalendarPicker = ({ value: { year, month, day } }: any) => {
  memberInfo.value.annday = `${year}-${String(month)
    .padStart(2, '0')}-${String(day)
    .padStart(2, '0')}`;
  closeAnndayCalendarPicker();
};

const changeNickName = (e: any) => {
  const value = e.detail.value;
  let len = 0;
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) > 127 || value.charCodeAt(i) === 94) {
      len++;
    }
    len++;
    result += value.charAt(i);
    if (len >= 32) {
      return nextTick(() => memberInfo.value.nickName = result);
    }
  }
};
</script>

<style scoped lang="scss">
.info {
  box-sizing: border-box;
  width: 100%;
  padding: 30rpx;
  background: #f5f5f5;

  .list {
    background: #ffffff;
    border-bottom: 1rpx solid #ebedf0;
    &.last {
      border-bottom: none;
      border-bottom-left-radius: 16rpx;
      border-bottom-right-radius: 16rpx;
    }
    &.first {
      border-top-right-radius: 16rpx;
      border-top-left-radius: 16rpx;
    }
    .list-item {
      .selected-item {
        display: flex;
        justify-content: space-between;
        height: 100rpx;
        padding: 30rpx;
        box-sizing: border-box;
        .left {
          display: flex;
          align-items: center;
          white-space: nowrap;

          .left-icon {
            font-size: 28rpx;
            font-weight: 400;
            color: #fa5252;
            margin-right: 6rpx;
          }

          .left-text {
            font-size: 28rpx;
            font-weight: 400;
            color: #323233;
          }

          .selecte-redio {
            display: flex;
          }
        }

        .right {
          display: flex;
          height: 18rpx;
          color: #9697a2;
          font-size: 28rpx;
          .letter {
            width: 500rpx;
            text-align: right;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .format {
            margin-right: 10rpx;
          }

          .guid {
            width: 500rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 40rpx;
            text-align: right;
          }
        }
      }

      .item-shop {
        border-top: solid 1rpx #ebedf0;
        padding: 30rpx;

        .shop-name {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name-left {
            font-size: 28rpx;
            font-weight: 400;
            color: #323338;
          }

          .name-right {
            flex: none;
            font-size: 20rpx;
            font-weight: 400;
            color: #9697a2;
          }
        }

        .shop-address {
          display: flex;
          margin-top: 12rpx;
          .address-icon {
            width: 17rpx;
            height: 18rpx;
            margin-right: 10rpx;
            margin-top: 8rpx;
          }

          .address-text {
            flex: 1;
            font-size: 24rpx;
            color: #9697a2;
            font-weight: 400;
            line-height: 34rpx;
          }
        }

        .shop-phone {
          display: flex;
          margin-top: 12rpx;
          .phone-icon {
            width: 17rpx;
            height: 18rpx;
            margin-right: 10rpx;
            margin-top: 9rpx;
          }

          .phone-code {
            height: 34rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #9697a2;
            line-height: 34rpx;
          }
        }
      }
    }

    .inpu-item {
      display: flex;
      width: 100%;
      height: 100rpx;
      padding: 30rpx;
      box-sizing: border-box;
      .input-icon {
        font-size: 28rpx;
        font-weight: 400;
        color: #fa5252;
        margin-right: 6rpx;
      }

      .input-name {
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
      }

      .input-left {
        width: 20%;
        overflow: hidden;
      }

      .input-right {
        width: 80%;
        text-align: right;
      }
    }
  }

  .next {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    text-align: center;
    margin: 0 auto;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;

    margin-top: 60rpx;
  }
}
.cR {
  color: #9697a2;
  font-size: 28rpx;
}
</style>
