export interface IPageInfo {
  curPage: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  records: IPrizeItem[];
  first: boolean;
  last: boolean;
}

export interface IPrizeItem {
  id: string;
  url: string;
  prizeId: string;
  prizeName: string;
  quantity: string;
  expireTime: string;
  relatedKind: string;
  status: string;
  recvManner: string;
  cutExpireTime: string;
  validTime: string;
  cutValidTime: string;
  param: string;
  statusName: string;
  relatedKindName: string;
  tommorry?: boolean;
}

export interface IPrize {
  cutExpireTime: string;
  expireTime: string;
  prizeName: string;
  quantity: string;
  recvBillNo: string;
  recvManner: string;
  recvMannerName: string;
  relatedKind: string;
  url: string;
  status: string;
  statusName: string;
  relatedKindName: string;

  cutValidTime?: string;
  id?: string;
  param?: string;
  prizeId?: string;
  relatedId?: string;
  validTime?: string;
  address?: string;
  bizTime?: string;
  city?: string;
  disAddress?: string;
  disCity?: string;
  disDistrict?: string;
  disProvince?: string;
  distName?: string;
  district?: string;
  expNo?: string;
  express?: string;
  phone?: string;
  province?: string;
  receiver?: string;
  recvBillId?: string;
  recvTime?: string;
  remark?: string;
  shipTime?: string;
  street?: string;
  tel?: string;
  vcode?: string;
  // 自定义
  remindContent?: string; // 订单状态对应的提示语
  fullAddress?: string; // 完整收货人地址
  fulldisAddress?: string; // 完整公司地址
}
