<template>
  <div id="messageItem" :class="{isBgPadd: isBgP}">
    <!-- 老师给学生留言展示 -->
    <div class="senderMsg" v-if="isTecLeave">
      <img :src="this.$store.state.inMessageTec.hpci || this.$store.state.inMessageTec.hpic  || this.$store.state.inMessageTec.headPic" class="senderImg">
      <!-- <img :src="this.$store.state.inMessageStu.hpic || this.$store.state.inMessageStu.headPic" class="senderImg"> -->
      <span class="chatName userpadd">{{this.$store.state.inMessageTec.userName || this.$store.state.inMessageTec.name}}</span>
      <span class="createMessageTiem userpadd">{{aMessage.m_message[0].time}}</span>
    </div>
    <!-- 学生给老师留言展示 -->
    <div class="senderMsg" v-if="!isTecLeave">
      <img :src="this.$store.state.inMessageStu.hpic || this.$store.state.inMessageStu.headPic" class="senderImg">
      <span class="chatName userpadd">{{this.$store.state.inMessageStu.name}}</span>
      <span class="createMessageTiem userpadd">{{aMessage.m_message[0].time}}</span>
    </div>
    <p class="messageContent">{{aMessage.m_message[0].message}}</p>
    <span v-if="!isStuRplay">
      <i class="el-icon-chat-line-round"  title="回复" @click="replaybtn" v-if="!isreplay"></i>
    </span>
    <div class="whenElIconNone" v-if="isreplay"></div>
    <div class="reppline"></div>
    <div v-if="isReplay">
      <message-replay  v-for="(item, index) in cpMsgData" :key="index" :rep-msgs='item'></message-replay>
    </div>
     <!-- 老师回复不带@ -->
    <div class="replayContent" v-if="isreplay">
      <el-input v-model="replymsg" type="textarea" class="replay" placeholder="回复"></el-input>
      <el-button type='success' size='mini' class="replaybt" @click="TecReplayNoAt">回复</el-button>
    </div>
    <!-- 学生回复@ -->
    <div class="stuReplay" v-if="isStuRplay">
      <el-input v-model="stureplymsg" type="textarea" class="replay" :placeholder='replayTecAtWho'></el-input>
      <el-button type='success' size='mini' class="replaybt" @click="stuReplay">回复</el-button>
    </div>
    <!-- 老师回复带@ -->
    <div class="replayContent" v-if="isTecRepAt">
      <el-input v-model="tecReplayAtmsg" type="textarea" class="replay" :placeholder="replayAtWho"></el-input>
      <el-button type='success' size='mini' class="replaybt" @click="TecReplay">回复</el-button>
    </div>
  </div>  
</template>

<script>
import { replaySelf, stuAtTecReplay, tecAtStuReplay } from '../../../../../../../../../network/message'
import messageReplay from './messageReplay'
export default {
  name: 'messageItem',
  components: { messageReplay },
  props: {
    aMessage: {
      type: Object,
      default() {
        return {}
      }
    },
    isStuRplay: {
      type: Boolean,
      default: false
    },
    isTecRepAt: {
      type: Boolean,
      default: true
    },
    isTecLeave: {
      type: Boolean,
      default: true
    },
    isBgP: {
      type: Boolean,
      default: true
    }
   
  },
  data () {
    return {
      tecinfo: {},
      stuInfo: {},
      isreplay: false,
      replymsg: '',
      cpMsgData: [],
      stureplymsg: '',
      tecReplayAtmsg: ''
    }
  },
  created() {
    this.stuInfo = JSON.parse(window.sessionStorage.getItem('chatStuInfo'))
    this.tecinfo = JSON.parse(window.sessionStorage.getItem('user'))
    this.getReplayMsgs()
  },
  computed: {
    isReplay() {
      if(this.aMessage.m_message.length >= 1) {
        return true
      } else {
        return true
      }
    },
    replayAtWho() {
      return '回复@' + this.$store.state.inMessageStu.name 
    },
    replayTecAtWho() {
      if(this.$store.state.inMessageTec.userName) {
        return '回复@' + this.$store.state.inMessageTec.userName
      } else if(this.$store.state.inMessageTec.name) {
        return '回复@' + this.$store.state.inMessageTec.name
      }
      
    }

  },
  methods: {
    replaybtn() {
      this.isreplay = true
      this.isTecRepAt = false
    },
    getReplayMsgs() {
      if(this.aMessage.m_message.length >=2 ) {
      this.cpMsgData =  JSON.parse(JSON.stringify(this.aMessage.m_message)) 
      this.cpMsgData.splice(0, 1)
      console.log(this.cpMsgData);
      }
    },
    TecReplayNoAt() {
      replaySelf({
        messageiid: this.aMessage._id,
        replayiid: this.aMessage.m_message[0].sendiid,
        replaymessage: this.replymsg
      }).then(res => {
        if(res.status === 200) {
          // this.$parent.$parent.queryCourrentMessages()
          this.$message.success('回复成功')
          this.isreplay = false
          this.isTecRepAt = true
        } else {
          this.$message.error('回复失败')
        }
      })
    },
    //学生回复
    stuReplay() {
      stuAtTecReplay({
        messageiid: this.aMessage._id,
        stuiid: this.$store.state.inMessageStu.user_id,
        replayMessage: this.stureplymsg
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('回复成功')
          this.stureplymsg = ''
        } else {
          this.$message.error('回复失败')
        }
      })
    },
    //老师回复带@
    TecReplay() {
      tecAtStuReplay({
        messageiid: this.aMessage._id,
        replayiid: this.aMessage.m_message[0].sendiid,
        replayMessage: this.tecReplayAtmsg
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('回复成功')
          this.tecReplayAtmsg = ''
        } else {
          this.$message.error('回复失败')
        }
      })
    }
  },
}
</script>

<style>
  #messageItem {
    width: 800px;
    position: relative;
  }

  .isBgPadd {
    background: #e3e3e3;
    padding: 30px;
  }

  .senderImg {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .senderMsg {
    position: relative;
    height: 40px;
  }

  .userpadd {
    margin-left: 10px;
  }

  .chatName {
    color: #666;
    position: absolute;
    font-size: 14px;
  }

  .createMessageTiem {
    color: #888;
    font-size: 11px;
  }

  .messageContent {
    margin-top: 10px;
    margin-left: 45px;
    color: #636679;
    font-size: 14px;
  }

  .reppline {
    width: 730px;
    height: 1px;
    margin: 0 auto;
    background: #dededd;
  }

  .el-icon-chat-line-round {
    margin-left: 750px;
    cursor: pointer;
    font-size: 20px;
  }
  
  .el-icon-chat-line-round:hover {
    color: #2786CD;
  }

  .replay {
    width: 670px;
    height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .el-input__inner {
    height: 30px;
    border:1px solid #D2D2D2;
  }

  .replaybt {
    margin-left: 10px;
    /* margin-bottom: 10px; */
  }

  .replayContent {
    margin-left: 45px;
  }

  .whenElIconNone {
    height: 20px;
    width: 100%;
  }
</style>