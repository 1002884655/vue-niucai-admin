<template>
  <div class="components demo">
    <scroller :on-refresh="Refresh" :on-infinite="LoadMore">
      <div v-for="item in 100" :key="item">{{item}}</div>
    </scroller>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'demo',
  props: ['data'],
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  created () {
    // console.log(this.$route)
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
    },
    LoadMore (done) { // 页面上拉加载
      window.setTimeout(() => {
        done && done(true)
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'page.scss';
</style>
