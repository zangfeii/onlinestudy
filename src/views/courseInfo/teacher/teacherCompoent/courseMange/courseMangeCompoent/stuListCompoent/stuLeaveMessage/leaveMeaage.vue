<template>
  <div id="leaveMessage">
    <el-button type='success' size='mini' class="leaveAMessage" @click="isCreateMessage">留个言吧</el-button>
    <div class="chatLine"></div>
    <div class="messaeInput" v-if="isCreate">
      <el-input v-model='aMessage' autosize :rows="1" type="textarea" class="aMessage"></el-input><br>
      <el-button type='success' size='mini' class="sendMeaage" @click="sendMessage">发送</el-button>
    </div>
    <message-content-item ref='messageContentItemRef' :messages-datas='messagesData'></message-content-item>
    <message-content-item ref='messageContentItemRef'  :is-tec-leave-msgs='false' :is-stus-rplay='false' :messages-datas='stuLeaveMessagesData'></message-content-item>
  </div>  
</template>

<script>
import { sendFirstMessage, queryCurrentTecStuMessages,stuLeaveTecMsgs } from '../../../../../../../../network/message'
import messageContentItem from './messageConent/messageContentItem'
export default {
name: 'leaveMessage',
components: { messageContentItem },
data () {
  return {
    chatStuInfo: '',
    aMessage: '',
    isCreate: false,
    messagesData: [],
    stuLeaveMessagesData: [],
    tecSomeInfo: {}
  }
},
 created() {
   document.title = this.$route.meta.title
   this.chatStuInfo = JSON.parse(window.sessionStorage.getItem('chatStuInfo')) 
   this.queryCourrentMessages()
   this.queryCourrentStuLeaveTecMessages()
 },
 watch: {
   isCreate(newVal, oldVal) {
     if(!newVal) {
       this.aMessage = ''
     }
   }
 },
 methods: {
   isCreateMessage() {
     this.isCreate = true
   },
    //老师获取当前课程与该学生的留言
    queryCourrentMessages() {
      queryCurrentTecStuMessages({
        couseiid: this.$route.params.ciid,
        stuiid: this.$route.params.siid
      }).then(res => {
        this.messagesData = res.data.result
      })
    },
    //老师获取当前课程该学生的留言
    queryCourrentStuLeaveTecMessages() {
      stuLeaveTecMsgs({
        couseiid: this.$route.params.ciid,
        stuiid: this.$route.params.siid
      }).then(res => {
        this.stuLeaveMessagesData = res.data.result
      })
    },
   sendMessage() {
     this.isCreate = false
     sendFirstMessage({
       courseiid: this.$route.params.ciid,
       geteriid: this.$route.params.siid,
       senderiid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
       Message: this.aMessage
     }).then(res => {
       if(res.data.status === 200) {
          this.queryCourrentMessages()
       } else {
         this.$message.error('发送消息失败')
       }
     })
   },
   
 },
}
</script>

<style>
  #leaveMessage {
    width: 1000px;
    margin: 10px auto;
  }

  .leaveAMessage {
    margin-bottom: 10px;
  }

  .chatLine {
    width: 1000px;
    height: 2px;
    margin-bottom: 10px;
    border-radius: 30%;
    background: #999;

  }
  
  .chatImg {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .messaeInput {
    display: flex;
    margin-bottom: 5px;
  }

  .aMessage {
    width: 400px;
  }

  .sendMeaage {
    height: 30px;
    margin-top: 4px;
    margin-left: 5px;
  }

</style>