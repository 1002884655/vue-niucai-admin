
const prefix = '/api'

const $api = {
  UploadBase64Img: { // 上传base64图片
    method: 'post',
    url: `${prefix}/shop/base64`
  },
  NewBindAliPay: { // 绑定支付宝（新）
    method: 'post',
    url: `${prefix}/shop/:id/ali-pay`
  },
  AliPay: { // 支付宝支付
    method: 'post',
    url: `${prefix}/shop/sent-award/order/:orderId`
  },
  ResetPassword: { // 重置密码
    method: 'put',
    url: `${prefix}/shop/reset-password`
  },
  EditPassword: { // 修改密码
    method: 'put',
    url: `${prefix}/shop/change-password`
  },
  AliShiMingRenZheng: { // 支付宝实名认证
    method: 'put',
    url: `${prefix}/app/shop/:id`
  },
  SendPrize: { // 派奖
    method: 'put',
    url: `${prefix}/shop/sent-award/order/:id`
  },
  GetAliAppId: { // 获取阿里pay id
    method: 'get',
    url: `${prefix}/shop/alipay/appid`
  },
  ShopValid: { // 店铺认证
    method: 'put',
    url: `${prefix}/app/shop/valid`
  },
  SignIn: { // 登录
    method: 'post',
    url: `${prefix}/shop/login`
  },
  GetCurrentShopInfo: { // 获取当前店铺信息
    method: 'get',
    url: `${prefix}/shop/current`
  },
  GetCurrentShopOrderList: { // 获取当前店铺订单列表
    method: 'get',
    url: `${prefix}/shop/order2`
    // url: `${prefix}/shop/order`
  },
  GetCurrentShopOrderDetail: { // 获取当前店铺订单详情
    method: 'get',
    url: `${prefix}/shop/order/:id`
  },
  GetShopCustomer: { // 获取店铺用户列表
    method: 'get',
    url: `${prefix}/shop/customer`
  },
  SetShopLotteryState: { // 设置店铺彩种状态
    method: 'post',
    url: `${prefix}/shop/:shopId/lottery/:lotteryId`
  },
  GetCurrentLotteryTypeList: { // 获取当前店铺开通彩种
    method: 'get',
    url: `${prefix}/shop/lottery`
  },
  ImgUpload: { // 图片上传
    method: 'post',
    url: `${prefix}/shop/image`
  },
  ShopSignUp: { // 店铺注册
    method: 'post',
    url: `${prefix}/shop/signup`
  },
  GetRegPhoneCode: { // 注册获取手机验证码
    method: 'get',
    url: `${prefix}/shop/sms/captcha/:phone`
  },
  CheckRegPhoneCode: { // 校验注册手机验证码
    method: 'post',
    url: `${prefix}/shop/sms/captcha/:phone`
  },
  ProcessOrder: { // 出票
    method: 'put',
    url: `${prefix}/shop/draw/order`
  }
}

export default $api
