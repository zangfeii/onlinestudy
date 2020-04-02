<template>
  <div id="createCourseContentItem">
    <div class="intmContenet" @click="currentNoticeConentClick">
      <span class="currentNoticeTitle">{{noticeItem.n_sendTtle}}</span><br>
      <p class="createTime">创建时间 : {{noticeItem.n_sendtime}}</p>
      <p class="currentNoticeConent">内容 : {{noticeItem.n_content}}</p>
    </div>
    <div class='noticeBotton'>
      <i class="el-icon-delete" v-if="isTecDeleteNotice"  @click="deleteCurrentNotice(noticeItem._id)"></i>
      <i class="el-icon-delete" v-if="!isTecDeleteNotice"  @click="StuDeleteCurrentNotice(noticeItem._id)"></i>
    </div>
    <el-dialog title="通知内容"  :visible.sync="NoticeConentDialogVisible" width="30%">
      <p class="dialogNoticeConent">{{noticeItem.n_content}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NoticeConentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="NoticeConentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>  
</template>

<script>

export default {
  name: 'createCourseContentItem',
  props: {
    noticeItem: {
      type: Object,
      default() {
        return {}
      }
    },
    isTecDeleteNotice: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      NoticeConentDialogVisible: false
    }
  },
  methods: {
    deleteCurrentNotice(currentNoticeId) {
      this.$emit('deleteNotice', currentNoticeId)
    },
    StuDeleteCurrentNotice(currentNoticeiid) {
      this.$emit('stuDeleteNotice', currentNoticeiid);
    },
    currentNoticeConentClick() {
      this.NoticeConentDialogVisible = true
    }
  },
}
</script>

<style>
  #createCourseContentItem {
    position: relative;
    width: 240px;
    height: 120px;
    border: 1px solid #CCCCCC;
    margin: 2px;
  }

  .intmContenet {
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 12px;
    color: #424242;
  }

  .dialogNoticeConent {
    text-indent: 30px;
  }

  .currentNoticeTitle {
    font-weight: bold;
    color: #333;
    font-size: 14px;
  }

  .createTime {
    margin-top: 5px;
  }

  .currentNoticeConent {
    margin-top: 5px;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .noticeBotton {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 27px;
    background: #BBDDFB;
  }

  .el-icon-delete {
    cursor: pointer;
    margin-left: 220px;
    line-height: 27px;
  }
</style>