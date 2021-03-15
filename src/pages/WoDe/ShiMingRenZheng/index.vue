<template>
  <div class="Page">
    <MainPageContainer @ShopInfoChange="Init" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="支付宝实名认证" :ShowMainHeaderMore="ShowMore" :MainHeaderMoreText="`认证`" :MainHeaderMoreClick="() => { ShowQrCode = true }">
      <div class="PageContainer">
        <div class="Form">
          <div class="flex-h">
            <span>支付宝账号</span>
            <div class="flex-item">
              <input type="text" placeholder="请输入您的支付宝账号" v-model="AliAccount">
            </div>
          </div>
          <div class="flex-h">
            <span>真实姓名</span>
            <div class="flex-item">
              <input type="text" placeholder="请输入您的真实姓名" v-model="RealName">
            </div>
          </div>
        </div>
        <span class="Tips">请务必确保账号与姓名正确，否则无法收款</span>
        <span class="Tips" style="margin-top: 0;">支付宝认证账号每月最多修改三次</span>
        <div class="Btn">
          <a @click="ToAliShiMingRenZheng">确定</a>
        </div>

        <div class="QrCodeLayer" v-if="CurrentShopInfo !== null && !CurrentShopInfo.isAliAuthed && ShowQrCode">
          <div class="centerLabel">
            <div class="Top">
              <span>授权二维码</span>
              <a class="iconfont iconguanbi" @click="ShowQrCode = false"></a>
            </div>
            <div class="QrCode">
              <img :src="QrCodeUrl" class="centerLabel contain" alt="">
            </div>
            <span class="Tips">请保存此二维码截图至手机，并用手机支付宝识别图中二维码，进行授权。</span>
          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      ShowMore: false,
      QrCodeUrl: null,
      RealName: '',
      AliAccount: '',
      DataLock: false,
      ShowQrCode: false
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo
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
      'AliShiMingRenZheng',
      'NewBindAliPay'
    ]),
    ...mapUserMutations([
      'EditShopInfo'
    ]),
    Init () {
      if (this.CurrentShopInfo !== null) {
        this.ShowMore = this.CurrentShopInfo.shopId === 0
        this.AliAccount = this.CurrentShopInfo.aliLoginId
        this.RealName = this.CurrentShopInfo.alipayName
        if (!this.CurrentShopInfo.isAliAuthed) {
          QRCode.toDataURL(this.CurrentShopInfo.aliAuthURL).then((res) => {
            this.QrCodeUrl = res
          }).catch((res) => {
            console.log(res)
          })
        }
      }
    },
    ToAliShiMingRenZheng () {
      if (this.DataLock) return
      this.DataLock = true
      this.NewBindAliPay({ urlData: { id: this.CurrentShopInfo.shopId }, data: { loginId: this.AliAccount, realName: this.RealName } }).then(() => {
        this.EditShopInfo({ name: 'alipayName', value: this.RealName })
        this.Toast('认证成功')
        this.DataLock = false
        window.setTimeout(() => {
          this.$router.go(-1)
        }, 300)
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
      // this.AliShiMingRenZheng({
      //   urlData: { id: this.CurrentShopInfo.shopId },
      //   data: {
      //     alipayName: this.RealName,
      //     aliLoginId: this.AliAccount
      //   }
      // }).then(() => {
      //   this.EditShopInfo({ name: 'alipayName', value: this.RealName })
      //   this.Toast('认证成功')
      //   this.DataLock = false
      //   window.setTimeout(() => {
      //     this.$router.go(-1)
      //   }, 300)
      // }).catch((res) => {
      //   this.Toast(res.data.message)
      //   this.DataLock = false
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
