<template>
  <div id="courseNotice">
    <div class="courseNoticesCreate">
      <span class="myNotices">课程通知</span>
      <el-button @click="createNotices" type='success' size='mini' class="addNoticeBtn">新建</el-button>
    </div>
    <div class="addNoticeLine"></div>
    <create-course-content ref='createCourseConentRef'></create-course-content>
    <el-dialog title="新建通知" :visible.sync="createNoticeDialogVisible" width="30%">
      <span>发送对象 :</span>
      <el-radio v-model="radio" label="1" class="addTOWho">全部学生</el-radio><br>
      <el-form :model="createNoticeform" status-icon ref='createCurrentNoticeRef' :rules="rules" label-width="100px" class="createForm">
        <el-form-item label="标题 : " prop="title">
          <el-input  v-model="createNoticeform.title" placeholder="请输入标题" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容 : " prop="conent">
          <el-input type="textarea" :rows="6" placeholder="请输入通知内容" v-model="createNoticeform.conent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createNoticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureCreateNoticeBTn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setCourseNoticeSend } from '../../../../../network/notice'

import createCourseContent from './courseCreateNotices/createCourseContent'
export default {
  name: 'courseNotice',
  components: { createCourseContent },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入通知标题', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        conent: [
          { required: true, message: '请输入通知内容', trigger: 'blur' }
        ]
      },
      createNoticeDialogVisible: false,
      radio: '1',
      createNoticeform: {
        title: '',
        conent: ''
      }
    }
  },
  created() {
    document.title = this.$route.meta.title
  },
   
  watch: {
    createNoticeDialogVisible(newVal, oldVal) {
      if(!newVal) {
        this.$refs.createCurrentNoticeRef.resetFields()
      }
    }
  },
  methods: {
    getCurrentCourseiid () {
       return JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))._id
    },
    createNotices() {
      this.createNoticeDialogVisible = true
    },
    sureCreateNoticeBTn() {
      this.$refs.createCurrentNoticeRef.validate(valida => {
        if(!valida) {
          this.$message.error('请按要求填写')
        } else {
          const courseiid = this.getCurrentCourseiid()
          setCourseNoticeSend({
            curseiid: courseiid,
            noticeTitle: this.createNoticeform.title,
            noticeConent: this.createNoticeform.conent
          }).then(res => {
            if(res.data.status === 200) {
              this.createNoticeDialogVisible = false
              this.$message.success('创建课程通知')
              this.$refs.createCourseConentRef.getNotices()
            } else if(res.data.status === 207) {
              this.$message.info('该课程没有学生, 暂时不能发送通知')
            } else {
              this.$message.error('创建通知失败')
            }
          })
        }
      })
    }
  },
}
</script>

<style>
  .courseNoticesCreate {
    display: flex;
    justify-content: space-between;
    width: 1200px;
  }
  
  .myNotices {
    font-size: 18px;
    color: #777;
    margin-left: 100px;
  }

  .addNoticeBtn {
    margin-right: 100px;
  }

  .addNoticeLine {
    width: 1000px;
    height: 2px;
    background: #777;
    margin: 10px auto;
  }

  .addTOWho {
    margin-left: 10px;
  }

  .createForm {
    margin-left: -30px;
    margin-top: 10px;
  }
</style>