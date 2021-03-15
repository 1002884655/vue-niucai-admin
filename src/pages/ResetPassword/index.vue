<template>
  <div class="components MainPageContainer flex-v">

    <!-- 头部 -->
    <div class="MainHeaderPadding"></div>
    <div class="MainHeader flex-h">
      <a class="MainBack iconfont iconjiantouleft" @click="$router.back(-1)"></a>
      <span class="MainTitle">
        <span>找回密码</span>
      </span>
    </div>

    <!-- 内容 -->
    <div class="MainBody flex-item">
      <div>
        <div class="Form">
          <div class="flex-h">
            <span>手机号</span>
            <div class="flex-item">
              <input type="text" v-model="Phone" placeholder="请输入绑定手机号">
            </div>
          </div>
          <div class="flex-h">
            <span>验证码</span>
            <div class="flex-item">
              <input type="number" v-model="Code" placeholder="请输入手机验证码">
            </div>
            <a :class="{'active': Sec === 60}" @click="ToGetCode">{{Sec === 60 ? '获取验证码' : `${Sec > 9 ? Sec : `0${Sec}`}s后再次获取`}}</a>
          </div>
          <div class="flex-h">
            <span>新密码</span>
            <div class="flex-item">
              <input type="password" v-model="Password" placeholder="请输入新密码">
            </div>
          </div>
          <div class="flex-h">
            <span>确认新密码</span>
            <div class="flex-item">
              <input type="password" v-model="PasswordAgain" placeholder="请再次输入新密码">
            </div>
          </div>
          <div class="Btn">
            <a @click="ToResetPassword">确认</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import md5 from 'js-md5'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      Phone: '',
      Code: '',
      Password: '',
      PasswordAgain: '',
      DataLock: false,
      Timer: null,
      Sec: 60
    }
  },
  computed: {
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
      'GetRegPhoneCode',
      'CheckRegPhoneCode',
      'ResetPassword'
    ]),
    Init () {
    },
    ToResetPassword () {
      if (!this.IsPhone(this.Phone)) {
        this.Toast('手机号格式错误')
        return false
      }
      if (this.Code === '') {
        this.Toast('请输入验证码')
        return false
      }
      if (this.Password === '') {
        this.Toast('请输入新密码')
        return false
      }
      if (this.PasswordAgain === '') {
        this.Toast('请确认新密码')
        return false
      }
      if (this.Password !== this.PasswordAgain) {
        this.Toast('两次密码输入不一致')
        return false
      }
      if (this.DataLock) return
      this.DataLock = true
      this.ResetPassword({
        data: {
          captcha: this.Code,
          password: md5(this.Password),
          phone: this.Phone
        }
      }).then(() => {
        this.Toast('密码重置成功')
        this.DataLock = false
        window.setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    },
    IsPhone (str) { // 校验手机号
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      return !!myreg.test(str)
    },
    ToGetCode () {
      if (!this.IsPhone(this.Phone)) {
        this.Toast('手机号格式错误')
        return false
      }
      if (this.Sec === 60 && !this.DataLock) {
        this.DataLock = true
        this.GetRegPhoneCode({ urlData: { phone: this.Phone } }).then(() => {
          this.Toast('验证码已发送')
          this.DataLock = false
          window.clearInterval(this.Timer)
          this.Sec -= 1
          this.Timer = window.setInterval(() => {
            if (this.Sec) {
              this.Sec -= 1
            } else {
              this.Sec = 60
              window.clearInterval(this.Timer)
            }
          }, 1000)
        }).catch((res) => {
          this.Toast(res.data.message)
          this.DataLock = false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
