<template>
  <div class="Page">
    <MainPageContainer @ShopInfoChange="ShopInfoChange" :ShowMainHeader="true" :MainHeaderTitle="`店铺认证`" :ShowMainHeaderBack="true" :ShowMainHeaderMore="true" :MainHeaderMoreIcon="`iconbaocun`" :MainHeaderMoreText="`保存`" :MainHeaderMoreClick="SaveForm">
      <div class="Container">
        <div class="Content">

          <div>
            <div class="Line flex-h">
              <em>*</em>
              <span>店铺名称</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请输入您的店铺名称" v-model="ShopName">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <em>*</em>
              <span>店主联系人</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请输入您的真实姓名" v-model="RealName">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <em>*</em>
              <span>手机号码</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请填写正确的手机号码" v-model="Phone">
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="Line flex-h">
              <em>*</em>
              <span>彩票代销证</span>
            </div>
            <div class="PhotoList">
              <a class="Add" @click="$refs.ZzFile.click()" v-if="ZZImg === null">
                <i class="iconfont iconjia centerLabel"></i>
              </a>
              <div v-if="ZZImg !== null">
                <img :src="ZZImg" class="centerLabel contain" alt="">
                <a class="iconfont iconguanbi" @click="ZZImg = null"></a>
              </div>
              <input type="file" ref="ZzFile" @change="ZzFileChange" style="display: none">
            </div>
          </div>

          <div>
            <div class="Line flex-h">
              <span>身份证</span>
            </div>
            <div class="IdCardList">
              <div>
                <a @click="$refs.SfzzmFile.click()">
                  <img v-if="SfzzmImg !== null" :src="SfzzmImg" class="centerLabel contain" alt="">
                </a>
                <span>身份证正面照</span>
                <input type="file" ref="SfzzmFile" @change="SfzzmFileChange" style="display: none">
              </div>
              <div>
                <a @click="$refs.SfzfmFile.click()">
                  <img v-if="SfzfmImg !== null" :src="SfzfmImg" class="centerLabel contain" alt="">
                </a>
                <span>身份证背面照</span>
                <input type="file" ref="SfzfmFile" @change="SfzfmFileChange" style="display: none">
              </div>
            </div>
          </div>

          <div>
            <div class="Line flex-h">
              <span>所在地区</span>
              <div class="flex-item" @click="ShowAreaSelect = true">
                <div>
                  <span v-if="Province !== ''">{{Province}} {{City}}</span>
                  <span v-else>请选择地区</span>
                </div>
              </div>
              <i class="iconfont iconjiantouright"></i>
            </div>
            <div class="Line flex-h">
              <span>详细地址</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="街道、门牌号等" style="text-align: right;" v-model="AddressDetail">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>营业时间</span>
              <div class="flex-item" @click="ShowTimeStartSelect = true">
                <div>
                  <span style="text-align: center;">{{StartTime === null ? '开始时间' : StartTime}}</span>
                </div>
              </div>
              <em>至</em>
              <div class="flex-item" @click="ShowTimeEndSelect = true">
                <div>
                  <span style="text-align: center;">{{EndTime === null ? '结束时间' : EndTime}}</span>
                </div>
              </div>
              <i class="iconfont iconjiantouright"></i>
            </div>
            <router-link tag="div" :to="{ name: 'ShiMingRenZheng' }" class="Line flex-h">
              <span>收款管理</span>
              <div class="flex-item"></div>
              <span>{{CurrentShopInfo.aliLoginId || '未授权'}}</span>
              <i class="iconfont iconjiantouright"></i>
            </router-link>
            <div class="Btn">
              <a v-if="CurrentShopInfo !== null && CurrentShopInfo.shopId === 0" @click="ShowQrCodeLayer = true">保存</a>
            </div>
          </div>

        </div>
        <div class="MapContainer" v-show="ShowAreaSelect">
          <MapSearch @Close="ShowAreaSelect = false" @Sure="SureAddress"></MapSearch>
        </div>
        <div class="PickLayer" v-show="ShowTimeStartSelect">
          <div>
            <van-datetime-picker v-model="CurrentStartDate" type="time" @confirm="StartTimeConfirm" @cancel="ShowTimeStartSelect = false" />
          </div>
        </div>
        <div class="PickLayer" v-show="ShowTimeEndSelect">
          <div>
            <van-datetime-picker v-model="CurrentEndDate" type="time" @confirm="EndTimeConfirm" @cancel="ShowTimeEndSelect = false" />
          </div>
        </div>

        <div class="QrCodeLayer" v-if="!CurrentShopInfo.isAliAuthed && ShowQrCodeLayer">
          <div class="centerLabel">
            <div class="Top">
              <span>授权二维码</span>
              <a class="iconfont iconguanbi" @click="ShowQrCodeLayer = false"></a>
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
import { Picker, DatetimePicker } from 'vant'
import MainPageContainer from '../../../components/common/MainPageContainer'
import MapSearch from '../../../components/common/MapSearch'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      QrCodeUrl: null,
      ShowQrCodeLayer: false,
      ShopName: '',
      RealName: '',
      Phone: '',
      AddressDetail: '',
      Province: '',
      City: '',
      Address: '',
      Lat: null,
      Lng: null,
      DataLock: false,
      CurrentStartDate: '08:00',
      ShowTimeStartSelect: false,
      CurrentEndDate: '18:00',
      ShowTimeEndSelect: false,
      ShowAreaSelect: false,
      ZzFileData: null,
      ZZImg: null,
      SfzzmImg: null,
      SfzfmImg: null,
      AreaList: [null, null],
      StartTime: null,
      EndTime: null
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo,
      UserInfo: x => x.UserInfo
    })
  },
  components: {
    MapSearch,
    MainPageContainer,
    'van-picker': Picker,
    'van-datetime-picker': DatetimePicker
  },
  created () {
    if (this.CurrentShopInfo !== null) {
      this.ShopInfoChange()
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      ''
    ]),
    ...mapUserActions([
      'ImgUpload',
      'ShopValid',
      'GetCurrentShopInfo'
    ]),
    ShopInfoChange () {
      this.ShopName = this.CurrentShopInfo.name
      this.ZZImg = this.CurrentShopInfo.businessLicense
      this.AddressDetail = this.CurrentShopInfo.address
      this.City = this.CurrentShopInfo.cityId
      this.Province = this.CurrentShopInfo.provinceName
      this.SfzzmImg = this.CurrentShopInfo.shopkeeper.frontIdCard
      this.SfzfmImg = this.CurrentShopInfo.shopkeeper.backIdCard
      this.RealName = this.CurrentShopInfo.shopkeeper.name
      this.Phone = this.CurrentShopInfo.shopkeeper.phone
      this.Lat = this.CurrentShopInfo.lat
      this.Lng = this.CurrentShopInfo.lng
      this.StartTime = this.CurrentShopInfo.openTime
      this.EndTime = this.CurrentShopInfo.closeTime
      if (!this.CurrentShopInfo.isAliAuthed) {
        QRCode.toDataURL(this.CurrentShopInfo.aliAuthURL).then((res) => {
          this.QrCodeUrl = res
        }).catch((res) => {
          console.log(res)
        })
      }
    },
    CheckForm () { // 校验表单
      if (this.ShopName === '') {
        this.Toast('店铺名不能为空')
        return false
      }
      if (this.RealName === '') {
        this.Toast('真实姓名不能为空')
        return false
      }
      if (this.Phone === '') {
        this.Toast('手机号不能为空')
        return false
      }
      if (this.ZZImg === null) {
        this.Toast('彩票代销证必须上传')
        return false
      }
      return true
    },
    SaveForm () { // 保存认证
      if (this.DataLock || !this.CheckForm()) return
      this.DataLock = true
      let Data = {
        shop: {
          businessLicense: this.ZZImg,
          address: this.AddressDetail,
          cityId: this.City,
          keeperId: this.UserInfo.keeperId,
          lat: this.Lat,
          lng: this.Lng,
          name: this.ShopName,
          provinceId: this.Province,
          openTime: this.StartTime,
          closeTime: this.EndTime
        },
        shopkeeper: {
          avatar: this.UserInfo.avatar,
          backIdCard: this.SfzfmImg,
          frontIdCard: this.SfzzmImg,
          keeperId: this.UserInfo.keeperId,
          name: this.UserInfo.name,
          phone: this.UserInfo.phone
        }
      }
      this.ShopValid({ data: { ...Data } }).then((res) => {
        this.Toast('认证提交成功')
        this.GetCurrentShopInfo()
        this.DataLock = false
      }).catch((res) => {
        this.Toast(res.data.message)
        this.DataLock = false
      })
    },
    EndTimeConfirm (e) { // 确定选择结束时间
      this.EndTime = this.CurrentEndDate
      this.ShowTimeEndSelect = false
    },
    StartTimeConfirm (e) { // 确定选择开始时间
      this.StartTime = this.CurrentStartDate
      this.ShowTimeStartSelect = false
    },
    SureAddress (e) { // 确认选取地址
      this.Province = e.province
      this.City = e.city
      this.Address = e.title
      this.AddressDetail = e.address
      this.Lat = e.point.lat
      this.Lng = e.point.lng
      this.ShowAreaSelect = false
    },
    SfzzmFileChange (e) { // 身份证正面照更新
      let aFormData = new FormData()
      aFormData.append('file', e.target.files[0])
      this.ImgUpload({ urlData: { plat: 'shop' }, data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        this.$refs.SfzzmFile.value = ''
        this.SfzzmImg = res.data.data
      })
    },
    SfzfmFileChange (e) { // 身份证反面照更新
      let aFormData = new FormData()
      aFormData.append('file', e.target.files[0])
      this.ImgUpload({ urlData: { plat: 'shop' }, data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        this.$refs.SfzfmFile.value = ''
        this.SfzfmImg = res.data.data
      })
    },
    ZzFileChange (e) { // 彩票代销证图片更新
      let aFormData = new FormData()
      aFormData.append('file', e.target.files[0])
      this.ImgUpload({ urlData: { plat: 'shop' }, data: aFormData, headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        this.$refs.ZzFile.value = ''
        this.ZZImg = res.data.data
      })
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
