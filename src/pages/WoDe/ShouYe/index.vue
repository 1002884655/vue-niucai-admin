<template>
  <div class="Page">
    <MainPageContainer @ShopInfoChange="Init" :MainTabBarActiveId="4" :ShowMainTabBar="true">
      <div class="Container">
        <!-- 顶部 -->
        <div class="Top">
          <div class="Title">
            <span>个人中心</span>
            <router-link :to="{ name: 'GeRenSheZhi' }" class="iconfont iconshezhi"></router-link>
          </div>
          <div class="Info flex-h">
            <div class="Icon">
              <img src="https://niucai.oss-cn-beijing.aliyuncs.com/app/images/default-avatar.png" class="centerLabel cover" alt="">
            </div>
            <div class="flex-item flex-v">
              <div class="flex-item flex-h">
                <div class="flex-item">
                  <div>
                    <router-link tag="span" :to="{ name: 'DianPuRenZheng' }" v-if="CurrentShopInfo !== null"> {{CurrentShopInfo.name}} <em>（{{ReturnStatus()}}）</em></router-link>
                  </div>
                </div>
                <router-link tag="span" :to="{ name: 'DingDanLiuShui' }">营业额</router-link>
                <em v-if="CurrentShopInfo !== null" @click="$router.push({ name: 'DingDanLiuShui' })">{{CurrentShopInfo.account.amount}}</em>
                <i class="iconfont iconjiantouright" @click="$router.push({ name: 'DingDanLiuShui' })"></i>
              </div>
              <div class="Desc" v-if="CurrentShopInfo !== null">
                <span>店铺营业时间为：{{CurrentShopInfo.openTime}}~{{CurrentShopInfo.closeTime}}</span>
                <span>休息时间不显示在购票选店列表内</span>
              </div>
            </div>
          </div>
        </div>

        <!-- tab -->
        <ul>
          <router-link tag="li" v-for="(item, index) in UserTab" :key="index" class="flex-h" :to="{ name: item.Router }">
            <div class="Icon">
              <img :src="item.Icon" class="centerLabel contain" alt="">
            </div>
            <span class="flex-item">{{item.Name}}</span>
            <span style="color: #999; font-size: 0.12rem;">{{item.Tips}}</span>
            <i class="iconfont iconjiantouright"></i>
          </router-link>
        </ul>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      ExitAppStatus: false,
      UserTab: [
        // { Name: '出票管理', Icon: '', Router: '' },
        // { Name: '派奖管理', Icon: '', Router: 'PaiJiangGuanLi' },
        { Name: '购彩订单', Icon: require('../../../assets/img/goucaidingdan.png'), Router: 'DingDanLiuShui', Tips: null, Id: 1 },
        { Name: '收款管理', Icon: require('../../../assets/img/shoukuanguanli.png'), Router: 'ShiMingRenZheng', Tips: null, Id: 2 },
        { Name: '店铺认证', Icon: require('../../../assets/img/dianpurenzheng.png'), Router: 'DianPuRenZheng', Tips: null, Id: 5 },
        { Name: '彩种设置', Icon: require('../../../assets/img/caizhongshezhi.png'), Router: 'CaiZhongSheZhi', Tips: null, Id: 3 },
        { Name: '邀请码', Icon: require('../../../assets/img/yaoqingma.png'), Router: 'XiaZaiErWeiMa', Tips: null, Id: 4 }
      ]
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo,
      UserInfo: x => x.UserInfo
    })
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  destroyed () {
    window.removeEventListener('popstate', this.RouterBack, false)
  },
  mounted () {
    if (window.history && window.history.pushState) {
      this.ExitAppStatus = false
      window.history.pushState(null, null, document.URL)
      window.history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.RouterBack, false)
    }
    this.$nextTick(() => {
      this.GetCurrentShopInfo().then(() => {
        this.Init()
      }).catch(() => {
        this.Init()
      })
    })
  },
  methods: {
    ...mapUserActions([
      'GetCurrentShopInfo'
    ]),
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    Init () {
      if (this.CurrentShopInfo !== null) {
        this.UserTab.map((item) => {
          if (item.Id - 0 === 2) {
            item.Tips = this.CurrentShopInfo.aliLoginId || '未授权'
          }
          if (item.Id - 0 === 5) {
            item.Tips = this.ReturnStatus()
          }
        })
      }
    },
    ReturnStatus () {
      if (this.CurrentShopInfo.status - 0 === 0) {
        if (this.CurrentShopInfo.businessLicense !== null && this.CurrentShopInfo.businessLicense !== '') {
          return '认证中'
        } else {
          return '未认证'
        }
      } else if (this.CurrentShopInfo.status - 0 === 1) {
        return '已认证'
      } else if (this.CurrentShopInfo.status - 0 === 2) {
        return '认证失败'
      } else {
        return ''
      }
    },
    Refresh (done) { // 页面下拉刷新
      window.setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
