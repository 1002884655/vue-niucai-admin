<template>
  <div class="components DingDanXiangQingLanQiu">

    <div class="Top flex-h">
      <div class="Icon">
        <img src="../../../assets/img/icon6.png" class="centerLabel contain" alt="">
      </div>
      <span class="flex-item">竞彩篮球</span>
    </div>

    <div class="Status">
      <ul class="flex-h">
        <li class="flex-item">
          <span>{{Data.bettingDetail.betting.expectedEarning.substring(0, Data.bettingDetail.betting.expectedEarning.length - 2)}}</span>
          <span>预计奖金(牛币)</span>
        </li>
        <li class="flex-item">
          <span>{{Data.bettingDetail.betting.totalPrice}}</span>
          <span>投资金额(牛币)</span>
        </li>
        <li class="flex-item">
          <span>{{ReturnOrderStatus()}}</span>
          <span>订单状态</span>
        </li>
      </ul>
    </div>

    <div class="Num">
      <div class="Title flex-h">
        <span class="flex-item">投注详情</span>
        <span>{{Data.bettingDetail.betting.planName}} <em>{{Data.bettingDetail.betting.notesNum}}</em>注<em>{{Data.bettingDetail.betting.totalPrice}}</em>牛币</span>
      </div>
      <ul>
        <li v-for="(item, index) in Data.bettingDetail.plan.itemList" :key="index">
          <div class="Time">
            <span>{{item.matchWeek}}</span>
            <span>{{item.leagueName}}</span>
            <span>{{item.matchDate}}</span>
          </div>
          <div class="flex-h">
            <div class="flex-item">
              <div>
                <span>{{item.homeTeamName}}<em></em> VS {{item.awayTeamName}}</span>
              </div>
            </div>
            <span><em>彩民投注：</em><em v-for="(subItem, subIndex) in item.detailList" :key="subIndex">{{subItem.ruleName}}({{subItem.odds}})</em></span>
          </div>
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
        <!-- <li class="flex-h">
          <span>佣金：</span>
          <div class="flex-item">
            <div>
              <span>7%</span>
            </div>
          </div>
        </li> -->
      </ul>
    </div>

  </div>
</template>

<script>
/*
  页面名称：订单详情-大乐透
*/
export default {
  name: 'DingDanXiangQingLanQiu',
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
    ReturnOrderStatus () {
      if (!this.Data.bettingDetail.betting.isDrawn) {
        return '未出票'
      } else {
        if (!this.Data.bettingDetail.betting.isOpen) {
          return '已出票'
        } else {
          if (!this.Data.bettingDetail.betting.isWinning) {
            return '未中奖'
          } else {
            if (this.Data.bettingDetail.betting.isCashed) {
              return '已派奖'
            } else {
              return '未派奖'
            }
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "page.scss";
</style>
