<template>
  <div id="inboxDetails">
    <p class="CurrentNoticeTitle">{{noticeDetailInfo.n_sendTtle}}</p>
    <div class="snenderANDtiem">
      <span class="currentNoticeSender">{{noticeDetailInfo.sender}}课堂</span>
      <span class="currentNoticeSendTime">{{noticeDetailInfo.n_sendtime}}</span>
    </div>
    <p class="currentNiticeConent">{{noticeDetailInfo.n_content}}</p>
  </div>
</template>

<script>
export default {
  name: 'inboxDetails',
  props: {
    noticeDetailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style>
  .CurrentNoticeTitle {
    font-size: 18px;
  }

  .snenderANDtiem {
    margin-top: 10px;
  }

  .currentNoticeSender {
    margin-right: 10px;
    font-size: 14px;
    color: #646873;
  }

  .currentNoticeSendTime {
    font-size: 12px;
    color: #A8A8B3;
  }

  .currentNiticeConent {
    width: 700px;
    text-indent:33px;
    margin-top: 20px;
    color: #333;
  }
</style>