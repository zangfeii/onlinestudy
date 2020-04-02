<template>
  <div id="createCourseContent">
    <div v-if="notices.length" class="haveNotices">
      <create-course-content-item :notice-item='item'
        v-for="(item, index) in notices" :key="index"
        @deleteNotice='noticeDelete'
        @stuDeleteNotice='sureDeleteStuOneNotice'
        :is-tec-delete-notice='isTecDeleteCurrenNotice'>
      </create-course-content-item>
    </div>
    <div v-if="!notices.length" class="noNotices">暂无通知</div>
  </div>  
</template>

<script>
import createCourseContentItem from './createCourseContentItem'

import { getCurrentCourseNotices, deleteTecSendCourseNotice, getCourseStuGetNotices, deleteStuGetOneNotice } from '../../../../../../network/notice'
export default {
  name: 'createCourseContent',
  components: { createCourseContentItem },
  data() {
    return {
      notices: []
    }
  },
  props: {
    isTecDeleteCurrenNotice: {
      type: Boolean,
      default: true
    }
  },
  created() {
     if(this.$route.params.cciid) {
       this.getNotices()
     } else if(this.$route.params.sciid) {
       this.getStuCurrentNotices()
     } else {
       this.notices = []
     }
  },
  methods: {
    //老师端获取到的课程创建恶话题
    getNotices() {
      getCurrentCourseNotices({
        courseiid: this.$route.params.cciid
      }).then(res => {
        if(res.data.status === 200) {
          this.notices = res.data.data
          console.log(res.data.data);
        } else {
          this.notices = []
        }
      })
    },
    //学生端老师获取到的课程通知
   getStuCurrentNotices() {
     getCourseStuGetNotices({
       sendiid: this.$route.params.sciid,
       getiid: JSON.parse(window.sessionStorage.getItem('user')).user_id
     }).then(res => {
       if(res.data.status === 200) {
         this.notices = res.data.result
         console.log(res.data.result);
       } else {
         this.notices = []
       }
     })
   },
   //老师端删除已经发送的通知
    sureDeleteNotice(noticeiid) {
      deleteTecSendCourseNotice({
        noticeiid
      }).then(res => {
        if(res.data.status === 200 || res.data.status === 205) {
          this.getNotices()
        } else {
          this.$message.error('删除当前通知失败')
        }
      })
    },
    noticeDelete(noticeiid) {
      this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.sureDeleteNotice(noticeiid)
        }).catch(() => {
          this.$message.info('已经取消删除')     
        })
    },
    //学生端删除已经获得的课程通知
    deleteStuOneNotice(noticeiid) {
      deleteStuGetOneNotice({noticeiid}).then(res => {
        if(res.data.status === 200) {
          this.getStuCurrentNotices()
        } else {
          this.$message.error('删除该通知失败')
        }
      })
    },
    sureDeleteStuOneNotice(noticeiid) {
      this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.deleteStuOneNotice(noticeiid)
        }).catch(() => {
          this.$message.info('已经取消删除')     
        })
    }
  },
}
</script>

<style>
  #createCourseContent {
    margin: 10px auto;
    width: 1000px;
  }

  .haveNotices {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
  }

  .noNotices {
    width: 1000px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #666;
    font-size: 14px;
  }
</style>