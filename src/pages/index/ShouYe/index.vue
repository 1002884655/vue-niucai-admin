<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init()" :MainHeaderTitle="`订单管理`" :MainTabBarActiveId="1" :ShowMainHeader="true" :ShowMainTabBar="true">
      <div class="PageContainer flex-v">
        <a class="flex-h">
          <i class="iconfont icontongzhi"></i>
          <span class="flex-item">关于彩民端提示风险问题的通知</span>
          <i class="iconfont iconguanbi"></i>
        </a>

        <!-- 内容 -->
        <div class="flex-item">
          <div>
            <div class="Content" v-if="UserInfo !== null">
              <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
                <div class="Container">
                  <ul>
                    <li v-for="(item, index) in CurrentShopOrderList" :key="index">
                      <div class="Res">
                        <div class="Num flex-h">
                          <div class="Icon">
                            <img v-if="item.lotteryId === 'double-color'" src="../../../assets/img/icon5.png" class="centerLabel contain" alt="">
                            <img v-if="item.lotteryId === 'lottery'" src="../../../assets/img/icon4.png" class="centerLabel contain" alt="">
                            <img v-if="item.lotteryId === 'p5'" src="../../../assets/img/icon2.png" class="centerLabel contain" alt="">
                            <img v-if="item.lotteryId === 'p3'" src="../../../assets/img/icon7.png" class="centerLabel contain" alt="">
                            <img v-if="item.lotteryId === 'football'" src="../../../assets/img/icon3.png" class="centerLabel contain" alt="">
                            <img v-if="item.lotteryId === 'basketball'" src="../../../assets/img/icon6.png" class="centerLabel contain" alt="">
                          </div>
                          <span v-if="item.lotteryId === 'double-color'">双色球</span>
                          <span v-if="item.lotteryId === 'lottery'">大乐透</span>
                          <span v-if="item.lotteryId === 'p5'">排列5</span>
                          <span v-if="item.lotteryId === 'p3'">排列3</span>
                          <span v-if="item.lotteryId === 'football'">足球</span>
                          <span v-if="item.lotteryId === 'basketball'">篮球</span>
                          <div class="flex-item">
                            <ul v-if="item.lotteryId === 'lottery' || item.lotteryId === 'double-color'">
                              <li v-for="(subItem, subIndex) in item.planItems[0].firstNums.split(',')" :key="`First-${subIndex}`">{{subItem}}</li>
                              <li class="active" v-for="(subItem, subIndex) in item.planItems[0].secondNums.split(',')" :key="`Sec-${subIndex}`">{{subItem}}</li>
                            </ul>
                            <span v-if="item.lotteryId === 'football' || item.lotteryId === 'basketball'">{{item.planName}} 预计奖金：{{item.expectedEarning}}</span>
                          </div>
                        </div>
                        <div class="Count flex-h">
                          <span class="flex-item" v-if="item.lotteryId !== 'football' && item.lotteryId !== 'basketball'"><em>{{item.notesNum}}</em>注<em>{{item.bettingTimes}}</em>倍<em>{{item.totalPrice}}</em>牛币</span>
                          <span class="flex-item" v-else>{{item.notesNum}}注{{item.totalPrice}}牛币</span>
                          <span>{{ToolClass.DateFormat(item.createDate)}}</span>
                        </div>
                      </div>
                      <div class="Time flex-h">
                        <span v-if="item.lotteryId !== 'football' && item.lotteryId !== 'basketball'">第{{item.issueNo}}期</span>
                        <span class="flex-item">下单人：{{IsPhone(item.customerName) ? `${item.customerName.substring(0, 3)}****${item.customerName.substring(7, 11)}` : item.customerName}}</span>
                        <router-link :to="{ name: 'DingDanXiangQing', query: {id: item.orderId} }">查看详情</router-link>
                      </div>
                    </li>
                  </ul>
                </div>
              </scroller>
            </div>
          </div>
        </div>
      </div>
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
      ExitAppStatus: false,
      Timer: null,
      HasNextPage: true,
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      FirstComming: x => x.FirstComming,
      UserInfo: x => x.UserInfo,
      CurrentShopOrderList: x => x.CurrentShopOrderList
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.EmptyCurrentShopOrderList()
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
  destroyed () {
    window.removeEventListener('popstate', this.RouterBack, false)
  },
  methods: {
    ...mapUserMutations([
      'EmptyCurrentShopOrderList'
    ]),
    ...mapUserActions([
      'GetCurrentShopOrderList'
    ]),
    IsPhone (str) { // 校验手机号
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      return !!myreg.test(str)
    },
    Init (done = () => { }) { // 初始化
      this.EmptyCurrentShopOrderList()
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    RouterBack () {
      if (this.ExitAppStatus) {
        window.js2native.closePage()
      } else {
        this.Toast('再按一次退出应用')
        this.ExitAppStatus = true
      }
    },
    ToGetPageList (done = () => { }) { // 获取页面列表
      if (this.HasNextPage) {
        this.GetCurrentShopOrderList({ queryData: { ...this.PageData, isDrawn: false } }).then((res) => {
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
