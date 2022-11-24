<template>
  <CustomPage>
    <view class="cert">
      <view class="code">
        <view class="size">
          <view class="title">证件类型</view>
          <view class="text">
            <view class="card">
              <picker
                @change="(e:any ) => (index = e.target.value)"
                :value="index"
                :range="rangeList"
              >
                <view class="uni-input">{{ rangeList[index] }}</view>
              </picker>
            </view>
            <uni-icons type="arrowright" color="#B7B8C4" size="14"></uni-icons>
          </view>
        </view>
        <view class="verify" v-if="rangeList[index] != '无'">
          <view class="title">证件号</view>
          <view class="verCode">
            <input
              type="text"
              class="verCode-input"
              placeholder-style="color:#d8d9e0"
              maxlength="21"
              placeholder="请输入证件号"
              v-model="code"
            />
          </view>
        </view>
      </view>
      <view class="next" @click="handleSubmit">确定</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { getMemberInfo, query, updateMemberInfo } from '@/api/server';
import { onMounted, ref } from 'vue';

const rangeList = ref([]);
const index = ref(0);
const code = ref('');
let list: any[] = [];
onMounted(() => {
  queryCardList();
});
const queryCardList = async () => {
  const parmas = 'Credentials';
  const { code, data } = await query(parmas);
  if (code === 0) {
    rangeList.value = data.map((item: { name: any }) => item.name);
    list = data;
  }
  queryInfo();
};
let selidentKind = '';
const queryInfo = async () => {
  const { code: c, data } = await getMemberInfo('');

  if (c === 0 && data) {
    const { identKind, identNo } = data;
    selidentKind = identKind;
    code.value = identNo;

    list.map((item, num) => {
      if (item.value === identKind) {
        index.value = num;
      }
    });
  }
};

const handleSubmit = async () => {
  let identNo = code.value;
  const type = list[index.value].value || selidentKind;

  const tastShow = () => {
    uni.showModal({
      content: '请输入正确证件号、仅支持数字，字母',
      showCancel: false,
    });
  };
  if (rangeList.value[index.value] !== '无') {
    if (!code.value) {
      uni.showModal({
        content: '请输入证件号',
        showCancel: false,
      });
      return;
    }
    if (type === 'ID') {
      const regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regID.test(code.value)) {
        return tastShow();
      }
    } else if (type === 'PASS') {
      // 护照
      const regID1 = /^[a-zA-Z0-9]{3,21}$/;
      const regID2 = /^(P\d{7})|(G\d{8})$/;
      if (!regID1.test(code.value) && !regID2.test(code.value)) {
        return tastShow();
      }
    } else if (type === 'HKP') {
      // 港澳通行证
      const regID = /^[a-zA-Z0-9]{5,21}$/;
      if (!regID.test(code.value)) {
        return tastShow();
      }
    } else if (type === 'OC') {
      // 军官证
      const regID = /^[a-zA-Z0-9]{7,21}$/;
      if (!regID.test(code.value)) {
        return tastShow();
      }
    }
  } else {
    identNo = '';
  }

  const { code: c } = await updateMemberInfo({
    identKind: type,
    identNo,
  });
  if (c === 0) {
    uni.navigateBack();
  }
};
</script>

<style scoped lang="scss">
.cert {
  width: 100%;
  font-size: 28rpx;
  background: #f5f5f5;
  overflow: auto;

  .code {
    width: 690rpx;
    // height: 200rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    margin-bottom: 60rpx;

    .size {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 1rpx solid #ebedf0;

      .title {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
        line-height: 40rpx;
      }
      .text {
        display: flex;
        .uni-input {
          font-size: 28rpx;
          color: #9697a2;
        }
      }
    }

    .verify {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;

      .title {
        width: 84rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
        line-height: 40rpx;
      }

      .verCode {
        flex: 1;
        text-align: right;
        &-input {
          color: #9697a2 !important;
        }
      }
    }
  }

  .next {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    margin: 0 auto;
    text-align: center;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
