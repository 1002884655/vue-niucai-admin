<template>
  <div class="Page">
    <MainPageContainer :MainHeaderMoreIcon="`icongengduo`" :ShowMainHeaderMore="true" :ShowMainHeader="true" :MainHeaderTitle="`订单详情`" :ShowMainHeaderBack="true">
      <div class="Container" v-if="DetailInfo !== null">
        <div class="Info">

          <!-- 大乐透 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'lottery'">
            <DingDanXiangQingDaLeTou :Data="DetailInfo"></DingDanXiangQingDaLeTou>
          </div>

          <!-- 双色球 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'double-color'">
            <DingDanXiangQingShuangSeQiu :Data="DetailInfo"></DingDanXiangQingShuangSeQiu>
          </div>

          <!-- 足球 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'football'">
            <DingDanXiangQingZuQiu :Data="DetailInfo"></DingDanXiangQingZuQiu>
          </div>

          <!-- 篮球 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'basketball'">
            <DingDanXiangQingLanQiu :Data="DetailInfo"></DingDanXiangQingLanQiu>
          </div>

          <!-- 排列三 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'p3'">
            <DingDanXiangQingP3 :Data="DetailInfo"></DingDanXiangQingP3>
          </div>

          <!-- 排列五 -->
          <div v-if="DetailInfo.bettingDetail.betting.lotteryId === 'p5'">
            <DingDanXiangQingP5 :Data="DetailInfo"></DingDanXiangQingP5>
          </div>

        </div>

        <div class="PhotoInfo">
          <span>彩票照片</span>
          <div v-if="!DetailInfo.bettingDetail.betting.isDrawn && DetailInfo.bettingDetail.betting.status - 0 !== 2">
            <van-uploader v-model="VantFileList" result-type='file' :after-read="AfterRead" @delete="ImgDelete" />
            <!-- <a class="Add" @click="$refs.VantFile.click()">
              <i class="iconfont iconjia centerLabel"></i>
            </a>
            <van-uploader style="overflow: hidden;position: absolute;top: 0;left: 0;opacity: 0;" ref="VantFile" :after-read="CpFileChange" v-model="CpImgArr" :preview-image="false"></van-uploader>
            <div v-for="(item, index) in CpImgArr" :key="index">
              <img :src="item.content" class="centerLabel contain" alt="" @click="CheckBigImg(item)">
              <a class="iconfont iconguanbi" @click="DeleteCpImg(index)"></a>
            </div> -->
            <!-- <input type="file" ref="CpFile" @change="CpFileChange" style="display: none" accept="image/*"> -->
          </div>
          <img v-else v-for="(item, index) in (DetailInfo.bettingDetail.betting.lotteryPicture || '').split(',')" :src="item" :key="index" width="100%" style="margin-top: 0.15rem" alt="">
        </div>

        <div class="BigImgLayer" v-if="ShowBigImg" @click="ShowBigImg = false">
          <img :src="BigImgUrl" class="centerLabel contain" alt="">
        </div>

        <div class="Bottom">
          <a @click="ToProcessOrder" v-if="!DetailInfo.bettingDetail.betting.isDrawn && DetailInfo.bettingDetail.betting.status - 0 !== 2" :class="{'active': !DataLock}">{{DataLock ? '正在提交...' : '确定'}}</a>
          <a @click="ToSendPrize" v-if="DetailInfo.bettingDetail.betting.isDrawn && DetailInfo.bettingDetail.betting.isWinning && !DetailInfo.bettingDetail.betting.isCashed" :class="{'active': !DataLock}">{{DataLock ? '正在提交...' : '派奖'}}</a>
          <!-- <a v-else>撤单</a> -->
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Uploader } from 'vant'
import MainPageContainer from '../../../components/common/MainPageContainer'
import DingDanXiangQingDaLeTou from '../../../components/index/DingDanXiangQingDaLeTou'
import DingDanXiangQingShuangSeQiu from '../../../components/index/DingDanXiangQingShuangSeQiu'
import DingDanXiangQingZuQiu from '../../../components/index/DingDanXiangQingZuQiu'
import DingDanXiangQingLanQiu from '../../../components/index/DingDanXiangQingLanQiu'
import DingDanXiangQingP3 from '../../../components/index/DingDanXiangQingP3'
import DingDanXiangQingP5 from '../../../components/index/DingDanXiangQingP5'
import { APIBase } from '@/util/constant'

const { mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      ResImgArr: [],
      VantFileList: [],
      BigImgUrl: null,
      ShowBigImg: false,
      Jwt: window.localStorage.Jwt,
      Origin: window.location.origin,
      CpImgArr: [],
      DetailInfo: null,
      APIBase,
      DataLock: false // 数据锁
    }
  },
  computed: {
  },
  components: {
    MainPageContainer,
    DingDanXiangQingDaLeTou,
    DingDanXiangQingShuangSeQiu,
    DingDanXiangQingZuQiu,
    DingDanXiangQingLanQiu,
    DingDanXiangQingP3,
    DingDanXiangQingP5,
    'van-uploader': Uploader
  },
  created () {
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetCurrentShopOrderDetail',
      'ProcessOrder',
      'UploadBase64Img',
      'ImgUpload',
      'AliPay'
    ]),
    Init () {
      this.DetailInfo = null
      this.GetCurrentShopOrderDetail({ urlData: { id: this.$route.query.id } }).then((res) => {
        this.DetailInfo = res.data.data
      })
    },
    ImgDelete (file, target) {
      this.ResImgArr.splice(target.index, 1)
    },
    AfterRead (file) {
      file.status = 'uploading'
      file.message = '上传中...'

      let aFormData = new FormData()
      aFormData.append('file', file.file)
      this.ImgUpload({ data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        file.status = 'done'
        this.ResImgArr.push(`${res.data.data}?x-oss-process=style/compress_80`)
        this.VantFileList[this.VantFileList.length - 1].content = `${res.data.data}?x-oss-process=style/compress_80`
      }).catch((res) => {
        console.log(JSON.stringify(res))
      })

      // this.UploadBase64Img({ data: { image: file.content } }).then((res) => {
      //   this.ResImgArr.push(res.data.data)
      //   file.status = 'done'
      // })
    },
    CheckBigImg (item) {
      this.BigImgUrl = item.content
      this.ShowBigImg = true
    },
    ToSendPrize () {
      if (this.DataLock) return
      this.DataLock = true
      this.AliPay({ urlData: { orderId: this.$route.query.id }, queryData: { returlURL: `${window.location.origin}/#/PaiJiang/PaiJiangGuanLi`, token: window.localStorage.Jwt } }).then((res) => {
        this.DataLock = false
        window.location.href = res.data.data.payUrl
      }).catch((res) => {
        this.DataLock = false
      })
    },
    ToProcessOrder () { // 出票
      if (!this.ResImgArr.length) {
        this.Toast('请先上传出票图片')
        return false
      }
      this.Dialog.confirm({
        title: '',
        message: '确认完成此单 ？'
      }).then(() => {
        if (this.DataLock) return
        this.DataLock = true
        this.ProcessOrder({ data: { lotteryPicture: this.ResImgArr.length ? this.ResImgArr.join(',') : null, orderId: this.DetailInfo.orderId } }).then((res) => {
          this.Toast('出票成功')
          this.DetailInfo.status = 1
          this.DetailInfo.bettingDetail.betting.isDrawn = true
          this.DataLock = false
          this.$router.go(-1)
        }).catch((res) => {
          this.Toast(res.data.message)
          this.DataLock = false
        })
      })
    },
    DeleteCpImg (index) {
      this.CpImgArr.splice(index, 1)
    },
    CpFileChange (e) { // 出票图片更新
      // let aFormData = new FormData()
      // aFormData.append('file', e.target.files[0])
      // this.ImgUpload({ urlData: { plat: 'shop' }, data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
      //   // this.$refs.CpFile.value = ''
      //   this.CpImgArr.push(res.data.data)
      // }).catch((res) => {
      //   console.log(JSON.stringify(res))
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
