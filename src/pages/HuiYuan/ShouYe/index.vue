<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init()" :MainHeaderTitle="`会员`" :MainTabBarActiveId="3" :ShowMainHeader="true" :ShowMainTabBar="true">
      <div class="Container flex-v">
        <router-link :to="{ name: 'CaiMinLieBiao' }" class="flex-h">
          <i class="iconfont iconyonghuguanli"></i>
          <span class="flex-item">全部彩民</span>
          <i class="iconfont iconjiantouright"></i>
        </router-link>

        <span>下单客户</span>

        <!-- 内容 -->
        <div class="flex-item">
          <div>
            <div class="Content" v-if="CurrentShopInfo !== null">
              <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
                <div class="Container">
                  <ul>
                    <li v-for="(item, index) in CurrentShopCustomer" :key="index" class="flex-h">
                      <div class="Icon">
                        <img v-if="item.avatar !== null && item.avatar !== ''" :src="item.avatar" class="centerLabel cover" alt="">
                        <span v-else class="centerLabel">{{item.name.substring(0, 1)}}</span>
                      </div>
                      <div class="flex-item">
                        <div>
                          <span>{{item.name}} <em v-if="item.recShop - 0 === CurrentShopInfo.shopId">荐</em></span>
                          <span>{{ToolClass.DateFormat(item.createDate)}}</span>
                        </div>
                      </div>
                      <!-- <span>2.00</span> -->
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
      CurrentShopInfo: x => x.CurrentShopInfo,
      UserInfo: x => x.UserInfo,
      CurrentShopCustomer: x => x.CurrentShopCustomer
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.EmptyCurrentShopCustomer()
    if (this.CurrentShopInfo === null) {
      this.GetCurrentShopInfo()
    }
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
      'EmptyCurrentShopCustomer'
    ]),
    ...mapUserActions([
      'GetShopCustomer',
      'GetCurrentShopInfo'
    ]),
    Init (done = () => { }) { // 初始化
      this.EmptyCurrentShopCustomer()
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
        this.GetShopCustomer({ queryData: { ...this.PageData, from: 'order' } }).then((res) => {
          this.HasNextPage = res.data.data.total > this.CurrentShopCustomer.length
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
