/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/', // 框架页
    name: 'sys',
    redirect: '/index',
    component: resolve => (require(['@/pages/index'], resolve)),
    children: [
      {
        path: '/index', // 首页
        name: 'index',
        redirect: '/index/ShouYe',
        component: resolve => (require(['@/pages/index/index'], resolve)),
        children: [
          {
            path: '/index/ShouYe', // 彩单管理
            name: 'CaiDanGuanLi',
            component: resolve => (require(['@/pages/index/ShouYe'], resolve))
          },
          {
            path: '/index/DingDanChaXun', // 订单查询
            name: 'DingDanChaXun',
            component: resolve => (require(['@/pages/index/DingDanChaXun'], resolve))
          },
          {
            path: '/index/DingDanXiangQing', // 订单详情
            name: 'DingDanXiangQing',
            component: resolve => (require(['@/pages/index/DingDanXiangQing'], resolve))
          }
        ]
      },
      {
        path: '/PaiJiang', // 派奖
        name: 'PaiJiang',
        redirect: '/PaiJiang/PaiJiangGuanLi',
        component: resolve => (require(['@/pages/PaiJiang/index'], resolve)),
        children: [
          {
            path: '/PaiJiang/PaiJiangGuanLi', // 派奖管理
            name: 'PaiJiangGuanLi',
            component: resolve => (require(['@/pages/PaiJiang/PaiJiangGuanLi'], resolve))
          },
          {
            path: '/PaiJiang/PaiJiangJiLu', // 派奖记录
            name: 'PaiJiangJiLu',
            component: resolve => (require(['@/pages/PaiJiang/PaiJiangJiLu'], resolve))
          }
        ]
      },
      {
        path: '/WoDe', // 我的
        name: 'WoDe',
        redirect: '/WoDe/ShouYe',
        component: resolve => (require(['@/pages/WoDe/index'], resolve)),
        children: [
          {
            path: '/WoDe/ShouYe', // 个人中心
            name: 'WoDeShouYe',
            component: resolve => (require(['@/pages/WoDe/ShouYe'], resolve))
          },
          {
            path: '/WoDe/DianPuRenZheng', // 个人中心-店铺认证
            name: 'DianPuRenZheng',
            component: resolve => (require(['@/pages/WoDe/DianPuRenZheng'], resolve))
          },
          {
            path: '/WoDe/ZhiFuBaoRenZheng', // 个人中心-支付宝认证
            name: 'ZhiFuBaoRenZheng',
            component: resolve => (require(['@/pages/WoDe/ZhiFuBaoRenZheng'], resolve))
          },
          {
            path: '/WoDe/CaiZhongSheZhi', // 个人中心-彩种设置
            name: 'CaiZhongSheZhi',
            component: resolve => (require(['@/pages/WoDe/CaiZhongSheZhi'], resolve))
          },
          {
            path: '/WoDe/DingDanLiuShui', // 个人中心-订单流水
            name: 'DingDanLiuShui',
            component: resolve => (require(['@/pages/WoDe/DingDanLiuShui'], resolve))
          },
          {
            path: '/WoDe/GeRenSheZhi', // 个人中心-个人设置
            name: 'GeRenSheZhi',
            component: resolve => (require(['@/pages/WoDe/GeRenSheZhi'], resolve))
          },
          {
            path: '/WoDe/GuanYuWoMen', // 个人中心-关于我们
            name: 'GuanYuWoMen',
            component: resolve => (require(['@/pages/WoDe/GuanYuWoMen'], resolve))
          },
          {
            path: '/WoDe/EditMiMa', // 个人中心-修改密码
            name: 'EditMiMa',
            component: resolve => (require(['@/pages/WoDe/EditMiMa'], resolve))
          },
          {
            path: '/WoDe/XiaZaiErWeiMa', // 个人中心-下载二维码
            name: 'XiaZaiErWeiMa',
            component: resolve => (require(['@/pages/WoDe/XiaZaiErWeiMa'], resolve))
          },
          {
            path: '/WoDe/ShiMingRenZheng', // 个人中心-实名认证
            name: 'ShiMingRenZheng',
            component: resolve => (require(['@/pages/WoDe/ShiMingRenZheng'], resolve))
          }
        ]
      },
      {
        path: '/HuiYuan', // 会员
        name: 'HuiYuan',
        redirect: '/HuiYuan/ShouYe',
        component: resolve => (require(['@/pages/HuiYuan/index'], resolve)),
        children: [
          {
            path: '/HuiYuan/ShouYe', // 彩民管理-首页
            name: 'HuiYuanShouYe',
            component: resolve => (require(['@/pages/HuiYuan/ShouYe'], resolve))
          },
          {
            path: '/HuiYuan/CaiMinLieBiao', // 彩民管理-全部彩民
            name: 'CaiMinLieBiao',
            component: resolve => (require(['@/pages/HuiYuan/CaiMinLieBiao'], resolve))
          }
        ]
      },
      {
        path: '/SignIn', // 登录页
        name: 'SignIn',
        component: resolve => (require(['@/pages/SignIn'], resolve))
      },
      {
        path: '/ResetPassword', // 重置密码
        name: 'ResetPassword',
        component: resolve => (require(['@/pages/ResetPassword'], resolve))
      },
      {
        path: '/SignUp', // 注册页
        name: 'SignUp',
        component: resolve => (require(['@/pages/SignUp'], resolve))
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router