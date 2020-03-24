<template>
  <div id="inboxDetails">
    <p>{{noticeDetailInfo.n_sendTtle}}</p>
    <p>{{noticeDetailInfo.n_content}}</p>
  </div>
</template>

<script>
export default {
  name: 'inboxDetails',
  props: {
    noticeDetailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    console.log(this.noticeDetailInfo)
  },
}
</script>

<style>

</style>