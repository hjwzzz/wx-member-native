import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';
import CustomPage from '@/components/CustomPage/index.vue';
import CustomScrollViewPage from '@/components/CustomScrollViewPage/index.vue';

export function createApp() {
  const app = createSSRApp(App);

  app.component('CustomPage', CustomPage);
  app.component('CustomScrollViewPage', CustomScrollViewPage);

  app.use(createPinia()
    .use(piniaPersist));
  return { app };
}
