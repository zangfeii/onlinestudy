<template>
  <div id="myNoteBooK">
    <div class="noteTitles">
      <h3>我的笔记</h3>
      <el-button type='success' size='mini' @click="writeNewNote">新建笔记</el-button>
    </div>
    <div class="myNoteLine"></div>
    <quill-editor class="noteWrite" v-if="isWriteNewNote"></quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'note',
  components: { quillEditor },
  data () {
    return {
      isWriteNewNote: false
    }
  },
  methods: {
    writeNewNote() {
      this.isWriteNewNote = !this.isWriteNewNote
    }
  },
}
</script>

<style>
  #myNoteBooK {
    margin: 10px 0 0 10px;
  }

  .noteTitles {
    display: flex;
    justify-content: space-between;
  }

  .myNoteLine {
    width: 100%;
    height: 2px;
    background: #777;
    border-radius: 10%;
    margin-top: 10px;
  }

  .noteWrite {
    margin-top: 10px;
  }
</style>