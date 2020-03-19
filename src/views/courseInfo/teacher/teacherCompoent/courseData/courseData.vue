<template>
  <div id="courseData">
    <h2>课程资料</h2>
  </div>
</template>

<script>
export default {
  name: 'courseData',
  created() {
    document.title = this.$route.meta.title
  },
}
</script>

<style>

</style>