<template>
  <CustomPage>
    <view class="complaint-page" :class="{ full: step > 1 }">
      <view v-if="step == 1">
        <view class="complaint-title"> 请选择反馈类型 </view>
        <view class="type-list">
          <view
            v-for="v in typeList"
            :key="v.code"
            class="type-item"
            @click="nextStep(1, v)"
          >
            {{ v.desc }}
            <image
              class="type-item-icon"
              src="https://static.jqzplat.com/lucky/right.png"
            ></image>
          </view>
        </view>
      </view>
      <view v-if="step == 2">
        <view class="complaint-tip">
          <view class="complaint-tip-title">{{ typeInfo.name }}</view>
          <view class="complaint-tip-subtitle">{{ typeInfo.desc }}</view>
        </view>

        <uni-forms ref="uForm" border :modelValue="form" label-width="170rpx">
          <uni-forms-item label="姓名" name="feedbackName">
            <uni-easyinput
              type="text"
              :inputBorder="false"
              v-model="form.feedbackName"
              placeholder="请输入姓名"
            />
          </uni-forms-item>

          <uni-forms-item label="手机号" name="feedbackPhone">
            <uni-easyinput
              :inputBorder="false"
              type="number"
              maxlength="11"
              v-model="form.feedbackPhone"
              placeholder="请输入手机号"
            />
          </uni-forms-item>

          <uni-forms-item name="feedbackContent" label-width="0rpx">
            <uni-easyinput
              :inputBorder="false"
              type="textarea"
              maxlength="200"
              v-model.trim="form.feedbackContent"
              placeholder="请输入反馈内容"
            />
          </uni-forms-item>
        </uni-forms>
        <button :loading="isSave" class="complaint-btn" @click="nextStep(2)">
          确认
        </button>
      </view>
      <view v-if="step == 3">
        <view class="complaint-tip">
          <image
            class="complaint-tip-icon"
            src="https://static.jqzplat.com/lucky/success.png"
          ></image>
          <view class="complaint-tip-title">感谢您的反馈</view>
        </view>
        <button class="complaint-btn" @click="nextStep(3)">返回</button>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { addFeedback, queryFeedbackType } from '@/api/public';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const step = ref(1);
const typeList = ref<any>([]);
const typeInfo = ref<any>({});
const form = ref<any>({});
const isSave = ref(false);
const id = ref('');
onLoad((e: any) => {
  id.value = e.id;
  getTypeList();
});

const getTypeList = async () => {
  const { code, data } = await queryFeedbackType(id.value);
  if (code === 0) {
    typeList.value = data || [];
  }
};

const nextStep = async (num: number, item?: any) => {
  if (num === 1) {
    typeInfo.value = item;
    form.value.feedbackKind = item.code;
  } else if (num === 2) {
    if (isSave.value) return;
    if (form.value.feedbackPhone && form.value.feedbackPhone.length !== 11) {
      uni.showToast({
        title: '请输入正确手机号',
        duration: 3000,
        icon: 'none',
      });
      return;
    }
    if (form.value.feedbackContent.length < 5) {
      uni.showToast({
        title: '反馈内容不能少于5个字',
        duration: 3000,
        icon: 'none',
      });
      return;
    }
    isSave.value = true;
    const params = {
      ...form.value,
      actId: id.value,
    };
    const { code } = await addFeedback(params);
    isSave.value = false;
    if (code === 0) {
      step.value += 1;
    }

    return;
  } else if (num === 3) {
    uni.navigateBack();
    return;
  }
  step.value += 1;
};
</script>

<style scoped lang="scss">
.complaint-page {
  font-size: 28rpx;
  line-height: 40rpx;
  overflow: auto;
  &.full {
    padding: 0 30rpx 30rpx 30rpx;
    color: #1d0800;
    font-weight: 500;
    background-color: #fff;
  }
  .complaint-title {
    padding: 32rpx 30rpx 28rpx;
    color: #9d9595;
    font-weight: 400;
  }
  .type-list {
    background-color: #fff;
  }
  .type-item {
    display: flex;
    position: relative;
    padding: 24rpx 30rpx;
    align-items: center;
    color: #1d0800;
    font-weight: 500;
    justify-content: space-between;
    &::after {
      position: absolute;
      bottom: 0;
      left: 4%;
      width: 92%;
      height: 1rpx;
      background-color: #ebedf0;
      content: '';
    }
    &:last-child::after {
      opacity: 0;
    }
  }
  .type-item-icon {
    width: 24rpx;
    height: 24rpx;
  }

  .complaint-tip {
    padding: 60rpx 0 50rpx;
    font-size: 32rpx;
    line-height: 44rpx;
    text-align: center;
  }
  .complaint-tip-subtitle {
    margin-top: 8rpx;
    color: #9d9595;
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .complaint-tip-icon {
    margin-top: 60rpx;
    margin-bottom: 26rpx;
    width: 96rpx;
    height: 96rpx;
    vertical-align: bottom;
  }

  :deep(.uni-easyinput__content-textarea) {
    background-color: #f7f7f7;
    padding: 20rpx 22rpx 62rpx;
    border-radius: 16rpx;
    margin-top: 40rpx;
  }
  :deep(.uni-forms-item__label) {
    color: #9d9595;
  }
  :deep(.uni-forms-item--border) {
    padding: 7rpx 0 !important;
    border-color: #ebedf0;
  }
  .complaint-textarea {
    position: relative;
    margin-top: 40rpx;
    padding: 20rpx 22rpx 62rpx;
    border-radius: 16rpx;
    background-color: #f7f7f7;
    overflow: hidden;
  }
  .complaint-textarea-count {
    position: absolute;
    bottom: 12rpx;
    right: 22rpx;
    color: #9d9595;
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .complaint-btn {
    margin-top: 20rpx;
    width: 680rpx;
    height: 80rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: white;
    border-color: #2979ff;
    border-radius: 8rpx;
    background-color: #2979ff;
    &.u-primary-hover {
      background-color: rgba(41, 121, 255, 0.75) !important;
    }
  }
}
</style>
