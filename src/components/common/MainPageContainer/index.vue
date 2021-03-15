<template>
  <div class="components MainPageContainer flex-v">

    <!-- 头部 -->
    <div class="MainHeaderPadding" v-if="ShowMainHeader" :style="{height: `${MainPaddingTop}px`}"></div>
    <div class="MainHeader flex-h" v-if="ShowMainHeader">
      <a class="MainBack iconfont iconjiantouleft" v-if="ShowMainHeaderBack" @click="$router.back(-1)"></a>
      <span class="MainTitle">
        <span @click="MainTitleClick()">{{MainHeaderTitle}}</span>
        <a class="iconfont iconjiantoudown" @click="MainTitleClick()" v-if="ShowMainTitleIcon"></a>
      </span>
      <a class="MainHeaderMore" v-if="ShowMainHeaderMore" @click="MainHeaderMoreClick">
        <span>{{MainHeaderMoreText}}</span>
        <i class="iconfont" v-if="MainHeaderMoreIcon !== '' && MainHeaderMoreIcon !== null" :class="MainHeaderMoreIcon"></i>
      </a>
    </div>

    <!-- 内容 -->
    <div class="MainBody flex-item">
      <div>
        <slot></slot>
      </div>
    </div>

    <!-- tabbar -->
    <div class="TabBar flex-h" :style="{paddingBottom: `${MainPaddingBottom}px`}" v-if="ShowMainTabBar">
      <div class="flex-item" v-for="(item, index) in MainTabBar" :key="index">
        <router-link :to="{name: item.router}" :class="{'active': item.id === MainTabBarActiveId}">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
/*
  页面名称：
*/
import md5 from 'js-md5'
import { mapActions, mapMutations, createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'MainPageContainer',
  props: {
    ShowMainHeaderMore: {
      default: false,
      type: Boolean
    },
    ShowMainHeaderRight: { // 显隐头部右边选项
      default: false,
      type: Boolean
    },
    MainHeaderMoreIcon: { // 头部右边选项图标
      default: null,
      type: String
    },
    MainHeaderMoreText: { // 头部右边选项文本
      default: null,
      type: String
    },
    MainHeaderMoreClick: { // 头部右边选项点击事件
      default: () => { },
      type: Function
    },
    MainTitleClick: { // 页面标题点击事件
      default: () => { },
      type: Function
    },
    ShowMainTitleIcon: { // 显隐页面标题箭头图标
      default: false,
      type: Boolean
    },
    ShowMainHeaderBack: { // 显隐头部返回按钮
      default: false,
      type: Boolean
    },
    MainTabBar: { // tabbar列表
      default: () => {
        return [
          { name: '出票', icon: 'iconchupiao', id: 1, router: 'CaiDanGuanLi' },
          { name: '派奖', icon: 'iconjiangbei', id: 2, router: 'PaiJiang' },
          { name: '会员', icon: 'iconhuiyuan', id: 3, router: 'HuiYuan' },
          { name: '我的', icon: 'icongerenzhongxin', id: 4, router: 'WoDe' }
        ]
      },
      type: Array
    },
    MainTabBarActiveId: { // tabbar选中id
      default: null,
      type: Number
    },
    ShowMainHeader: { // 显隐页面头部
      default: false,
      type: Boolean
    },
    ShowMainTabBar: { // 显隐页面tabbar
      default: false,
      type: Boolean
    },
    MainPaddingTop: { // 页面padding-top（不与系统顶部时间栏重叠）
      default: null,
      type: Number
    },
    MainPaddingBottom: { // 页面padding-bottom（不与系统底部返回栏重叠）
      default: null,
      type: Number
    },
    MainHeaderTitle: { // 页面title
      default: null,
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      CurrentShopInfo: x => x.CurrentShopInfo
    })
  },
  components: {
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapActions([
      ''
    ]),
    ...mapMutations([
      ''
    ]),
    ...mapUserActions([
      'SignIn',
      'GetCurrentShopInfo'
    ]),
    Init () { // 初始化
      if (this.UserInfo === null) {
        if (window.localStorage.niucaiadminname && window.localStorage.niucaiadminpassword) {
          this.SignIn({ data: { password: md5(window.localStorage.niucaiadminpassword), userName: window.localStorage.niucaiadminname } }).then(() => { // 登录
            if (this.UserInfo === null) {
              this.$router.push({ name: 'SignIn' })
            } else {
              this.$emit('UserInfoChange')
              if (this.CurrentShopInfo === null) {
                this.GetCurrentShopInfo().then(() => { // 获取当前店铺信息
                  this.$emit('ShopInfoChange')
                })
              }
            }
          }).catch(() => {
            this.$router.push({ name: 'SignIn' })
          })
        } else {
          this.$router.push({ name: 'SignIn' })
        }
      } else {
        this.$emit('UserInfoChange')
        if (this.CurrentShopInfo === null) {
          this.GetCurrentShopInfo().then(() => { // 获取当前店铺信息
            this.$emit('ShopInfoChange')
          })
        } else {
          this.$emit('ShopInfoChange')
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
