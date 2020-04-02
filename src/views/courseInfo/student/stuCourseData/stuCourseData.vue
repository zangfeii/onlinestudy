<template>
  <div id="stuCourseData">
    <div class="stuDataline"></div>
    <course-data-content :rouses-info='getCurrentCourseRourses'></course-data-content>
  </div>
</template>

<script>
import courseDataContent from '../../teacher/teacherCompoent/courseData/courseDataCompoent/courseDataContent'
import { getCourseData } from '../../../../network/upStudyData'
export default {
  name: 'stuCourseData',
  components: { courseDataContent },
  data() {
    return {
      getCurrentCourseRourses: []
    }
  },
  created() {
     document.title = this.$route.meta.title
     this.getCurrentRourses()
  },
  methods: {
    getCurrentRourses() {
      getCourseData({
        courseiid: this.$route.params.sciid
      }).then(res => {
        if(res.data.status === 200) {
          this.getCurrentCourseRourses = res.data.data
        } else {
          this.getCurrentCourseRourses = []
        }
      })
    }
  },
}
</script>

<style>
  .stuDataline {
    width: 80%;
    height: 1.5px;
    border-radius: 40%;
    margin: 10PX auto;
    background: #999;
  }
</style>