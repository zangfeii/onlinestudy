<template>
  <div>
    <quill-editor class="noteWrite" v-model="noteContent" :options="editorOption"></quill-editor>
    <div class="addNoteBtn">
      <el-button type='success' size='mini' @click="sureAdNote" v-if="newNoteCreate">完成</el-button>
      <el-button type='success' size='mini' @click="sureUpdateNote" :disabled='isHaveUpdate' v-if="!newNoteCreate">完成</el-button>
      <el-button type='primary' size='mini' @click="cancleAddNote" >取消</el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        placeholder: '编辑内容'
      },
      noteContent: '',
    }
  }, 
  props: {
    newNoteCreate: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.getUpdateNoteDetails()
  },
  beforeDestroy () {
    this.$store.commit('getNoteDetailsUpdate', '')
  },
  computed: {
    isHaveUpdate() {
      if(this.noteContent === this.$store.state.noteDetailsInfo) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    sureAdNote() {
      this.$emit('quillData', this.noteContent)
    },
    sureUpdateNote() {
      this.$emit('updateQuiiData', this.noteContent)
    },
    whichCancle() {
      if(typeof eval(this.$parent.cancleWriteNote) !== 'function') {
        this.$parent.cancleUpDateDetail()
      } else {
        this.$parent.cancleWriteNote()
      }
    },
    cancleAddNote() {
      if(this.noteContent  && this.noteContent !== this.$store.state.noteDetailsInfo) {
          this.$confirm('文章未保存, 是否继续退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.whichCancle()
        }).catch(() => {
          this.$message.info('已经取消')     
        })
      } else {
        this.whichCancle()
      }
    },
    getUpdateNoteDetails() {
      this.noteContent = this.$store.state.noteDetailsInfo
    }
  },
}
</script>

<style>
  .noteWrite {
    height: 450px;
  }

  .addNoteBtn {
    margin-top: 80px;
  }
</style>