<template>
  <div class="components TabSwiper flex-v">
    <!-- 导航 -->
    <nav class="flex-h">
      <a class="flex-item" v-for="(item, index) in List" :key="index" :class="{'active': NavActiveId === item.id}" @click="CutNav(item, index)">
        <span>{{item.name}}</span>
      </a>
    </nav>

    <!-- 内容 -->
    <div class="flex-item">
      <div>
        <swiper :options="SwiperOptions" ref="MySwiper">
          <swiper-slide v-for="(item, index) in List" :key="index">
            <div class="SwiperItem">
              <scroller :on-refresh="Refresh">
                <div class="Container">
                  <slot :name="`SwiperItem-${item.id}`"></slot>
                </div>
              </scroller>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'TabSwiper',
  props: {
    List: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  data () {
    let _that = this
    return {
      NavActiveId: this.List.length ? this.List[0].id : null,
      SwiperOptions: {
        on: {
          transitionEnd () {
            _that.NavActiveId = _that.List[_that.MySwiper.activeIndex].id
            _that.$emit('Change', _that.NavActiveId)
          }
        }
      }
    }
  },
  computed: {
    MySwiper () {
      return this.$refs.MySwiper.swiper
    }
  },
  components: {
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
    CutNav (item, index) { // 切换nav
      this.NavActiveId = item.id
      this.MySwiper.slideTo(index, 0, false)
      this.$emit('Change', this.NavActiveId)
    },
    Refresh (done) { // 页面下拉刷新
      this.$emit('Refresh', { done, id: this.NavActiveId })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
