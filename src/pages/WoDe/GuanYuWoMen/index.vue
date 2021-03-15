<template>
  <div class="Page">
    <MainPageContainer :ShowMainHeader="true" :ShowMainHeaderBack="true" MainHeaderTitle="关于我们">
      <div class="PageContainer">
        <div class="Content">
          <span>牛彩成功的关键是赢得良好的口碑，诚信服务、热心解答、精心提供资料、延伸服务。</span>
          <span>业主的综合素质水平直接决定了投注站的服务质量。牛彩致力于与业主一起共同成长，并提供专业服务，不断提高业务水平，始终秉承诚信经营，创新服务新内涵，为广大站点彩民提供更优质、贴心、便捷的个性化服务。</span>
          <div class="Box"></div>
        </div>
        <div class="Logo">
          <div class="Img">
            <img src="../../../assets/img/logo1.png" class="centerLabel contain" alt="">
          </div>
        </div>
      </div>
    </MainPageContainer>
  </div>
</template>

<script>
import MainPageContainer from '../../../components/common/MainPageContainer'
export default {
  name: '',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
