<template>
  <div id="messageContentItem">
    <message-item v-for="(item, index) in messagesDatas" 
      :key="index" :a-message='item'
      :is-stu-rplay='isStusRplay'
      :is-tec-rep-at='isTecReplatAt'
      :is-tec-leave='isTecLeaveMsgs'
      :is-bg-p='igNormalSty'
      class="messageItem">
    </message-item>
  </div>
</template>

<script>
import messageItem from './messageItem'

import { queryUserInfoById } from '../../../../../../../../../network/query'
export default {
  name: 'messageContentItem',
  components: { messageItem },
  props: {
    messagesDatas: {
      type: Array,
      default() {
        return []
      }
    },
    isStusRplay: {
      type: Boolean,
      default: false
    },
    isTecReplatAt: {
      type: Boolean,
      default: true
    },
    isTecLeaveMsgs: {
      type: Boolean,
      default: true
    },
    igNormalSty: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.getTecSomeInfo()
    this.isTecOrStu()
  },
  methods: {
    //获取当前交流的老师的头像名和字
    getTecSomeInfo() {
      if(JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))) {
         queryUserInfoById({
          useriid: JSON.parse(window.sessionStorage.getItem('currentCourseInfo')).cteacheriid
      }).then(res => {
        // this.tecSomeInfo = res.data.result
        this.$store.commit('commitTecInfoInMessage', res.data.userinfo)
      })
      }
    },
    getStuSomeInfoFromTec() {
      this.$store.commit('commitStuInfoMessage', JSON.parse(window.sessionStorage.getItem('chatStuInfo')))
    },
    getStuSomeInfoFromStu() {
      this.$store.commit('commitStuInfoMessage', JSON.parse(window.sessionStorage.getItem('user')))
    },
    //判断是老师端还是学生端
    isTecOrStu() {
      if(!window.sessionStorage.getItem('chatStuInfo')) {
        this.getStuSomeInfoFromStu()
      } else {
        this.getStuSomeInfoFromTec()
      }  
    }
  },
}
</script>

<style>
  .messageItem {
    margin-top: 30px;
    padding-top: 10px;
  }
</style>