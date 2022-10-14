// app.ts

import Storage from './utils/storage';
import mixin from "./utils/pageMixin";

App<IAppOption>({
  globalData: {},
  onLaunch() {
    mixin();
    Storage.removeEpid();
  },
});
