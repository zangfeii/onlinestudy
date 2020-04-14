<template>
  <div id="courseChapterContent">
    <span class="writeChapterTitle">{{chapter.label}}</span>
    <quill-wriete-chapter ref="quillWriteChapterRef" 
      @finishWriteChapter='writeChapterFinish' 
      @finshUpdateChapter='updateChapterFinsh'>
    </quill-wriete-chapter>
  </div>  
</template>

<script>
import quillWrieteChapter from './quillWrieteChapter'

import { writeChapter, updateChapterContent } from '../../../../../../../network/chapterContent'
export default {
  name: 'courseChapterContent',
  components: { quillWrieteChapter },
  data () {
    return {
      chpaterDetails: '',
      chapter: ''
    }
  },
  created() {
    document.title = this.$route.meta.title
    this.chapter = JSON.parse(window.sessionStorage.getItem('chapter'))
  },
  methods: {
    writeChapterFinish(content) {
      writeChapter({
        courseiid: this.$route.params.cciid,
        chapteriid: this.chapter.iid,
        content: content
      }).then(res => {
        if(res.data.status === 200) {
          this.$refs.quillWriteChapterRef.getChapterContent()
          this.$refs.quillWriteChapterRef.restChapterData()
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    updateChapterFinsh(updateContent) {
      updateChapterContent({
        courseiid: this.$route.params.cciid,
        chapteriid: this.chapter.iid,
        updateContent: updateContent,
      }).then(res => {
        if(res.data.status === 200) {
          this.$refs.quillWriteChapterRef.getChapterContent()
          this.$refs.quillWriteChapterRef.restChapterData()
        } else {
          this.$message.error('修改失败')
        }
      })
    }
  },
}
</script>

<style>
  #courseChapterContent {
    position: relative;
  }
  .writeChapterTitle {
    position: absolute;
    top: -39px;
    left: 100px;
    color: #333;
  }
  
</style>