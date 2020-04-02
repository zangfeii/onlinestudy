<template>
  <div id="courseMange">
    <course-stus-list :stu-list-data='usersList'></course-stus-list>
    <course-mange-conent :mange-course-info='currentTecCourseInfo'></course-mange-conent>
  </div>
</template>

<script>
import courseStusList from './courseMangeCompoent/courseStusList'
import courseMangeConent from './courseMangeCompoent/courseMangeConent'
// import courseMessageWindow from './courseMessageCompoent/courseMessageWindow'
import { queryCourrentCourseStus, queryUsersListsByIds, queryCurrentTecCourseInfo } from '../../../../../network/query'

export default {
  name: 'courseMange',
  components: { courseStusList, courseMangeConent },
  data() {
    return {
      courseTecheriid: {},
      usersList: [],
      currentTecCourseInfo: {}
    }
  },
  created() {
    document.title = this.$route.meta.title
    this.courseTecheriid = JSON.parse(window.sessionStorage.getItem('currentCourseInfo')) 
    this.querStuList()
    this.queryCurrentTecCourseInfo()
  },
  methods: {
    //获取当前课程学生部分信息
    querStuList() {
      queryCourrentCourseStus({
        courseiid: this.courseTecheriid._id,
        teacheriid: this.courseTecheriid.cteacheriid
      }).then(res => {
        if(res.data.status === 200) {
          queryUsersListsByIds({
            ids: res.data.result
          }).then(res => {
            if(res.data.status === 200) {
              console.log(res.data);
              this.usersList = res.data.result
            }
          })
        }
      })
    },
    //查询当前课程信息
    queryCurrentTecCourseInfo() {
      queryCurrentTecCourseInfo({
        teacheriid: this.courseTecheriid.cteacheriid,
        courseiid: this.courseTecheriid._id
      }).then(res => {
        if(res.data.status === 200) {
          this.currentTecCourseInfo = res.data.result
        } else {
            this.currentTecCourseInfo = {}
        }
      })
    }
  },
  
}
</script>

<style>
  #courseMange {
    display: flex;
    align-items:flex-start;
  }
</style>