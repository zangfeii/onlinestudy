<template>
  <div id="myNoteBooK">
    <div class="noteTitles">
      <h3>我的笔记</h3>
      <el-button type='success' size='mini' @click="writeNewNote">新建笔记</el-button>
    </div>
    <div class="myNoteLine"></div>
    <note-content v-if="!isWriteNewNote" :note-content-info='notesInfo'></note-content>
    <quil-write @quillData='saveNoteInfo' v-if="isWriteNewNote"></quil-write>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import { createNewNote, getUserNotes, } from '../../../network/note'

import noteContent from './noteComponnet/noteContent'
import quilWrite from './noteComponnet/quilWrite'


export default {
  name: 'note',
  components: { quilWrite, noteContent },
  data () {
    return {
      isWriteNewNote: false,
      notesInfo: []
    }
  },
  created() {
    this.getNotes()
  },
  methods: {
    writeNewNote() {
      this.isWriteNewNote = true
      this.$store.commit('getNoteDetailsUpdate', '')
    },
    cancleWriteNote() {
      this.isWriteNewNote = false
    },
    getNotes() {
      getUserNotes({
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          this.notesInfo = res.data.result
          console.log(this.notesInfo)
        } else {
          this.notesInfo = []
        }
      })
    },
    saveNoteInfo(noteContent) {
      createNewNote({
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        noteContent: noteContent
      }).then(res => {
        if(res.data.status === 200) {
          this.isWriteNewNote = false
          this.getNotes()
          this.$message.success('创建笔记成功')
        } else {
          this.$message.error('创建笔记失败')
        }
      })
    },
  },
}
</script>

<style>
  #myNoteBooK {
    margin: 10px 0 0 20px;
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
    margin-bottom: 10px;
  }
</style>