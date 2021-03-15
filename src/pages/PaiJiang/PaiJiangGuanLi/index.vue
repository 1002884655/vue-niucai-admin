<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init()" :ShowMainHeader="true" :ShowMainTabBar="true" :MainTabBarActiveId="2" :MainHeaderTitle="`派奖管理`" :ShowMainHeaderMore="true" :MainHeaderMoreIcon="`iconjilu`" :MainHeaderMoreText="`派奖记录`" :MainHeaderMoreClick="() => { this.$router.push({ name: 'PaiJiangJiLu' }) }">
      <div class="PageContainer flex-v">
        <!-- 搜索 -->
        <!-- <div class="Search">
          <div class="flex-h">
            <i class="iconfont iconsousuo"></i>
            <div class="flex-item">
              <input type="text" placeholder="请输入您要查询的派奖类型">
            </div>
          </div>
        </div> -->

        <!-- nav -->
        <div class="Nav flex-h">
          <div class="flex-item">
            <swiper :options="SwiperOptions" ref="MySwiper">
              <swiper-slide v-for="(item, index) in NavList" class="SwiperItem" :key="index">
                <a :class="{'active': item.Id === ActiveNavId}" @click="CutNav(item.Id)">{{item.Name}}</a>
              </swiper-slide>
            </swiper>
          </div>
          <a class="iconfont iconcaidan"></a>
        </div>

        <!-- 列表 -->
        <div class="ListContainer flex-item">
          <div>
            <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
              <div class="Container">
                <ul>
                  <li v-for="(item, index) in PageList" :key="index" class="flex-h">
                    <a class="iconfont" :class="[item.Active ? 'icongouxuan active' : 'iconweigouxuan']" @click="SelectItem(item, index)"></a>
                    <router-link tag="div" class="flex-item" :to="{ name: 'DingDanXiangQing', query: {id: item.orderId} }">
                      <div class="Title flex-h">
                        <span class="flex-item">{{item.lotteryName}}</span>
                        <span>{{item.notesNum}}注</span>
                        <span>{{item.bettingTimes}}倍</span>
                        <span><em>{{item.totalPrice}}</em>牛币</span>
                      </div>
                      <span>订单编号：{{item.orderId}}</span>
                      <span>出票时间：{{ToolClass.DateFormat(item.createDate)}}</span>
                      <div class="Res">
                        <span v-if="item.lotteryId === 'basketball' || item.lotteryId === 'football'">过关方式：{{item.passName}}</span>
                        <span>奖金：<em>{{item.winAmount}}牛币</em></span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </scroller>
          </div>
        </div>

        <!-- 底部栏 -->
        <div class="Bottom flex-h">
          <!-- <a class="iconfont" :class="[SelectNum === PageList.length ? 'icongouxuan active' : 'iconweigouxuan']" @click="SelectAll"></a>
          <span>全选</span> -->
          <div class="flex-item">
            <div>
              <span>合计：<em>{{TotalPrice}}牛币</em></span>
            </div>
          </div>
          <a @click="SendMoney" :class="{'active': !DataLock}">{{DataLock ? '正在提交' : '派奖'}}</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { createNamespacedHelpers } from 'vuex'
import MainPageContainer from '../../../components/common/MainPageContainer'

const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      PageList: [],
      Done: null,
      PageData: {
        pageNum: 0,
        pageSize: 10
      },
      Timer: null,
      HasNextPage: true,
      DataLock: false,
      SwiperOptions: {
        slidesPerView: 'auto'
      },
      ExitAppStatus: false,
      SelectNum: 0,
      ActiveNavId: 'all',
      IsAll: false,
      TotalPrice: 0,
      NavList: [
        { Name: '全部彩种', Id: 'all' },
        { Name: '双色球', Id: 'double-color' },
        { Name: '大乐透', Id: 'lottery' },
        { Name: '排列三', Id: 'p3' },
        { Name: '排列五', Id: 'p5' },
        { Name: '足球', Id: 'football' },
        { Name: '篮球', Id: 'basketball' }
      ]
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo,
      CurrentShopOrderList: x => x.CurrentShopOrderList
    }),
    MySwiper () {
      return this.$refs.MySwiper.swiper
    }
  },
  components: {
    MainPageContainer,
    swiper,
    swiperSlide
  },
  created () {
  },
  destroyed () {
    window.removeEventListener('popstate', this.RouterBack, false)
  },
  mounted () {
    if (window.history && window.history.pushState) {
      this.ExitAppStatus = false
      window.history.pushState(null, null, document.URL)
      window.history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.RouterBack, false)
    }
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'EmptyCurrentShopOrderList'
    ]),
    ...mapUserActions([
      'GetCurrentShopOrderList',
      'SendPrize',
      'AliPay'
    ]),
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    SendMoney () { // 派奖
      if (this.DataLock || this.SelectNum === 0) return
      this.DataLock = true
      let CurrentOrder = null
      this.PageList.map((item, index) => {
        if (item.Active) {
          CurrentOrder = { ...item }
        }
      })
      this.AliPay({ urlData: { orderId: CurrentOrder.orderId }, queryData: { returlURL: `${window.location.origin}/#/PaiJiang/PaiJiangGuanLi`, token: window.localStorage.Jwt } }).then((res) => {
        this.DataLock = false
        window.location.href = res.data.data.payUrl
      }).catch((res) => {
        this.DataLock = false
      })
    },
    SelectAll () {
      if (this.SelectNum === this.PageList.length) {
        this.PageList.map((item) => {
          item.Active = false
        })
      } else {
        this.PageList.map((item) => {
          item.Active = true
        })
      }
      this.CheckList()
    },
    SelectItem (item, index) {
      if (!item.Active) {
        this.PageList.map((item) => {
          item.Active = false
        })
      }
      item.Active = !item.Active
      this.CheckList()
    },
    CheckList () {
      this.SelectNum = 0
      this.TotalPrice = 0
      this.PageList.map((item) => {
        if (item.Active) {
          this.SelectNum += 1
          this.TotalPrice += item.winAmount
        }
      })
    },
    Init (done = () => { }) { // 初始化
      this.EmptyCurrentShopOrderList()
      this.PageList = []
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) { // 获取页面列表
      if (this.HasNextPage) {
        let QueryData = { ...this.PageData, isCashed: false }
        if (this.ActiveNavId !== 'all') {
          QueryData.lotteryId = this.ActiveNavId
        }
        this.GetCurrentShopOrderList({ queryData: { ...QueryData } }).then((res) => {
          let Arr = res.data.data.records || []
          Arr.map((item) => {
            this.PageList.push({ ...item, Active: false })
          })
          this.HasNextPage = res.data.data.total > this.CurrentShopOrderList.length
          done()
        }).catch(() => {
          done()
        })
      }
    },
    CutNav (id) {
      this.ActiveNavId = id
      this.EmptyCurrentShopOrderList()
      this.PageList = []
      this.$refs.MyScroller.triggerPullToRefresh(true)
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
