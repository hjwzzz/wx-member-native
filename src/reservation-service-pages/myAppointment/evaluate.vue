<template>
  <CustomPage>
    <view class="evaluate">
      <view class="wrapper">
        <view class="top">
          <view class="tip">请您对本次服务进行评价</view>
          <view class="rate">
            <uni-rate
              v-model="form.level"
              :size="34"
              :margin="25"
              @change="handleChangeRate"
            />
            <view class="result">{{ form.result }}</view>
          </view>
          <view class="tag-box">
            <view
              class="tag"
              v-for="item in tagList"
              :key="item.id"
              :class="{ active: form.tag.includes(item.id) }"
              @click="selectTag(item)"
              >{{ item.name }}</view
            >
          </view>
        </view>

				<form class="uni-form">
					<view class="uni-form-item">
						<view class="title">其他建议</view>
						<view class="txt">
							<textarea
								v-model="form.content"
								placeholder="请输入"
								placeholder-style="font-size: 26rpx"
								class="content"
								:maxlength="200"
								:style="{ width: form.content.length ? 'calc(100% - 44rpx)' : '100%' }"
							/>
							<image
								v-if="form.content.length"
								class="img"
								mode="aspectFit"
								:src="staticUrl + 'reservation-service/delete.png'"
								@click="form.content = ''"
							></image>
						</view>
						<view class="numbers">{{ form.content.length }}/200</view>
					</view>
				</form>
        <view class="img-list">
          <template>
            <view
              class="img-item"
              v-for="(item, index) in form.bookCommImgList"
              :key="index"
            >
              <image
                class="img"
                mode="aspectFill"
                :src="item.value"
                @click="previewImage(index)"
              ></image>
              <view class="close" @click="removeImg(index)">
                <uni-icons
                  class="icon-close"
                  type="closeempty"
                  size="13"
                  color="#fff"
                ></uni-icons>
              </view>
            </view>
          </template>
          <view
            class="upload"
            @click="uploadImg1"
            v-if="form.bookCommImgList.length < 9"
          >
            <image
              class="img"
              mode="aspectFit"
              :src="staticUrl + 'reservation-service/add-img.png'"
            ></image>
            <view class="text">添加图片</view>
          </view>
        </view>
      </view>

			<ScrollViewFooter></ScrollViewFooter>

      <view class="footer">
        <button
          class="btn"
          type="primary"
          @click="confirm"
        >
          确认
        </button>
      </view>
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { ref, Ref, reactive } from 'vue';
import { queryCommTagList, saveSubmitComm } from '@/api/reservation-service';
import { imgBaseUrl } from '@/api/quality';
import { compress } from '@/utils/util';
import { onLoad } from '@dcloudio/uni-app';
import { staticUrl } from '@/utils/config';
import ScrollViewFooter from '@/components/ScrollViewFooter/index.vue';

interface Form {
  level: number;
  result: string;
  tag: any[];
  content: string;
  bookCommImgList: any[];
}

const levelList: Ref<string[]> = ref([
  '非常差',
  '很差',
  '一般',
  '很好',
  '非常好',
]);
const form = reactive<Form>({
  level: 0,
  result: '',
  tag: [],
  content: '',
  bookCommImgList: [],
});
const tagList: Ref<any[]> = ref([]);
const data: Ref<any> = ref({});

onLoad((obj: any) => {
  data.value = obj;
  form.result = levelList.value[form.level - 1];
});

const previewImage = (index: number) => {
  uni.previewImage({
    current: index,
    urls: form.bookCommImgList.map((item: any) => item.value),
  });
};
const querytagList = async () => {
  const res = await queryCommTagList(form.level);
  tagList.value = res.data;
  form.tag = tagList.value
    .map((item: any) => item.id)
    .filter(item => form.tag.includes(item));
};
const handleChangeRate = (obj: any) => {
  form.result = levelList.value[obj.value - 1];
  querytagList();
};
const selectTag = ({ id }: any) => {
  if (form.tag.includes(id)) {
    form.tag = form.tag.filter((item: any) => item !== id);
  } else {
    form.tag.push(id);
  }
};
const uploadImg1 = () => {
  uni.chooseImage({
    count: 9 - form.bookCommImgList.length,
    sizeType: 'compressed',
    sourceType: ['album', 'camera'],
    success: async ({ tempFiles }: any) => {
      for (const val of tempFiles) {
        form.bookCommImgList.length < 9 &&
          (form.bookCommImgList = [
            ...form.bookCommImgList,
            {
              key: val.path,
              value: '',
            },
          ]);
        const size = Math.floor(val.size / 1024 / 1024 * 100) / 100;
        let compressValue;
        // let compressValue = await compress(val)
        if (size <= 1) {
          // #ifdef H5
          compressValue = val;
          // #endif
          // #ifdef MP-WEIXIN
          compressValue = val.path;
          // #endif
        } else {
          compressValue = await compress(val);
        }
        uni.uploadFile({
          url: `${imgBaseUrl}/upload/uploadImageFile`,
          // #ifdef H5
          file: compressValue,
          // #endif
          // #ifdef MP-WEIXIN
          filePath: compressValue,
          // #endif
          name: 'file',
          formData: { user: 'test' },
          header: {
            category: 'COMM',
            epid: uni.getStorageSync(`epid${uni.getStorageSync('jqzAppid')}`),
            token: uni.getStorageSync(`token${uni.getStorageSync('jqzAppid')}`),
          },
          success: uploadFileRes => {
            const upload = JSON.parse(uploadFileRes.data);
            for (let i = 0; i < form.bookCommImgList.length; i++) {
              if (form.bookCommImgList[i].key === val.path) {
                form.bookCommImgList[i] = {
                  key: val,
                  value: upload.data.fullPathUrl,
                };
                break;
              }
            }
          },
        });
      }
    },
  });
};
const createImg = (url: string) => new Promise((resolve, reject) => {
  const image = new Image();
  let code;
  image.src = url;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');

    const originWidth = image.width;
    const originHeight = image.height;
    const maxWidth = 1024,
      maxHeight = 1024;
    let targetWidth = originWidth,
      targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > 1) {
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    context.drawImage(image, 0, 0, targetWidth, targetHeight);
    const imgUrl = canvas.toDataURL();
    code = imgUrl.split(';base64,')[1];
    // 计算文件大小
    const fileLength = parseInt(String(code.length - code.length / 8 * 2));
    const size = (fileLength / 1024).toFixed(2);
    // alert(size)
    console.log(`文件大小为：${size}KB`);
    resolve(code);
  };
});
const uploadImg = () => {
  uni.chooseImage({
    count: 9 - form.bookCommImgList.length,
    success: (res: any) => {
      res.tempFilePaths.forEach(async (item: any) => {
        console.log('item', item);
        let imgType;
        let base64Code; // 临时文件转为base64
        // #ifdef MP-WEIXIN
        imgType = item.split('.')[1];
        base64Code = uni.getFileSystemManager()
          .readFileSync(item, 'base64');
        // #endif
        // #ifdef H5
        base64Code = await createImg(item);
        // base64Code = item.split(";base64,")[1];
        // #endif
        uni.request({
          header: {
            epid: uni.getStorageSync(`epid${uni.getStorageSync('jqzAppid')}`),
            category: 'COMM',
            token: uni.getStorageSync(`token${uni.getStorageSync('jqzAppid')}`),
          },
          url: `${imgBaseUrl}/upload/uploadBase64File`,
          data: {
            checkCode: '',
            content: base64Code,
            contentType: `image/${imgType || 'png'}`,
            fileName: `test.${imgType || 'png'}`,
          },
          method: 'POST',
          success: (response: any) => {
            if (response.data.code === 0) {
              form.bookCommImgList = [
                ...form.bookCommImgList,
                response.data.data.fullPathUrl,
              ];
            } else {
              uni.showToast({
                icon: 'none',
                title: response.data.msg,
                duration: 3000,
              });
            }
          },
          fail: err => {
            console.log('错误信息', err);
          },
        });
      });
    },
  });
};
const removeImg = (n: number) => {
  form.bookCommImgList = form.bookCommImgList.filter((item: any, index: number) => index !== n);
};
const confirm = async () => {
  if (form.level === 0) {
    uni.showToast({
      icon: 'none',
      title: '请对服务进行评价',
      duration: 3000,
    });
    return;
  }
  if (form.content.length > 200) {
    uni.showToast({
      icon: 'none',
      title: '输入内容过长',
      duration: 3000,
    });
    return;
  }

  try {
    const list = form.bookCommImgList.map((item: any) => item.value);
    list.forEach((item: any) => {
      if (!item) throw '图片未加载完成';
    });

    await saveSubmitComm({
      bookId: data.value.id,
      bookCommImgList: form.bookCommImgList.map((item: any) => item.value),
      content: form.content,
      level: form.level,
      tag: form.tag,
    });
    setTimeout(() => {
      uni.showToast({
        title: '评价提交成功',
        duration: 3000,
      });
    }, 500);
    setTimeout(() => {
      uni.navigateBack();
    }, 3000);
  } catch (err: any) {
    setTimeout(() => {
      uni.showToast({
        icon: 'none',
        title: err,
        duration: 3000,
      });
    }, 500);
  }
};
</script>

<style scoped lang="scss">
.evaluate {
  position: relative;
  .wrapper {
    height: 100%;
    overflow-y: auto;
    padding: 30rpx;
    .top {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      .tip {
        font-size: 32rpx;
        font-weight: bold;
        color: #414141;
        text-align: center;
        margin-top: 20rpx;
      }
      .rate {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 60rpx 0;
        :deep(.uni-rate) {
          .uni-rate__icon:last-child {
            margin-right: 0 !important;
          }
        }
        .result {
          width: 100%;
          text-align: center;
          margin-top: 20rpx;
          font-size: 28rpx;
          color: #ffb203;
        }
      }
      .tag-box {
        .tag {
          display: inline-block;
          height: 60rpx;
          padding: 12rpx 24rpx;
          border-radius: 32rpx;
          border: 2rpx solid #ebedf0;
          font-size: 24rpx;
          color: #646771;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
        }
        .active {
          color: #fff;

          background: var(--main-color);
          border: 2rpx solid var(--main-color);
        }
      }
    }
		.uni-form {
			.uni-form-item {
				background: #fff;
				border-radius: 16rpx;
				margin: 30rpx 0;
				padding: 30rpx;
				.title {
					font-size: 26rpx;
					margin-bottom: 10rpx;
				}
				.txt {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.content {
						font-size: 26rpx;
						text-align: justify;
						height: 192rpx;
						line-height: 42rpx;
						padding: 10rpx 0;
					}
					.img {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.numbers {
					line-height: 32rpx;
					font-size: 24rpx;
					color: #999999;
					text-align: right;
				}
			}
		}
    .img-list {
      display: grid;
      grid-template-columns: 156rpx 156rpx 156rpx 156rpx;
      grid-column-gap: 20rpx;
      grid-row-gap: 20rpx;
      .img-item {
        width: 156rpx;
        height: 156rpx;
        border-radius: 16rpx;
        overflow: hidden;
        position: relative;
        margin-right: 20rpx;
        .img {
          width: 100%;
          height: 100%;
        }
        .close {
          width: 64rpx;
          height: 64rpx;
          background: #9697a2;
          border-radius: 32rpx;
          position: absolute;
          top: -32rpx;
          right: -32rpx;
          .icon-close {
            position: absolute;
            left: 4rpx;
            bottom: 4rpx;
          }
        }
      }
      .upload {
        width: 156rpx;
        height: 156rpx;
        background: #ffffff;
        border-radius: 16rpx;
        text-align: center;
        padding: 34rpx 0;
				box-sizing: border-box;
        .img {
          width: 44rpx;
          height: 44rpx;
          margin: 0 auto;
        }
        .text {
          font-size: 22rpx;
          color: #b7b8c4;
        }
      }
    }
  }

  .footer {
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 10rpx 30rpx;
    padding-bottom: calc(15rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
    .btn {
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
			background-color: var(--main-color);
			box-sizing: border-box;
    }
  }
}
</style>
