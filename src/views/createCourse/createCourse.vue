<template>
  <div id="createCourse">
    <div class="createCourseTo"></div>
      <div class="createCourseTitle">新建课程</div>
    <div class="createCourseMain">
    
      <el-form :model="addCreateCourseRuleForm" :rules="rules" ref="addCreateCourseRuleForm" label-width="100px" class="addCourseForm">
        <el-form-item label="课程 :" prop="classTitle">
          <el-input v-model="addCreateCourseRuleForm.classTitle"></el-input>
        </el-form-item>
        <el-form-item label="老师 :" prop="teacherName">
          <el-input v-model="addCreateCourseRuleForm.teacherName"></el-input>
        </el-form-item>
         <el-form-item label="说明 :" prop="classDesc">
          <el-input v-model="addCreateCourseRuleForm.classDesc"  type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="createCourseBtn">
        <el-button type="success" class="createCourseBtn1" @click="createCourseSure">确定</el-button>
        <el-button type="primary" class="createCourseBtn1" @click="createCourseBtnBack">返回</el-button>
      </div>
    </div>
   <div class="createCourseBottom"></div>
  </div>
</template>

<script>
import { createCoursing } from '../../network/user'
import { getInvitedCode } from '../../common/inviteCode'
export default {
  name: 'createCourse',
  data() {
    return {
      addCreateCourseRuleForm: {
        classTitle: '',
        teacherName: '',
        teacheriid: '',
        classDesc: ' ',
        cincode: ''
      },
      rules: {
         teacherName: [
           {required: true, message: '请填写用户名字', trigger: 'blur'},
         ],
         classTitle: [
           {required: true, message: '请填写课程名字', trigger: 'blur'},
           {min: 2, message: '课程名称最小两个文字' ,trigger: 'blur'},
         ],
         classDesc: [
           {required: true, message: '请简单说明下课程', trigger: 'blur'}
         ]
      }
    }
  },
  methods: {
    createCourseSure() {
      this.addCreateCourseRuleForm.cincode = getInvitedCode()
      createCoursing(this.addCreateCourseRuleForm).then(res => {
        // console.log(res);
        if(res.data.status === 200) {
          this.$router.back()
          // console.log(res.data.result);
          return this.$message.success('创建课程成功')
        } else {
          return this.$message.error('创建课程失败')
        }
      })
    },
    createCourseBtnBack() {
      this.$router.back()
    }
  },
  created() {
    //获取创建课程用户的名字
    this.addCreateCourseRuleForm.teacherName = JSON.parse(window.sessionStorage.getItem('user')).name
    //获取创建课程用户id
    this.addCreateCourseRuleForm.teacheriid = JSON.parse(window.sessionStorage.getItem('user')).user_id
  },
}
</script>

<style>
  #createCourse {
    background: url('../../assets/img/createCourse/cbg.jpg') ;
    width: 100%;
    height: 300px;
  }

  .createCourseTo {
    background: #2A2C2E;
    height: 60px;
    width: 100%;
  }

  .createCourseMain {
    width: 1000px;
    height: 500px;
    margin: 10px auto;
    background:#E1E1E1;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .createCourseTitle {
    width: 150px;
    height: 80px;
    border-radius: 5px;
    line-height: 80px;
    text-align: center;
    margin-left: 270px;
    margin-top: -30px;
    font-size: 20px;
    background: #4BBDB1;
  }

  .createCourseBottom {
    width: 100%;
    height: 80px;
    background: #2A2C2E;
  }

  .addCourseForm {
    width: 400px;
    margin: 20px auto;
  }

  .createCourseBtn1 {
    width: 150px;
  }
</style>