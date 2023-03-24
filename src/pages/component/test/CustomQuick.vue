<template>
  <QuickNavigation
    :items="props.items"
    v-if="
      props.items.param.doOut.fixedStyle === 0 ||
      props.items.param.doOut.fixedStyle === 1
    "
  >
  </QuickNavigation>

  <GridList
    :items="props.items"
    v-if="
      props.items.param.doOut.fixedStyle === 2 ||
      props.items.param.doOut.fixedStyle === 3
    "
  >
  </GridList>
</template>

<script setup lang="ts">
import GridList from './GridList.vue';
import QuickNavigation from './QuickNavigation.vue';

interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });

const ddddd = 0;
</script>
