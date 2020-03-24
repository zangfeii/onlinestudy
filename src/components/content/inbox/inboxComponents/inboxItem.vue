<template>
  <div id="inboxItem">
    <div class="item" @click="noticeClick(inboxItem._id)">
      <img :src="inboxItem.n_pic" class="noticeimg">
      <span class="noticeTitle">{{inboxItem.n_sendTtle}}</span>
      <span class="noticeContent">{{inboxItem.n_content}}</span>
      <span class="sendtime">{{inboxItem.n_sendtime}}</span>
      <span class="isreaded" v-if="!inboxItem.n_isreaded"></span>
      <a class="delelteNotice">删除</a>
    </div>
  </div>  
</template>

<script>
import { setNoticeRead } from '../../../../network/notice'
export default {
  name: 'inboxItem',
  props: {
    inboxItem: {
      type: Object,
      dafault() {
        return {}
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
          this.$emit('noticeClick', currentNoticeDetailes)
        } else {
          this.$message.error('读取通知失败')
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
    right: 300px;
    top: 10px;
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
    margin-left: 10px;
    color: #A8A8B3;
    font-size: 13px;
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
    left: 120px;
    top: 3px;
  }
</style>