<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :MainHeaderTitle="`个人设置`" :ShowMainHeaderBack="true">
      <ul>
        <li class="flex-h">
          <router-link tag="span" class="flex-item" :to="{ name: 'EditMiMa' }">修改密码</router-link>
          <i class="iconfont iconjiantouright"></i>
        </li>
        <li class="flex-h">
          <router-link tag="span" class="flex-item" :to="{ name: 'GuanYuWoMen' }">关于我们</router-link>
          <i class="iconfont iconjiantouright"></i>
        </li>
      </ul>
      <a @click="SignOut">退出登录</a>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'EmptyUserInfo'
    ]),
    Refresh (done) { // 页面下拉刷新
      window.setTimeout(() => {
        done()
      }, 1000)
    },
    SignOut () { // 登出
      this.EmptyUserInfo()
      window.localStorage.niucaiadminname = null
      window.localStorage.niucaiadminpassword = null
      window.localStorage.removeItem('niucaiadminname')
      window.localStorage.removeItem('niucaiadminpassword')
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
