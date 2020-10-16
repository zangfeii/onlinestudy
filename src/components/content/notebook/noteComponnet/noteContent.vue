<template>
  <div id="noteContnet">
    <el-button size='mini' class="backNoteListBtn" v-if="isRealyUpdata" @click="backNoteList">返回</el-button>
    <el-button type="danger" size='mini' class="deleteNoteBtn" @click="deleteNoteInDetail" v-if="isRealyUpdata" >删除</el-button>
    <el-button type='info' size='mini' class="updateNoteDetilsBtn" v-if="isRealyUpdata" @click="updateNoteDetailsBtn">修改</el-button>
    <div v-if="isUpdaeaDetails">
      <div v-show='isDeteialInfo' class="noteContentData">
        <note-item v-for="(item, index) in noteContentInfo" @detailClick='clickNoteDetails' :key="index" :note-item-info='item'></note-item>
      </div>
      <note-details :note-detail-data='detailsInfo' v-show='!isDeteialInfo'></note-details>
    </div>
    <quil-write :new-note-create='false'  @updateQuiiData='quillUpdateInfo'  v-if="!isUpdaeaDetails"></quil-write>
  </div>  
</template>

<script>
import noteItem from './noteItem'
import noteDetails from './noteDetails'
import quilWrite from './quilWrite'

import { updateNote, deleteNote } from '../../../../network/note'
export default {
  name: 'noteContent',
  components: { noteItem, noteDetails, quilWrite },
  props: {
    noteContentInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      isDeteialInfo: true,
      isUpdaeaDetails: true,
      isRealyUpdata: false,
      detailsInfo: ''
    }
  },
  methods: {
    cancleUpDateDetail() {
      this.isUpdaeaDetails = true
      this.isRealyUpdata = true
    },
    clickNoteDetails(data, noteid) {
      this.isDeteialInfo = false
      this.isRealyUpdata = true
      this.detailsInfo = data
      console.log(noteid)
      this.$store.commit('getNoteId', noteid)
    },
    updateNoteDetailsBtn() {
      this.isRealyUpdata = false
      this.isUpdaeaDetails = false
      this.$store.commit('getNoteDetailsUpdate', this.detailsInfo)
    },
    quillUpdateInfo(updateInfo) {
      updateNote({
          useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
          noteid: this.$store.state.noteid,
          updateData: updateInfo
        }).then(res => {
          if(res.data.status === 200) {
            this.isRealyUpdata = true
            this.isUpdaeaDetails = true
            this.$parent.getNotes()
            this.$message.success('修改成功')
          } else {
            thsi.$message.error('修改失败')
          }
        })
    },
    backNoteList() {
      this.isDeteialInfo = true
      this.isRealyUpdata = false
    },
    deleteNoteInDetail() {
      this.$confirm('是否删除该笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {deleteNote({
          useriid: this.$route.params.iid,
          noteiid: this.$store.state.noteid
      }).then(res => {
          if(res.data.status === 200) {
            this.$parent.getNotes()
            this.backNoteList()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message.info('已经取消删除')
      })
      
    }
  },
}
</script>

<style>
  #noteContnet {
    position: relative;
  }
  
  .noteContentData {
    display: flex;
    flex-flow: wrap;
    justify-items: center;
    /* background: #F7F7F7; */
  }

  .updateNoteDetilsBtn {
    position: absolute;
    top: -50px;
    right: 100px;
  }

  .backNoteListBtn {
    position: absolute;
    top: -50px;
    right: 180px;
  }

  .deleteNoteBtn {
    position: absolute;
    top: -50px;
    right: 260px;
  }
</style>