<template>
  <div id="inboxItem">
    <!-- 收件箱展示 -->
    <div class="item" @click="noticeClick(inboxItem._id)" v-if="isInbox">
      <img :src="inboxItem.n_pic" class="noticeimg">
      <span class="noticeTitle">{{inboxItem.n_sendTtle}}</span>
      <span class="noticeContent">{{inboxItem.n_content}}</span>
      <span class="sendtime">{{inboxItem.n_sendtime}}</span>
      <span class="isreaded" v-if="!inboxItem.n_isreaded"></span>
      <a class="delelteNotice" @click.stop="deletGetOneNotice(inboxItem._id)">删除</a>
    </div>
    <!-- 消息展示 -->
    <div class="item" v-if="!isInbox">
      <img :src="inboxItem.m_icon" class="noticeimg">
      <span class="noticeTitle">消息</span>
      <span class="noticeContent">{{messageLastOne}}</span>
      <span class="sendtime">{{inboxItem.m_message[inboxItem.m_message.length - 1].time}}</span>
      <!-- <span class="isreaded" v-if="!inboxItem.n_isreaded"></span>
      <a class="delelteNotice" @click.stop="deletGetOneNotice(inboxItem._id)">删除</a> -->
    </div>
  </div>  
</template>

<script>
import { setNoticeRead, deleteStuGetOneNotice } from '../../../../network/notice'
export default {
  name: 'inboxItem',  
  props: {
    inboxItem: {
      type: Object,
      dafault() {
        return {}
      }
    },
    isInbox: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    messageLastOne() {
      const lastOneMsgObj = this.inboxItem.m_message[this.inboxItem.m_message.length - 1]
      if(lastOneMsgObj.replayTecMessage) {
        return lastOneMsgObj.replayTecMessage
      } else if(lastOneMsgObj.replayAtStuMsg) {
        return lastOneMsgObj.replayAtStuMsg
      } else if(lastOneMsgObj.replaySelfMessage) {
        return lastOneMsgObj.replaySelfMessage
      } else if(lastOneMsgObj.message) {
        return lastOneMsgObj.message
      } else {
        return ''
      }
    }
  },
  methods: {
    noticeClick(noticeiid) {
      setNoticeRead({
        noticeiid: noticeiid
      }).then(res => {
        if(res.data.status === 200) {
          const currentNoticeDetailes = Object.assign({ sender: res.data.data }, this.inboxItem)
          this.$parent.getNotice()
          this.$emit('noticeClick', currentNoticeDetailes)
        } else if(res.data.status === 206) {
          this.$parent.getNotice()
          this.$message.info('该通知已经被老师删除了')
        } else {
          this.$message.error('读取通知失败')
        }
      })
    },
    deletGetOneNotice(noticeiid) {
      deleteStuGetOneNotice({noticeiid}).then(res => {
        if(res.data.status === 200) {
          this.$parent.getNotice()
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  },
}
</script>

<style>
  #inboxItem {
    display: flex;
    align-items: center;
    height: 50px;
    width: 700px;
    margin-top: 10px;
  }

  .item {
    position: relative;
    height: 42px;
    width: 700px;
  }

  .item:hover {
    cursor: pointer;
  }

  .delelteNotice {
    display: none;
    position: absolute;
    right: 250px;
    top: 3px;
    color: #0099FF;
  }

  .item:hover .delelteNotice {
    display: block;
  }

  .noticeTitle {
    position: absolute;
    top: -2px;
    margin-left: 10px;
  }

  .noticeimg {
    width: 42px;
    height: 42px;
    border-radius: 5px;
  }

  .noticeContent {
    display: inline-block;
    width: 500px;
    margin-left: 10px;
    color: #A8A8B3;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .sendtime {
    position: absolute;
    right: 10px;
    color: #A8A8B3;
    font-size: 12px;
  }

  .isreaded {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: red;
    position: absolute;
    left: 35px;
    top: 3px;
  }
</style>