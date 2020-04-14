<template>
  <div id="quillWriteChapter">
   <quill-editor class="chapterWrite" v-if="!ispreview" v-model="chapterContent" :options="editorOption"></quill-editor>
   <div class="chapterContentLine" v-if="ispreview"></div>
   <div v-html="chapterContent" v-if="ispreview"></div>
    <div class="chapterBtn">
     <el-button type='success' size='mini' :disabled='isUpdataChapter' v-if="isNewWrite" @click="writeChapter">完成new</el-button>
     <el-button type='success' size='mini' :disabled='isUpdataChapter' v-if="isUpDate" @click="updateWriteChapter" >完成update</el-button>
     <el-button  size='mini' type="primary" v-if="isUpdateOrPreView" @click="previewContent">预览</el-button>
     <el-button  size='mini' type="info"  v-if="!isUpdateOrPreView" @click="previewUpdateContent">修改</el-button>
   </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import { getCurrentChapterContent } from '../../../../../../../network/chapterContent'
export default {
  name: 'quillWrieteChapter',
  components: {
    quillEditor
  },
  data () {
    return {
      chapterContent: '',
      chapterContentTemp: '',
      isNewWrite: false,
      isUpDate: false,
      ispreview: false,
      isUpdateOrPreView: true,
      editorOption: {
        placeholder: '编写课程内容'
      }
    }
  },
  created() {
    this.getChapterContent()
  },
  computed: {
    isUpdataChapter() {
      if(this.chapterContent === this.chapterContentTemp) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getChapterContent() {
      getCurrentChapterContent({
        courseiid: this.$route.params.cciid,
        chapteriid: JSON.parse(window.sessionStorage.getItem('chapter')).iid
      }).then(res => {
        if(res.data.status === 200) {
          this.chapterContent = res.data.data
          this.chapterContentTemp = res.data.data
          this.isUpDate = true
        } else if(res.data.status === 207) {
          this.chapterContent = res.data.data
          this.chapterContentTemp = res.data.data
          this.isNewWrite = true
        } 
         else {
          this.$message.error('章节内容获取失败')
        }
      })
    },
    writeChapter() {
      this.$emit('finishWriteChapter', this.chapterContent)
    },
    updateWriteChapter() {
      this.$emit('finshUpdateChapter', this.chapterContent)
    },
    restChapterData() {
      Object.assign(this.$data, this.$options.data())
    },
    previewContent() {
      this.ispreview  = true
      this.isUpdateOrPreView = false
    },
    previewUpdateContent() {
      this.ispreview  = false
      this.isUpdateOrPreView = true
    }
  },
}
</script>

<style>
  #quillWriteChapter {
    position: relative;
  }
  .chapterWrite {
    height: 550px;
  }
  
  .chapterBtn {
    position: absolute;
    top: -43px;
    right: 400px;
  }

  .chapterContentLine {
    width: 100%;
    height: 1px;
    background: #999;
    margin-bottom: 10px;
  }

</style>