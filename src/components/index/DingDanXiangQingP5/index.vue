<template>
  <div class="components DingDanXiangQingP5">

    <div class="Top flex-h">
      <div class="Icon">
        <img src="../../../assets/img/icon2.png" class="centerLabel contain" alt="">
      </div>
      <span class="flex-item">排列5 <em>| 提供照片</em></span>
      <span>{{Data.bettingDetail.betting.issueNo}}期</span>
    </div>

    <div class="Num">
      <div class="Title flex-h">
        <span class="flex-item">投注号码</span>
        <span><em>{{Data.bettingDetail.betting.notesNum}}</em>注<em>{{Data.bettingDetail.betting.bettingTimes}}</em>倍<em>{{Data.bettingDetail.betting.totalPrice}}</em>牛币</span>
      </div>
      <ul>
        <li v-for="(item, index) in Data.bettingDetail.plan.itemList" :key="index">
          <!-- <span>1 | 单式</span> -->
          <ul>
            <li v-for="(subItem, subIndex) in item.firstNums.split(',')" :key="subIndex">{{subItem}}</li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="OrderInfo">
      <div class="Title flex-h">
        <span class="flex-item">订单信息</span>
      </div>
      <ul>
        <li class="flex-h">
          <span>用户手机：</span>
          <div class="flex-item">
            <div>
              <span>{{ToolClass.ReturnUserPhone(Data.bettingDetail.customer.phone)}}</span>
            </div>
          </div>
        </li>
        <li class="flex-h">
          <span>订单编号：</span>
          <div class="flex-item">
            <div>
              <span>{{Data.orderId}}</span>
            </div>
          </div>
        </li>
        <li class="flex-h">
          <span>购买时间：</span>
          <div class="flex-item">
            <div>
              <span>{{ToolClass.DateFormat(Data.createDate)}}</span>
            </div>
          </div>
        </li>
        <li class="flex-h">
          <span>投注人：</span>
          <div class="flex-item">
            <div>
              <span>{{Data.bettingDetail.betting.customerName}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
/*
  页面名称：订单详情-大乐透
*/
export default {
  name: 'DingDanXiangQingP5',
  props: ['Data'],
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
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
