<template>
  <div id="courseMessage">
    <course-stus-list></course-stus-list>
    <course-message-window></course-message-window>
  </div>
</template>

<script>
import courseStusList from './courseMessageCompoent/courseStusList'
import courseMessageWindow from './courseMessageCompoent/courseMessageWindow'
import { queryCourrentCourseStus, queryUsersListsByIds } from '../../../../../network/query'

export default {
  name: 'courseMessage',
  components: { courseStusList, courseMessageWindow },
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
  #courseMessage {
    display: flex;
  }
</style>