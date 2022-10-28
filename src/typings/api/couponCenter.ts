import {
  CommonPaginationRequestParams,
  CommonPaginationRequestRes,
} from './common';

export enum URL_KIND {

  /**
   * 系统页面
   */
  SYSTEM = 'SYSTEM',

  /**
   * 自定义链接
   */
  CUSTOM = 'CUSTOM',

  /**
   * 无跳转链接
   */
  WITHOUT = 'WITHOUT',
}

export interface QueryAdvertFrontRequestResDataItem {

  /**
   * h5跳转链接
   */
  h5Url: string;

  /**
   * 图片
   */
  imgUrl: string;

  /**
   * 小程序跳转链接
   */
  miniUrl: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 跳转链接
   */
  url: string;

  /**
   * 跳转链接类型
   * - SYSTEM: 系统页面
   * - CUSTOM: 自定义链接
   * - WITHOUT: 无跳转链接
   */
  urlKind: URL_KIND;
}

export type QueryAdvertFrontRequestRes = QueryAdvertFrontRequestResDataItem[];

/**
 * 领券中心C端入参
 */
export type QueryReceiveCenterListFrontRequestParams =
  CommonPaginationRequestParams<{

    /**
     * 创建时间排序
     * @format date
     */
    createTime: string;

    /** 运营体系ID */
    opsId: string;
  }>;

// 领取限制
// - 仅限一次:only
// - 每日一次:daily
// - 每月一次:monthly
//
export enum RESTRICT {
  ONLY = 'only',
  DAILY = 'daily',
  MONTHLY = 'monthly',
}

/**
 * 商品id
 */
export interface CouponGoodsReqVo {

  /** 商品ID */
  goodsId?: string;

  /** JW:：首饰，JWR：饰品，MRT_SPU：微商城SPU */
  kind?: 'JW' | 'JWR' | 'MRT_SPU';
}

/**
 * 商品分类
 */
export interface CouponGoodsCategoryReqVo {

  /** 分类ID */
  cateId?: string;

  /** JW:：首饰，JWR：饰品，MRT：微商城 */
  kind?: string;

  /**
   * 抵扣优先级
   * @format int32
   */
  seq?: number;
}

export interface AddCouponParamReqVo {

  /** 折扣券:多少折  满减券:优惠多少元  工费抵扣券:抵扣多少元  工费折扣券:多少折 */
  discount: string;

  /** 优惠类型，折前优惠:before,折后优惠：after */
  discountType: string;

  /** 指定分销商 ALL 所有分销商  部分:PART */
  distributor: string;

  /** 指定分销商ID */
  distributorList: string[];

  /** 指定商品 ALL 所有商品  部分:PART */
  goods: string;

  /** 指定商品ID */
  goodsList: CouponGoodsReqVo[];

  /** 微商城指定商品分类ID */
  goodsTypeList: CouponGoodsCategoryReqVo[];

  /** 工费折扣类型 g/p 克/件 */
  laborChargesType: string;

  /**
   * 随机金额区间--结束
   * @format int32
   */
  randomEnd: number;

  /**
   * 随机金额区间--开始
   * @format int32
   */
  randomStart: number;

  /**
   * 门槛
   * @format int32
   */
  threshold: number;
}

export interface CouponConversionVo {

  /**
   * - labor_cost_discount_coupon: 工费折扣券
   * - labor_cost_deduction_coupon: 工费抵扣券
   * - random_money_coupon: 随机券
   * - discount_coupon: 折扣券
   * - full_reduction_coupon: 满减券
   */
  code:
    | 'labor_cost_discount_coupon'
    | 'labor_cost_deduction_coupon'
    | 'random_money_coupon'
    | 'random_money_coupon'
    | 'discount_coupon';
  name?: string;
}

/**
 * prod_kind_id -> t_bas_product_kind	   产品ID和版本ID预留将来如果风格要细化绑定时使用	   	   style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface ProductStyleVo {

  /** 底部背景色 */
  bottomBgColorBottom: string;

  /** 底部背景色 */
  bottomBgColorTop: string;

  /** 风格辅色 */
  complementaryColor: string;

  /** 风格主色 */
  mainColor: string;

  /** 样式风格（默认值：default） */
  styleType: string;

  /** 顶部背景色 */
  topBgColorBottom: string;

  /** 顶部背景色 */
  topBgColorTop: string;

  /** 水印图片 */
  watermarkImgUrl: string;

  /** 水印位置（LEFT 居左 CENTER居中 RIGHT居右） */
  watermarkPosition: string;
}

export interface QueryReceiveCenterListFrontRequestResDataItem {

  /** 优惠券ID */
  couponId?: string;

  /** 优惠券有效时间:有过期时间展示过期时间,领取可用则返回:XX天可用 */
  couponValidTime?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 使用说明 */
  description?: string;

  /**
   * 已送数量
   * @format int32
   */
  gave?: number;

  /**
   * 每人发放数量
   * @format int32
   */
  give?: number;

  /** 领券中心id */
  id?: string;

  /** 优惠券名字 */
  name?: string;
  couponName?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 领取限制参数 */
  param?: RESTRICT;

  /** 参数 */
  paramVo: AddCouponParamReqVo;

  /** 已领取百分比 */
  percentage?: string;
  prod?: string;

  /** 产品代码 */
  prodCode?: CouponConversionVo;

  /**
   * 1已领取 0 未领取
   * @format int32
   */
  restrictStatus?: number;

  /** 领券中心状态   Y:已上架 T:待上架 N：已下架  O：已领完 D：已删除  G:已领取 */
  status?: string;

  /**
   * 库存数量
   * @format int32
   */
  stock?: number;

  /** 样式 */
  style?: ProductStyleVo;

  /**
   * 剩余数量:剩余数量为0展示已领完
   * @format int32
   */
  surplus?: number;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

export type QueryReceiveCenterListFrontRequestRes =
  CommonPaginationRequestRes<QueryReceiveCenterListFrontRequestResDataItem>;
