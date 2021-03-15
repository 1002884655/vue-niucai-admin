<template>
  <div class="Page">
    <MainPageContainer @ShopInfoChange="Init" :ShowMainHeader="true" :MainHeaderTitle="`彩种设置`" :ShowMainHeaderBack="true">
      <div class="Container">
        <span>玩法开启</span>
        <ul>
          <li v-for="(item, index) in PageList" :key="index" class="flex-h">
            <div class="Icon">
              <img :src="ReturnIcon(item.lotteryId)" class="centerLabel contain" alt="">
            </div>
            <div class="flex-item">
              <div>
                <span>{{item.name}}</span>
                <span>{{item.description}}</span>
              </div>
            </div>
            <div class="Switch">
              <van-switch v-model="item.isOpen" active-color="#07c160" inactive-color="#D91D36" size="0.13rem" />
            </div>
            <a class="Layer" @click="TriggerItemStatus(item, index)"></a>
          </li>
        </ul>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import { Switch } from 'vant'
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      PageList: [],
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo,
      CurrentLotteryTypeList: x => x.CurrentLotteryTypeList
    })
  },
  components: {
    MainPageContainer,
    'van-switch': Switch
  },
  created () {
    if (this.CurrentShopInfo !== null) {
      this.Init()
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'SetShopLotteryState',
      'GetCurrentLotteryTypeList'
    ]),
    ...mapUserMutations([
      'EditCurrentLotteryTypeList'
    ]),
    Init () { // 初始化
      this.GetCurrentLotteryTypeList({ queryData: { shopId: this.CurrentShopInfo.shopId, pageNum: 1, pageSize: 15, all: true } }).then(() => {
        this.PageList = []
        this.CurrentLotteryTypeList.map((item) => {
          this.PageList.push({ ...item, isOpen: !!item.isOpen })
        })
      })
    },
    TriggerItemStatus (item, index) { // 开启、关闭彩种
      if (this.DataLock) return
      this.DataLock = true
      this.SetShopLotteryState({
        urlData: { shopId: this.CurrentShopInfo.shopId, lotteryId: item.lotteryId },
        data: { lotteryId: item.lotteryId, isOpen: !item.isOpen, shopId: this.CurrentShopInfo.shopId }
      }).then(() => {
        this.PageList[index].isOpen = !item.isOpen
        this.DataLock = false
      }).catch(() => {
        this.DataLock = false
      })
    },
    ReturnIcon (type) { // 返回图标
      switch (type) {
        case 'double-color': return require('../../../assets/img/icon5.png')
        case 'lottery': return require('../../../assets/img/icon4.png')
        case 'p5': return require('../../../assets/img/icon2.png')
        case 'p3': return require('../../../assets/img/icon7.png')
        case 'football': return require('../../../assets/img/icon3.png')
        case 'basketball': return require('../../../assets/img/icon6.png')
        default: return ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
