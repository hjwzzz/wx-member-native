<template>
  <CustomPage>
    <view class="serveEvaluate">
      <view class="tag-list">
        <view
          :class="['tag', { isActive: tagActive === 'all' }]"
          @click="handleChangeTag('all')"
          >全部</view
        >
        <view
          :class="['tag', { isActive: tagActive === 'have' }]"
          @click="handleChangeTag('have')"
          >有图{{ whetherMoreThanOneHundred(cmtImgCnt) }}</view
        >
      </view>

      <view class="evaluate-list">
        <template v-if="evaluateList.length">
          <evaluateItem
            v-for="item in evaluateList"
            :key="item.id"
            :info="item"
          ></evaluateItem>
        </template>
        <view v-else class="no-data">
          <image
            mode="aspectFit"
            :src="`${staticUrl}img/empty/prize.png`"
          ></image>
          <view>暂无，期待您的评价</view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import {
  getCmtCntAndCmtImgCnt,
  queryCBookCommentPage,
} from '@/api/reservation-service';
import { onLoad } from '@dcloudio/uni-app';
import { Ref, ref } from 'vue';
import { staticUrl } from '@/utils/config';
import evaluateItem from '../component/evaluate-item.vue';

const data: Ref<any> = ref({});
const tagActive = ref('all');
const curPage = ref(1);
const evaluateList: Ref<any[]> = ref([]);
const total = ref(0);
const cmtImgCnt = ref(0);
onLoad(e => {
  data.value = e;
  tagActive.value = e.isHaveImg || 'all';
  queryHasImgEvaluateCont();
  queryEvaluateList();
});

const handleChangeTag = (data: string) => {
  tagActive.value = data;
  queryEvaluateList();
};
const whetherMoreThanOneHundred = (e: number | string) => {
  e = e.toString();
  if (parseInt(e) > 99) {
    return `${e[0].padEnd(e.length, '0')}+`;
  }
  return e;
};
const queryEvaluateList = async () => {
  const res = await queryCBookCommentPage({
    curPage: curPage.value,
    pageSize: 50,
    id: data.value.id,
    isHaveImg: tagActive.value === 'have' ? 'have' : '',
  });
  evaluateList.value = res.data.records;
  total.value = res.data.totalRecord;
};

const queryHasImgEvaluateCont = async () => {
  const res = await getCmtCntAndCmtImgCnt({ id: data.value.id });
  cmtImgCnt.value = res.data.cmtImgCnt;
};
</script>

<style scoped lang="scss">
.serveEvaluate {
  height: 100vh;
  background: #fff;
  padding: 0 30rpx;
  overflow-y: auto;
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20rpx 0;
    .tag {
      padding: 14rpx 24rpx;
      border-radius: 32rpx;
      border: 2rpx solid #ebedf0;
      margin-right: 20rpx;
      font-size: 24rpx;
      color: #323338;
      &.isActive {
        background-color: var(--main-color);
        border-color: var(--main-color);
        color: #fff;
      }
    }
  }

  .evaluate-list {
    .no-data {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 100rpx;
      image {
        width: 300rpx;
        height: 300rpx;
      }
      view {
        width: 100vw;
        text-align: center;
        color: #b7b8c4;
      }
    }
  }
}
</style>
