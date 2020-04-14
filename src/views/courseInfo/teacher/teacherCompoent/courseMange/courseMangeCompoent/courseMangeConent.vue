<template>
  <div id="mangeConent">
   <h3>课程管理</h3>
   <div class="courseMageLine"></div>
   <div class="courseCoverImg courItem">
     <p>封面:</p>
     <div class="updateImg">
       <up-load class="updateP" :up-load-name='updateImgName' 
         @basePicPath='updateCourseCoverPic'>
       </up-load>
       <img :src="mangeCourseInfo.cpic" class="courseImg">
     </div>
     <el-button class="tecAddStuBtn" type="success" size="mini" @click="tecAddStu">添加学生</el-button>
   </div>
   <div class="courseStatus courItem">
     <p>课程状态:</p>
      <el-switch v-model="mangeCourseInfo.cstatus" class="courseTwoItem" 
        active-text="允许进入" inactive-text="不允许进入"
        @change='statusChage(mangeCourseInfo.cstatus)'>
      </el-switch>
   </div>
   <div class="courseTeacher courItem">
     <p>老师:</p>
     <p class="courseTwoItem">{{mangeCourseInfo.cteacher}}</p>
   </div>
    <div class="courseName courItem">
     <p>课程:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.ctitle}}</span>
   </div>
   <div class="MangeCourseDesc courItem">
     <span>课程简介:</span>
     <div class="updateDescInputBtn">
       <p v-if="isUpdate" title="修改简介" @click="updateBtn" class="courseTwoItem desc">{{mangeCourseInfo.cdesc}}</p>
       <el-input type="textarea" class="courseTwoItem descUpdatwInput" :rows="6"  
         placeholder="请输入内容" v-model="mangeCourseInfo.cdesc" v-if="!isUpdate"> 
       </el-input><br>
       <el-button type="success" size="mini" class="updateDescBtn" v-if="isUpdateSure" @click="sureUpdate">确认</el-button>
       <el-button type="primary" size="mini" class="updateDescBtn" v-if="isUpdateSure" @click="cancleUpdate">取消</el-button>
     </div>
   </div>
   <div class="courseIncoe courItem">
     <p>课程邀请码:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.cincode}}</span>
   </div>
   <!-- 通过老师添加新的学生 -->
   <el-dialog title="提示" :visible.sync="tecAdddStudialogVisible" width="30%">
      <el-form :model="stuRuleForm" status-icon :rules="rules" ref="stuRuleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名字" prop="name">
          <el-input  v-model="stuRuleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input  v-model="stuRuleForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
       <el-button @click="tecAdddStudialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="sureAddStu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateCourseCoverImg, updateCourseDesc, updateCourseStatus } from '../../.././../../../network/update'
import { addCurseStuByTec } from '../../../../../../network/user'

import upLoad from '../../../../../../components/common/upLoad'
export default {
  name: 'courseMangeConent',
  components: { upLoad },
  props: {
    mangeCourseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    var validatorMobile = ((rule, value, cd) => {
      const regMoblie = /^1[34578]\d{9}$$/
      if(regMoblie.test(value)){
        return cd()
      } else cd(new Error('请输入合法的手机号'))
    })
    return {
      updateImgName: '更换封面',
      isUpdate: true,
      isUpdateSure: false,
      tecAdddStudialogVisible: false,
      stuRuleForm: {
        name: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入学生名字', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: "请输入手机号"},
          { validator: validatorMobile, trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    tecAdddStudialogVisible(newVal, oldVal) {
      if(!newVal) {
        this.$refs.stuRuleFormRef.resetFields()
      }
    }
  }, 
 
  methods: {
    //修改课程封面
    updateCourseCoverPic(basePicPath) {
      const courseCoverImgPath = 'http://127.0.0.1:3000/public/img/' + basePicPath
      updateCourseCoverImg({
        courseiid: this.mangeCourseInfo._id,
        teacheriid: this.mangeCourseInfo.cteacheriid,
        coverImg: courseCoverImgPath
      }).then(res => {
        if(res.data.status === 200) {
          this.$parent.queryCurrentTecCourseInfo()
          this.$message.success('修改课程封面成功')
        } else {
          this.$message.error('修改课程封面失败')
        }
      })
    },
    //修改简介
    updateBtn() {
      this.isUpdate = false
      this.isUpdateSure = true
    },
    // 确定修改
    sureUpdate() {
      this.isUpdate = true
      this.isUpdateSure = false
      updateCourseDesc({
        courseiid: this.mangeCourseInfo._id,
        teacheriid: this.mangeCourseInfo.cteacheriid,
        desc: this.mangeCourseInfo.cdesc
      }).then(res => {
        if(res.data.status === 200) {
          this.$parent.queryCurrentTecCourseInfo()
        } else {
          this.$message.error('修改简介失败')
        }
      })
    },
    //取消修改
    cancleUpdate() {
       this.isUpdate = true,
       this.isUpdateSure = false
    },
    //修改课程状态
    statusChage(newStatus) {
      console.log(newStatus)
      updateCourseStatus({
        courseiid: this.mangeCourseInfo._id,
        teacheriid: this.mangeCourseInfo.cteacheriid,
        cstatus: newStatus
      }).then(res => {
        if(res.data.status === 200) {
          this.$parent.queryCurrentTecCourseInfo()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    //添加课程学生
    tecAddStu() {
      this.tecAdddStudialogVisible = true
    },
    //添加学生并给学生发送通知
  
    addCurrentCourseStu() {
      addCurseStuByTec({
        stuName: this.stuRuleForm.name,
        mobile: this.stuRuleForm.mobile,
        courseiid: this.mangeCourseInfo._id,
        teciid: this.mangeCourseInfo.cteacheriid,
        coursename: this.mangeCourseInfo.ctitle
      }).then(res => {
        if(res.data.status === 200) {
          this.tecAdddStudialogVisible = false
          this.$message.success('添加该学生成功')
          this.$parent.querStuList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    sureAddStu() {
       this.$refs.stuRuleFormRef.validate(valid => {
         if(!valid) {
           this.$message.error('前填写完整')
         } else {
           this.addCurrentCourseStu()
         }
       })
    }
  },
}
</script>

<style>
  #mangeConent {
    width: 100%;
    height: 600px;
  }

  .courseMageLine {
    height: 1.5px;
    width: 100%;
    border-radius: 5px;
    margin-top: 3px;
    background: #9EA9B4;
  }

  .courItem {
    display: flex;
    margin-top: 20px;
  }

  .courseTwoItem {
    margin-left: 20px;
  }

  .courseImg {
    width: 100%;
    height: 100%;
  }
  
  .courseCoverImg {
    position: relative;
  }

  .tecAddStuBtn {
    position: absolute;
    right: 0;
  }

  .updateImg {
    width: 272px;
    height: 182px;
    position: relative;
    margin-left: 20px;
  }

  .updateP {
    position: absolute;
    top: 1px;
    right: 1px;
    width: 80px;
    height: 20px;
    white-space: nowrap;
    color: #0099FF;
    background: oldlace;
    display: none;
    cursor: pointer;
    text-align: center;
  }

  .updateImg:hover .updateP {
    display: block;
  }
  
  .desc {
    width: 400px;
    word-wrap: break-word;
    cursor: pointer;
  }

  .descUpdatwInput {
    width: 400px;
  }

  .updateDescBtn {
     margin-top: 5px;
     margin-left: 20px;
  } 

  .courseDesc {
    
  }
</style>