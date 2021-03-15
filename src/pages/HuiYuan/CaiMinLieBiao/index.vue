<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="Init()" :ShowMainHeader="true" :MainHeaderTitle="`全部彩民`" :ShowMainHeaderBack="true">
      <div class="Content">
        <scroller :on-refresh="Refresh" :on-infinite="Infinite" ref="MyScroller">
          <div class="Container">
            <ul>
              <li v-for="(item, index) in CurrentShopAllCustomer" :key="index" class="flex-h">
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
      Timer: null,
      HasNextPage: true,
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo,
      UserInfo: x => x.UserInfo,
      CurrentShopAllCustomer: x => x.CurrentShopAllCustomer
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    this.EmptyCurrentShopAllCustomer()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserMutations([
      'EmptyCurrentShopAllCustomer'
    ]),
    ...mapUserActions([
      'GetShopAllCustomer'
    ]),
    Init (done = () => { }) { // 初始化
      this.EmptyCurrentShopAllCustomer()
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.DataLock = false
      this.ToGetPageList(done)
    },
    ToGetPageList (done = () => { }) { // 获取页面列表
      if (this.HasNextPage) {
        this.GetShopAllCustomer({ queryData: { ...this.PageData, from: 'all' } }).then((res) => {
          this.HasNextPage = res.data.data.total > this.CurrentShopAllCustomer.length
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
