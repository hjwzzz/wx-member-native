import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';
import CustomPage from '@/components/CustomPage/index.vue';

export function createApp() {
  const app = createSSRApp(App);

  app.component('CustomPage', CustomPage);

  app.use(createPinia()
    .use(piniaPersist));
  return { app };
}
