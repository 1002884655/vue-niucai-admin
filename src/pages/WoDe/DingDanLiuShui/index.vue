<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :MainHeaderTitle="`订单流水`" :ShowMainHeaderBack="true">
      <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
        <div class="Container">
          <ul>
            <router-link tag="li" v-for="(item, index) in PageList" :key="index" :to="{name: 'DingDanXiangQing', query: {id: item.orderId}}">
              <div class="Title flex-h">
                <span class="flex-item">{{item.lotteryName}}</span>
                <span class="Prize" v-if="item.isWinning">奖金：<em>{{item.winAmount}}</em>牛币</span>
                <span class="Status" :class="[item.isWinning ? 'Red' : 'Black']">{{ReturnStatus(item)}}</span>
              </div>
              <div class="OrderId">
                <span>订单号：</span>
                <span>{{item.orderId}}</span>
              </div>
              <div class="Date">
                <span>{{item.totalPrice}}牛币</span>
                <span>下单时间：{{ToolClass.DateFormat(item.createDate)}}</span>
              </div>
            </router-link>
          </ul>
        </div>
      </scroller>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      PageData: {
        pageNum: 0,
        pageSize: 10
      },
      PageList: [],
      Timer: null,
      HasNextPage: true,
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo,
      CurrentShopOrderList: x => x.CurrentShopOrderList
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.PageList = []
    this.EmptyCurrentShopOrderList()
    this.Init()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'EmptyCurrentShopOrderList'
    ]),
    ...mapUserActions([
      'GetCurrentShopOrderList'
    ]),
    ReturnStatus (item) {
      if (!item.isDrawn) {
        if (item.status - 0 === 2) {
          return '出票失败'
        } else {
          return '未出票'
        }
      }
      if (!item.isOpen) {
        return '未开奖'
      }
      if (!item.isWinning) {
        return '未中奖'
      }
      return '已中奖'
    },
    Init (done = () => { }) { // 初始化
      this.PageList = []
      this.EmptyCurrentShopOrderList()
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    ReturnMonth (num) { // 返回月份
      switch (num - 0) {
        case 1: return '一月'
        case 2: return '二月'
        case 3: return '三月'
        case 4: return '四月'
        case 5: return '五月'
        case 6: return '六月'
        case 7: return '七月'
        case 8: return '八月'
        case 9: return '九月'
        case 10: return '十月'
        case 11: return '十一月'
        case 12: return '十二月'
        default: return ''
      }
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
    },
    ToGetPageList (done = () => { }) { // 获取页面列表
      if (this.HasNextPage) {
        this.GetCurrentShopOrderList({ queryData: { ...this.PageData } }).then((res) => {
          this.PageList = this.PageList.concat(res.data.data.records || [])
          this.HasNextPage = res.data.data.total > this.CurrentShopOrderList.length
          done()
        }).catch(() => {
          done()
        })
      }
    },
    Infinite (done) { // 上拉加载
      this.Timer = window.setTimeout(() => {
        if (this.HasNextPage) {
          this.PageData.pageNum += 1
          this.ToGetPageList(done)
        } else {
          this.$refs.MyScroller.finishInfinite(true)
        }
      }, 1000)
    },
    Refresh (done) { // 页面下拉刷新
      if (!this.DataLock) {
        this.Init(done)
      } else {
        done()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
