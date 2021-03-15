<template>
  <div class="Page">
    <MainPageContainer :MainHeaderMoreIcon="`icondaojishi`" :ShowMainHeaderMore="true" :ShowMainHeader="true" :MainHeaderTitle="`订单查询`" :ShowMainHeaderBack="true">
      <!-- 内容 -->
      <div class="Content">
        <scroller :on-refresh="Refresh">
          <div class="Container">
            <ul>
              <li v-for="(item, index) in 15" :key="index">
                <div class="flex-h">
                  <div class="flex-item">
                    <div>
                      <span>竞足让球胜平负 <em>| 跟单</em></span>
                    </div>
                  </div>
                  <span class="Grey">奖金：<em>5.20</em>牛币</span>
                  <span>已出票</span>
                </div>
                <span>订单编号：TE20200810000146179970</span>
                <span><em>2.00牛币</em>下单时间：2020-08-20 15:30:22</span>
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
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    MainPageContainer
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
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
