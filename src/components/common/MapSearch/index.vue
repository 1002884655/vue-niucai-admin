<template>
  <div class="components MapSearch">
    <div class="BaiDuMapSearch flex-h">
      <div class="flex-item">
        <input type="search" v-model="MapSearchKey" placeholder="请输入地址" @search="MapSearchFoo">
      </div>
      <a @click="MapSearchFoo">搜索</a>
    </div>

    <div class="MapContainer">
      <div id="BaiDuMap"></div>
    </div>

    <div class="Bottom">
      <a @click="SureAddress">确定</a>
      <a @click="$emit('Close')">取消</a>
    </div>
  </div>
</template>

<script>
/*
  页面名称：
*/
export default {
  name: 'MapSearch',
  props: ['Show'],
  data () {
    return {
      City: null,
      Province: null,
      CurrentSelectAddress: null,
      LocalMap: null,
      MapSearchKey: ''
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
      this.MapInit()
    })
  },
  methods: {
    SureAddress () { // 确认选取地址
      if (this.CurrentSelectAddress === null) return
      this.$emit('Sure', { ...this.CurrentSelectAddress })
    },
    MapSearchFoo () {
      if (this.MapSearchKey !== '') {
        this.LocalMap.search(this.MapSearchKey)
        this.LocalMap.setInfoHtmlSetCallback((e) => {
          this.CurrentSelectAddress = { ...e }
        })
      }
    },
    MapInit () {
      let map = new window.BMap.Map('BaiDuMap')
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11)
      this.LocalMap = new window.BMap.LocalSearch(map, {
        renderOptions: { map: map },
        onSearchComplete: (res) => {
          console.log(res.Hr)
          if (res.Hr.length) {
            this.CurrentSelectAddress = { ...res.Hr[0] }
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
