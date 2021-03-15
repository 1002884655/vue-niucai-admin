<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="修改密码" @UserInfoChange="Init">
      <div class="PageContainer">
        <div class="Form">
          <input type="password" placeholder="请输入原始密码" v-model="LoginPassword" @input="LoginPassword = LoginPassword.substring(0, 12)">
        </div>
        <div class="Form">
          <input type="password" placeholder="请输入新密码" v-model="NewPassword" @input="NewPassword = NewPassword.substring(0, 12)">
        </div>
        <div class="Form">
          <input type="password" placeholder="请确认您的密码" v-model="PasswordAgain" @input="PasswordAgain = PasswordAgain.substring(0, 12)">
        </div>
        <div class="Btn">
          <a @click="EditMiMa">确认</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import md5 from 'js-md5'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      LoginPassword: '',
      NewPassword: '',
      PasswordAgain: '',
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo
    })
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
    ...mapUserActions([
      'EditPassword'
    ]),
    Init () {
    },
    EditMiMa () {
      if (this.DataLock || this.NewPassword === '' || this.PasswordAgain === '' || (this.UserInfo.cashPass !== null && this.LoginPassword === '')) return
      this.DataLock = true
      if (this.LoginPassword === '') {
        this.Toast('原始密码不能为空')
        this.DataLock = false
        return false
      }
      if (this.NewPassword !== this.PasswordAgain) {
        this.Toast('新密码与确认密码不一致')
        this.DataLock = false
        return false
      }
      this.EditPassword({ data: { newPassword: md5(this.NewPassword), originPassword: md5(this.LoginPassword) } }).then(() => {
        this.Toast('修改密码成功')
        this.DataLock = false
        window.localStorage.niucaiadminname = null
        window.localStorage.niucaiadminpassword = null
        window.setTimeout(() => {
          this.$router.push({ name: 'SignIn' })
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
