<template>
  <div class="Page">
    <MainPageContainer @UserInfoChange="UserInfoChange" :ShowMainHeader="true" :MainHeaderTitle="`支付宝认证`" :ShowMainHeaderBack="true" :ShowMainHeaderMore="true" :MainHeaderMoreText="`保存`">
      <div class="Container">
        <div class="Content" v-if="UserInfo !== null && UserInfo.isValidAli">

          <div>
            <div class="Line flex-h">
              <span>支付宝账号</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请输入您的支付宝账号">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>真实姓名</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请输入您的真实姓名">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>联系人电话</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请填写您的手机号码">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>联系人邮箱</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请填写您的邮箱">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>店铺地址</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请填写详细的店铺地址">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>代销证编号</span>
              <div class="flex-item">
                <div>
                  <input type="text" placeholder="请填写编号">
                </div>
              </div>
            </div>
            <div class="Line flex-h">
              <span>代销证截止日期</span>
              <div class="flex-item">
                <div>
                  <span>xxxx</span>
                </div>
              </div>
              <i class="iconfont iconjiantouright"></i>
            </div>
          </div>

          <div class="PhotoList flex-h">
            <div class="flex-item">
              <ul>
                <li>
                  <a>
                    <i class="iconfont iconjia centerLabel"></i>
                  </a>
                  <span>上传代销证</span>
                </li>
                <li>
                  <div>
                    <img src="" class="centerLabel contain" alt="">
                  </div>
                  <span>示例</span>
                </li>
                <li>
                  <div>
                    <img src="" class="centerLabel contain" alt="">
                  </div>
                  <span></span>
                </li>
              </ul>
            </div>
            <div class="flex-item">
              <ul>
                <li>
                  <a>
                    <i class="iconfont iconjia centerLabel"></i>
                  </a>
                  <span>上传门牌头</span>
                </li>
                <li>
                  <div>
                    <img src="" class="centerLabel contain" alt="">
                  </div>
                  <span>示例</span>
                </li>
                <li>
                  <div>
                    <img src="" class="centerLabel contain" alt="">
                  </div>
                  <span></span>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="Content" v-if="UserInfo !== null && !UserInfo.isValidAli">
          <a class="AliShouQuan centerLabel" @click="ShouQuan">支付宝授权</a>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions } = createNamespacedHelpers('user')
export default {
  name: 'index',
  data () {
    return {
      DataLock: false,
      Timer: null
    }
  },
  computed: {
    ...mapUserState({
      CurrentShopInfo: x => x.CurrentShopInfo,
      UserInfo: x => x.UserInfo
    })
  },
  components: {
    MainPageContainer
  },
  created () {
    if (this.UserInfo !== null) {
      this.UserInfoChange()
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetAliAppId'
    ]),
    ShouQuan () {
      this.GetAliAppId().then((res) => {
        console.log(111)
        window.ap.getAuthCode({
          appId: res.data.data,
          scopes: ['auth_base'],
          showErrorTip: true
        }, (subRes) => {
          console.log(subRes, 222)
        })
      })
    },
    UserInfoChange () {
      if (this.UserInfo !== null && !this.UserInfo.isValidAli) {

      }
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
