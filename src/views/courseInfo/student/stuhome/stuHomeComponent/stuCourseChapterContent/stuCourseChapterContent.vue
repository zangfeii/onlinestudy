<template>
  <div id="stuCourseChapterContent">
    <div class="stuCourseChapterDetaislLine"></div>
    <div v-html="detaidlStuCourseChapterContnet"></div>
  </div>  
</template>

<script>
import { getCurrentChapterContent } from '../../../../../../network/chapterContent'
export default {
  name: 'stuCourseChapterContent',
  data () {
    return {
      detaidlStuCourseChapterContnet: ''
    }
  },
  created() {
    this.getChapterDetailsContent() 
  },
  methods: {
    getChapterDetailsContent() {
      getCurrentChapterContent({
        courseiid: this.$route.params.sciid,
        chapteriid: JSON.parse(window.sessionStorage.getItem('stucoursecontent')).iid
      }).then(res => {
          if(res.data.status === 200 || res.data.status === 207) {
            this.detaidlStuCourseChapterContnet = res.data.data
          } else {
            this.detaidlStuCourseChapterContnet = ''
            this.$message.error('获取该章节内容信息失败')
          }
      })
  },
    }
    
}
</script>

<style>
  .stuCourseChapterDetaislLine {
    width: 100%;
    height: 1px;
    background: #999;
    margin-bottom: 10px;
  }
</style>