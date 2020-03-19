<template>
  <div id="stuTopic">
    <el-input placeholder="新建话题" v-model="createTopic.title" @click.native="inputClick"></el-input>
    <div class="inputTextArea" v-if="isShowInput">
      <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="createTopic.textarea"></el-input>
      <el-button type="success" class="topicBtn" @click="sureAddTopicClick">确定</el-button>
      <el-button class="topicBtn" @click="cancelClick">取消</el-button>
    </div>
    <topic-content :topic-data='topicInfo' :is-delete-btn='false'></topic-content> 
  </div> 
</template>

<script>
import topicContent from '../../../teacher/teacherCompoent/courseHome/childComp/topicComponent/topicContent'

import { createCourseTopic, } from '../../../../../network/user'
export default {
  name: 'stuCourseTopic',
  components: { topicContent },
  props: {
    topicInfo: {
      type: Array,
      default() {
        return []
      }
    },
    createTopicsUserInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      createTopic: {
        title: '',
        textarea: ''
      },
      isShowInput: false,
      params: {}
    }
  },   
  created() {
    console.log(this.createTopicsUserInfo)
  },
  methods: {
    inputClick() {
      this.isShowInput = true
    },
    sureAddTopicClick() {
      const params = this.createTopicsUserInfo
      params.topicData = this.createTopic
      console.log({params})
      createCourseTopic({params}).then(res => {
        if(res.data.status === 200) {
          this.createTopic = { title: '', textarea: ''}
          this.$parent.getCourseTopics()
          this.$message.success('添加话题成功')
        } else {
          this.$message.error('添加话题失败')
        }
      }) 
    },
    cancelClick() {
      this.isShowInput = false
      this.createTopic = { title: '', textarea: ''}
    }
  },
}
</script>

<style>
  #stuTopic {
    width: 50%;
    margin-left: 20px;
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