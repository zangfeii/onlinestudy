<template>
  <div id="courseTopic">
    <el-input placeholder="新建话题" v-model="inputTopic.title" @click.native="inputClick"></el-input>
    <div class="inputTextArea" v-if="showInputTextArea">
      <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="inputTopic.textarea"></el-input>
      <el-button type="success" class="topicBtn" @click="sureAddTopic">确定</el-button>
      <el-button class="topicBtn" @click="cancelBtnClick">取消</el-button>
    </div>
    <topic-content :topic-data='courseTopicData'  
      @deleteContentClick='deleteCourseTopic' 
      @updateCourseTopicUp='updateCurrentTopicToUp' 
      @updateCourseTopicDown='updateCurrentTopicDown'>
    </topic-content>
  </div>  
</template>

<script>
import { createCourseTopic, deleteCourseOneTopic } from '../../../../../../network/user'
import { queryCurrentCourseTopic } from '../../../../../../network/query'
import { upCourseTopicToUp,  upCourseTopicDown } from '../../../../../../network/update'

import topicContent from './topicComponent/topicContent'
export default {
  name: 'courseTopic',
  components: { topicContent },
  data() {
    return {
      inputTopic: {
        title: '',
        textarea: ''
      },
      showInputTextArea: false,
      //课程信息
      couseInfo: {},
      //创建话题的信息
      params: {},
      //当前用户信息
      userInfo: {},
      //查询到的当前的课程话题
      courseTopicData: []
    }
  },
  created() { 
    this.couseInfo = JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))
    this.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
    this.queryTopic()
  },
  methods: {
     inputClick() {
       this.showInputTextArea = true
     },
     cancelBtnClick() {
       this.showInputTextArea = false
       this.inputTopic = { title: '', textarea: '' }

     },
     getParams() {
       this.params.courseiid = this.couseInfo._id
       this.params.teacheriid = this.couseInfo.cteacheriid
       this.params.CreateName = this.couseInfo.cteacher
       this.params.createiid = this.userInfo.user_id
       this.params.topicData = this.inputTopic
     },
     //查询当前的课程话题
     queryTopic() {
       queryCurrentCourseTopic({
         teacheriid: this.couseInfo.cteacheriid,
         courseiid: this.couseInfo._id
       }).then(res => {
         if(res.data.status === 200) {
           this.courseTopicData = res.data.result
           console.log(this.courseTopicData);
         } else {
           this.courseTopicData = []
         } 
           this.inputTopic = { title: '', textarea: '' }
       })
     },
     sureAddTopic() {
       this.getParams()
       createCourseTopic({params:this.params}).then(res => {
         if(res.data.status === 200) {
           this.$message.success('创建话题成功')
         } else {
           this.$message.error('创建话题失败')
         }
         this.queryTopic()
       })
     },
     //删除选中的一个话题
     deleteCourseTopic(topicid, courseid, teacherid) {
       this.$confirm('是否删除该话题?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
          deleteCourseOneTopic(
            topicid,
            courseid,
            teacherid
      ).then(res => {
        if(res.data.status === 200) {
          this.queryTopic()
          this.$message.success('已经删除当前话题') 
        } else {
          console.log(res);
          this.$message.error('删除当前话题失败')
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     },
     //话题置顶
     updateCurrentTopicToUp(topicid, courseid, teacherid) {
       upCourseTopicToUp(topicid, courseid, teacherid).then(res => {
         if(res.data.status === 200) {
           this.queryTopic()
           this.$message.success('该话题置顶成功')
         } else if(res.data.status === 210) {
            this.$message.info('抱歉, 一次只能置顶一个话题')
          } else {
             this.$message.error('修改失败')
         }
       })
     },
     //取消置顶
     updateCurrentTopicDown(topicid, courseid, teacherid) {
        upCourseTopicDown(topicid, courseid, teacherid).then(res => {
          if(res.data.status === 200) {
            this.queryTopic()
            this.$message.success('修改成功')
          } 
           else {
            this.$message.error('修改失败')
          }
        })
     }
  },
}
</script>

<style>
  #courseTopic {
    width: 50%;
    /* border: 1px solid red; */
    margin-left: 10px;
  }

  .el-input__inner {
    height: 28px;
  }

  .inputTextArea {
    margin-top: 30px;
  }

  .topicBtn {
    width: 100px;
    margin-top: 20px;
  }
</style>