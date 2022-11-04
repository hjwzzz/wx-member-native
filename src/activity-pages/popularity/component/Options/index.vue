<template>
  <view>
    <view class="prize-option" :class="{ top: !hasTop }">
      <text v-if="showPrize" class="prize-option-item" @click="toLink(2)"
        >奖励</text
      >
      <text v-if="showRule" class="prize-option-item" @click="toLink(3)"
        >规则</text
      >
      <text v-if="showComplaint" class="prize-option-item" @click="toLink(1)"
        >投诉</text
      >
      <image
        v-if="showMusic"
        class="prize-option-music"
        :class="{ playing: musicPlay }"
        :src="musicPlay ? musicIcon : musicDisabledIcon"
        mode="aspectFit"
        @click="musicCheck"
      />
    </view>
    <!-- 活动规则 -->
    <!-- <rule-template v-if="ruleText" :showRule.sync="showRulePopup" :data="ruleText" /> -->
    <audio
      v-if="isH5"
      id="music"
      class="music-audio"
      :src="musicSrc"
      controls
      loop
      autoplay
    ></audio>
  </view>
</template>

<script lang="ts">
export default { options: { styleIsolation: 'shared' } };
</script>

<script lang="ts" setup>
import Router from '@/utils/router';
import { ref } from 'vue';
let audio: any = null;

const props = defineProps({
  actId: {
    // 活动id
    type: [String, Number],
    default: '',
  },
  mainColor: {
    // 背景主色值
    type: String,
    default: '',
  },
  hasTop: {
    // 是否有顶部占用信息
    type: Boolean,
    default: false,
  },
  showPrize: {
    // 奖励显示
    type: Boolean,
    default: true,
  },
  showRule: {
    // 规则显示
    type: Boolean,
    default: false,
  },
  showComplaint: {
    // 投诉显示
    type: Boolean,
    default: false,
  },
  showMusic: {
    // 音乐显示
    type: Boolean,
    default: false,
  },
  ruleText: {
    // 规则内容
    type: String,
    default: '',
  },
  musicSrc: {
    // 音乐链接
    type: String,
    default: '',
  },
});
const emits = defineEmits(['showRule']);

const musicIcon = ref('https://img.dev.jqzplat.com/12D3868F/COMM/3a410740-20220519.png');
const musicDisabledIcon = ref('https://img.dev.jqzplat.com/12D3868F/COMM/8c0ad9ea-20220525.png');
const musicPlay = ref(true); // 是否播放音乐
const musicDom = ref(null); // 音乐Dom
const showRulePopup = ref(false); // 活动规则显示
const isH5 = ref(true);
// 暂停音乐
const pauseMusic = () => {
  // #ifdef H5
  // if (this.musicDom) {
  // 	this.musicDom.pause()
  // 	musicPlay.value = false
  // }
  // #endif
  // #ifdef MP
  if (audio) audio.stop();
  // #endif
};
// 音乐初始播放
const audioAutoPlay = () => {
  // #ifdef H5
  // this.isH5 = true
  //   const audio = this.musicDom
  //   const play = function(){
  //   		console.log('touchstart')
  //   		audio.play()
  //   		document.removeEventListener("touchstart",play, false)
  //   	}
  //   audio.play()
  //   document.addEventListener("touchstart",play, false)
  // #endif
  // #ifdef MP
  isH5.value = false;
  // if (!this.showMusic) return
  if (!audio) audio = uni.createInnerAudioContext();
  audio.autoplay = true;
  audio.loop = true;
  audio.src = props.musicSrc;
  if (musicPlay.value && props.showMusic) {
    audio.play();
  } else {
    audio.stop();
  }
  audio.onError(() => {
    // console.log(res);
    // uni.showToast({
    //   icon: 'none',
    //   title: '音频播放出错',
    // });
  });
  // #endif
};
// 设置音乐
const setMusic = () => {
  // #ifdef H5
  // this.$nextTick(function(){
  // 	const dom = document.querySelectorAll('audio')[0]
  // 	this.musicDom = dom
  // 	if (musicPlay.value) this.audioAutoPlay()
  // })
  // #endif
};
// 音乐切换
const musicCheck = () => {
  musicPlay.value = !musicPlay.value;
  // #ifdef H5
  // onMusicFun()
  // #endif
  // #ifdef MP
  audioAutoPlay();
  // #endif
};
// 音乐操作
const onMusicFun = () => {
  // #ifdef H5
  // const audio = this.musicDom
  // console.log('audio',audio)
  // if (this.musicPlay) {
  // 	audio.play()
  // } else {
  // 	audio.pause()
  // }
  // #endif
  // #ifdef MP
  // if (!this.showMusic) return
  audioAutoPlay();
  // #endif
};
// 跳转
const toLink = (type: number) => {
  switch (type) {
    case 1:
      // uni.navigateTo({ url: `/activity-pages/complaint/index?id=${props.actId}` });
      Router.go(`/activity-pages/complaint/index?id=${props.actId}`);
      break;
    case 2:
      Router.goCodePage(
        'activiy_prize',
        `?actId=${props.actId}&c=${props.mainColor}`
      );
      // uni.navigateTo({ url: `/activity-pages/inviteGift/prize?actId=${props.actId}&c=${props.mainColor}` });
      break;
    case 3:
      emits('showRule', true);
      // this.showRulePopup = true
      break;
  }
};
const clearFun = () => {
  console.log('销毁2');
  // #ifdef H5
  // musicDom.value = null
  // #endif
  // #ifdef MP
  audio.pause();
  audio = null;
  // #endif
};

defineExpose({
  audioAutoPlay,
  pauseMusic,
  clearFun,
});
</script>
<style lang="scss" scoped>
.music-audio {
  position: absolute;
  top: 0;
  left: -100%;
  z-index: -1;
  opacity: 0;
}
.prize-option {
  position: fixed;
  top: 232rpx;
  right: 20rpx;
  z-index: 4;
  transition: top 0.25s linear;
  &.top {
    top: 168rpx;
  }
}
.prize-option-item {
  display: flex;
  margin-bottom: 20rpx;
  width: 72rpx;
  height: 72rpx;
  align-items: center;
  color: #fff;
  font-size: 22rpx;
  line-height: 1;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}
.prize-option-music {
  display: block;
  margin: 0 auto;
  width: 72rpx;
  height: 72rpx;

  &.playing {
    animation: music 8s linear infinite;
  }
}
@keyframes music {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
