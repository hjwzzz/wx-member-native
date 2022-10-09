import {
  queryAdvertFrontRequest,
  queryReceiveCenterListFrontRequest,
} from '../../../api/coupon-center';
import commonPage from './../../../component/common-page/index';
import type { CouponCenterData } from './index.type';

Component({
  data: <CouponCenterData>{
    advertList: [],
    receiveCenterList: [],
    queryReceiveCenterListForm: {
      createTime: '',
      opsId: '',
      pageSize: 10,
      curPage: 1,
    },
  },
  behaviors: [commonPage],
  pageLifetimes: {
    show() {
      this.queryAdvertFront();
      this.queryReceiveCenterListFront();
    },
  },
  methods: {
    async queryAdvertFront() {
      const queryAdvertFrontRequestRes = await queryAdvertFrontRequest();

      if (!queryAdvertFrontRequestRes?.data) {
        return;
      }

      this.setData({
        advertList: queryAdvertFrontRequestRes.data,
      });
    },
    async queryReceiveCenterListFront() {
      const queryReceiveCenterListFrontRequestRes =
        await queryReceiveCenterListFrontRequest(
          this.data.queryReceiveCenterListForm
        );

      if (!queryReceiveCenterListFrontRequestRes?.data) {
        return;
      }

      this.setData({
        receiveCenterList: queryReceiveCenterListFrontRequestRes.data.records,
      });
    },
  },
});
