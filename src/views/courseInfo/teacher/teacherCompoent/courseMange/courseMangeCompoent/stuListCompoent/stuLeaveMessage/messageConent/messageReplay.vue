<template>
  <div id="replayMessage">
    <!-- 回复自己不带@ -->
    <div class="replayNotoStu" v-if="!repMsgs.replayTecMessage && !repMsgs.replayAtStuMsg">
      <img :src="this.$store.state.inMessageTec.hpci || this.$store.state.inMessageTec.headPic || this.$store.state.inMessageTec.hpic" class="tecImg">
      <div class="reptimename">
        <span class="senderName">{{this.$store.state.inMessageTec.userName || this.$store.state.inMessageTec.name}}</span><br>
        <p class="repsendtime">{{repMsgs.time}}</p>
      </div>
      <p class="rep1">{{repMsgs.replaySelfMessage}}</p> 
    </div>
    <!-- 学生回复老师带@ -->
    <div class="replayNotoStu" v-if="repMsgs.replayTecMessage">
      <img :src="this.$store.state.inMessageStu.hpic || this.$store.state.inMessageStu.headPic" class="tecImg">
      <div class="reptimename">
        <span class="senderName">{{this.$store.state.inMessageStu.name }}</span>
        <p class="repsendtime">{{repMsgs.time}}</p>
      </div>
      <div class="replayAt">
        <span class="replayP">回复</span>
        <span class="replayAtTec ">@{{this.$store.state.inMessageTec.userName || this.$store.state.inMessageTec.name}}:</span>
      </div>
      <p class="rep1">{{repMsgs.replayTecMessage}}</p>
    </div>
    <!-- 老师回复学生带@ -->
    <div class="replayNotoStu" v-if="repMsgs.replayAtStuMsg">
      <img :src="this.$store.state.inMessageTec.hpci || this.$store.state.inMessageTec.headPic || this.$store.state.inMessageTec.hpic" class="tecImg">
      <div class="reptimename">
        <span class="senderName">{{this.$store.state.inMessageTec.userName || this.$store.state.inMessageTec.name}}</span><br>
        <p class="repsendtime">{{repMsgs.time}}</p>
      </div>
      <div class="replayAt">
        <span class="replayP">回复</span>
        <span class="replayAtTec">@{{this.$store.state.inMessageStu.name}}:</span>
      </div>
      <p class="rep1">{{repMsgs.replayAtStuMsg}}</p>
    </div>
  </div>  
</template>

<script>
import { queryUserInfoById } from '../../../../../../../../../network/query'
export default {
  name: 'messageReplay',
  props: {
    repMsgs: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style>
  #replayMessage {
    margin-top: 10px;
    margin-left: 60px;
  }

  .rep1 {
    color: #636679;
    font-size: 13px;
    margin-left: 40px;
    margin-top: 10px;
    word-wrap: break-word;
  }

  .tecImg {
    width: 27px;
    height: 27px;
    border-radius: 50%;
  }

  .replayNotoStu {
    position: relative;
  }

  .reptimename {
    position: absolute;
    top: -5px;
    left: 30px;
    margin-left: 10px;
  }

  .senderName {
    color: #666;
    font-size: 13px;
  }

  .repsendtime  {
    margin-top: 3px;
    font-size: 10px;
    color: #888;
  }

  .replayAt {
    margin-left: 40px;
    margin-top: 10px;
    font-size: 13px;
  }

  .AtTec {
    width: 80px;
  }

  .replayTecP {
    color: #636679;
    display: inline;
  }

  .replayTecmsg {
    display: block;
  }

  .replayP {
    color: #555;
  }

  .replayAtTec {
    color: #1E63C4;
    margin-right: 5px;
    /* white-space: nowrap; */
  }

  .replayAtTec:hover {
    cursor: pointer;
  }
</style>