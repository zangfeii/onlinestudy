<template>
  <div id="adminSendNotice">
    <a class="writeinbox" @click="adminWrteNotice">写站内通知</a>
    <In-box></In-box>
     <el-dialog title="新建通知" :visible.sync="adiminCreateNoticeDialogVisible" width="30%">
      <span>发送对象 :</span>
      <el-radio v-model="radio" label="1" class="addTOWho">全部用户</el-radio><br>
      <el-form :model="adimnCreateNoticeform" status-icon ref='createCurrentNoticeRef' :rules="rules" label-width="100px" class="createForm">
        <el-form-item label="标题 : " prop="title">
          <el-input  v-model="title" :disabled="true" placeholder="请输入标题" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容 : " prop="conent">
          <el-input type="textarea" :rows="6" placeholder="请输入通知内容" v-model="adimnCreateNoticeform.conent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adiminCreateNoticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdminSendNotice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminNotice, sendSysNotice } from '../../../network/notice'
import InBox from '../../../components/content/inbox/InBox'
export default {
  name: 'adminSendNotice',
  components: { InBox },
  data () {
    return {
      adiminCreateNoticeDialogVisible: false,
      title: '通知',
      adimnCreateNoticeform: {
        conent: ''
      },
      radio: '1',
      rules: {
        conent: [
          { required: true, message: '请输入通知内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    adiminCreateNoticeDialogVisible(newVal, oldVal) {
      if(!newVal) {
        this.adimnCreateNoticeform.conent = ''
      }
    }
  },
  methods: {
    adminWrteNotice() {
      this.adiminCreateNoticeDialogVisible = true
    },
    sureAdminSendNotice() {
      sendSysNotice({
        sendid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        content: this.adimnCreateNoticeform.conent
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('发送通知成功')
          this.$bus.$emit('getAdminNotices')
          this.adiminCreateNoticeDialogVisible = false
        } else {
          this.$message.error('发送通知失败')
        }
      })
    }
  },
}
</script>

<style>
  #adminSendNotice {
    margin: 10px 0 0 20px;
  }

  .writeinbox {
    width: 60px;
    text-align: center;
    color: white;
    padding: 7px;
    border-radius: 20px;
    background: #00A9FF;
  }

  .writeinbox:hover {
    color: white;
    background: #82B7FF;
  }

  .addTOWho {
    margin-left: 10px;
  }

  .createForm {
    margin-left: -30px;
    margin-top: 10px;
  }
</style>