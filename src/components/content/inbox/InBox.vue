<template>
  <div id="myInBox">
    <inbox-bread ref="inboxBreadRef" :bread-titles='twoTitles' @backNoticelist='backList'></inbox-bread>
    <inbox-item-content ref='inboxItemConRef' @noticeContnetClick='clickBread'></inbox-item-content>
  </div>
</template>

<script>
import inboxItemContent from './inboxComponents/inboxItemContent'
import inboxBread from './inboxBread/inboxBread'
export default {
  name: 'InBox',
  components: { inboxItemContent, inboxBread },
  data () {
    return {
      twoTitles: ['首页', '详情']
    }
  },
  methods: {
    clickBread() {
      this.$refs.inboxBreadRef.addB()
    },
    backList() {
      this.$refs.inboxItemConRef.noticesList()
    }
  },
}
</script>

<style>
  #myInBox {
    margin-top: 10px;
    margin-left: 20px;
  }

</style>