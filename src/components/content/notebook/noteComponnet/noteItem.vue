<template>
  <div id="noteItem">
    <div class="noteCoverContnet" @click="detailNoteDatass(noteItemInfo.nt_noteContnet, noteItemInfo._id)">
      <span class="deleteNote" @click.stop="deleteNote(noteItemInfo._id)">删除</span>
      <div class="noteCoverP">{{noteItemP}}</div>
      <span class="noteCoverTime">{{noteItemInfo.nt_createtime}}</span>
    </div>
  </div>  
</template>

<script>
import { deleteNote } from  '../../../../network/note'
export default {
  name: 'noteItem',
  props: {
    noteItemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    noteItemP() {
      const noteDta =  this.noteItemInfo.nt_noteContnet.replace(/<[^>]+>/g, "")
      if(noteDta.length > 124) {
        return noteDta.substring(0,124) + '......'
      } else {
        return noteDta
      }
    },
  
  },
  methods: {
    detailNoteDatass(data, noteid) {
      this.$emit('detailClick', data, noteid)
    },
    deleteNote(id) {
      this.$confirm('是否删除该笔记?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { deleteNote({
            useriid: this.$route.params.iid,
            noteiid: id
      }).then(res => {
          if(res.data.status === 200) {
            this.$message.success('删除成功')
            this.$parent.$parent.getNotes()
          }
       })
        }).catch(() => {
          this.$message.info('已经取消')     
        })
    }
  },
}
</script>

<style>
 .noteCoverContnet {
   position: relative;
    width: 175px;
    margin: 0 10px 10px 0;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid #999;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
 }
 
  .noteCoverP {
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 12px;
  }
 
 .noteCoverTime {
   color: #888;
   font-size: 11px;
   margin-left: 70px;
   margin-top: 15px;
   display: block;
 }

 .noteCoverContnet:hover {
   background: #E5E5E5;
 }
 
 .noteCoverContnet:hover .deleteNote {
   display: block;
 }

 .deleteNote {
   position: absolute;
   right: 0;
   top: 2px;
   right: 10px;
   display: none;
   color: #888;
   font-size: 10px;
 }
</style>