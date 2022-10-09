import type { couponCenter } from '../../../typings/api';

export type CouponCenterData = {
  advertList: couponCenter.QueryAdvertFrontRequestResDataItem[];

  queryReceiveCenterListForm: couponCenter.QueryReceiveCenterListFrontRequestParams;
  receiveCenterList: couponCenter.QueryReceiveCenterListFrontRequestResDataItem[];
};
