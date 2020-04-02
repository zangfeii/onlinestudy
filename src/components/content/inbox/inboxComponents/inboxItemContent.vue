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

import { getNotices } from '../../../../network/notice'
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
    this.getNotice()
  },
  methods: {
    getNotice() {
      getNotices({
      useriid: this.$route.params.iid
    }).then(res => {
      if(res.data.status === 200) {
        this.notices = res.data.notices
        console.log(res.data.notices);
      } else { 
        this.notices = []
      }
    })
    },
    noticesList() {
       this.isShowNoticeList = true
    },
    clickNotice(item) {
      console.log(item);
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