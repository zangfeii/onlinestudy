<template>
  <div id="searchCourse">
    <course-content :courses-info='queryCourses' class="adminCourseContent" :is-mange-courses='true' :delete-or-out-conent='false'></course-content>
    <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage1"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>  
</template>

<script>
import { queryCourse } from '../../../../network/query'
import courseContent from '../../../../components/content/course/homeCourseCompoent/courseContent'
export default {
  name: 'searchCourse',
  components: { courseContent },
  data() {
    return {
      searchCourseContent: '',
      queryCourses: [],
      total: 0,
      currentPage1: 1
    }
  },
  created() {
    this.getQueryCourse(this.$route.params.course)
    this.$bus.$on('getThirdSearchCourse', content => {
      this.getQueryCourse(content)
    })
  },
  methods: {
    getQueryCourse(content) {
      queryCourse({
        searchContent: content,
        page: 1
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data);
          this.queryCourses = res.data.result
          this.total = res.data.total
        }
      })
    },
    handleCurrentChange(page) {
      queryCourse({
        searchContent: this.$route.params.course,
        page
      }).then(res => { 
        if(res.data.status === 200) {
          console.log(res.data);
          this.queryCourses = res.data.result
          this.total = res.data.total
        }
      })
    }
  },
}
</script>

<style>

</style>