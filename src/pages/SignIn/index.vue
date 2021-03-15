<template>
  <div class="Page">

    <!-- 背景 -->
    <div class="TopContainer">
      <span class="centerLabel">欢迎来到牛彩！</span>
    </div>

    <!-- 表单 -->
    <ul class="Form">
      <li class="flex-h">
        <i class="iconfont iconshouji"></i>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入您的手机号码" v-model="Phone">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <i class="iconfont iconmima"></i>
        <div class="flex-item">
          <div>
            <input type="password" placeholder="请输入密码" v-model="Password">
          </div>
        </div>
      </li>
    </ul>

    <span>忘记密码？ <router-link :to="{ name: 'ResetPassword' }">重置密码</router-link></span>

    <span>没有注册账号？ <router-link :to="{ name: 'SignUp' }">去注册</router-link></span>

    <div class="Btn">
      <a :class="{'active': Phone !== '' && Password !== ''}" @click="ToSignIn">登录</a>
    </div>

    <!-- 三方登录 -->
    <!-- <div class="OtherSignIn">
      <span>
        <span>第三方账号登录</span>
      </span>
      <div>
        <a class="iconfont iconzhifubao"></a>
        <a class="iconfont iconweixin"></a>
      </div>
    </div> -->

  </div>
</template>

<script>
import md5 from 'js-md5'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Phone: '',
      Password: '',
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'SignIn'
    ]),
    ToSignIn () { // 登录
      if (this.Phone === '' || this.Password === '' || this.DataLock) return
      this.DataLock = true
      this.SignIn({ data: { password: md5(this.Password), userName: this.Phone } }).then(() => { // 登录
        if (this.UserInfo !== null) {
          window.localStorage.niucaiadminname = this.Phone
          window.localStorage.niucaiadminpassword = this.Password
          this.$router.push({ name: 'index' })
        }
        this.DataLock = false
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
