<template>
  <div id="inboxBread">
    <div>
      <span> <b>首页</b> / </span>
      <span :class="{addB: isAddB}">详情</span>
    </div>
    <div>
      <a class="backa" @click="backNoticesList">{{bacakStr}}返回</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inboxBread',
  data() {
    return {
      isAddB: false,
      bacakStr: '<'
    }
  },
  methods: {
    addB() {
      this.isAddB = true
    },
    backNoticesList() {
      this.isAddB = false
      this.$emit('backNoticelist')
    }
  },
}
</script>

<style>
  #inboxBread {
    display: flex;
    justify-content: space-between;
    width: 690px;
    margin-top: 20px;
    font-size: 14px;
  }

  .backa {
    color: #0099FF;
  }  

  .addB {
    font-weight: bold;
  }
</style>