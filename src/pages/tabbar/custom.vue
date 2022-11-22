<template>
  <web-view :src="url" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const url = ref('');
onLoad(async (options: any) => {
  url.value = decodeURIComponent(options.url)
});

</script>
