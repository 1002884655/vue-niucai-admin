
import Api from '../../util/Api'
import ToolClass from '../../util/PublicMethod'
export default {
  namespaced: true,
  state: {
    CurrentLotteryTypeList: [], // 当前店铺开通彩种
    CurrentShopCustomer: [], // 当前店铺顾客列表
    CurrentShopAllCustomer: [], // 当前店铺所有顾客列表
    CurrentShopOrderList: [], // 当前店铺订单列表
    CurrentShopInfo: null, // 当前店铺信息
    UserInfo: null, // 用户信息
    UserOrderList: [ // 用户订单
      { createDate: '2020-08-14  15:10:20', dateNum: '202076期', type: '超级大乐透', amount: 2, id: 1, orderNum: 'TE202008140000146179970', status: '已撤单' },
      { createDate: '2020-08-13  17:23:54', dateNum: '202076期', type: '双色球', amount: 2, id: 2, orderNum: 'TE202008140000146179970', status: '已下单' },
      { createDate: '2020-08-13  17:23:54', dateNum: '202076期', type: '双色球', amount: 4, id: 3, orderNum: 'TE202008140000146179970', status: '已下单' },
      { createDate: '2020-08-13  17:23:54', dateNum: '202076期', type: '双色球', amount: 2, id: 4, orderNum: 'TE202008140000146179970', status: '已下单' },
      { createDate: '2020-08-13  17:23:54', dateNum: '202076期', type: '双色球', amount: 6, id: 5, orderNum: 'TE202008140000146179970', status: '已下单' },
      { createDate: '2020-08-13  17:23:54', dateNum: '202076期', type: '双色球', amount: 8, id: 6, orderNum: 'TE202008140000146179970', status: '已下单' }
    ],
    UserAccountDetails: { // 用户账户明细
      All: [
        { type: '充值', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '投注', id: '', createDate: '2020-08-15 12:00:00', amount: '-200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ],
      Pay: [ // 充值
        { type: '充值', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ],
      Bet: [ // 投注
        { type: '投注', id: '', createDate: '2020-08-15 12:00:00', amount: '-200' }
      ],
      SendPrize: [], // 派奖
      WithDraw: [ // 提现
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' },
        { type: '提现', id: '', createDate: '2020-08-15 12:00:00', amount: '+200' }
      ]
    }
  },
  mutations: {
    UpdateUserInfo (state, data) { // 更新用户信息
      state.UserInfo = data || null
    },
    EditShopInfo (state, data) { // 编辑店铺信息
      state.CurrentShopInfo[data.name] = data.value
    },
    EmptyUserInfo (state) { // 清空用户信息
      state.UserInfo = null
    },
    UpdateCurrentShopInfo (state, data) { // 更新当前店铺信息
      state.CurrentShopInfo = data || null
    },
    UpdateCurrentShopOrderList (state, data) { // 更新当前店铺订单列表
      state.CurrentShopOrderList = state.CurrentShopOrderList.concat(data.records || [])
    },
    EmptyCurrentShopOrderList (state) { // 清空当前店铺订单列表
      state.CurrentShopOrderList = []
    },
    UpdateCurrentShopCustomer (state, data) { // 更新当前店铺顾客列表
      state.CurrentShopCustomer = state.CurrentShopCustomer.concat(data.records || [])
    },
    EmptyCurrentShopCustomer (state) { // 清空当前店铺顾客列表
      state.CurrentShopCustomer = []
    },
    UpdateCurrentShopAllCustomer (state, data) { // 更新当前店铺所有顾客列表
      state.CurrentShopAllCustomer = state.CurrentShopAllCustomer.concat(data.records || [])
    },
    EmptyCurrentShopAllCustomer (state) { // 清空当前店铺所有顾客列表
      state.CurrentShopAllCustomer = []
    },
    UpdateCurrentLotteryTypeList (state, data) { // 更新当前店铺开通彩种
      state.CurrentLotteryTypeList = data || []
    },
    EmptyCurrentLotteryTypeList (state) { // 清空当前店铺开通彩种
      state.CurrentLotteryTypeList = []
    },
    EditCurrentLotteryTypeList (state, data) { // 编辑当前店铺开通彩种
      state.CurrentLotteryTypeList[data.index][data.name] = data.value
    }
  },
  actions: {
    UploadBase64Img (context, payload) { // 上传base64图片
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.UploadBase64Img, context, payload, 1000)
      })
    },
    NewBindAliPay (context, payload) { // 绑定支付宝（新）
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.NewBindAliPay, context, payload, 1000)
      })
    },
    AliPay (context, payload) { // 支付宝支付
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.AliPay, context, payload, 1000)
      })
    },
    ResetPassword (context, payload) { // 重置密码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ResetPassword, context, payload, 1000)
      })
    },
    EditPassword (context, payload) { // 修改密码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.EditPassword, context, payload, 1000)
      })
    },
    AliShiMingRenZheng (context, payload) { // 支付宝实名认证
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.AliShiMingRenZheng, context, payload, 1000)
      })
    },
    SendPrize (context, payload) { // 派奖
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.SendPrize, context, payload, 1000)
      })
    },
    GetAliAppId (context, payload) { // 获取阿里pay id
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetAliAppId, context, payload, 1000)
      })
    },
    ShopValid (context, payload) { // 店铺认证
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ShopValid, context, payload, 1000)
      })
    },
    ProcessOrder (context, payload) { // 出票
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ProcessOrder, context, payload, 1000)
      })
    },
    GetCurrentShopOrderDetail (context, payload) { // 获取当前店铺订单详情
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetCurrentShopOrderDetail, context, payload, 1000)
      })
    },
    CheckRegPhoneCode (context, payload) { // 校验注册手机验证码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.CheckRegPhoneCode, context, payload, 1000)
      })
    },
    GetRegPhoneCode (context, payload) { // 注册获取手机验证码
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetRegPhoneCode, context, payload, 1000)
      })
    },
    ShopSignUp (context, payload) { // 店铺注册
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ShopSignUp, context, payload, 1000)
      })
    },
    SignIn (context, payload) { // 登录
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.SignIn, context, payload, 1000, 'UpdateUserInfo')
      })
    },
    GetCurrentShopInfo (context, payload) { // 获取当前店铺信息
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetCurrentShopInfo, context, payload, 1000, 'UpdateCurrentShopInfo')
      })
    },
    GetCurrentShopOrderList (context, payload) { // 获取当前店铺订单列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetCurrentShopOrderList, context, payload, 1000, 'UpdateCurrentShopOrderList')
      })
    },
    GetShopCustomer (context, payload) { // 获取当前店铺用户列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetShopCustomer, context, payload, 1000, 'UpdateCurrentShopCustomer')
      })
    },
    GetShopAllCustomer (context, payload) { // 获取当前店铺所有用户列表
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetShopCustomer, context, payload, 1000, 'UpdateCurrentShopAllCustomer')
      })
    },
    SetShopLotteryState (context, payload) { // 设置店铺彩种状态
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.SetShopLotteryState, context, payload, 1000)
      })
    },
    GetCurrentLotteryTypeList (context, payload) { // 获取当前店铺开通彩种
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.GetCurrentLotteryTypeList, context, payload, 1000, 'UpdateCurrentLotteryTypeList')
      })
    },
    ImgUpload (context, payload) { // 图片上传
      return new Promise((resolve, reject) => {
        ToolClass.Axios(resolve, reject, Api.ImgUpload, context, payload, 1000)
      })
    }
  }
}
