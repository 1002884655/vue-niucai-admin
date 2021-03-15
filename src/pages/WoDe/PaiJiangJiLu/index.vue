<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :MainHeaderTitle="`派奖记录`" :ShowMainHeaderBack="true">
      <div class="PageContainer flex-v">
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
            <scroller :on-refresh="Refresh">
              <div class="Container">
                <ul>
                  <li v-for="(item, index) in 15" :key="index" class="flex-h">
                    <div class="flex-item">
                      <div class="Title flex-h">
                        <span class="flex-item">竞足胜平负</span>
                        <span>1注</span>
                        <span>1倍</span>
                        <span><em>2.00</em>牛币</span>
                      </div>
                      <span>订单编号：TE20200810000146179970</span>
                      <span>出票时间：2020-08-10 15:10:10</span>
                      <div class="Res">
                        <span>过关方式：2串1</span>
                        <span>奖金：<em>5.20牛币</em></span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </scroller>
          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data () {
    return {
      SwiperOptions: {
        slidesPerView: 'auto'
      },
      ActiveNavId: 1,
      NavList: [
        { Name: '全部彩种', Id: 1 },
        { Name: '双色球', Id: 2 },
        { Name: '大乐透', Id: 3 },
        { Name: '排列三', Id: 4 },
        { Name: '排列五', Id: 5 },
        { Name: '足球', Id: 6 },
        { Name: '篮球', Id: 7 }
      ]
    }
  },
  computed: {
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
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    CutNav (id) {
      this.ActiveNavId = id
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
