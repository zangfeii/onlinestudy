<template>
  <div id="courseMange">
    <course-stus-list :stu-list-data='usersList'></course-stus-list>
  </div>
</template>

<script>
import courseStusList from './courseMangeCompoent/courseStusList'
// import courseMessageWindow from './courseMessageCompoent/courseMessageWindow'
import { queryCourrentCourseStus, queryUsersListsByIds } from '../../../../../network/query'

export default {
  name: 'courseMange',
  components: { courseStusList, },
  data() {
    return {
      courseTecheriid: {},
      usersList: []
    }
  },
  created() {
    document.title = this.$route.meta.title
    this.courseTecheriid = JSON.parse(window.sessionStorage.getItem('currentCourseInfo')) 
    this.querStuList()
  },
  methods: {
    querStuList() {
      console.log(this.courseTecheriid);
      queryCourrentCourseStus({
        courseiid: this.courseTecheriid._id,
        teacheriid: this.courseTecheriid.cteacheriid
      }).then(res => {
        if(res.data.status === 200) {
          queryUsersListsByIds({
            ids: res.data.result
          }).then(res => {
            if(res.data.status === 200) {
              this.usersList = res.data.result
              console.log(this.usersList);
            }
          })
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