<template>
  <div id="student">
    <home-top-bar :show-add-course-btn='false'></home-top-bar>
    <course-mange-title :mange-title-btns= 'stuCourseTitles'></course-mange-title>
  </div>  
</template>

<script>
import homeTopBar from '../../home/homeCompoenet/homeTopBar'
import courseMangeTitle from '../teacher/teacherCompoent/courseMangeTitle'
export default {
  name: 'student',
  components :{ homeTopBar, courseMangeTitle },
  data() {
    return {
      stuCourseTitles: [
        {title: '首页', path: 'home'},
        {title: '资料', path: 'download'},
        {title: '消息', path: 'message'},
        {title: '通知', path: 'notic'}
      ]
    }
  },
  created() {
    document.title = this.$route.meta.title
  },
}
</script>

<style>

</style>