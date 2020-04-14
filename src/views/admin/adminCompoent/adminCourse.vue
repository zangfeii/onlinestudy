<template>
  <div id="adminCourse">
    <course-content :courses-info='allCourses' class="adminCourseContent" :is-mange-courses='true' :delete-or-out-conent='false'></course-content> 
    <el-pagination
      @current-change="handleCurrentChange"
      current-page.sync="1"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="couesesNum">
    </el-pagination>
  </div>  
</template>

<script>
import { getAllCourses } from '../../../network/query'

import courseContent from '../../../components/content/course/homeCourseCompoent/courseContent'
export default {
  name: 'adminCourse',
  components: { courseContent },
  data () {
    return {
      allCourses: [],
      couesesNum: 0
    }
  },
  created() {
    this.getAllCourses()
  },
  methods: {
    getAllCourses() {
      getAllCourses({page: 1}).then(res => {
        if(res.data.status === 200) {
          this.couesesNum = res.data.total
          this.allCourses = res.data.result
        } else {
          this.allCourses = []
        }
      })
    },
    handleCurrentChange(page) {
      getAllCourses({page}).then(res => {
        if(res.data.status === 200) {
          this.couesesNum = res.data.total
          this.allCourses = res.data.result
        } else{
          this.allCourses = []
        }
      })
    }
  },
}
</script>

<style>
  .adminCourseContent {
    width: 900px;
    height: 550px;
  }
</style>