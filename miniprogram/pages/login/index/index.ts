import { getLogoRequest, getMemberEulaRequest } from '../../../api/server';
import type { LoginIndexPageData, LoginIndexPageCustom } from './index.type';
import commonPage from './../../../component/common-page/index';

Component<LoginIndexPageData, never, LoginIndexPageCustom>({
  data: {
    logo: '',
    protocol: {},
  },

  behaviors: [commonPage],

  pageLifetimes: {
    show() {
      this.getLogo();
      this.getMemberEula();
    },
  },

  methods: {
    async getLogo() {
      const getLogoRequestRes = await getLogoRequest();

      this.setData({
        logo: getLogoRequestRes.data ?? '',
      });
    },

    async getMemberEula() {
      const getMemberEulaRequestRes = await getMemberEulaRequest();

      if (!getMemberEulaRequestRes.data) {
        return;
      }

      this.setData({
        protocol: getMemberEulaRequestRes.data,
      });
    },
  },
});
