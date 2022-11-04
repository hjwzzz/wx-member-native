export interface DataList {
  curPage: number;
  totalPage: number;
  totalRecord: number;
  records: PrizeType[];
}

export interface PrizeType {
  id: string;
  url: string;
  prizeId: string;
  prizeName: string;
  quantity: string;
  expireTime: string;
  relatedId?: any;
  relatedKind: RelatedKind;
  status: RelatedKind;
  recvManner: RelatedKind;
  cutExpireTime: string;
  validTime: string;
  tommorry?: boolean;
  cutValidTime: string;
  param: string;
}

export interface RelatedKind {
  code: string;
  name: string;
}
