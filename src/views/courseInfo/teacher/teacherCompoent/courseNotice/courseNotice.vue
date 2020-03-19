<template>
  <div id="courseNotice">
    <h1>通知</h1>
  </div>
</template>

<script>
export default {
  name: 'courseNotice',
  created() {
    document.title = this.$route.meta.title
  }
}
</script>

<style>

</style>