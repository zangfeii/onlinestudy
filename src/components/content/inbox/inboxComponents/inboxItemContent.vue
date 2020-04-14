<template>
  <div id="inboxItemConent">
    <div v-if="notices.length">
      <inbox-item v-for="(item, index) in  notices"
        :inbox-item='item' :key="index"
        @noticeClick='clickNotice'
        v-show="isShowNoticeList"
        class="noticeHover">
      </inbox-item>
      <inbox-details :notice-detail-info='detailsNoticeInfo' v-show="!isShowNoticeList" ></inbox-details>
    </div>
   <div class='nonotice'  v-if="!notices.length">暂无信息</div>
  </div>                  
</template>s

<script>
import inboxItem from './inboxItem'
import inboxDetails from './inboxDetails/inboxDetails'

import { getNotices, getAdminNotice } from '../../../../network/notice'
export default {
  name: 'inboxItemContent',
  components: { inboxItem, inboxDetails },
   data() {
    return {
      notices: [],
      isShowNoticeList: true,
      detailsNoticeInfo: {}
    }
  },
  created() {
    this.whichNotice()
    this.$bus.$on('getAdminNotices', () => {
      this.getAdminNotices()
    })
  },
  methods: {
    getAdminNotices() {
      getAdminNotice({
        id: JSON.parse(window.sessionStorage.getItem('user')).user_id
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data);
          this.notices = res.data.result
        } else {
          this.notices = []
        }
      })
    },
    getNotice() {
      getNotices({
        useriid: this.$route.params.iid
      }).then(res => {
        if(res.data.status === 200) {
          this.notices = res.data.notices
        } else { 
          this.notices = []
        }
      })
    },
    whichNotice() {
      if(!this.$route.params.iid) {
        this.getAdminNotices()
      } else {
        this. getNotice()
      }
    },
    noticesList() {
      this.whichNotice()
      this.isShowNoticeList = true
    },
    clickNotice(item) {
      this.detailsNoticeInfo = item
      this.isShowNoticeList = false
      this.$emit('noticeContnetClick')
    }
  },
}
</script>

<style>
  #inboxItemConent {
    margin-top: 10px;
  }

  .nonotice {
    width: 700px;
    height: 200px;
    color: #A8A8B3;
    line-height: 200px;
    text-align: center;
  }
</style>