export interface CommonRequestParams<P = never> {
  param: P;
}

export enum COMMON_PAGINATION_SORT {

  /** - ASC 升序 */
  ASC = 'ASC',

  /** - DESC 降序 */
  DESC = 'DESC',
}

export type CommonPaginationRequestParams<P = Record<string, unknown>> = P & {
  curPage: number;
  pageSize: number;
  sort?: {

    /** 排序字段(返回的字段排序) */
    field?: string;

    // 排序方向
    // - ASC 升序
    // - DESC 降序
    //
    sort?: COMMON_PAGINATION_SORT;
  };
};

export type CommonPaginationRequestRes<P = Record<string, unknown>> = {
  curPage: number;
  records: P[];
  totalPage: number;
  totalRecord: number;
};
