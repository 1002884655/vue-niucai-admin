<template>
  <div class="components demo">
    <router-link tag="a" :to="{name: 'test1'}">to test1</router-link>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'page.scss';
</style>
