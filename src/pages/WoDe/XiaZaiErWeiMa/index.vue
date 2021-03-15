<template>
  <div class="Page">
    <MainPageContainer @ShopInfoChange="Init" :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="邀请注册">
      <div ref="PageContainer" class="PageContainer">
        <img v-if="Base64Img !== null" :src="Base64Img" width="100%" alt="">
        <div class="centerLabel">
          <span>您的邀请码为</span>
          <span v-if="CurrentShopInfo !== null">{{CurrentShopInfo.inviteCode}}</span>
          <span>好友也可在注册时直接填写邀请码</span>
          <div class="QrCode">
            <div>
              <img v-if="QrCodeUrl !== null" :src="QrCodeUrl" class="contain" alt="">
            </div>
          </div>
          <div class="SaveImg" :style="{opacity: ShowSaveImgBtn ? 1 : 0}">
            <a @click="SaveImg">保存截图</a>
          </div>
        </div>
        <img v-if="CanvasImg !== null" :src="CanvasImg" class="CanvasImg" alt="">
        <a v-if="CanvasImg !== null" ref="CanvasImgDownload" :href="CanvasImg" download="xiaoniu.jpeg"></a>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: '',
  data () {
    return {
      ShowSaveImgBtn: false,
      QrCodeUrl: null,
      CanvasImg: null,
      Base64Img: null
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
    let TargetImg = new Image()
    TargetImg.src = require('../../../assets/img/yaoqing.jpg')
    TargetImg.onload = () => {
      this.Base64Img = this.GetBase64Image(TargetImg)
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'UploadBase64Img'
    ]),
    GetBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      let dataURL = canvas.toDataURL('image/' + ext)
      canvas.remove()
      return dataURL
    },
    SaveImg () {
      if (window.js2native !== undefined) {
        this.ShowSaveImgBtn = false
        window.setTimeout(() => {
          window.js2native.screen(document.getElementsByClassName('PageContainer')[0].getBoundingClientRect().top)
          window.setTimeout(() => {
            this.ShowSaveImgBtn = true
          }, 300)
        }, 100)
      } else {
        if (this.$refs.CanvasImgDownload) {
          this.$refs.CanvasImgDownload.click()
        }
      }
    },
    Init () {
      QRCode.toDataURL(`https://niucai.co/#/Register?code=${this.CurrentShopInfo.inviteCode}`).then((res) => {
        this.QrCodeUrl = res
        let _that = this
        window.setTimeout(() => {
          html2canvas(this.$refs.PageContainer).then(function (canvas) {
            document.body.appendChild(canvas)
            _that.CanvasImg = canvas.toDataURL('image/jpeg', 1.0)
            _that.ShowSaveImgBtn = true
          })
        }, 1000)
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
