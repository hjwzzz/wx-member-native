import { createSSRApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';
export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia()
    .use(piniaPersist));
  return { app };
}
