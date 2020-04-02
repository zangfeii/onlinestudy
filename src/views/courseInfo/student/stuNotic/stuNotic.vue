<template>
  <div id="stuNotic">
    <span class="myCourseNotices">课程通知</span>
    <div class="myNoticeLine"></div>
    <create-course-content :is-tec-delete-curren-notice='false'></create-course-content>
  </div>
</template>

<script>
import createCourseContent from '../../teacher/teacherCompoent/courseNotice/courseCreateNotices/createCourseContent'
export default {
  name: 'stuNotic',
  components: { createCourseContent },
  created() {
     document.title = this.$route.meta.title
  },
}
</script>

<style>
  .myCourseNotices {
    font-size: 18px;
    color: #777;
    margin-left: 100px;
  }

  .myNoticeLine {
    width: 1000px;
    height: 2px;
    background: #777;
    margin: 10px auto;
  }
</style>