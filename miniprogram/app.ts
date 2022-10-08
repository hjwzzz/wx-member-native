// app.ts

import Storage from './utils/storage';

App<IAppOption>({
  globalData: {},
  onLaunch() {
    Storage.removeEpid();
  },
});
