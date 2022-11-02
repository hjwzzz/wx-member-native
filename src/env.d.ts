// / <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_BASEURL: string;
  readonly VITE_APP_IMGBASEURL: string;
  readonly VITE_APP_WXURL: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
