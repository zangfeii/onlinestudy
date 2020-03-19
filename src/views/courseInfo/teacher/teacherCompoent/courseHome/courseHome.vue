<template>
  <div id="courseHome">
    <course-list></course-list>
    <course-topic></course-topic>
  </div>
</template>

<script>
import courseList from './childComp/courseList'
import courseTopic from './childComp/courseTopic'
export default {
  name: 'courseHome',
  components: { courseList, courseTopic },
  created() {
    document.title = this.$route.meta.title
  }
}
</script>

<style>
  #courseHome {
    display: flex;
    /* height: 700px; */
  }

  
</style>