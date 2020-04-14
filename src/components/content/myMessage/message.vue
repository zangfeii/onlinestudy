<template>
  <div id="getMessages">
    <a class="backMessageListA" v-if="isSendBack" @click="backMessgeListFromSned">返回</a>
    <a class="backMessageListA" v-if="isGetBack" @click="backMessgeListFromGet">返回</a>
    <inbox-bread :is-have-back='false' :bread-titles='twoTips'></inbox-bread>
    <!-- 自己第一个是自己发的消息 -->
    <my-message-content :my-messages='sendMsgs' v-show="whenDetailsInfNone"
      :is-get-msgs='isGetMsgs1' @clickSendMSgs='snedMsgsClick' 
      ref="leaveMessageRef"
      :is-sned-msgs='issendMsgs1'>
    </my-message-content>
    <!-- 接受的消息 -->
    <my-message-content :my-messages='getMsgs' v-show="whenDetailsInfNone"
     :is-sned-msgs='issendMsgs2' @clickGetMsggs='getmsgsClick'
     ref="getLeaveMessageRef"
     :is-get-msgs='isGetMsgs2'>
     </my-message-content>
  </div>
</template>

<script>
import inboxBread from '../inbox/inboxBread/inboxBread'
import myMessageContent from './myMessageCompoents/myMessageContent'

import { getUserSendMsgs, getUserGetMsgs } from '../../../network/message'

export default {
  name: 'message',
  components: {
    inboxBread,
    myMessageContent
  },
  data () {
    return {
      twoTips: ['消息', '详情'],
      sendMsgs: [],
      getMsgs: [],
      whenDetailsInfNone: true,
      //发送
      isGetMsgs1: false,
      issendMsgs1: true,
      // 接收
      isGetMsgs2: true,
      issendMsgs2: false,
      isSendBack: false,
      isGetBack: false
    }
  },
  created() {
    this.getSendMsgs()
    this.getGetMsgs()
  },
  methods: {
    getSendMsgs() {
      getUserSendMsgs({
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          this.sendMsgs = res.data.result
        }
      })
    },
    getGetMsgs() {
      getUserGetMsgs({
         useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          this.getMsgs = res.data.result
        }
      })
    },
    noMessageContent() {
      this.isGetMsgs1 = false
      this.issendMsgs1 = false
      this.isGetMsgs2 =  false
      this.issendMsgs2 =  false
    },
    snedMsgsClick() {
      this.noMessageContent()
      this.isSendBack = true
    },
    getmsgsClick() {
      this.noMessageContent()
      this.isGetBack = true
    },
    backMessageListTemp() {
      Object.assign(this.$data, this.$options.data())
      this.getSendMsgs()
      this.getGetMsgs()
      
    },
    backMessgeListFromSned() {
      this.$refs.leaveMessageRef.noneDetails()
      this.backMessageListTemp()
      this.$store.commit('restMseeageDetailUserInfo')
    },
    backMessgeListFromGet() {
      this.$refs.getLeaveMessageRef.noneDetails()
      this.backMessageListTemp()
      this.$store.commit('restMseeageDetailUserInfo')
    }
  },
}
</script>

<style>
  #getMessages {
    margin-left: 20px;
    position: relative;
  }

  .backMessageListA {
    position:  absolute;
    right: 120px;
  }
</style>