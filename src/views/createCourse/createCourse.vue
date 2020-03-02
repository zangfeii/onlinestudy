<template>
  <div id="createCourse">
    <h2>创建课程</h2>
  </div>
</template>

<script>
export default {
  name: 'createCourse',
  created() {

    console.log(JSON.parse(window.sessionStorage.getItem('user')).name)
  },
}
</script>

<style>

</style>