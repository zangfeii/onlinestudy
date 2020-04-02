<template>
  <div id="myMessageContnet">
    <div v-if="whenDetailsNone">
      <div class="firstSendMsgs" v-if="isSnedMsgs">
        <h3>发送的消息</h3>
        <inbox-item :is-inbox='false' :inbox-item='item' 
          v-for="(item, index) in myMessages" :key="index"
          @click.native="firstSendMsgsClick(item)">
        </inbox-item>
      </div>
    </div>
      
      <!-- <div class="getMsgs" v-if="!isSnedMsgs"> -->
        <div v-if="whenDetailsNone">
          <div class="getMsgs" v-if="isGetMsgs">
          <h3>接受的消息</h3>
            <inbox-item :is-inbox='false' :inbox-item='item' 
              v-for="(item, index) in myMessages" :key="index"
              @click.native="getMsgsClick(item)">
            </inbox-item>
          </div>
        </div>
     
   
    <!-- 发送消息详情展示 -->
    <div v-if="messageSendContnet">
      <message-content-item :messages-datas='firstSendMsgsHome'
        :is-stus-rplay='isStuRepAt'
        :is-tec-replat-at='isTecRepAt'
        :ig-normal-sty='false'
        :is-tec-leave-msgs='isTecFirstLeaveMsgs'>
      </message-content-item>
    </div>
    <!-- 接受消息详情展示 -->
    <div v-if="messageGetContnet">
      <message-content-item :messages-datas='getMsgsHome'
        :is-stus-rplay='isStuRepAt2'
        :is-tec-replat-at='isTecRepAt2'
        :ig-normal-sty='false'
        :is-tec-leave-msgs='isTecFirstLeaveMsg1'>
      </message-content-item>
    </div>
    
  </div>  
</template>

<script>
import inboxItem from '../../inbox/inboxComponents/inboxItem'
import messageContentItem from '../../../../views/courseInfo/teacher/teacherCompoent/courseMange/courseMangeCompoent/stuListCompoent/stuLeaveMessage/messageConent/messageContentItem'
import { queryIsHaveCourse, queryUserInfoById, queryUsersListsByIds } from '../../../../network/query'
export default {
  name: 'myMessageContent',
  components: {
    inboxItem,
    messageContentItem
  },
  props: {
    myMessages: {
      type: Array,
      default() {
        return []
      }
    },
    isSnedMsgs: {
      type: Boolean,
      default: true
    },
    isGetMsgs: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      messageSendContnet: false,
      messageGetContnet: false,
      firstSendMsgsHome: [],
      isStuRepAt: false,
      isTecRepAt: true,
      isStuRepAt2: false,
      isTecRepAt2: true,
      isTecFirstLeaveMsgs: true,
      isTecFirstLeaveMsg1: true,
      getMsgsHome: [],
      whenDetailsNone: true
    }
  },
  methods: {
    firstSendMsgsClick(item) {
      this.$emit('clickSendMSgs')
      this.whenDetailsNone  = false
      this.firstSendMsgsHome.push(item)  
      console.log('发的消息')
      this.messageSendContnet = true
      this.messageGetContnet = false
      queryIsHaveCourse({
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        courseid: item.m_courseiid
      }).then(res => {
        console.log(res);
          // 如果当前课程是当前用户创建的
          if(res.data.data) {
            // 该留言是当前客课程拥有者创建
            if(JSON.parse(window.sessionStorage.getItem('user')).user_id === item.m_snederiid) {
                const id1 = []
                id1.push(item.m_geteriid)
                queryUsersListsByIds({ids: id1}).then(res => {
                  console.log(res);
                  this.$store.commit('commitStuInfoMessage', res.data.result[0])
               })
               this.$store.commit('commitTecInfoInMessage', JSON.parse(window.sessionStorage.getItem('user')))
            } else {
              // 该留言不是当前课程拥有者创建
              const ids2 = []
              console.log('这课程是我创建的 该留言也不是第一个创建');
            }
          } else {
            const ids = []
            //不是该用户创建的课程  ,不是第一个留言
            if(JSON.parse(window.sessionStorage.getItem('user')).user_id === item.m_geteriid) {
              ids.push(item.m_geteriid)
              queryUsersListsByIds({ids}).then(res => {
                console.log(res.data.result[0]);
                this.$store.commit('commitStuInfoMessage', res.data.result[0])
            })
            } else {
               //不是该用户创建的课程  ,是第一个留言
                this.isStuRepAt = true
                this.isTecRepAt = false
                this.isTecFirstLeaveMsgs = false
                ids.push(item.m_geteriid)
                queryUsersListsByIds({ids}).then(res => {
                  console.log(res.data.result[0]);
                  this.$store.commit('commitTecInfoInMessage', res.data.result[0])
            })
            }
          }
      })
      
    },
    getMsgsClick(item) {
      console.log('接受的消息')
      this.$emit('clickGetMsggs')
      this.whenDetailsNone  = false
      this.messageGetContnet = true
      this.messageSendContnet = false
      this.getMsgsHome.push(item)
      console.log(this.firstSendMsgsHome);
      queryIsHaveCourse({
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        courseid: item.m_courseiid
      }).then(res => {
        //如果这个课程是当前用户创建的
        console.log(res.data);
        if(res.data.data) {
          const id2 = []
            // 该留言是当前客课程拥有者 不是第一个创建
            if(JSON.parse(window.sessionStorage.getItem('user')).user_id === item.m_geteriid) {
              id2.push(item.m_snederiid)
              this.isTecFirstLeaveMsgs = false
              this.isStuRepAt2 = false
              this.isTecRepAt2 = true
              queryUsersListsByIds({ids: id2}).then(res => {
              console.log(res);
              this.$store.commit('commitStuInfoMessage', res.data.result[0])
            })
             this.$store.commit('commitTecInfoInMessage', JSON.parse(window.sessionStorage.getItem('user')))
            }
          
        } else {
          if(JSON.parse(window.sessionStorage.getItem('user')).user_id === item.m_snederiid ) {
            this.isStuRepAt2 = true
            this.isTecRepAt2 = false
            const ids4 = []
            ids4.push(item.m_geteriid)
            queryUsersListsByIds({ids: ids4}).then(res => {
              console.log(res.data.result[0]);
              this.$store.commit('commitTecInfoInMessage', res.data.result[0])
            })
          } else {
            this.isStuRepAt2 = true
            this.isTecRepAt2 = false
            this.isTecFirstLeaveMsg1 = true
            const ids5 = []
            ids5.push(item.m_snederiid)
            queryUsersListsByIds({ids: ids5}).then(res => {
              console.log(res.data.result[0]);
              this.$store.commit('commitTecInfoInMessage', res.data.result[0])
            })
          }
        }
      })
    }
  },
}
</script>

<style>

</style>