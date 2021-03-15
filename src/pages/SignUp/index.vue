<template>
  <div class="Page">

    <!-- 背景 -->
    <div class="TopContainer">
      <span class="centerLabel">欢迎来到牛彩！</span>
    </div>

    <!-- 表单 -->
    <ul class="Form">
      <li class="flex-h">
        <span>姓名</span>
        <div class="flex-item">
          <div>
            <input type="text" placeholder="请输入您的姓名" v-model="FormData.name">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <span>店铺名称</span>
        <div class="flex-item">
          <div>
            <input type="text" placeholder="请输入您的店铺名称" v-model="FormData.shopName">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <span>店铺地址</span>
        <div class="flex-item" @click="ShowMap = true">
          <div>
            <span v-if="FormData.address === ''">请选择您的店铺地址</span>
          </div>
        </div>
        <a style="color: #333;" v-if="FormData.address !== ''" @click="ShowMap = true">{{FormData.province}} {{FormData.city}} {{FormData.address}}</a>
        <a class="iconfont iconjiantouright" style="color: #ccc;"></a>
      </li>
      <li class="flex-h">
        <span>手机号码</span>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入您的手机号码" v-model="FormData.phone">
          </div>
        </div>
      </li>
      <li class="flex-h">
        <span>验证码</span>
        <div class="flex-item">
          <div>
            <input type="number" placeholder="请输入手机验证码" v-model="FormData.captcha">
          </div>
        </div>
        <a v-if="TimeNum === 60" @click="GetCode">获取验证码</a>
        <span v-else>{{TimeNum > 9 ? TimeNum : `0${TimeNum}`}}s后重新获取</span>
      </li>
      <li class="flex-h">
        <span>密码</span>
        <div class="flex-item">
          <div>
            <input type="password" placeholder="请输入密码" v-model="FormData.password">
          </div>
        </div>
      </li>
    </ul>

    <span><em>已有账号？</em>
      <router-link :to="{ name: 'SignIn' }">去登录</router-link>
    </span>

    <div class="Btn">
      <a :class="{'active': FormData.phone !== '' && FormData.password !== ''}" @click="ToShopSignUp">注册</a>
    </div>

    <div class="BaiDuMap" v-show="ShowMap">
      <MapSearch @Close="ShowMap = false" @Sure="SureAddress"></MapSearch>
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
import MapSearch from '../../components/common/MapSearch'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      ShowMap: false,
      FormData: {
        name: '',
        shopName: '',
        address: '',
        phone: '',
        captcha: '',
        password: '',
        lat: '',
        lng: '',
        city: '',
        province: ''
      },
      Timer: null,
      TimeNum: 60,
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
    MapSearch
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'SignIn',
      'ShopSignUp',
      'GetRegPhoneCode',
      'CheckRegPhoneCode'
    ]),
    SureAddress (e) {
      this.FormData.lat = e.point.lat
      this.FormData.lng = e.point.lng
      this.FormData.city = e.city
      this.FormData.province = e.province
      this.FormData.address = e.address
      this.ShowMap = false
    },
    CheckFormData () { // 校验表单
      if (this.FormData.name === '') {
        this.Toast('姓名不能为空!')
        return false
      }
      if (this.FormData.shopName === '') {
        this.Toast('店铺名称不能为空!')
        return false
      }
      if (this.FormData.address === '') {
        this.Toast('店铺地址不能为空!')
        return false
      }
      if (this.FormData.phone === '') {
        this.Toast('手机不能为空!')
        return false
      }
      if (this.FormData.captcha === '') {
        this.Toast('验证码不能为空!')
        return false
      }
      if (this.FormData.password === '') {
        this.Toast('密码不能为空!')
        return false
      }
      return true
    },
    ToShopSignUp () {
      if (!this.CheckFormData() || this.DataLock) return
      this.DataLock = true
      this.ShopSignUp({ data: { ...this.FormData, password: md5(this.FormData.password) } }).then((res) => {
        this.Toast('注册成功')
        this.DataLock = false
        this.SignIn({ data: { password: md5(this.FormData.password), userName: this.FormData.phone } }).then(() => { // 登录
          if (this.UserInfo !== null) {
            window.localStorage.niucaiadminname = this.FormData.phone
            window.localStorage.niucaiadminpassword = this.FormData.password
            this.$router.push({ name: 'index' })
          }
          this.DataLock = false
        }).catch((subRes) => {
          this.Toast(subRes.data.message)
          this.DataLock = false
        })
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    },
    IsPhone (str) { // 校验手机号
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      return !!myreg.test(str)
    },
    GetCode () { // 获取手机验证码
      if (this.DataLock || this.TimeNum !== 60 || !this.IsPhone(this.FormData.phone)) return
      this.DataLock = false
      window.clearInterval(this.Timer)
      this.GetRegPhoneCode({ urlData: { phone: this.FormData.phone } }).then(() => {
        this.DataLock = false
        if (this.TimeNum === 60) {
          this.TimeNum -= 1
        }
        this.Timer = window.setInterval(() => {
          if (this.TimeNum) {
            this.TimeNum -= 1
          } else {
            window.clearInterval(this.Timer)
            this.TimeNum = 60
          }
        }, 1000)
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
