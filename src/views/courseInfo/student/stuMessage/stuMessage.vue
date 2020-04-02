<template>
  <div id="stuMessage">
    <el-button type='success' size='mini' @click="leaveMsgToTec">给老师留个言吧</el-button>
    <div class="stuMessageLine"></div>
    <div class="leaveTecMsgCon" v-if="isLeaveTec">
      <el-input autosize v-model="leaveTecMsg" type='textarea' class="leaveTecMsgTextAre"></el-input>
      <el-button type='success' size='mini' @click="snedLeaveTecMsg">发送</el-button>
    </div>
    
    <div class="inputLeaveTecBg" v-if="!isLeaveTec"></div>
    <message-content-item :messages-datas='stuTecMessages'
      :is-stus-rplay='true'
      :is-tec-replat-at='false'>
    </message-content-item>
     <message-content-item :messages-datas='stuLeaveTecMsgs'
      :is-stus-rplay='true'
      :is-tec-leave-msgs='false'
      :is-tec-replat-at='false'>
    </message-content-item>
  </div>
</template>

<script>
import messageContentItem from '../../teacher/teacherCompoent/courseMange/courseMangeCompoent/stuListCompoent/stuLeaveMessage/messageConent/messageContentItem'

import { queryCurrentTecStuMessages, sendFirstMessage, stuLeaveTecMsgs} from '../../../../network/message'
export default {
  name: 'stuMessage',
  components: { messageContentItem },
  created() {
     document.title = this.$route.meta.title
     this.getStuTecMessages()
     this.getStuLeaveTecMessages()
  },
  data() {
    return {
      stuTecMessages: [],
      stuLeaveTecMsgs: [],
      leaveTecMsg: '',
      isLeaveTec: false
    }
  },
  methods: {
    getStuTecMessages() {
      queryCurrentTecStuMessages({
        couseiid: this.$route.params.sciid,
        stuiid: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          this.stuTecMessages = res.data.result
        }
      })
    },
    getStuLeaveTecMessages() {
      stuLeaveTecMsgs({
        couseiid: this.$route.params.sciid,
        stuiid: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          this.stuLeaveTecMsgs = res.data.result
          console.log(res.data.result);
        }
      })
    },
    leaveMsgToTec() {
      this.isLeaveTec = !this.isLeaveTec
    },
    snedLeaveTecMsg() {
      sendFirstMessage({
        courseiid: this.$route.params.sciid,
        geteriid: JSON.parse(window.sessionStorage.getItem('currentCourseInfo')).cteacheriid,
        senderiid: this.$store.state.inMessageStu.user_id,
        Message: this.leaveTecMsg
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('留言成功')
          this.leaveTecMsg = ''
          this.isLeaveTec = false
        } else {
          this.$message.error('留言失败')
        }
      })
    }
  },
}
</script>

<style>
  .stuMessageLine {
    width: 100%;
    height: 2px;
    border-radius: 30%;
    margin-top: 10px;
    background: #777;
  }

  .inputLeaveTecBg {
    height: 33px;
    margin-top: 10px;
  }


  .leaveTecMsgTextAre {
    margin-top: 10px;
    width: 300px;
    margin-right: 10px;
  }
</style>