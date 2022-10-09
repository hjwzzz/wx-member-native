/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * 服务预约评价表AddReqVo
 */
export interface AddBookCommentReqVo {
  /** 评价图片信息 */
  bookCommImgList?: string[];

  /** 预约ID */
  bookId: string;

  /** 内容 */
  content?: string;

  /**
   * 1,2,3,4,5
   * @format int32
   */
  level?: number;

  /** 分销商体系ID */
  opsId?: string;

  /** 标签 */
  tag?: string[];
}

/**
 * acct_id -> t_all_bas_member_account_pointAddReqVo
 */
export interface AddBookReqVo {
  /** 分销商ID */
  distId: string;

  /** 图片信息  */
  imgUrlList?: string[];

  /** WM：微会员，WP：公众号，WMGFT：积分商城，WMRT：微商城 */
  originChan: string;

  /** 备注 */
  remark?: string;

  /** 选中的日期不能为空(yyyy-MM-dd) */
  selectedTime: string;

  /** 服务ID */
  svcId: string;

  /** 预约时间timeId不能为空 */
  timeId: string;

  /** 导购ID */
  uid?: string;
}

/**
 * 领券中心参数详情
 */
export interface AddCouponCenterParamReqVo {
  /** 领取限制:仅限一次:only  每日一次:daily  每月一次:monthly */
  restrict: string;
}

/**
 * 添加优惠券详情
 */
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

/**
 * 会员运营体系等级权益表UpdateReqVo
 */
export interface AllLevelRightsRspVo {
  /** 是否会员当前等级（Y，是，N，否） */
  curLeveled?: string;

  /** 描述 */
  description?: string;

  /** 等级ID */
  levelId?: string;

  /** 等级名称 */
  levelName?: string;

  /** 是否低于当前等级（Y，是，N，否） */
  lowLeveled?: string;

  /** 页面名称 */
  name?: string;

  /** 参数 */
  param: BasMemberRightsParamVo;

  /** 样式 */
  style: BasMemberRightsStyleVo;
}

/**
 * 会员运营体系等级权益定义表PageRspVo
 */
export interface BasMemberRightsParamVo {
  /** 顶部Banner图 */
  bannerImageUrl: string;

  /** 权益图片 */
  modualList: RightsModualVo[];
}

/**
 * 会员运营体系等级权益定义表PageRspVo
 */
export interface BasMemberRightsStyleVo {
  /** 背景颜色 */
  bgColor: string;

  /** 文字颜色 */
  fontColor: string;

  /** 版本类型 */
  kind?: string;
}

/**
 * 服务预约评价表PageRspVo
 */
export interface BookCommentPageRspVo {
  /** 头像信息 */
  avatarUrl?: string;

  /** 评价图片 */
  commImgsList?: string[];

  /** 内容 */
  content?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** ID */
  id?: string;

  /** 会员名字 */
  membName?: string;

  /** 会员ID */
  mid?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * C端获取服务预约评价请求参数PageReqVo
 */
export interface CBookCommentPageReqVo {
  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 服务ID */
  id?: string;

  /** 不给值默认获取全部评论信息,给任意值返回有图片的评论信息 */
  isHaveImg?: string;

  /** 运营体系ID */
  opsId?: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;
}

/**
 * C端用户获取预约信息列表请求参数
 */
export interface CBookPageReqVo {
  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 预约服务订单ID */
  id?: string;

  /** 会员ID */
  mid?: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;

  /** NEW：新建，CFD：确认，FTF：到店，FIN：完成，CLOSE：关闭，CANCEL：取消，不传获取全部 */
  status?: string;
}

/**
 * acct_id -> t_all_bas_member_account_pointPageRspVo
 */
export interface CBookPageRspVo {
  /** 账户ID */
  acctId?: string;

  /** 消耗道具名字（积分或其它） */
  acctName?: string;

  /** 地址 */
  address?: string;

  /** 服务预约图片 */
  bookImageList?: string[];

  /** 预约时间 */
  bookServTime?: string;

  /** 评价按钮是否显示，Y：显示，N：不需要显示 */
  boolShowAppraiseBtn?: string;

  /** 城市 */
  city?: string;

  /** 坐标 */
  coord?: string;

  /** 门槛point，free */
  cost?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 区域 */
  district?: string;

  /** 导购名字 */
  guideName?: string;

  /** 预约服务订单ID */
  id?: string;

  /** 服务项目图片URL */
  imgUrl?: string;

  /** 预约服务名 */
  name?: string;

  /** 编号 */
  number?: string;

  /** 省份 */
  province?: string;

  /** 原因 */
  reason?: string;

  /** 备注 */
  remark?: string;

  /** NEW：新建，CFD：确认，FTF：到店，FIN：完成，CLOSE：关闭，CANCEL：取消 */
  status?: string;

  /** 状态提示 */
  statusTips?: string;

  /** 门店名字 */
  storeName?: string;

  /** 服务项目ID */
  svcId?: string;

  /** 联系电话 */
  tel?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;

  /** 消耗值 */
  value?: number;
}

/**
 * dist_id -> t_all_bas_distributorRspVo
 */
export interface CMemberDistributorInfoReqVo {
  /** 当前位置坐标 */
  coordCur?: string;

  /** 分销商ID */
  distId?: string;

  /** 运营体系ID */
  opsId?: string;
}

/**
 * dist_id -> t_all_bas_distributorRspVo
 */
export interface CMemberDistributorInfoRspVo {
  /** 详细地址 */
  address?: string;

  /** 营业时间日期范围（给前端处理的） */
  businessTimeRange?: string;

  /** 营业时间(hh:mm) */
  chooseTimeList?: TimeVo[];

  /** 营业日期选择(按周) */
  chooseWeekList?: string[];

  /** 市级 */
  city?: string;

  /** 坐标 */
  coord?: string;

  /** 简介 */
  description?: string;

  /** 分销商ID */
  distId?: string;

  /** 县区 */
  district?: string;

  /** ID */
  id?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 省份 */
  province?: string;

  /**
   * 距离
   * @format double
   */
  range?: number;

  /** 参数 */
  rest?: string;

  /**
   * 排序
   * @format int32
   */
  seq?: number;

  /** 门店详情图片 */
  storeDetailsImageUrl?: string[];

  /** 门店头像图片 */
  storeHeadImageUrl?: string;

  /** 名称 */
  storeName?: string;

  /** 联系电话 */
  tel?: string;

  /** 营业时间段 （给前端处理的） */
  timeList?: string[];
}

/**
 * scm_id -> t_all_bas_member_schema	   dist_id -> t_all_bas_distributor	   分销商唯一	   有包含商城的应用：	   营业时需要更新t_all_mall_retail_sku_stock/t_all_mall_retail_spu_display/t_all_mall_retail_sku_display表的数据，因为停止状态时不会更新数据，也有可能门店在SKU创建时未创建UpdateReqVo
 */
export interface CMemberDistributorReqVo {
  /** 当前位置坐标 */
  coordCur?: string;

  /** 门店ID */
  distId?: string;

  /** 渠道ID */
  relatedId?: string;

  /** 门店名称 */
  storeName?: string;
}

/**
 * scm_id -> t_all_bas_member_schema	   dist_id -> t_all_bas_distributor	   分销商唯一	   有包含商城的应用：	   营业时需要更新t_all_mall_retail_sku_stock/t_all_mall_retail_spu_display/t_all_mall_retail_sku_display表的数据，因为停止状态时不会更新数据，也有可能门店在SKU创建时未创建RspVo
 */
export interface CMemberDistributorRspVo {
  /** 地址 */
  address?: string;

  /** 城市 */
  city?: string;

  /** 门店坐标 */
  coord?: string;

  /** 分销商ID */
  distId?: string;

  /** 区县 */
  district?: string;

  /** 是否归属 */
  gsResult?: string;

  /** 省份 */
  province?: string;

  /**
   * 距离
   * @format double
   */
  range?: number;

  /** 分销商名称 */
  storeName?: string;

  /** 门店电话 */
  tel?: string;

  /** 图片路径 */
  url?: string;
}

/**
 * 会员奖品请求参数Vo
 */
export interface CMemberPrizeReqVo {
  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;

  /** 奖品状态 */
  status?: string[];
}

/**
 * 会员奖品信息返回参数
 */
export interface CMemberPrizeRspVo {
  /** @example yyyy-MM-dd */
  cutExpireTime?: string;

  /** @example yyyy-MM-dd */
  cutValidTime?: string;

  /** 过期时间 */
  expireTime?: string;

  /** ID */
  id?: string;

  /** 参数 */
  param?: string;

  /** 奖品id */
  prizeId?: string;

  /** 奖品名称 */
  prizeName?: string;

  /** 数量 */
  quantity?: string;

  /** 收货方式 */
  recvManner?: string;

  /** 渠道ID */
  relatedId?: string;

  /** 获取渠道 */
  relatedKind?: string;

  /** 奖品状态 */
  status?: string;

  /** 奖品图片 */
  url?: string;

  /** 生效时间 */
  validTime?: string;
}

/**
 * C端-邮寄领取奖品明细
 */
export interface CPrizeSendDetailedRspVo {
  /** 地址 */
  address?: string;

  /** 兑换时间 */
  bizTime?: string;

  /** 市级 */
  city?: string;

  /** @example yyyy-MM-dd */
  cutExpireTime?: string;

  /** 分销商详细地址 */
  disAddress?: string;

  /** 分销商地址:市 */
  disCity?: string;

  /** 分销商地址:区 */
  disDistrict?: string;

  /** 分销商地址:省 */
  disProvince?: string;

  /** 领取门店 */
  distName?: string;

  /** 县区 */
  district?: string;

  /** 快递单号 */
  expNo?: string;

  /** 过期时间 */
  expireTime?: string;

  /** 快递公司 */
  express?: string;

  /** 参数 */
  param?: string;

  /** 领取人手机号 */
  phone?: string;

  /** 奖品名称 */
  prizeName?: string;

  /** 省份 */
  province?: string;

  /** 数量 */
  quantity?: string;

  /** 领取人 */
  receiver?: string;

  /** 单据ID */
  recvBillId?: string;

  /** 单据号 */
  recvBillNo?: string;

  /** 收货方式 */
  recvManner?: string;

  /** 领取时间 */
  recvTime?: string;

  /** 获取渠道 */
  relatedKind?: string;

  /** 处理意见 */
  remark?: string;

  /** 发货时间 */
  shipTime?: string;

  /** 状态 */
  status?: string;

  /** 街道 */
  street?: string;

  /** 门店电话 */
  tel?: string;

  /** 奖品图片 */
  url?: string;

  /** 核销码 */
  vcode?: string;
}

/**
 * C端-到店领取奖品明细
 */
export interface CPrizeToStoreDetailedRspVo {
  /** 兑换时间 */
  bizTime?: string;

  /** @example yyyy-MM-dd */
  cutExpireTime?: string;

  /** 分销商详细地址 */
  disAddress?: string;

  /** 分销商地址:市 */
  disCity?: string;

  /** 分销商地址:区 */
  disDistrict?: string;

  /** 分销商地址:省 */
  disProvince?: string;

  /** 领取门店 */
  distName?: string;

  /** 过期时间 */
  expireTime?: string;

  /** 参数 */
  param?: string;

  /** 领取人手机号 */
  phone?: string;

  /** 奖品名称 */
  prizeName?: string;

  /** 数量 */
  quantity?: string;

  /** 领取人 */
  receiver?: string;

  /** 单据ID */
  recvBillId?: string;

  /** 单据号 */
  recvBillNo?: string;

  /** 收货方式 */
  recvManner?: string;

  /** 领取时间 */
  recvTime?: string;

  /** 获取渠道 */
  relatedKind?: string;

  /** 处理意见 */
  remark?: string;

  /** 状态 */
  status?: string;

  /** 门店电话 */
  tel?: string;

  /** 奖品图片 */
  url?: string;

  /** 核销码 */
  vcode?: string;
}

/**
 * 获取可预约门店请求信息
 */
export interface CServDistributorReqVo {
  /** 当前坐标 */
  coordCur?: string;

  /** 服务id */
  id?: string;

  /** 会员ID */
  mid?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 门店名称 */
  storeName?: string;
}

/**
 * scm_id -> t_all_bas_member_schema	   dist_id -> t_all_bas_distributor	   分销商唯一	   有包含商城的应用：	   营业时需要更新t_all_mall_retail_sku_stock/t_all_mall_retail_spu_display/t_all_mall_retail_sku_display表的数据，因为停止状态时不会更新数据，也有可能门店在SKU创建时未创建RspVo
 */
export interface CServDistributorRspVo {
  /** 地址 */
  address?: string;

  /** 城市 */
  city?: string;

  /** 门店坐标 */
  coord?: string;

  /** 分销商ID */
  distId?: string;

  /** 区县 */
  district?: string;

  /** 是否归属 */
  gsResult?: string;

  /** 省份 */
  province?: string;

  /**
   * 距离
   * @format double
   */
  range?: number;

  /** 分销商名称 */
  storeName?: string;

  /** 门店电话 */
  tel?: string;

  /** 图片路径 */
  url?: string;
}

/**
 * C端获取服务项目分页请求参数
 */
export interface CServicePageReqVo {
  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 适用分销商ID */
  distId?: string;

  /** 服务项目 */
  name?: string;

  /** 运营体系ID */
  opsId?: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;

  /** 是否是门店模式，还是其它。Y:是，N：不是 */
  storeModel?: string;
}

/**
 * 根据C端选中的时间范围以及服务ID获取服务被预约的具体情况
 */
export interface CTimeReqVo {
  /** 开始时间 */
  beginTime: string;

  /** 分销商ID */
  distId: string;

  /** 结束时间 */
  endTime: string;

  /** 服务ID */
  svcId: string;
}

/**
 * 兑换奖品请求Vo
 */
export interface CUpdatePrizeReqVo {
  /** 地址 */
  address?: string;

  /** 市级 */
  city?: string;

  /** 县区 */
  district?: string;

  /** ID */
  id?: string;

  /** 奖品ID不能为空 */
  prizeId?: string;

  /** 省份 */
  province?: string;

  /** 领取数量 */
  quantity?: string;

  /** 领取方式 */
  recvManner?: string;

  /** 领取门店ID */
  recvStoreId?: string;

  /** 领取人 */
  recver?: string;

  /** 手机号 */
  recverPhone?: string;

  /** 街道 */
  street?: string;
}

/**
 * 取消预约
 */
export interface CancelBookReqVo {
  /** 服务ID */
  id: string;

  /** 取消原因 */
  reason: string;
}

/**
 * 返回有图的评价数量，以及全部评价数量
 */
export interface CmtCntAndCmtImgCntRspVo {
  /**
   * 总的评论次数
   * @format int32
   */
  cmtCnt?: number;

  /**
   * 有图片的评论次数
   * @format int32
   */
  cmtImgCnt?: number;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface ColorThemeReqVo {
  /** 主题辅色 */
  complementaryColor: string;

  /** 历史自定义主题辅色 */
  historyCustomComplementaryColor: string;

  /** 历史自定义主题主色 */
  historyCustomMainColor: string;

  /** 主题主色 */
  mainColor: string;

  /** 样式风格BLUE:蓝色主题,ORANGE:橙色主题,PINK:粉色主题,RED:红色主题,CUSTOMIZE:自定义主题 */
  styleType: string;
}

/**
 * 完善资料信息Vo
 */
export interface CompleteMemberInfoVo {
  /** 注册门店ID */
  activeDistId?: string;

  /** 专属导购ID */
  activeUid?: string;

  /** 地址 */
  address?: string;

  /**
   * 纪念日
   * @format date
   */
  annday?: string;

  /** 阳历：S，阴历：L */
  birthKind?: string;

  /**
   * 阴历生日
   * @format date
   */
  birthLunar?: string;

  /**
   * 阳历生日
   * @format date
   */
  birthSolar?: string;

  /** 市级 */
  city?: string;

  /** 县区 */
  district?: string;

  /** 推荐人ID */
  inviteMid?: string;

  /** 姓名 */
  name?: string;

  /** 昵称 */
  nickName?: string;

  /** 手机号码 */
  phone?: string;

  /** 省份 */
  province?: string;

  /** 推荐关联类型，从注册链接中获取 */
  relateKind?: string;

  /** 推荐关联编号，从注册链接中获取 */
  relateNumber?: string;

  /** 性别  M：男，F：女，U：未知 */
  sex?: string;
}

export interface CouponConversionVo {
  code?: string;
  name?: string;
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

/**
 * 商品id
 */
export interface CouponGoodsReqVo {
  /** 商品ID */
  goodsId?: string;

  /** JW:：首饰，JWR：饰品，MRT_SPU：微商城SPU */
  kind?: string;
}

/**
 * 删除会员消息请求实体
 */
export interface DelMemberMsgReqVo {
  /** 会员ID列表 */
  midList?: string[];
}

/**
 * 分销商
 */
export interface DistributorVo {
  /** 分销商 ALL:所有分销商 PORTION:指定分销商 */
  distributor: string;

  /** 分销商Id 选择指定分销商需填写,所有分销商不需要填写  */
  distributorId?: string[];
}

/**
 * 会员领取优惠券入参
 */
export interface GetCouponsReqVo {
  /** 领券中心id */
  centerId?: string;

  /** 优惠券id */
  couponId?: string;

  /** 会员id */
  mid?: string;

  /** 关联应用id:由哪个应用过来 */
  relatedAppId?: string;
}

/**
 * 请求获取电子质保单访问的URL的请求参数
 */
export interface GetMemberWarrantyUrlReqVo {
  /** 体系ID */
  opsId: string;

  /** 单据 */
  ticket: string;
}

export interface GetSalerReqVo {
  /** 分销商ID */
  distId?: string;

  /** 导购名称 */
  name?: string;

  /** 运营体系id */
  opsId?: string;
}

/**
 * 获取配置参数
 */
export interface GetShareParamReqVo {
  /** 页面名字 */
  pageName: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface GoldPriceParamVo {
  /** 默认展示(BELONG 归属分销商金价  AUTO系统自动) */
  defaultShow: string;

  /** 是否展示工费展示(Y,是，N，否) */
  laborCostShowed: string;

  /** 会员可查看(BELONG 归属分销商金价  ALL全部分销商金价) */
  memberView: string;

  /** 是否展示回收金价(Y,是，N，否) */
  recoveryGoldPriceShowed: string;

  /** 备注 */
  remark?: string;

  /** 是否展示备注说明(Y,是，N，否) */
  remarkShowed: string;

  /** 是否展示今日金价(Y,是，N，否) */
  todayGoldPriceShowed: string;
}

/**
 * 今日金价RspVo
 */
export interface GoldPriceRspVo {
  /** 旧料金价 */
  brandOldPrice?: OldmatMetalPriceRspVo[];

  /** 销售金价 */
  brandPrice?: MetalPriceRspVo[];

  /** 样式 */
  param?: GoldPriceParamVo;

  /** 门店信息 */
  store?: MemberDistributorRspVo;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface GoldPriceUiPanelReqVo {
  /**
   * 展示数量
   * @format int32
   */
  showNum: number;

  /** 标题 */
  title: string;
}

/**
 * active_dist_id -> t_all_bas_distributor	   belong_dist_id -> t_all_bas_distributorUpdateReqVo
 */
export interface GrowthCountRspVo {
  /**
   * 成长值
   * @format int32
   */
  growth?: number;

  /**
   * 成长值累计扣减
   * @format int32
   */
  growthDec?: number;

  /**
   * 成长值累计获取
   * @format int32
   */
  growthInc?: number;
}

/**
 * 首页今日金价RspVo
 */
export interface HomeGoldPriceRspVo {
  /** 默认展示品牌旧料金价 */
  branOldPriceList?: OldmatMetalPriceRspVo[];

  /** 默认展示品牌销售金价 */
  branPriceList?: MetalPriceRspVo[];

  /** 样式 */
  param?: GoldPriceUiPanelReqVo;

  /** 展示样式 */
  uiParam?: GoldPriceParamVo;
}

/**
 * 首页
 */
export interface IndexRspVo {
  /** 广告图 */
  bannerList?: MemberAdvertSimpleRspVo[];

  /** 首页配置项 */
  wmMainRspVo?: WmMainFrontRspVo;
}

/**
 * 展示信息
 */
export interface InformationVo {
  /** 参数信息 */
  key: string;

  /** 是否展示 */
  value: string;
}

export interface JsApiSignRspVo {
  /** 微信appId */
  appId?: string;

  /** 随机数 */
  noncestr?: string;

  /** 签名 */
  signature?: string;

  /**
   * 时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface LinkFrontVo {
  /** 账号类型：POINT 积分，DEPOSIT：储值 */
  accountKind?: string;

  /** 显示值 */
  accountValue?: string;

  /** 页面代码（金盾获取） */
  code: string;

  /** h5链接跳转链接 */
  h5Url?: string;

  /** 图标 */
  icoUrl: string;

  /** 跳转链接 */
  miniUrl?: string;

  /** 关联ID，如积分，如账户 */
  relationId?: string;

  /** 是否展示 */
  showed: boolean;

  /** 标题 */
  title: string;

  /** 链接类型: NONE:无 SYS:系统 CUSTOMIZE:自定义 */
  urlKind: string;
}

/**
 * 会员储值账户历史记录明细PageRspVo
 */
export interface MemAcctDepDetailPageRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 储值明细 */
  detailList?: PageInfoMemberAccountDepositHistoryPageRspVo;

  /** 汇总数据 */
  totalData?: MemAccttDepDetailTotalRspVo;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 会员储值账户历史记录汇总数据ageRspVo
 */
export interface MemAccttDepDetailTotalRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 日期 */
  time?: string;

  /** 当月收入总金额 */
  totalInOfMonth?: number;

  /** 当月支出总金额 */
  totalOutOfMonth?: number;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 会员积分账户历史记录汇总数据ageRspVo
 */
export interface MemAccttPointDetailTotalRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 日期 */
  time?: string;

  /**
   * 当月收入总金额
   * @format int32
   */
  totalInOfMonth?: number;

  /**
   * 当月支出总金额
   * @format int32
   */
  totalOutOfMonth?: number;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

export interface MemViewDistReqVo {
  /** 当前坐标 */
  curCoord?: string;

  /** 门店名称 */
  storeName?: string;
}

/**
 * 会员储值账户历史记录表PageReqVo
 */
export interface MemberAccountDepositHistoryPageReqVo {
  /** 会员账户ID */
  acctId?: string;

  /** 变更时间 */
  changeTime?: string;

  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 结束时间 */
  endTime?: string;

  /** 收入：IN，支出：OUT */
  opKind?: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 排序字段 */
  sort?: SortBaseVo;

  /** 开始时间 */
  startTime?: string;
}

/**
 * 会员储值账户历史记录表PageRspVo
 */
export interface MemberAccountDepositHistoryPageRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 赠送值 */
  giveValue?: number;

  /**
   * ID
   * @format int32
   */
  id?: number;

  /** 新可用值 */
  newValue?: number;

  /** 收入：IN，支出：OUT，利息收入：PRF_IN，利息支出：PRF_OUT，奖励收入：BON_IN，奖励支出：BON_OUT */
  opKind?: string;

  /** 结息：PRF，兑换：XCHG，退回：BACK */
  opReason?: string;

  /** 操作值 */
  opValue?: number;

  /** 原可用值 */
  origValue?: number;

  /** 实际操作值 */
  realValue?: number;

  /** 关联类型 */
  relatedKind?: string;

  /** 关联编号 */
  relatedNo?: string;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 备注 */
  remark?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 会员储值账户表RspVo
 */
export interface MemberAccountDepositSimpleRspVo {
  /** 账号类型ID */
  acctId?: string;

  /** 奖励 */
  bonus?: number;

  /** 清零提示 */
  clearTip?: string;

  /** ID */
  id?: string;

  /** 账户头像 */
  imgUrl?: string;

  /** 账户名称 */
  name?: string;

  /** 利息 */
  profit?: number;

  /** 正常：NORMAL，异常：ABNORMAL，冻结：FREEZE */
  status?: string;

  /** 总金额 */
  totalValue?: number;

  /**
   * 累计加值
   * @format int32
   */
  totalValueIn?: number;

  /**
   * 累计减值
   * @format int32
   */
  totalValueOut?: number;

  /** 账户单位 */
  unit?: string;

  /** 可用值 */
  value?: number;
}

/**
 * 会员积分账户历史记录明细PageRspVo
 */
export interface MemberAccountPointDetailPageRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 积分明细 */
  detailList?: PageInfoMemberAccountPointHistoryPageRspVo;

  /** 汇总数据 */
  totalData?: MemAccttPointDetailTotalRspVo;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 会员积分账户历史记录表PageReqVo
 */
export interface MemberAccountPointHistoryPageReqVo {
  /** 会员账户ID */
  acctId?: string;

  /** 变更时间 */
  changeTime?: string;

  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 结束时间 */
  endTime?: string;

  /** 收入：IN，支出：OUT */
  opKind?: string;

  /** 来源 */
  opReason?: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 类型 */
  relatedKind?: string;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 排序字段 */
  sort?: SortBaseVo;

  /** 开始时间 */
  startTime?: string;
}

/**
 * 会员积分账户历史记录表PageRspVo
 */
export interface MemberAccountPointHistoryPageRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /**
   * ID
   * @format int32
   */
  id?: number;

  /** 新可用积分 */
  newPoint?: number;

  /** 收入：IN，支出：OUT */
  opKind?: string;

  /** 操作积分 */
  opPoint?: number;

  /** 兑换：XCHG，退回：BACK，清零：ZERO，补差：DIFF */
  opReason?: string;

  /** 原可用积分 */
  origPoint?: number;

  /** 实际操作积分 */
  realPoint?: number;

  /** 关联类型 */
  relatedKind?: string;

  /** 关联编号 */
  relatedNo?: string;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 备注 */
  remark?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 会员积分账户表RspVo
 */
export interface MemberAccountPointSimpleRspVo {
  /** 賬戶ID */
  acctId?: string;

  /** 清零提示 */
  clearTip?: string;

  /** 會員賬戶ID */
  id?: string;

  /** 账户头像 */
  imgUrl?: string;

  /** 账户名称 */
  name?: string;

  /** 账户单位 */
  unit?: string;

  /** 可用值 */
  value?: number;
}

/**
 * PageRspVo
 */
export interface MemberAdvertSimpleRspVo {
  /** h5跳转链接 */
  h5Url?: string;

  /** 图片 */
  imgUrl?: string;

  /** 小程序跳转链接 */
  miniUrl?: string;

  /** 名称 */
  name?: string;

  /** 跳转链接 */
  url?: string;

  /** 跳转链接类型 SYSTEM:系统页面 CUSTOM:自定义链接 WITHOUT:无跳转链接 */
  urlKind?: string;
}

/**
 * 会员我的优惠券入参
 */
export interface MemberCouponPageListReqVo {
  /** 待使用:EFFECTIVE,USED:已使用,EXPIRED:已过期,INVALID：已失效 */
  couponStatus?: string;

  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 优惠券ID */
  id?: string;

  /** 会员ID */
  mid: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;
}

/**
 * 会员我的优惠券返参
 */
export interface MemberCouponPageListRspVo {
  /** 优惠券ID */
  couponId?: string;

  /** 会员优惠券表id--转赠使用 */
  couponMemberId?: string;

  /** 优惠券名称 */
  couponName?: string;

  /** 待生效与已生效都属于待使用:优惠券状态.INEFFEC:待生效,EFFECTIVE:已生效,USED:已使用,EXPIRED:已过期 */
  couponStatus?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** @example yyyy-MM-dd */
  cutExpireTime?: string;

  /** @example yyyy-MM-dd */
  cutValidTime?: string;

  /** 说明 */
  description?: string;

  /** 会员ID--转赠使用 */
  donateId?: string;

  /**
   * 过期时间
   * @format date-time
   */
  expireTime?: string;

  /** 会员优惠券具体参数 */
  memberCouponParam: MemberCouponParamDto;

  /** 运营体系ID */
  opsId?: string;

  /** 参数 */
  paramVo: AddCouponParamReqVo;

  /** 可转赠 */
  present?: string;
  prod?: string;

  /** 产品代码 */
  prodCode?: CouponConversionVo;

  /** 当分销商字段不是所有分销商这里展示部分分销商对应的分销商名 */
  shopNames?: string[];

  /** 样式 */
  style?: ProductStyleVo;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;

  /**
   * 生效时间
   * @format date-time
   */
  validTime?: string;
  vcode?: string;

  /**
   * 核销时间
   * @format date-time
   */
  vtime?: string;
}

/**
 * 会员优惠券参数
 */
export interface MemberCouponParamDto {
  /** 会员领取随机优惠券实际金额 */
  randomAmount?: string;
}

/**
 * scm_id -> t_all_bas_member_schema	   dist_id -> t_all_bas_distributor	   分销商唯一	   有包含商城的应用：	   营业时需要更新t_all_mall_retail_sku_stock/t_all_mall_retail_spu_display/t_all_mall_retail_sku_display表的数据，因为停止状态时不会更新数据，也有可能门店在SKU创建时未创建RspVo
 */
export interface MemberDistributorRspVo {
  /** 地址 */
  address?: string;

  /** 城市  */
  city?: string;

  /** 坐标 */
  coord?: string;

  /** 分销商ID */
  distId?: string;

  /** 分销商名称 */
  distName?: string;

  /** 区 */
  district?: string;

  /** ID */
  id?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 省份  */
  province?: string;

  /**
   * 距离
   * @format double
   */
  range?: number;

  /** 会员体系ID */
  scmId?: string;

  /** OPEN：营业，CLOSE：停业 */
  status?: string;

  /** 门店信息 */
  storeName?: string;

  /** 电话 */
  tel?: string;
}

/**
 * 体系+类型唯一PageRspVo
 */
export interface MemberEulaFrontRspVo {
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 协议列表 */
  eulas?: MemberEulaRspVo[];

  /** 页面LOGO */
  logo?: string;

  /** 隐私协议是否展示 */
  privacyAgreementShowed?: boolean;

  /** 用户协议是否展示 */
  regAgreementShowed?: boolean;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 体系+类型唯一RspVo
 */
export interface MemberEulaRspVo {
  /** 内容 */
  content?: string;

  /** ID */
  id?: string;

  /** REG：注册协议，PRIV：隐私协议 */
  kind?: string;

  /** 备注 */
  remark?: string;

  /** 体系ID */
  scmId?: string;

  /** 标题 */
  title?: string;
}

/**
 * 获取优惠券入参
 */
export interface MemberGetCouponReqVo {
  /** 优惠券领券中心 */
  couponMemberId: string;

  /** 转赠优惠券的会员id */
  donateId: string;

  /** 领取会员id */
  mid: string;
}

/**
 * 会员成长值历史记录表PageReqVo
 */
export interface MemberGrowthHistoryPageReqVo {
  /**
   * 变更时间End
   * @format date-time
   */
  createTimeEnd?: string;

  /**
   * 变更时间Start
   * @format date-time
   */
  createTimeStart?: string;

  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 会员ID */
  mid?: string;

  /** 新等级ID */
  newLevelId?: string;

  /**
   * 新成长值
   * @format int32
   */
  newValue?: number;

  /** 增加：ADD，减少：SUB */
  opKind?: string;

  /** 消费：BUY，退回：BACK */
  opReason?: string;

  /**
   * 操作值
   * @format int32
   */
  opValue?: number;

  /** 原等级ID */
  origLevelId?: string;

  /**
   * 原成长值
   * @format int32
   */
  origValue?: number;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /**
   * 实际操作值
   * @format int32
   */
  realValue?: number;

  /** 关联AppID */
  relatedAppId?: string;

  /** 关联ID */
  relatedId?: string;

  /** 关联类型 */
  relatedKind?: string;

  /** 关联编号 */
  relatedNo?: string;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 排序字段 */
  sort?: SortBaseVo;
}

/**
 * 会员成长值历史记录表PageRspVo
 */
export interface MemberGrowthHistoryPageRspVo {
  /** 来源 */
  activeAppName?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /**
   * ID
   * @format int32
   */
  id?: number;

  /** 会员ID */
  mid?: string;

  /** 新等级ID */
  newLevelId?: string;

  /**
   * 新成长值
   * @format int32
   */
  newValue?: number;

  /** 增加：ADD，减少：SUB */
  opKind?: string;

  /** 消费：BUY，退回：BACK */
  opReason?: string;

  /**
   * 操作值
   * @format int32
   */
  opValue?: number;

  /** 原等级ID */
  origLevelId?: string;

  /**
   * 原成长值
   * @format int32
   */
  origValue?: number;

  /**
   * 实际操作值
   * @format int32
   */
  realValue?: number;

  /** 关联ID */
  relatedId?: string;

  /** 关联类型 */
  relatedKind?: string;

  /** 关联编号 */
  relatedNo?: string;

  /** 关联运营体系ID */
  relatedOpsId?: string;

  /** 备注 */
  remark?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;
}

/**
 * 体系+名称唯一RspVo
 */
export interface MemberPrivateFieldVo {
  /** 字段Code */
  code?: string;

  /** 是否展示 Y/N */
  show?: string;

  /** 是否允许修改 Y/N */
  update?: string;
}

/**
 * 名称唯一RspVo
 */
export interface MemberProfessionCategoryRspVo {
  /** ID */
  id?: string;

  /** 名称 */
  name?: string;

  /** 职业列表 */
  professionList?: MemberProfessionRspVo[];

  /** 备注 */
  remark?: string;

  /**
   * 显示顺序
   * @format int32
   */
  seq?: number;
}

/**
 * 名称唯一RspVo
 */
export interface MemberProfessionRspVo {
  /** ID */
  id?: string;

  /** 名称 */
  name?: string;

  /** 备注 */
  remark?: string;

  /**
   * 显示顺序
   * @format int32
   */
  seq?: number;
}

/**
 * 体系+名称唯一RspVo
 */
export interface MemberRegistRequiredFrontReqVo {
  /** 渠道关系代码，从链接中获取 */
  channel?: string;

  /** 邀请人会员ID，从链接中获取 */
  inviteMid?: string;

  /** 渠道编号，从链接中获取 */
  num?: string;
}

/**
 * 体系+名称唯一RspVo
 */
export interface MemberRegistRequiredRspVo {
  canModifyDist?: boolean;
  canModifySaler?: boolean;

  /** 分销商Id */
  distId?: string;

  /** 分销商名称 */
  distName?: string;

  /** 注册管理列表 */
  list?: MemberRegistRequiredVo[];

  /** 是否附带关注公众号的导购 Y/N */
  openFocusGuide?: string;

  /** 是否附带关注公众号的门店 Y/N */
  openFocusStore?: string;

  /** 是否开放注册 Y/N */
  openRegist?: string;

  /** 常规注册Y/N */
  registType?: string;

  /** 导购id */
  uid?: string;
  uname?: string;
}

/**
 * 体系+名称唯一RspVo
 */
export interface MemberRegistRequiredVo {
  /** 字段Code */
  code?: string;

  /** 是否必填 Y/N */
  required?: string;

  /**
   * 排序值
   * @format int32
   */
  seq?: number;

  /** 是否展示 Y/N */
  show?: string;
}

/**
 * 销售金价维护表RspVo
 */
export interface MetalPriceRspVo {
  /** 品牌ID */
  brandId?: string;

  /** 品牌名称 */
  brandName?: string;

  /**
   * 金价日期
   * @format date
   */
  dateSet?: string;

  /** 分销商ID */
  distId?: string;

  /** 分销商名称 */
  distName?: string;

  /** 是否启用(Y/N) */
  enabled?: string;

  /** ID */
  id?: string;

  /** 工费 */
  laborFee?: number;

  /** 成色 */
  met?: string;

  /** 含量 */
  metCtn?: string;

  /** 是否线上显示Y/N */
  onlineDisplay?: string;

  /** 销售金价 */
  price?: number;

  /** 备注 */
  remark?: string;

  /** 销售属性 */
  saleCateId?: string;

  /** 销售属性名称 */
  saleCateName?: string;
}

/**
 * 旧料金价RspVo
 */
export interface OldmatMetalPriceRspVo {
  /** 品牌ID */
  brandId?: string;

  /** 品牌名称 */
  brandName?: string;

  /**
   * 金价日期
   * @format date
   */
  dateSet?: string;

  /**
   * 折旧率
   * @format double
   */
  devalRate?: number;

  /** 分销商ID */
  distId?: string;

  /** 分销商名称 */
  distName?: string;

  /** 是否启用(Y/N) */
  enabled?: string;

  /** ID */
  id?: string;

  /** 计费方式N:按件/W:按克 */
  laborCalcManner?: string;

  /** 工费单价 */
  laborPrice?: number;

  /**
   * 回收损耗
   * @format double
   */
  loss?: number;

  /** 回收成色 */
  met?: string;

  /** 回收含量 */
  metCtn?: string;

  /** 是否线上显示Y/N */
  onlineDisplay?: string;

  /** 回收金价 */
  price?: number;

  /**
   * 实测成色
   * @format double
   */
  rate?: number;

  /** 回收类型 */
  recKindId?: string;

  /** 备注 */
  remark?: string;
}

export interface PopupVo {
  /**
   * 弹窗频率 0:每日仅弹出一次 1:每次进入页面弹出
   * @format int32
   */
  frequency: number;

  /** 是否开启弹窗 Y:开启 N:关闭 */
  isOpen: string;
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

/**
 * 领券中心C端入参
 */
export interface QueryReceiveCenterListReqVo {
  /**
   * 创建时间排序
   * @format date
   */
  createTime: string;

  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /** 运营体系ID */
  opsId: string;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;
}

/**
 * 领券中心C端返参
 */
export interface QueryReceiveCenterListRspVo {
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

  /** 运营体系ID */
  opsId?: string;

  /** 领取限制参数 */
  param?: AddCouponCenterParamReqVo;

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

/**
 * 服务取消原因表RspVo
 */
export interface ReasonRspVo {
  /** ID */
  id?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 原因 */
  reason?: string;

  /** 备注 */
  remark?: string;

  /**
   * 排序
   * @format int32
   */
  seq?: number;
}

/**
 * 会员运营体系等级权益定义表PageRspVo
 */
export interface RightsModualVo {
  /** 图标 */
  icoUrl: string;

  /** 显示名称 */
  name: string;

  /**
   * 顺序
   * @format int32
   */
  seq: number;
}

/**
 * active_dist_id -> t_all_bas_distributor	   belong_dist_id -> t_all_bas_distributorUpdateReqVo
 */
export interface SalerRespVo {
  /** 头像 */
  avatarUrl?: string;

  /** 分销商id */
  distId?: string;

  /** 个人职责 */
  dutyList?: string[];

  /** 工号 */
  empNo?: string;

  /**
   * 会员数量
   * @format int32
   */
  memberCount?: number;

  /** 导购姓名 */
  name?: string;

  /** 导购角色名称 */
  roleName?: string;

  /** 导购UID */
  uid?: string;
}

/**
 * active_dist_id -> t_all_bas_distributor	   belong_dist_id -> t_all_bas_distributorUpdateReqVo
 */
export interface SalerRspVo {
  /** 头像 */
  avatarUrl?: string;

  /** 导购姓名 */
  name?: string;

  /** 导购角色名称 */
  roleName?: string;

  /** 导购UID */
  uid?: string;

  /** 是否专属 */
  zsResult?: string;
}

/**
 * 响应返回C端选中的时间范围的服务预约的具体情况
 */
export interface SelectedTimeRspVo {
  /** 该天时间yy-mm-dd */
  date?: string;

  /** Y：,已约满，N：未约满 */
  status?: string;

  /** 该天各时间段的预约情况 */
  timeList?: TimeRspVo[];
}

/**
 * 小程序服务详情信息返回
 */
export interface ServiceFrontReqVo {
  /** 服务项目ID */
  id?: string;
}

/**
 * 小程序服务详情信息返回
 */
export interface ServiceFrontRspVo {
  /** cost=POINT */
  acctId?: string;

  /** acctId对应的名字 */
  acctName?: string;

  /** 可预约结束时间 */
  allowBookingEndTime?: string;

  /** 可预约开始时间 */
  allowBookingStartTime?: string;

  /** 账户余额 */
  balance?: string;

  /** 是否开放预约，Y：可以预约，N：不可以预约 */
  boolBookServ?: string;

  /** 服务评价Y：显示，N：隐藏 */
  boolShowAppraise?: string;

  /** 立即预约界面中是否显示预约导购，Y：显示，N：隐藏 */
  boolShowGuide?: string;

  /** 服务次数Y：显示，N：隐藏 */
  boolShowServCount?: string;

  /** 1：微会员 */
  chan?: string;

  /**
   * 总的评论次数
   * @format int32
   */
  cmtCnt?: number;

  /**
   * 有图片的评论次数
   * @format int32
   */
  cmtImgCnt?: number;

  /** FREE：免费，POINT：积分 */
  cost?: string;

  /** 说明 */
  description?: string;

  /** ID */
  id?: string;

  /** 图标 */
  imgUrl?: string;

  /** 不满足指定会员，预约频率条件提示消息 */
  limitMsg?: string;

  /** 当boolBookServ==Y时候判断limitStatus值，如果该值等于Y表示有限制，则提示limitMsg，等于N或null值则表示没有条件限制可以预约 */
  limitStatus?: string;

  /** 服务项目 */
  name?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 提示：当前预约需要提前或随时或未开放预约信息 */
  tips?: string;

  /** 服务展示次数 */
  totalBook?: string;

  /** cost=POINT */
  value?: number;
}

/**
 * acct_id -> t_all_bas_member_account_pointPageRspVo
 */
export interface ServicePageRspVo {
  /** 账户ID,表示使用的是积分还是其它 */
  acctId?: string;

  /** 消耗是积分还是什么，积分 */
  acctName?: string;

  /** 是否开放预约，Y：可以预约，N：不可以预约 */
  boolBookServ?: string;

  /** 1：微会员 */
  chan?: string;

  /** FREE：免费，POINT：积分 */
  cost?: string;

  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;

  /** 创建人名称 */
  createUser?: string;

  /** 启用 */
  enabled?: string;

  /**
   * 过期时间
   * @format date-time
   */
  expireTime?: string;

  /** ID */
  id?: string;

  /** 图片地址 */
  imgUrl?: string;

  /** 名称 */
  name?: string;

  /** 运营体系ID */
  opsId?: string;

  /**
   * 排序值
   * @format int32
   */
  seq?: number;

  /** 提示：当前预约需要提前或随时或未开放预约信息 */
  tips?: string;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;

  /** 修改人名称 */
  updateUser?: string;

  /**
   * 生效时间
   * @format date-time
   */
  validTime?: string;

  /** cost=POINT */
  value?: number;
}

/**
 * 分享参数
 */
export interface ShareParamRspVo {
  /** 小程序头像 */
  miniAvatarUrl?: string;

  /** 小程序名字 */
  miniProgramName?: string;

  /** 页面名字 */
  pageName: string;

  /** 分享朋友圈启用 */
  shareChumCircleEnabled?: string;

  /** 分享朋友圈标题 */
  shareChumCircleTitle: string;

  /** 分享好友描述 */
  shareChumDescribe: string;

  /** 分享好友启用 */
  shareChumEnabled?: string;

  /** 分享好友图片 */
  shareChumImage: string;

  /** 分享好友标题 */
  shareChumTitle: string;

  /** 类型 */
  type: string;
}

/**
 * 短信验证码登录VO
 */
export interface SmsLoginVerifyVo {
  /** 头像 */
  avatarUrl?: string;

  /** jsCode */
  jsCode?: string;

  /** 昵称 */
  nickName?: string;

  /** 手机号码 */
  phone?: string;

  /** 性别 */
  sex?: string;

  /** 验证码 */
  verifyCode?: string;
}

export interface SortBaseVo {
  /** 排序字段(返回的字段排序) */
  field?: string;

  /** 排序方向（ASC 升序，DESC 降序） */
  sort?: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展RspVo
 */
export interface SysUiPanelFrontRspVo {
  /** 类型: BANNER:轮播图,GOLD_PRICE:今日金价,NOTICE:通知,QUICK_NAV:快捷导航,REC_GOODS:推荐导航,RICH_TEXT:富文本,MY_AWARD:我的奖品,REC_GIFTS:推荐礼品,ORDER:我的订单,WARRANTY:质保单,ENTRANCE:常用入口,RES_SVC:预约服务"), */
  kind?: string;

  /** 详情 */
  param?: UiPanelModuleVo;

  /**
   * 修改时间
   * @format date-time
   */
  updateTime?: string;
}

/**
 * 服务评价标签表RspVo
 */
export interface TagRspVo {
  /** ID */
  id?: string;

  /** POS：好评，NEG：差评 */
  kind?: string;

  /** 名称 */
  name?: string;

  /** 运营体系ID */
  opsId?: string;

  /** 备注 */
  remark?: string;

  /**
   * 排序
   * @format int32
   */
  seq?: number;
}

/**
 * 服务时段表RspVo
 */
export interface TimeRspVo {
  /**
   * 已经预约人数
   * @format int32
   */
  alreadyBookCnt?: number;

  /** 开始时间 */
  beginTime?: string;

  /**
   * 可预约人数
   * @format int32
   */
  bookCnt?: number;

  /** 结束时间 */
  endTime?: string;

  /** ID */
  id?: string;

  /** 服务ID */
  svcId?: string;

  /** 提示该时间段是否约满或剩余多少信息 */
  tips?: string;
}

export interface TimeVo {
  /** 开始时间 */
  beginTime?: string;

  /** 结束时间 */
  endTime?: string;
}

export type UiPanelModuleVo = object;

/**
 * vcode -> t_all_member_prize::vcodeUpdateReqVo
 */
export interface UpdateBillReceiveReqVo {
  /** 快递单号 */
  expNo?: string;

  /** 快递公司 */
  express?: string;

  /** ID */
  id?: string;

  /** 处理意见 */
  remark?: string;

  /** 发货人手机号 */
  shipPhone?: string;

  /** status */
  status?: string;
  vdistId?: string;

  /** 核销方式，(BACKGROUND ： 后台核销 APP:APP端核销) */
  vmanner?: string;
}

/**
 * C端完成预约服务请求参数
 */
export interface UpdateFinishBookReqVo {
  /** 预约id不能为空 */
  id: string;
}

/**
 * 修改微信个人资料VO
 */
export interface UpdateMemberInfoReqVo {
  /** 地址 */
  address?: string;

  /**
   * 纪念日
   * @format date
   */
  annday?: string;

  /** 头像 */
  avatarUrl?: string;

  /** 注册门店ID */
  belongDistId?: string;

  /** 专属导购ID 设置导购必须同时传入belongDistId */
  belongUid?: string;

  /** 阳历：S，阴历：L */
  birthKind?: string;

  /**
   * 阴历生日
   * @format date
   */
  birthLunar?: string;

  /**
   * 阳历生日
   * @format date
   */
  birthSolar?: string;

  /** 市级 */
  city?: string;

  /** 县区 */
  district?: string;

  /**
   * 0：其他，10：小学，20：初中，30：高中，40：专科，50：本科，60：硕士，70：博士
   * @format int32
   */
  education?: number;

  /** 邮箱 */
  email?: string;

  /** 证件类型 */
  identKind?: string;

  /** 证件号码 */
  identNo?: string;

  /** jsCode */
  jsCode?: string;

  /** 姓名 */
  name?: string;

  /** 昵称 */
  nickName?: string;

  /** 手机号码 */
  phone?: string;

  /** 职业ID */
  proId?: string;

  /** 省份 */
  province?: string;

  /** 昵称 */
  sex?: string;
}

/**
 * 修改手机号码VO
 */
export interface UpdatePhoneReqVo {
  /** 新手机号 */
  phone?: string;

  /** 验证码 */
  verifyCode?: string;
}

/**
 * 修改手机号码VO
 */
export interface UpdatePhoneVerifyReqVo {
  /** 手机号 */
  phone?: string;

  /** 验证码 */
  verifyCode?: string;
}

/**
 * 会员运营体系等级权益表UpdateReqVo
 */
export interface UserCurLevelRightsRspVo {
  /** 当前等级ID */
  curLevelId?: string;

  /** 当前等级名称 */
  curLevelName?: string;

  /**
   * 成长值
   * @format int32
   */
  growth?: number;

  /** 等级内容 */
  levelList?: AllLevelRightsRspVo[];

  /**
   * 下次升级成长值(0为最高级)
   * @format int32
   */
  nextUpgradeGrowth?: number;
}

export interface UserWarrantRspVo {
  /**
   * 业务时间
   * @format date-time
   */
  bizTime?: string;

  /** 分销商ID */
  distId?: string;

  /** id */
  id?: string;

  /** 单号 */
  number?: string;

  /** 门店名称 */
  storeName?: string;

  /** 质保单客制URL */
  warrantyCustUrl?: string;

  /** 质保单样式ID */
  warrantyId?: string;

  /** 质保单类型 BAS：基础，CUST：定制，DIY：自定义 */
  warrantyKind?: string;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyAccountVo {
  /** 账户名称 */
  accountName?: string;

  /** 账户类型  */
  accountType?: string;

  /** 账户余额 */
  amount?: number;

  /** 兑现金额 */
  exchangeAmount?: number;

  /** 利息 */
  interest?: number;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyGiftVo {
  /** 赠送金额 */
  amount?: number;

  /** 礼品分类 */
  cateName?: string;

  /** 明细备注 */
  detailRemark?: string;

  /** 储值抵现 */
  dxchgAmt?: string;

  /** 礼品编号 */
  giftNo?: string;

  /** 礼品名称 */
  name?: string;

  /** 抹零金额 */
  oddAmt?: string;

  /** 原售金额 */
  origAmt?: string;

  /** 数量 */
  quantity?: string;

  /** 折扣率 */
  rate?: string;

  /** 实售金额 */
  realAmt?: string;

  /** 实售价 */
  realPrice?: string;

  /** 礼品备注 */
  remark?: string;

  /** 赠送单价 */
  salePrice?: number;

  /** 单位 */
  unit?: string;

  /** 单件重 */
  weight?: string;

  /** 积分兑现 */
  xchgAmt?: string;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyJwDetailVo {
  /** 配件重 */
  accWt?: number;

  /** 应收金额 */
  amount?: number;

  /** 销售折扣 */
  amtRate?: number;

  /** 单据类别 JXS:首饰销售 JXT：首饰销退 */
  billKind?: string;

  /** 单据类别名称 */
  billName?: string;

  /** 首饰品牌 */
  brandName?: string;

  /** 证书费 */
  certAmt?: number;

  /** 证书号 */
  certNo?: string;

  /** 工艺1 */
  craft1?: string;

  /** 工艺2 */
  craft2?: string;

  /** 工艺3 */
  craft3?: string;

  /** 工艺费 */
  craftAmt?: number;

  /** 销售属性 */
  detailCateName?: string;

  /** 销售方式 */
  detailMode?: string;

  /** 明细备注 */
  detailRemark?: string;

  /** 会员折扣 */
  discAmtRate?: number;

  /** 实售价 */
  discSaleAmt?: number;

  /** 优惠金额 */
  discountAmt?: number;

  /** 储值兑现额 */
  dxchgAmt?: number;

  /** 首饰图片编号 */
  imgNo?: string;

  /** 首饰图片 */
  imgUrl?: string;

  /** 首饰分类 */
  jwCateName?: string;

  /** 首饰类别 */
  jwCls?: string;

  /** 类别大品名 */
  jwClsCategory?: string;

  /** 条码号 */
  jwNo?: string;

  /** 系列 */
  jwSeries?: string;

  /** 尺寸 */
  jwSize?: string;

  /** 尺寸单位 */
  jwSizeUnit?: string;

  /** 款式 */
  jwStyle?: string;

  /** 总件重 */
  jwTotalWt?: number;

  /** 成色工费 */
  laborMetPrice?: number;

  /** 工费方式 */
  laborSaleCalcManner?: string;

  /** 原售工费 */
  laborSaleOrigPrice?: number;

  /** 销售工费 */
  laborSalePrice?: number;

  /** 工费折扣 */
  laborSaleRate?: number;

  /** 金料成色 */
  met?: string;

  /** 金料颜色 */
  metClr?: string;

  /** 成色含量 */
  metCtn?: string;

  /** 销售金价 */
  metPrice?: number;

  /** 会员优惠金价 */
  metPriceDisc?: number;

  /** 实售金价 */
  metPriceReal?: number;

  /** 净金重 */
  metWt?: number;

  /** 其他费 */
  miscAmt?: number;

  /** 主石名称 */
  mstn?: string;

  /** 主石金额 */
  mstnAmt?: number;

  /** 主石净度 */
  mstnClarity?: string;

  /** 主石颜色 */
  mstnColor?: string;

  /** 主石切工 */
  mstnCut?: string;

  /** 主石规格 */
  mstnMeasure?: string;

  /** 主石单价 */
  mstnPrice?: number;

  /**
   * 主石粒数
   * @format int32
   */
  mstnQty?: number;

  /** 主石形状 */
  mstnShape?: string;

  /** 主石重量 */
  mstnWt?: number;

  /** 首饰名称 */
  name?: string;

  /** 抹零金额 */
  oddAmt?: number;

  /** 旧料金额 */
  omAmt?: number;

  /** 原编号 */
  origNo?: string;

  /** 实售价 */
  realAmt?: number;

  /** 实售折扣 */
  realAmtRate?: number;

  /** 是否已回收（Y为已回收，N 未回收，当billKind=JXT:返回为空） */
  reclaimed?: string;

  /** 是否已退客（Y为已退客，N 未退客或非Y，当billKind=JXT:返回为空） */
  recrefund?: string;

  /** 是否已销退（Y为已销退，N，未销退,当billKind=JXT:返回为空） */
  refunded?: string;

  /** 首饰备注 */
  remark?: string;

  /** 原售价 */
  saleAmt?: number;

  /**
   * 副石总数
   * @format int32
   */
  sstnQty?: number;

  /** 副石总重 */
  sstnWt?: number;

  /** 外部款号 */
  styleOutNo?: string;

  /** 积分兑现额 */
  xchgAmt?: number;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyJwrDetailVo {
  /** 实售金额 */
  amount?: number;

  /** 单据类别 PXS:饰品销售 PXT：饰品销退 */
  billKind?: string;

  /** 单据类别名称 */
  billName?: string;

  /** 首饰品牌 */
  brandName?: string;

  /** 证书号 */
  certNo?: string;

  /** 柜组 */
  cntrName?: string;

  /** 明细备注 */
  detailRemark?: string;

  /** 毛重 */
  grossWeight?: number;

  /** 饰品图片编号 */
  imgNo?: string;

  /** 首饰图片 */
  imgUrl?: string;

  /** 首饰分类 */
  jwrCateName?: string;

  /** 饰品类别 */
  jwrCls?: string;

  /** 类别大品名 */
  jwrClsCategory?: string;

  /** 条码号 */
  jwrNo?: string;

  /** 系列 */
  jwrSeries?: string;

  /** 尺寸单位 */
  jwrSizeUnit?: string;

  /** 款式 */
  jwrStyle?: string;

  /** 工费金额 */
  laborAmt?: number;

  /** 工费方式 */
  laborCalcManner?: string;

  /** 附加工费金额 */
  laborExtAmt?: number;

  /** 附加工费方式 */
  laborExtCalcManner?: string;

  /** 原售附加工费 */
  laborExtOrigPrice?: number;

  /** 实售附加工费 */
  laborExtPrice?: number;

  /**
   * 附加工费折扣
   * @format double
   */
  laborExtRate?: number;

  /** 其他工费金额 */
  laborMiscAmt?: number;

  /** 其他工费方式 */
  laborMiscCalcManner?: string;

  /** 原售其他工费 */
  laborMiscOrigPrice?: number;

  /** 实售其他工费 */
  laborMiscPrice?: number;

  /**
   * 其他工费折扣
   * @format double
   */
  laborMiscRate?: number;

  /** 原售工费 */
  laborOrigPrice?: number;

  /** 实售工费 */
  laborPrice?: number;

  /**
   * 工费折扣
   * @format double
   */
  laborRate?: number;

  /** 最大尺寸 */
  maxSize?: string;

  /** 金料成色 */
  met?: string;

  /** 金料颜色 */
  metClr?: string;

  /** 成色含量 */
  metCtn?: string;

  /** 最小尺寸 */
  minSize?: string;

  /** 主石名称 */
  mstn?: string;

  /** 饰品名称 */
  name?: string;

  /** 原编号 */
  origNo?: string;

  /** 原售单价 */
  origPrice?: number;

  /** 实售单价 */
  price?: number;

  /**
   * 数量
   * @format int32
   */
  quantity?: number;

  /**
   * 售价折扣
   * @format double
   */
  rate?: number;

  /** 饰品备注 */
  remark?: string;

  /** 销售方式 */
  saleCalcManner?: string;

  /** 外部款号 */
  styleOutNo?: string;

  /** 实售金额合计 */
  totalAmt?: number;

  /** 原售金额合计 */
  totalOrigAmt?: number;

  /** 重量 */
  weight?: number;
}

export interface UserWarrantyPageReqVo {
  /**
   * 当前页
   * @format int32
   */
  curPage?: number;

  /**
   * 每页页数
   * @format int32
   */
  pageSize?: number;

  /** 排序字段 */
  sort?: SortBaseVo;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyPaymentVo {
  /** 付款金额 */
  amount?: number;

  /** 付款方式 */
  payment?: string;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyReclaimVo {
  /** 品牌 */
  brandName?: string;

  /** 购买日期 */
  buyTime?: string;

  /** 证书号 */
  certNo?: string;

  /** 旧料类别 */
  cls?: string;

  /** 差价打折金额 */
  deductAmt?: number;

  /** 明细备注 */
  detailRemark?: string;

  /** 差价打折 */
  diffDiscount?: string;

  /** 首饰条码 */
  jwNo?: string;

  /** 工费金额 */
  laborAmt?: number;

  /** 工费方式 */
  laborCalcManner?: string;

  /** 工费单价 */
  laborPrice?: number;

  /** 旧料编号 */
  matNo?: string;

  /** 旧料成色 */
  met?: string;

  /** 回收金额 */
  metAmt?: number;

  /** 旧料颜色 */
  metClr?: string;

  /** 旧料含量 */
  metCtn?: string;

  /** 折后重量 */
  metDiscWt?: number;

  /** 损耗 */
  metLoss?: number;

  /** 回收金价 */
  metPrice?: number;

  /** 实测成色 */
  metRate?: string;

  /** 净金重 */
  metWt?: number;

  /** 主石名称 */
  mstn?: string;

  /** 石料金额 */
  mstnAmt?: number;

  /** 石料计价方式 */
  mstnCalcManner?: string;

  /** 石料净度 */
  mstnClarity?: string;

  /** 石料颜色 */
  mstnColor?: string;

  /** 石料切工 */
  mstnCut?: string;

  /** 石料单价 */
  mstnPrice?: number;

  /**
   * 石料粒数
   * @format int32
   */
  mstnQty?: number;

  /** 石料形状 */
  mstnShape?: string;

  /** 石料重量 */
  mstnWt?: number;

  /** 石料单位 */
  mstnWtUnit?: string;

  /** 旧料名称 */
  name?: string;

  /** 旧料分类 */
  omCateName?: string;

  /** 原抵扣金额 */
  origAmt?: number;

  /** 素/非素 */
  pure?: string;

  /** 数量 */
  quantity?: number;

  /** 折旧率 */
  rate?: string;

  /** 抵扣金额 */
  realAmt?: number;

  /** 实际抵扣金额 */
  realDeductAmt?: number;

  /** 回收类型 */
  recKindName?: string;

  /** 回收编号 */
  recNo?: string;

  /** 小备注 */
  remark?: string;

  /** 销售金额 */
  saleAmt?: number;

  /** 总件重 */
  totalWt?: number;
}

/**
 * C端电子质保单详情
 */
export interface UserWarrantyRspVo {
  /** 账户信息 */
  accounts?: UserWarrantyAccountVo[];

  /** 积分账户名 */
  acctName?: string;

  /** 应收金额 */
  amount?: number;

  /** 销售属性分类 */
  bcName?: string;

  /**
   * 业务时间
   * @format date-time
   */
  bizTime?: string;

  /** 市 */
  city?: string;

  /** 柜组 */
  cntrName?: string;

  /** 优惠券ID */
  couponId?: string;

  /** 优惠券名字 */
  couponName?: string;

  /** 定金 */
  depositAmt?: string;

  /** 优惠金额 */
  discountAmt?: number;

  /** 分销地址 */
  distAddress?: string;

  /** 分销商ID */
  distId?: string;

  /** 分销商 */
  distName?: string;

  /** 分销联系电话 */
  distTel?: string;

  /** 县 */
  district?: string;

  /** 储值兑现 */
  dxchgAmt?: number;

  /** 兑换金额 */
  exchangeAmount?: string;

  /** 兑换数 */
  exchangePoint?: string;

  /** 礼品明细 */
  giftDetails?: UserWarrantyGiftVo[];

  /** 是否签名 */
  isSigned?: string;

  /** 首饰明细 */
  jwDetails?: UserWarrantyJwDetailVo[];

  /** 饰品明细 */
  jwrDetails?: UserWarrantyJwrDetailVo[];

  /** [单据样式] BAS：基础，CUST：定制，DIY：自定义 */
  kind?: string;

  /** 旧料工费 */
  laborOmAmt?: number;

  /** 会员等级 */
  levName?: string;

  /** 会员名称 */
  mebName?: string;

  /** 会员卡号 */
  mebNumber?: string;

  /** 客户电话 */
  mebPhone?: string;

  /** 净金重 */
  metWt?: number;

  /** 经理名称 */
  mgrName?: string;

  /** 主石重 */
  mstnWt?: number;

  /** 销售单号 */
  number?: string;

  /** 抹零 */
  oddAmt?: number;

  /** 旧料金额 */
  omAmt?: number;

  /** 运营体系ID */
  opsId?: string;

  /** [单据样式] 参数 */
  paramVo?: WarrantParamVo;

  /** 支付金额 */
  payAmount?: number;

  /** 支付类型 */
  payType?: string;

  /** 收银明细 */
  payments?: UserWarrantyPaymentVo[];

  /** 省 */
  province?: string;

  /**
   * 件数
   * @format int32
   */
  quantity?: number;

  /** 实收金额 */
  realAmt?: number;

  /** 旧料 */
  reclaims?: UserWarrantyReclaimVo[];

  /** 单据备注 */
  remark?: string;

  /** 销售金额 */
  saleAmt?: number;

  /** 签名URL */
  signUrl?: string;

  /** 营业员名称 */
  slpName?: string;

  /** 副石重 */
  sstnWt?: number;

  /** [单据样式] 样式 */
  style?: string;

  /** 班组 */
  teamName?: string;

  /** 总件重 */
  totalWt?: number;

  /** 单据备注 */
  voucherRemark?: string;

  /** 积分兑现 */
  xchgAmt?: number;
}

export interface UserWarrantySignReqVo {
  /** 质保单ID */
  id?: string;

  /** 签名URL */
  signUrl?: string;
}

export interface WarrantParamVo {
  /** 背面 定制的是图片的url */
  bkImgUrl?: string;

  /** 模板code */
  code: string;

  /** 分销商 */
  distributorVo: DistributorVo;

  /** logo商标Url */
  imgUrl: string;

  /** 展示信息 */
  informationVo: InformationVo[];

  /** 反面 标准的是富文本 */
  negative?: string;

  /** 标签价钱商品重量显示，Y显示，N不显示，默认N */
  priceAndWeightShow: string;

  /** 模板图片Url */
  url: string;

  /** 左侧操作栏模板编号 */
  warrantId: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展RspVo
 */
export interface WarrantyRspVo {
  /** BAS：基础，CUST：定制，DIY：自定义 */
  kind?: string;

  /** 质保单url */
  url?: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmBottomNavParamRspVo {
  /** 导航设置项 */
  bottomNavList?: WmLinkNavRspVo[];

  /** 悬浮导航项 */
  levitationNavList: WmLinkNavRspVo[];
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmCenterFrontParamVo {
  /** 便捷导航 */
  quickNavList: LinkFrontVo[];

  /** 主页标题 */
  title: string;

  /** 顶部背景图 */
  topBgImageUrl: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmCenterFrontRspVo {
  /** 板块 */
  panelList?: SysUiPanelFrontRspVo[];

  /** 参数 */
  param?: WmCenterFrontParamVo;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmLinkNavRspVo {
  /** 账号类型：POINT 积分，DEPOSIT：储值 */
  accountKind?: string;

  /** 页面代码(金盾获取) */
  code?: string;

  /** h5链接跳转链接 */
  h5Url?: string;

  /** 图标 */
  icoUrl: string;

  /** 跳转链接 */
  miniUrl?: string;

  /** 关联ID，如积分，如账户 */
  relationId?: string;

  /** 标题 */
  title: string;

  /** 链接类型: NONE:无 SYS:系统 CUSTOMIZE:自定义 */
  urlKind: string;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmMainFrontRspVo {
  /** 板块 */
  panelList?: SysUiPanelFrontRspVo[];

  /** 参数 */
  param?: WmMainParamVo;
}

/**
 * style: {"kind":"sty1",...} 样式始终包含"kind"字段，以便扩展AddReqVo
 */
export interface WmMainParamVo {
  /** 主页标题 */
  title: string;

  /** 顶部背景图 */
  topBgImageUrl: string;
}

/**
 * 微信授权URL
 */
export interface WxAuthCodeUrlReqVo {
  /** 推广渠道id */
  channelId?: string;

  /** 场景 扫码有礼活动:SCAN_ACT */
  scene?: string;

  /** snsapi_base 和 snsapi_userinfo 授权作用域，拥有多个作用域用逗号（,）分隔 */
  scope?: string;

  /** 重定向后会带上 state 参数，开发者可以填写任意参数值，最多 128 字节 */
  state?: string;
}

/**
 * 登录VO
 */
export interface WxAuthLoginVerifyVo {
  /** 头像 */
  avatarUrl?: string;

  /** encryptedData */
  encryptedData?: string;

  /** iv */
  iv?: string;

  /** jsCode */
  jsCode?: string;

  /** 昵称 */
  nickName?: string;

  /** 手机号码 */
  phone?: string;

  /** 性别 */
  sex?: string;
}

/**
 * 微信登录返回vo
 */
export interface WxLoginRspVo {
  /** mid */
  mid?: string;

  /** 手机号码 */
  phone?: string;

  /** 登录token */
  token?: string;

  /** wmid */
  wmid?: string;
}

/**
 * 头像，昵称信息更新
 */
export interface WxMemberBaseInfoReqVo {
  /** 头像 */
  avatarUrl?: string;

  /** 昵称 */
  nickName?: string;

  /** WM(小程序),WP(h5网页) */
  type?: string;
}

/**
 * 会员中心
 */
export interface WxMemberCenterRspVo {
  /** 头像 */
  avatarUrl?: string;

  /** 当前等级名称 */
  curLevelName?: string;

  /** 姓名 */
  name?: string;

  /** 昵称 */
  nickName?: string;

  /** 个人中心配置项 */
  wmCenterRspVo?: WmCenterFrontRspVo;
}

/**
 * 微信个人资料VO
 */
export interface WxMemberInfoRspVo {
  /** 地址 */
  address?: string;

  /**
   * 纪念日
   * @format date
   */
  annday?: string;

  /** 头像 */
  avatarUrl?: string;

  /** 注册门店ID */
  belongDistId?: string;

  /** 归属分销商名称 */
  belongDistName?: string;

  /** 专属导购ID */
  belongUid?: string;

  /** 专属导购名称 */
  belongUser?: string;

  /** 阳历：S，阴历：L */
  birthKind?: string;

  /**
   * 阴历生日
   * @format date
   */
  birthLunar?: string;

  /**
   * 阳历生日
   * @format date
   */
  birthSolar?: string;

  /** 县区 */
  district?: string;

  /**
   * 0：其他，10：小学，20：初中，30：高中，40：专科，50：本科，60：硕士，70：博士
   * @format int32
   */
  education?: number;

  /** 邮箱 */
  email?: string;

  /** 证件类型 */
  identKind?: string;

  /** 证件号码 */
  identNo?: string;

  /** mid */
  mid?: string;

  /** 姓名 */
  name?: string;

  /** 性别 */
  nickName?: string;

  /** 手机号 */
  phone?: string;

  /** 职业ID */
  proId?: string;

  /** 职业名称 */
  proName?: string;

  /** 省份 */
  province?: string;

  /** 昵称 */
  sex?: string;
}

/**
 * 微信网页授权VO
 */
export interface WxPageAuthReqVo {
  /** accessToken */
  accessToken?: string;

  /** 关联id */
  inviteRelatedId?: string;

  /** openid */
  openid?: string;

  /** unionid */
  unionid?: string;

  /** wpAppId */
  wpAppId?: string;
}

/**
 * 登录VO
 */
export interface WxPagePhoneLoginVo {
  /** 手机号码 */
  phone?: string;

  /** 验证码 */
  verifyCode?: string;
}

/**
 * 分页信息表
 */
export interface PageInfoBookCommentPageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: BookCommentPageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoCBookPageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: CBookPageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoCMemberPrizeRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: CMemberPrizeRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoMemberAccountDepositHistoryPageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: MemberAccountDepositHistoryPageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoMemberAccountPointHistoryPageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: MemberAccountPointHistoryPageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoMemberCouponPageListRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: MemberCouponPageListRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoMemberGrowthHistoryPageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: MemberGrowthHistoryPageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoQueryReceiveCenterListRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: QueryReceiveCenterListRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoServicePageRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: ServicePageRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

/**
 * 分页信息表
 */
export interface PageInfoUserWarrantRspVo {
  /**
   * 当前页
   * @format int64
   */
  curPage?: number;

  /** 记录内容 */
  records?: UserWarrantRspVo[];

  /**
   * 总页数
   * @format int64
   */
  totalPage?: number;

  /**
   * 总记录数
   * @format int64
   */
  totalRecord?: number;
}

export interface ReqBaseVoAddBookCommentReqVo {
  /** 参数实体 */
  param?: AddBookCommentReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoAddBookReqVo {
  /** 参数实体 */
  param?: AddBookReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCBookCommentPageReqVo {
  /** 参数实体 */
  param?: CBookCommentPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCBookPageReqVo {
  /** 参数实体 */
  param?: CBookPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCMemberDistributorInfoReqVo {
  /** 参数实体 */
  param?: CMemberDistributorInfoReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCMemberDistributorReqVo {
  /** 参数实体 */
  param?: CMemberDistributorReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCMemberPrizeReqVo {
  /** 参数实体 */
  param?: CMemberPrizeReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCServDistributorReqVo {
  /** 参数实体 */
  param?: CServDistributorReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCServicePageReqVo {
  /** 参数实体 */
  param?: CServicePageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCTimeReqVo {
  /** 参数实体 */
  param?: CTimeReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCUpdatePrizeReqVo {
  /** 参数实体 */
  param?: CUpdatePrizeReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCancelBookReqVo {
  /** 参数实体 */
  param?: CancelBookReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoCompleteMemberInfoVo {
  /** 参数实体 */
  param?: CompleteMemberInfoVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoDelMemberMsgReqVo {
  /** 参数实体 */
  param?: DelMemberMsgReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoGetCouponsReqVo {
  /** 参数实体 */
  param?: GetCouponsReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoGetMemberWarrantyUrlReqVo {
  /** 参数实体 */
  param?: GetMemberWarrantyUrlReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoGetSalerReqVo {
  /** 参数实体 */
  param?: GetSalerReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoGetShareParamReqVo {
  /** 参数实体 */
  param?: GetShareParamReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemViewDistReqVo {
  /** 参数实体 */
  param?: MemViewDistReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberAccountDepositHistoryPageReqVo {
  /** 参数实体 */
  param?: MemberAccountDepositHistoryPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberAccountPointHistoryPageReqVo {
  /** 参数实体 */
  param?: MemberAccountPointHistoryPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberCouponPageListReqVo {
  /** 参数实体 */
  param?: MemberCouponPageListReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberGetCouponReqVo {
  /** 参数实体 */
  param?: MemberGetCouponReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberGrowthHistoryPageReqVo {
  /** 参数实体 */
  param?: MemberGrowthHistoryPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoMemberRegistRequiredFrontReqVo {
  /** 参数实体 */
  param?: MemberRegistRequiredFrontReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoQueryReceiveCenterListReqVo {
  /** 参数实体 */
  param?: QueryReceiveCenterListReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoServiceFrontReqVo {
  /** 参数实体 */
  param?: ServiceFrontReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoSmsLoginVerifyVo {
  /** 参数实体 */
  param?: SmsLoginVerifyVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUpdateBillReceiveReqVo {
  /** 参数实体 */
  param?: UpdateBillReceiveReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUpdateFinishBookReqVo {
  /** 参数实体 */
  param?: UpdateFinishBookReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUpdateMemberInfoReqVo {
  /** 参数实体 */
  param?: UpdateMemberInfoReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUpdatePhoneReqVo {
  /** 参数实体 */
  param?: UpdatePhoneReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUpdatePhoneVerifyReqVo {
  /** 参数实体 */
  param?: UpdatePhoneVerifyReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUserWarrantyPageReqVo {
  /** 参数实体 */
  param?: UserWarrantyPageReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoUserWarrantySignReqVo {
  /** 参数实体 */
  param?: UserWarrantySignReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoWxAuthCodeUrlReqVo {
  /** 参数实体 */
  param?: WxAuthCodeUrlReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoWxAuthLoginVerifyVo {
  /** 参数实体 */
  param?: WxAuthLoginVerifyVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoWxMemberBaseInfoReqVo {
  /** 参数实体 */
  param?: WxMemberBaseInfoReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoWxPageAuthReqVo {
  /** 参数实体 */
  param?: WxPageAuthReqVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoWxPagePhoneLoginVo {
  /** 参数实体 */
  param?: WxPagePhoneLoginVo;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface ReqBaseVoString {
  /** 参数实体 */
  param?: string;

  /** 签名 */
  sign?: string;

  /** 签名类型 */
  signType?: string;

  /** 来源 */
  source?: string;

  /**
   * 请求时间，使用时间戳
   * @format int64
   */
  timestamp?: number;

  /** 版本号 */
  version?: string;
}

export interface RespBaseVoCMemberDistributorInfoRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CMemberDistributorInfoRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoCMemberPrizeRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CMemberPrizeRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoCPrizeSendDetailedRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CPrizeSendDetailedRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoCPrizeToStoreDetailedRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CPrizeToStoreDetailedRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoCmtCntAndCmtImgCntRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CmtCntAndCmtImgCntRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoColorThemeReqVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: ColorThemeReqVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoGoldPriceRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: GoldPriceRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoGrowthCountRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: GrowthCountRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoHomeGoldPriceRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: HomeGoldPriceRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoIndexRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: IndexRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoJsApiSignRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: JsApiSignRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListCMemberDistributorRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CMemberDistributorRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListCServDistributorRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: CServDistributorRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberAccountDepositSimpleRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberAccountDepositSimpleRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberAccountPointSimpleRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberAccountPointSimpleRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberAdvertSimpleRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberAdvertSimpleRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberDistributorRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberDistributorRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberPrivateFieldVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberPrivateFieldVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListMemberProfessionCategoryRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberProfessionCategoryRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListReasonRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: ReasonRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListSalerRespVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: SalerRespVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListSalerRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: SalerRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListSelectedTimeRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: SelectedTimeRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoListTagRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: TagRspVo[];

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoMemAcctDepDetailPageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemAcctDepDetailPageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoMemberAccountPointDetailPageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberAccountPointDetailPageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoMemberEulaFrontRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberEulaFrontRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoMemberRegistRequiredRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: MemberRegistRequiredRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoBookCommentPageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoBookCommentPageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoCBookPageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoCBookPageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoCMemberPrizeRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoCMemberPrizeRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoMemberCouponPageListRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoMemberCouponPageListRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoMemberGrowthHistoryPageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoMemberGrowthHistoryPageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoQueryReceiveCenterListRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoQueryReceiveCenterListRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoServicePageRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoServicePageRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPageInfoUserWarrantRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PageInfoUserWarrantRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoPopupVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: PopupVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoQueryReceiveCenterListRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: QueryReceiveCenterListRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoServiceFrontRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: ServiceFrontRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoShareParamRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: ShareParamRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoUserCurLevelRightsRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: UserCurLevelRightsRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoUserWarrantyRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: UserWarrantyRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoWarrantyRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: WarrantyRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoWmBottomNavParamRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: WmBottomNavParamRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoWxLoginRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: WxLoginRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoWxMemberCenterRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: WxMemberCenterRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoWxMemberInfoRspVo {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: WxMemberInfoRspVo;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoBoolean {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: boolean;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoInt {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /**
   * 实体内容
   * @format int32
   */
  data?: number;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export interface RespBaseVoString {
  /**
   * 响应码：0为成功，其它的参照
   * @format int32
   */
  code?: number;

  /** 实体内容 */
  data?: string;

  /**
   * 响应时间（ms）
   * @format int64
   */
  elapsed?: number;

  /** 响应信息 */
  msg?: string;

  /**
   * 服务器时间,时间戳
   * @format int64
   */
  timestamp?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "//backend.fat.jqzplat.com:443/emp-base";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title demo service api
 * @version 1.0.0
 * @termsOfService http://localhost
 * @baseUrl //backend.fat.jqzplat.com:443/emp-base
 *
 * demo service
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  memberDistributorFront = {
    /**
     * @description 查询附近门店
     *
     * @tags 附近门店
     * @name QueryNearStoreUsingPost1
     * @summary 查询附近门店
     * @request POST:/MemberDistributorFront/queryNearStore
     */
    queryNearStoreUsingPost1: (reqBody: ReqBaseVoCMemberDistributorReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListCMemberDistributorRspVo, any>({
        path: `/MemberDistributorFront/queryNearStore`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取附近门店详情信息
     *
     * @tags 附近门店
     * @name QueryNearStoreDetailsUsingPost
     * @summary 获取附近门店详情信息
     * @request POST:/MemberDistributorFront/queryStoreDetails
     */
    queryNearStoreDetailsUsingPost: (reqBody: ReqBaseVoCMemberDistributorInfoReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoCMemberDistributorInfoRspVo, any>({
        path: `/MemberDistributorFront/queryStoreDetails`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  memberPrizeFront = {
    /**
     * @description 获取会员奖品单条基本信息ById
     *
     * @tags 会员奖品
     * @name GetMemberPrizeDetailUsingPost
     * @summary 获取会员奖品单条基本信息ById
     * @request POST:/MemberPrizeFront/usr/getMemberPrizeDetail
     */
    getMemberPrizeDetailUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoCMemberPrizeRspVo, any>({
        path: `/MemberPrizeFront/usr/getMemberPrizeDetail`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取会员奖品状态数据集
     *
     * @tags 会员奖品
     * @name QueryMemberPrizeListUsingPost
     * @summary 获取会员奖品状态数据集
     * @request POST:/MemberPrizeFront/usr/queryMemberPrizeList
     */
    queryMemberPrizeListUsingPost: (reqBody: ReqBaseVoCMemberPrizeReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoCMemberPrizeRspVo, any>({
        path: `/MemberPrizeFront/usr/queryMemberPrizeList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取会员奖品明细数据By单据id--邮寄
     *
     * @tags 会员奖品
     * @name QueryMemberPrizeSendDetailUsingPost
     * @summary 获取会员奖品明细数据By单据id--邮寄
     * @request POST:/MemberPrizeFront/usr/queryMemberPrizeSendDetail
     */
    queryMemberPrizeSendDetailUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoCPrizeSendDetailedRspVo, any>({
        path: `/MemberPrizeFront/usr/queryMemberPrizeSendDetail`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取会员奖品明细数据By单据id--到店
     *
     * @tags 会员奖品
     * @name QueryMemberPrizeToStoreDetailUsingPost
     * @summary 获取会员奖品明细数据By单据id--到店
     * @request POST:/MemberPrizeFront/usr/queryMemberPrizeToStoreDetail
     */
    queryMemberPrizeToStoreDetailUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoCPrizeToStoreDetailedRspVo, any>({
        path: `/MemberPrizeFront/usr/queryMemberPrizeToStoreDetail`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description C端领取奖品--邮寄
     *
     * @tags 会员奖品
     * @name UpdatePrizeSendUsingPost
     * @summary C端领取奖品--邮寄
     * @request POST:/MemberPrizeFront/usr/updatePrizeSend
     */
    updatePrizeSendUsingPost: (reqBody: ReqBaseVoUpdateBillReceiveReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/MemberPrizeFront/usr/updatePrizeSend`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 兑换奖品
     *
     * @tags 会员奖品
     * @name UpdatePrizeStatusUsingPost
     * @summary 兑换奖品
     * @request POST:/MemberPrizeFront/usr/updatePrizeStatus
     */
    updatePrizeStatusUsingPost: (reqBody: ReqBaseVoCUpdatePrizeReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/MemberPrizeFront/usr/updatePrizeStatus`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description C端领取奖品--到店
     *
     * @tags 会员奖品
     * @name UpdatePrizeToStoreUsingPost
     * @summary C端领取奖品--到店
     * @request POST:/MemberPrizeFront/usr/updatePrizeToStore
     */
    updatePrizeToStoreUsingPost: (reqBody: ReqBaseVoUpdateBillReceiveReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/MemberPrizeFront/usr/updatePrizeToStore`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  center = {
    /**
     * @description 根据场景值查询领券中心ID
     *
     * @tags 优惠券
     * @name GetCenterCouponIdByStorageFrontUsingPost
     * @summary 根据场景值查询领券中心ID
     * @request POST:/center/getCenterCouponIdByStorageFront
     */
    getCenterCouponIdByStorageFrontUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/center/getCenterCouponIdByStorageFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description param:运营体系ID
     *
     * @tags 优惠券
     * @name QueryAdvertUsingPost
     * @summary 优惠券--查询广告轮播图--必传:运营体系ID
     * @request POST:/center/queryAdvertFront
     */
    queryAdvertUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/center/queryAdvertFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 参数为列表中 id
     *
     * @tags 优惠券
     * @name QueryReceiveCenterDetailUsingPost
     * @summary 优惠券--查询领券中心可领取优惠券详情
     * @request POST:/center/queryReceiveCenterDetailFront
     */
    queryReceiveCenterDetailUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoQueryReceiveCenterListRspVo, any>({
        path: `/center/queryReceiveCenterDetailFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 查询领券中心可领取优惠券列表
     *
     * @tags 优惠券
     * @name QueryReceiveCenterListUsingPost
     * @summary 优惠券--查询领券中心可领取优惠券列表
     * @request POST:/center/queryReceiveCenterListFront
     */
    queryReceiveCenterListUsingPost: (reqBody: ReqBaseVoQueryReceiveCenterListReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoQueryReceiveCenterListRspVo, any>({
        path: `/center/queryReceiveCenterListFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 领取优惠券结果
     *
     * @tags 优惠券
     * @name GetCouponsUsingPost
     * @summary 优惠券--领取优惠券结果
     * @request POST:/center/usr/getCouponsFront
     */
    getCouponsUsingPost: (reqBody: ReqBaseVoGetCouponsReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoInt, any>({
        path: `/center/usr/getCouponsFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  memAcctDepFront = {
    /**
     * @description 是否是单账户 (true:是,false:否)
     *
     * @tags 储值账户
     * @name IsSingleAcctUsingPost
     * @summary 是否是单账户 (true:是,false:否)
     * @request POST:/memAcctDepFront/usr/isSingleAcct
     */
    isSingleAcctUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/memAcctDepFront/usr/isSingleAcct`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 我的储值明细
     *
     * @tags 储值账户
     * @name QueryDepDetailPageUsingPost
     * @summary 我的储值明细
     * @request POST:/memAcctDepFront/usr/queryDepDetailPage
     */
    queryDepDetailPageUsingPost: (reqBody: ReqBaseVoMemberAccountDepositHistoryPageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoMemAcctDepDetailPageRspVo, any>({
        path: `/memAcctDepFront/usr/queryDepDetailPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 我的储值列表
     *
     * @tags 储值账户
     * @name QueryDepListUsingPost
     * @summary 我的储值列表
     * @request POST:/memAcctDepFront/usr/queryDepList
     */
    queryDepListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAccountDepositSimpleRspVo, any>({
        path: `/memAcctDepFront/usr/queryDepList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  memAcctPointFront = {
    /**
     * @description 我的积分明细
     *
     * @tags 积分账户
     * @name QueryPointDetailPageUsingPost
     * @summary 我的积分明细
     * @request POST:/memAcctPointFront/usr/queryPointDetailPage
     */
    queryPointDetailPageUsingPost: (reqBody: ReqBaseVoMemberAccountPointHistoryPageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoMemberAccountPointDetailPageRspVo, any>({
        path: `/memAcctPointFront/usr/queryPointDetailPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 我的积分列表
     *
     * @tags 积分账户
     * @name QueryPointListUsingPost
     * @summary 我的积分列表
     * @request POST:/memAcctPointFront/usr/queryPointList
     */
    queryPointListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAccountPointSimpleRspVo, any>({
        path: `/memAcctPointFront/usr/queryPointList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取积分商城积分
     *
     * @tags 积分账户
     * @name QueryPointMallUserPointListUsingPost
     * @summary 获取积分商城积分
     * @request POST:/memAcctPointFront/usr/queryPointMallUserPointList
     */
    queryPointMallUserPointListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAccountPointSimpleRspVo, any>({
        path: `/memAcctPointFront/usr/queryPointMallUserPointList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  memCoupon = {
    /**
     * @description 获取转赠优惠券:4124:手慢了,优惠券已被领完了,4123:抱歉,您不可领取自己转赠的优惠券,4125:优惠券领取成功,4111:优惠券已失效
     *
     * @tags A会员优惠券
     * @name GetCouponUsingPost
     * @summary 获取转赠优惠券
     * @request POST:/memCoupon/usr/getCouponFront
     */
    getCouponUsingPost: (reqBody: ReqBaseVoMemberGetCouponReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/memCoupon/usr/getCouponFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 我的优惠券列表
     *
     * @tags A会员优惠券
     * @name QueryMyCouponListUsingPost
     * @summary 我的优惠券列表
     * @request POST:/memCoupon/usr/queryMyCouponListFront
     */
    queryMyCouponListUsingPost: (reqBody: ReqBaseVoMemberCouponPageListReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoMemberCouponPageListRspVo, any>({
        path: `/memCoupon/usr/queryMyCouponListFront`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  member = {
    /**
     * @description JMP删除会员清空会话
     *
     * @tags 会员登录注册相关
     * @name RemoverMemberLogoutUsingPost
     * @summary JMP删除会员清空会话
     * @request POST:/member/login/Front/delMemberCleanInfo
     */
    removerMemberLogoutUsingPost: (reqBody: ReqBaseVoDelMemberMsgReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/member/login/Front/delMemberCleanInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取企业LOGO
     *
     * @tags 会员登录注册相关
     * @name GetLogoUsingPost
     * @summary 获取企业LOGO
     * @request POST:/member/login/Front/getLogo
     */
    getLogoUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/member/login/Front/getLogo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取用户协议
     *
     * @tags 会员登录注册相关
     * @name GetMemberEulaUsingPost
     * @summary 获取用户协议
     * @request POST:/member/login/Front/getMemberEula
     */
    getMemberEulaUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoMemberEulaFrontRspVo, any>({
        path: `/member/login/Front/getMemberEula`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 小程序授权信息
     *
     * @tags 会员登录注册相关
     * @name GetWxMiniInfoUsingPost
     * @summary 小程序授权信息
     * @request POST:/member/login/Front/getWxMiniInfo
     */
    getWxMiniInfoUsingPost: (reqBody: ReqBaseVoWxAuthLoginVerifyVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/getWxMiniInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 小程序根据jsCode登录
     *
     * @tags 会员登录注册相关
     * @name JsCodeLoginUsingPost
     * @summary 小程序根据jsCode登录
     * @request POST:/member/login/Front/jsCodeLogin
     */
    jsCodeLoginUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/jsCodeLogin`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 退出登录
     *
     * @tags 会员登录注册相关
     * @name LogoutUsingPost
     * @summary 退出登录
     * @request POST:/member/login/Front/logout
     */
    logoutUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/member/login/Front/logout`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 网页授权请求code url
     *
     * @tags 会员登录注册相关
     * @name GetAuthCodeUrlUsingPost
     * @summary 网页授权请求code url
     * @request POST:/member/login/Front/postWxPageAuthCode
     */
    getAuthCodeUrlUsingPost: (reqBody: ReqBaseVoWxAuthCodeUrlReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/member/login/Front/postWxPageAuthCode`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 手机登录/注册-发送验证码
     *
     * @tags 会员登录注册相关
     * @name SendCodeUsingPost
     * @summary 手机登录/注册-发送验证码
     * @request POST:/member/login/Front/sendCode
     */
    sendCodeUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/member/login/Front/sendCode`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 手机登录-验证
     *
     * @tags 会员登录注册相关
     * @name VerifyUsingPost
     * @summary 手机登录-验证
     * @request POST:/member/login/Front/sendCode/verify
     */
    verifyUsingPost: (reqBody: ReqBaseVoSmsLoginVerifyVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/sendCode/verify`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 修改手机号码-发送验证码
     *
     * @tags 会员登录注册相关
     * @name UpdatePhoneSendCodeUsingPost
     * @summary 修改手机号码-发送验证码
     * @request POST:/member/login/Front/updatePhoneSendCode
     */
    updatePhoneSendCodeUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/member/login/Front/updatePhoneSendCode`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 小程序授权登录
     *
     * @tags 会员登录注册相关
     * @name WxMiniAuthUsingPost
     * @summary 小程序授权登录
     * @request POST:/member/login/Front/wxMiniAuth
     */
    wxMiniAuthUsingPost: (reqBody: ReqBaseVoWxAuthLoginVerifyVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/wxMiniAuth`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 网页授权根据Code登录
     *
     * @tags 会员登录注册相关
     * @name WxPageAuthCodeLoginUsingPost
     * @summary 网页授权根据Code登录
     * @request POST:/member/login/Front/wxPageAuthCodeLogin
     */
    wxPageAuthCodeLoginUsingPost: (reqBody: ReqBaseVoWxPageAuthReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/wxPageAuthCodeLogin`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 网页授权根据手机号登录
     *
     * @tags 会员登录注册相关
     * @name WxPagePhoneLoginUsingPost
     * @summary 网页授权根据手机号登录
     * @request POST:/member/login/Front/wxPagePhoneLogin
     */
    wxPagePhoneLoginUsingPost: (reqBody: ReqBaseVoWxPagePhoneLoginVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWxLoginRspVo, any>({
        path: `/member/login/Front/wxPagePhoneLogin`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据会员ID查询成长值相关信息
     *
     * @tags 会员成长值历史记录表API
     * @name QueryGrowthCountUsingPost1
     * @summary 根据会员ID查询成长值相关信息
     * @request POST:/member/memberGrowthHistory/Front/queryGrowthCount
     */
    queryGrowthCountUsingPost1: (params: RequestParams = {}) =>
      this.request<RespBaseVoGrowthCountRspVo, any>({
        path: `/member/memberGrowthHistory/Front/queryGrowthCount`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 分页查询会员成长值历史记录表
     *
     * @tags 会员成长值历史记录表API
     * @name QueryMemberGrowthHistoryPageUsingPost1
     * @summary 分页查询会员成长值历史记录表
     * @request POST:/member/memberGrowthHistory/Front/queryMemberGrowthHistoryPage
     */
    queryMemberGrowthHistoryPageUsingPost1: (
      reqBody: ReqBaseVoMemberGrowthHistoryPageReqVo,
      params: RequestParams = {},
    ) =>
      this.request<RespBaseVoPageInfoMemberGrowthHistoryPageRspVo, any>({
        path: `/member/memberGrowthHistory/Front/queryMemberGrowthHistoryPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  memberLevelFront = {
    /**
     * @description 查询所有的等级
     *
     * @tags 会员权益
     * @name QueryAllLevelRightsUsingPost
     * @summary 查询所有的等级
     * @request POST:/memberLevelFront/usr/queryAllLevelRights
     */
    queryAllLevelRightsUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoUserCurLevelRightsRspVo, any>({
        path: `/memberLevelFront/usr/queryAllLevelRights`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  priceFront = {
    /**
     * @description 默认展示分销商金价
     *
     * @tags 今日金价
     * @name QueryDefShowGoldPriceUsingPost
     * @summary 默认展示分销商金价
     * @request POST:/priceFront/usr/queryDefShowGoldPrice
     */
    queryDefShowGoldPriceUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoGoldPriceRspVo, any>({
        path: `/priceFront/usr/queryDefShowGoldPrice`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据门店查看金价
     *
     * @tags 今日金价
     * @name QueryGoldPriceByDistUsingPost
     * @summary 根据门店查看金价
     * @request POST:/priceFront/usr/queryGoldPriceByDist
     */
    queryGoldPriceByDistUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoGoldPriceRspVo, any>({
        path: `/priceFront/usr/queryGoldPriceByDist`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
     *
     * @tags 今日金价
     * @name QueryGoldPriceByPageUsingPost
     * @summary 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
     * @request POST:/priceFront/usr/queryGoldPriceByPage
     */
    queryGoldPriceByPageUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoHomeGoldPriceRspVo, any>({
        path: `/priceFront/usr/queryGoldPriceByPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取金价门店
     *
     * @tags 今日金价
     * @name QueryMemViewDistUsingPost
     * @summary 获取金价门店
     * @request POST:/priceFront/usr/queryMemViewDist
     */
    queryMemViewDistUsingPost: (reqBody: ReqBaseVoMemViewDistReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberDistributorRspVo, any>({
        path: `/priceFront/usr/queryMemViewDist`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  shareFront = {
    /**
     * No description
     *
     * @tags 分享管理
     * @name QueryShareSettUsingPost
     * @summary 根据页面名字code获取对应配置信息
     * @request POST:/shareFront/queryShareSett
     */
    queryShareSettUsingPost: (reqBody: ReqBaseVoGetShareParamReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoShareParamRspVo, any>({
        path: `/shareFront/queryShareSett`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  usr = {
    /**
     * @description 获取有图的评价数量，以及全部评价数量
     *
     * @tags 预约服务
     * @name GetCmtCntAndCmtImgCntUsingPost
     * @summary 获取有图的评价数量，以及全部评价数量
     * @request POST:/usr/bookservFront/getCmtCntAndCmtImgCnt
     */
    getCmtCntAndCmtImgCntUsingPost: (reqBody: ReqBaseVoServiceFrontReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoCmtCntAndCmtImgCntRspVo, any>({
        path: `/usr/bookservFront/getCmtCntAndCmtImgCnt`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 预约服务
     * @name GetServDetailsUsingPost
     * @summary 根据服务项目ID返回服务详情信息
     * @request POST:/usr/bookservFront/getServDetails
     */
    getServDetailsUsingPost: (reqBody: ReqBaseVoServiceFrontReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoServiceFrontRspVo, any>({
        path: `/usr/bookservFront/getServDetails`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据服务ID以及日期范围获取各个日期的预约情况
     *
     * @tags 预约服务
     * @name QueryBookServTimeCaseListUsingPost
     * @summary 根据服务ID以及日期范围获取各个日期的预约情况
     * @request POST:/usr/bookservFront/queryBookServTimeCaseList
     */
    queryBookServTimeCaseListUsingPost: (reqBody: ReqBaseVoCTimeReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListSelectedTimeRspVo, any>({
        path: `/usr/bookservFront/queryBookServTimeCaseList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 分页查询服务预约评价表
     *
     * @tags 预约服务
     * @name QueryCBookCommentPageUsingPost
     * @summary 分页查询服务预约评价表
     * @request POST:/usr/bookservFront/queryCBookCommentPage
     */
    queryCBookCommentPageUsingPost: (reqBody: ReqBaseVoCBookCommentPageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoBookCommentPageRspVo, any>({
        path: `/usr/bookservFront/queryCBookCommentPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description C端查询我的预约信息列表
     *
     * @tags 预约服务
     * @name QueryBookServPageUsingPost
     * @summary C端查询我的预约信息列表
     * @request POST:/usr/bookservFront/queryCBookServPage
     */
    queryBookServPageUsingPost: (reqBody: ReqBaseVoCBookPageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoCBookPageRspVo, any>({
        path: `/usr/bookservFront/queryCBookServPage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取取消原因
     *
     * @tags 预约服务
     * @name QueryCancelReasonListUsingPost
     * @summary 获取取消原因
     * @request POST:/usr/bookservFront/queryCancelReasonList
     */
    queryCancelReasonListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListReasonRspVo, any>({
        path: `/usr/bookservFront/queryCancelReasonList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据星数返回评价标签
     *
     * @tags 预约服务
     * @name GetCommTagListUsingPost
     * @summary 根据星数返回评价标签
     * @request POST:/usr/bookservFront/queryCommTagList
     */
    getCommTagListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListTagRspVo, any>({
        path: `/usr/bookservFront/queryCommTagList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据服务ID返回可预约门店信息
     *
     * @tags 预约服务
     * @name QueryDistStoreBySrvIdListUsingPost
     * @summary 根据服务ID返回可预约门店信息
     * @request POST:/usr/bookservFront/queryDistStoreBySrvIdList
     */
    queryDistStoreBySrvIdListUsingPost: (reqBody: ReqBaseVoCServDistributorReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListCServDistributorRspVo, any>({
        path: `/usr/bookservFront/queryDistStoreBySrvIdList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 查询附近门店
     *
     * @tags 预约服务
     * @name QueryNearStoreUsingPost
     * @summary 查询附近门店
     * @request POST:/usr/bookservFront/queryNearStore
     */
    queryNearStoreUsingPost: (reqBody: ReqBaseVoCMemberDistributorReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListCMemberDistributorRspVo, any>({
        path: `/usr/bookservFront/queryNearStore`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据分销商ID获取对应导购列表
     *
     * @tags 预约服务
     * @name GetSalerByDistIdUsingPost1
     * @summary 根据分销商ID获取对应导购列表
     * @request POST:/usr/bookservFront/querySalerByDistIdList
     */
    getSalerByDistIdUsingPost1: (reqBody: ReqBaseVoGetSalerReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListSalerRspVo, any>({
        path: `/usr/bookservFront/querySalerByDistIdList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 分页查询预约设置服务项目列表
     *
     * @tags 预约服务
     * @name QueryServicePageUsingPost
     * @summary 分页查询预约设置服务项目列表
     * @request POST:/usr/bookservFront/queryServicePage
     */
    queryServicePageUsingPost: (reqBody: ReqBaseVoCServicePageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoServicePageRspVo, any>({
        path: `/usr/bookservFront/queryServicePage`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 预约服务
     * @name ImmeBookServUsingPost
     * @summary 立即预约
     * @request POST:/usr/bookservFront/saveImmeBookServ
     */
    immeBookServUsingPost: (reqBody: ReqBaseVoAddBookReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/bookservFront/saveImmeBookServ`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 用户提交评价信息
     *
     * @tags 预约服务
     * @name SubmitCommUsingPost
     * @summary 用户提交评价信息
     * @request POST:/usr/bookservFront/saveSubmitComm
     */
    submitCommUsingPost: (reqBody: ReqBaseVoAddBookCommentReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/bookservFront/saveSubmitComm`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 取消预约
     *
     * @tags 预约服务
     * @name UpdateCancelBookServUsingPost
     * @summary 取消预约
     * @request POST:/usr/bookservFront/updateCancelBookServ
     */
    updateCancelBookServUsingPost: (reqBody: ReqBaseVoCancelBookReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/bookservFront/updateCancelBookServ`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 完成预约
     *
     * @tags 预约服务
     * @name UpdateFinishBookServUsingPost
     * @summary 完成预约
     * @request POST:/usr/bookservFront/updateFinishBookServ
     */
    updateFinishBookServUsingPost: (reqBody: ReqBaseVoUpdateFinishBookReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/bookservFront/updateFinishBookServ`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 完善资料
     *
     * @tags 会员个人资料相关
     * @name CompleteInfoUsingPost
     * @summary 完善资料
     * @request POST:/usr/member/info/Front/completeInfo
     */
    completeInfoUsingPost: (reqBody: ReqBaseVoCompleteMemberInfoVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/member/info/Front/completeInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取会员个人资料
     *
     * @tags 会员个人资料相关
     * @name GetMemberInfoUsingPost
     * @summary 获取会员个人资料
     * @request POST:/usr/member/info/Front/getMemberInfo
     */
    getMemberInfoUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoWxMemberInfoRspVo, any>({
        path: `/usr/member/info/Front/getMemberInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据分销商ID获取对应导购列表
     *
     * @tags 会员个人资料相关
     * @name GetSalerByDistIdUsingPost2
     * @summary 根据分销商ID获取对应导购列表
     * @request POST:/usr/member/info/Front/getSalerByDistId
     */
    getSalerByDistIdUsingPost2: (reqBody: ReqBaseVoGetSalerReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoListSalerRespVo, any>({
        path: `/usr/member/info/Front/getSalerByDistId`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 查询个人资料设置
     *
     * @tags 会员个人资料相关
     * @name QueryPrivateFieldSettingUsingPost1
     * @summary 查询个人资料设置
     * @request POST:/usr/member/info/Front/queryPrivateFieldSetting
     */
    queryPrivateFieldSettingUsingPost1: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberPrivateFieldVo, any>({
        path: `/usr/member/info/Front/queryPrivateFieldSetting`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 职业下拉选择查询(根据分类)
     *
     * @tags 会员个人资料相关
     * @name QueryProfessionAsCateUsingPost1
     * @summary 职业下拉选择查询(根据分类)
     * @request POST:/usr/member/info/Front/queryProfessionAsCate
     */
    queryProfessionAsCateUsingPost1: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberProfessionCategoryRspVo, any>({
        path: `/usr/member/info/Front/queryProfessionAsCate`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 查询注册管理设置
     *
     * @tags 会员个人资料相关
     * @name QueryRegistRequiredSettingUsingPost1
     * @summary 查询注册管理设置
     * @request POST:/usr/member/info/Front/queryRegistRequiredSetting
     */
    queryRegistRequiredSettingUsingPost1: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoMemberRegistRequiredRspVo, any>({
        path: `/usr/member/info/Front/queryRegistRequiredSetting`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 查询注册管理设置（新）
     *
     * @tags 会员个人资料相关
     * @name QueryRegistRequiredSettingNewUsingPost
     * @summary 查询注册管理设置(新)
     * @request POST:/usr/member/info/Front/queryRegistRequiredSettingNew
     */
    queryRegistRequiredSettingNewUsingPost: (
      reqBody: ReqBaseVoMemberRegistRequiredFrontReqVo,
      params: RequestParams = {},
    ) =>
      this.request<RespBaseVoMemberRegistRequiredRspVo, any>({
        path: `/usr/member/info/Front/queryRegistRequiredSettingNew`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 更新头像昵称信息
     *
     * @tags 会员个人资料相关
     * @name UpdateMemberBaseInfoUsingPost
     * @summary 更新头像昵称信息
     * @request POST:/usr/member/info/Front/updateMemberBaseInfo
     */
    updateMemberBaseInfoUsingPost: (reqBody: ReqBaseVoWxMemberBaseInfoReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoString, any>({
        path: `/usr/member/info/Front/updateMemberBaseInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 修改会员个人资料
     *
     * @tags 会员个人资料相关
     * @name UpdateMemberInfoUsingPost
     * @summary 修改会员个人资料
     * @request POST:/usr/member/info/Front/updateMemberInfo
     */
    updateMemberInfoUsingPost: (reqBody: ReqBaseVoUpdateMemberInfoReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/usr/member/info/Front/updateMemberInfo`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 修改手机号码
     *
     * @tags 会员个人资料相关
     * @name UpdatePhoneUsingPost
     * @summary 修改手机号码
     * @request POST:/usr/member/info/Front/updatePhone
     */
    updatePhoneUsingPost: (reqBody: ReqBaseVoUpdatePhoneReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/usr/member/info/Front/updatePhone`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 修改手机号码-验证
     *
     * @tags 会员个人资料相关
     * @name UpdatePhoneVerifyUsingPost
     * @summary 修改手机号码-验证
     * @request POST:/usr/member/info/Front/updatePhoneVerify
     */
    updatePhoneVerifyUsingPost: (reqBody: ReqBaseVoUpdatePhoneVerifyReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/usr/member/info/Front/updatePhoneVerify`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 质保单明细
     *
     * @tags 质保单
     * @name GetWarrantyDetailUsingPost
     * @summary 质保单明细
     * @request POST:/usr/warranty/Front/detail
     */
    getWarrantyDetailUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoUserWarrantyRspVo, any>({
        path: `/usr/warranty/Front/detail`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 根据ID获取电子质保单的访问URL
     *
     * @tags 质保单
     * @name GetMemberWarrantyUrlUsingPost
     * @summary 根据ID获取电子质保单的访问URL
     * @request POST:/usr/warranty/Front/getMemberWarrantyUrl
     */
    getMemberWarrantyUrlUsingPost: (reqBody: ReqBaseVoGetMemberWarrantyUrlReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoWarrantyRspVo, any>({
        path: `/usr/warranty/Front/getMemberWarrantyUrl`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取质保单列表
     *
     * @tags 质保单
     * @name GetWarrantyListUsingPost
     * @summary 获取质保单列表
     * @request POST:/usr/warranty/Front/list
     */
    getWarrantyListUsingPost: (reqBody: ReqBaseVoUserWarrantyPageReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoPageInfoUserWarrantRspVo, any>({
        path: `/usr/warranty/Front/list`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 质保单签名
     *
     * @tags 质保单
     * @name UpdateWarrantySignUsingPost
     * @summary 质保单签名
     * @request POST:/usr/warranty/Front/sign
     */
    updateWarrantySignUsingPost: (reqBody: ReqBaseVoUserWarrantySignReqVo, params: RequestParams = {}) =>
      this.request<RespBaseVoBoolean, any>({
        path: `/usr/warranty/Front/sign`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  wxSignFront = {
    /**
     * @description 根据URL获取jsapi签名
     *
     * @tags 微信公共处理Api
     * @name GetJsapiSignUsingPost
     * @summary 根据URL获取jsapi签名
     * @request POST:/wxSignFront/getJsapiSign
     */
    getJsapiSignUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoJsApiSignRspVo, any>({
        path: `/wxSignFront/getJsapiSign`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
  wxmeberFront = {
    /**
     * @description 获取会员中心广告图
     *
     * @tags 首页面板以及会员中心面板
     * @name GetCenterAdBannerListUsingPost
     * @summary 获取会员中心广告图
     * @request POST:/wxmeberFront/getCenterAdBannerList
     */
    getCenterAdBannerListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/wxmeberFront/getCenterAdBannerList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取金价广告图
     *
     * @tags 首页面板以及会员中心面板
     * @name GetGoldPriceAdBannerListUsingPost
     * @summary 获取金价广告图
     * @request POST:/wxmeberFront/getGoldPriceAdBannerList
     */
    getGoldPriceAdBannerListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/wxmeberFront/getGoldPriceAdBannerList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取首页广告图
     *
     * @tags 首页面板以及会员中心面板
     * @name GetIndexAdBannerListUsingPost
     * @summary 获取首页广告图
     * @request POST:/wxmeberFront/getIndexAdBannerList
     */
    getIndexAdBannerListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/wxmeberFront/getIndexAdBannerList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取积分商城广告图
     *
     * @tags 首页面板以及会员中心面板
     * @name GetPointMallAdBannerListUsingPost
     * @summary 获取积分商城广告图
     * @request POST:/wxmeberFront/getPointMallAdBannerList
     */
    getPointMallAdBannerListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/wxmeberFront/getPointMallAdBannerList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 微会员弹窗广告图
     *
     * @tags 首页面板以及会员中心面板
     * @name GetWmAlertAdBannerListUsingPost
     * @summary 微会员弹窗广告图
     * @request POST:/wxmeberFront/getWmAlertAdBannerList
     */
    getWmAlertAdBannerListUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoListMemberAdvertSimpleRspVo, any>({
        path: `/wxmeberFront/getWmAlertAdBannerList`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 获取主题色系
     *
     * @tags 首页面板以及会员中心面板
     * @name GetWmColorThemeUsingPost
     * @summary 获取主题色系
     * @request POST:/wxmeberFront/getWmColorTheme
     */
    getWmColorThemeUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoColorThemeReqVo, any>({
        path: `/wxmeberFront/getWmColorTheme`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 微会员导航栏获取
     *
     * @tags 首页面板以及会员中心面板
     * @name GetWmmeberNavUsingPost
     * @summary 微会员导航栏获取
     * @request POST:/wxmeberFront/getWmmeberNav
     */
    getWmmeberNavUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoWmBottomNavParamRspVo, any>({
        path: `/wxmeberFront/getWmmeberNav`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 微会员个人中心接口
     *
     * @tags 首页面板以及会员中心面板
     * @name MemberCentertIndexUsingPost
     * @summary 微会员个人中心接口
     * @request POST:/wxmeberFront/memberCentertIndex
     */
    memberCentertIndexUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoWxMemberCenterRspVo, any>({
        path: `/wxmeberFront/memberCentertIndex`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 首页面板以及会员中心面板
     * @name QueryPopupUsingPost
     * @summary 查询弹窗设置
     * @request POST:/wxmeberFront/queryPopup
     */
    queryPopupUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoPopupVo, any>({
        path: `/wxmeberFront/queryPopup`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 首页
     *
     * @tags 首页面板以及会员中心面板
     * @name MembeIndexUsingPost
     * @summary 首页
     * @request POST:/wxmeberFront/wxmember/index
     */
    membeIndexUsingPost: (reqBody: ReqBaseVoString, params: RequestParams = {}) =>
      this.request<RespBaseVoIndexRspVo, any>({
        path: `/wxmeberFront/wxmember/index`,
        method: "POST",
        body: reqBody,
        type: ContentType.Json,
        ...params,
      }),
  };
}
