<template>
  <view class="poster-details">
    <view class="show-next">
      <view
        class="show-left btn-next"
        @click="onLeft"
        v-if="posterData.styleShowIndex > 1"
      >
        <image
          src="@/my-assets-pages/static/points-mall/left-img-icon.png"
          mode="aspectFit"
        >
        </image>
      </view>
      <view
        class="show-right btn-next"
        @click="onRight"
        v-if="posterData.styleShowIndex < 3"
      >
        <image
          src="@/my-assets-pages/static/points-mall/right-img-icon.png"
          mode="aspectFit"
        >
        </image>
      </view>
      <canvas class="mycanvas-poster" canvas-id="mycanvas"> </canvas>
      <view class="poster-tip">下载海报分享给好友吧！</view>
    </view>

    <view class="download"><view @click="startDownload">下载海报</view></view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import {
  getShareGoodsMiniCode,
  getSpuDetail,
} from '@/my-assets-pages/api/points-mall';
import { reactive } from 'vue';

const posterData: any = reactive({
  price: '',
  number: '',
  detail: {},
  imgIndex: 0,
  canvasContexts: null,
  shareCodeImg: '',
  detailName: '',
  detailPrice: '',
  styleUrl: [uni.upx2px(30), uni.upx2px(560), uni.upx2px(550), uni.upx2px(270)],
  codeStyleUrl: [
    uni.upx2px(30),
    uni.upx2px(630),
    uni.upx2px(130),
    uni.upx2px(130),
  ],
  codeStyleUrl1: [
    uni.upx2px(0),
    uni.upx2px(560),
    uni.upx2px(580),
    uni.upx2px(270),
  ],
  styleShowIndex: 1,
});

onLoad((option: any) => {
  posterData.number = option.number;
  getInfo();
});

onShow(() => {
  posterData.canvasContexts = uni.createCanvasContext('mycanvas', this);
  posterData.canvasContexts.drawImage(
    '../static/points-mall/110.jpg',
    0,
    0,
    uni.upx2px(580),
    uni.upx2px(820)
  );
});

const onLeft = () => {
  posterData.styleShowIndex -= 1;
  changeCanvas();
};
const onRight = () => {
  posterData.styleShowIndex += 1;
  changeCanvas();
};

const changeCanvas = () => {
  if (posterData.styleShowIndex === 1) {
    setCanvas();
  }
  if (posterData.styleShowIndex === 2) {
    setCanvas1();
  }
  if (posterData.styleShowIndex === 3) {
    setCanvas2();
  }
};

const getInfo = async () => {
  uni.showLoading({ title: '加载中' });
  const { data } = await getSpuDetail({ number: posterData.number });
  // console.log('getSpuDetail');
  // console.log(JSON.stringify(data));
  posterData.detail = data;

  let name = posterData.detail.name;
  if (name.length > 10) {
    console.log(name.length);
    name = `${name.substr(0, 8)}.....`;
  }
  posterData.detailName = name;

  let displayPoint =
    posterData.detail.displayPoint + posterData.detail.acctName;
  if (Number(posterData.detail.displayPrice) > 0) {
    displayPoint += `+${posterData.detail.displayPrice}元`;
  }

  if (displayPoint.length > 12) {
    console.log(displayPoint.length);
    displayPoint = `${displayPoint.substr(0, 10)}.....`;
  }
  posterData.detailPrice = displayPoint;

  const spuImgUrl = posterData.detail.spuImgUrl[0];
  urlToBase64(spuImgUrl);
  uni.hideLoading();
  setCanvas();
};

const setCanvas2 = () => {
  posterData.canvasContexts.drawImage(
    '../static/points-mall/poster-style-3.png',
    ...posterData.codeStyleUrl1
  );
  setContexts();
};

const setCanvas1 = () => {
  posterData.canvasContexts.drawImage(
    '../static/points-mall/poster-style-2.png',
    ...posterData.styleUrl
  );
  setContexts();
};

const setContexts = () => {
  // const name = posterData.detail.name;
  posterData.canvasContexts.font = `${uni.upx2px(30)}px Arial`;
  posterData.canvasContexts.fillText(
    posterData.detailName,
    uni.upx2px(200),
    uni.upx2px(670)
  );
  posterData.canvasContexts.fillStyle = '#3A3A3A';
  posterData.canvasContexts.font = `${uni.upx2px(24)}px Arial`;
  posterData.canvasContexts.fillText(
    posterData.detailPrice,
    uni.upx2px(200),
    uni.upx2px(740)
  );
  posterData.canvasContexts.draw(true);
  getShareCode(posterData.codeStyleUrl);
};

const setCanvas = () => {
  posterData.canvasContexts.drawImage(
    '../static/points-mall/poster-style-1.png',
    ...posterData.codeStyleUrl1
  );
  posterData.canvasContexts.font = `${uni.upx2px(30)}px Arial`;
  posterData.canvasContexts.fillText(
    posterData.detailName,
    uni.upx2px(50),
    uni.upx2px(640)
  );
  posterData.canvasContexts.fillStyle = '#3A3A3A';
  posterData.canvasContexts.font = `${uni.upx2px(24)}px Arial`;
  posterData.canvasContexts.fillText(
    posterData.detailPrice,
    uni.upx2px(50),
    uni.upx2px(750)
  );
  posterData.canvasContexts.draw(true);

  const codeImageSize = [
    uni.upx2px(360),
    uni.upx2px(598),
    uni.upx2px(170),
    uni.upx2px(170),
  ];
  getShareCode(codeImageSize);
};

const getShareCode = async (drawImageSize: any) => {
  const { data } = await getShareGoodsMiniCode({ number: posterData.number });
  const base64 = data.replace(/^data:image\/\w+;base64,/, '');
  const filePath = `${wx.env.USER_DATA_PATH}/hym_pay_qrcode.png`;
  uni.getFileSystemManager()
    .writeFile({
      filePath, // 创建一个临时文件名
      data: base64,
      encoding: 'base64',
      success: () => {
        posterData.canvasContexts.drawImage(filePath, ...drawImageSize);
        posterData.canvasContexts.draw(true);
      },
    });
};

const urlToBase64 = (url: any) => {
  const urlSize = [
    uni.upx2px(30),
    uni.upx2px(30),
    uni.upx2px(520),
    uni.upx2px(520),
  ];
  uni.downloadFile({
    url,
    success(res) {
      posterData.canvasContexts.drawImage(res.tempFilePath, ...urlSize);
      posterData.canvasContexts.draw(true);
    },
  });
};

const startDownload = () => {
  uni.canvasToTempFilePath({
    canvasId: 'mycanvas',
    fileType: 'jpg',
    success: res => {
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: () => {
          uni.showToast({ title: '保存成功', duration: 3000 });
        },
      });
    },
    fail: res => {
      uni.showToast({ title: '保存图片出错', duration: 3000 });
      console.log(res);
    },
  });
};
</script>

<style lang="scss" scoped>
.poster-details {
  display: flex;
  justify-content: center;

  // padding-bottom: calc(100vh - (100rpx + constant(safe-area-inset-bottom)));
  // padding-bottom: calc(100vh - (100rpx + env(safe-area-inset-bottom)));
  .download {
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    right: 0rpx;
    padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
    background-color: white;
    display: flex;
    justify-content: center;
    padding-top: 20rpx;
    view {
      width: 680rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #f86262;
      border-radius: 40rpx;
      font-size: 28rpx;
      color: #ffffff;
      text-align: center;
    }
  }
  .mycanvas-poster {
    width: 580rpx;
    height: 820rpx;
    margin-top: 89rpx;
    background: white;
  }
  .poster-box {
    width: 580rpx;
    height: 820rpx;
    background: #ffffff;
    border-radius: 8px;
    padding: 30rpx;
    .box-image {
      width: 520rpx;
      height: 520rpx;
      background: #f6f6f6;
      image {
        width: 520rpx;
        height: 520rpx;
      }
    }
    .box-name {
      margin-top: 30rpx;
      height: 80rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #3a3a3a;
      line-height: 40rpx;
      text-overflow: -o-ellipsis-lastlist;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      align-content: center;
    }
    .box-info {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      .box-info-text {
        .select-show {
          line-height: 48rpx;
          background: #f4f4f4;
          border-radius: 24rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #6b6b6b;
          padding: 0 30rpx;
        }
        .price-show {
          margin-top: 20rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #6b6b6b;
        }
      }
      .box-info-image {
        width: 100rpx;
        height: 100rpx;
        background: #f5f5f5;
        image {
          width: 100rpx;
          height: 100rpx;
        }
      }
    }
  }
  .poster-tip {
    height: 90rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #6b6b6b;
    line-height: 100rpx;
    text-align: center;
  }
  .show-next {
    position: relative;
    .show-left {
      position: absolute;
      left: -70rpx;
      top: 450rpx;
    }
    .btn-next {
      height: 100rpx;
      width: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        height: 50rpx;
        width: 28rpx;
      }
    }
    .show-right {
      position: absolute;
      right: -70rpx;
      top: 450rpx;
    }
  }
}
</style>
