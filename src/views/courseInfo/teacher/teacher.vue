<template>
  <div id="teacherCourse">
    <home-top-bar :show-add-course-btn='false'></home-top-bar>
    <course-mange-title :mange-title-btns='courseTitle'></course-mange-title>
  </div>
</template>

<script>
import homeTopBar from '../../home/homeCompoenet/homeTopBar'
import courseMangeTitle from './teacherCompoent/courseMangeTitle'
import { queryIsHaveCourse } from '../../../network/query'
export default {
  name: 'teacher',
  components :{ homeTopBar, courseMangeTitle },
  data() {
    return {
      courseTitle: [
        { title: '首页', path: 'homePage'},
        { title: '资料', path: 'courseData',},
        { title: '管理', path: 'courseMange'},
        { title: '通知', path: 'courseNotice'},
        // { title: '管理', path: 'courseMange'},
      ]
    }
  },
  created() {
    document.title = this.$route.meta.title
    console.log('22332');
  },
  methods: {
    queryCourseIsEsist() {
      queryIsHaveCourse({
        // useriid: 
      })
    }
  },
}
</script>

<style>

</style>