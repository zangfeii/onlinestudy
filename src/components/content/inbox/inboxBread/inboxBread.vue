<template>
  <div id="inboxBread">
    <div>
      <span> <b>{{breadTitles[0]}}</b> / </span>
      <span :class="{addB: isAddB}">{{breadTitles[1]}}</span>
    </div>
    <div>
      <a class="backa" v-if="isHaveBack" @click="backNoticesList">{{bacakStr}}返回</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inboxBread',
  props: {
    isHaveBack: {
      type: Boolean,
      default: true
    },
    breadTitles: {
      type: Array,
      default() {
        return []
      }
    }
  },
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