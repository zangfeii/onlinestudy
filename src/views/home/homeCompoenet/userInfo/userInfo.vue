<template>
  <div id="userInfo">
    <h3 class="mangeTitle">账号管理</h3>
    <div class="mangeLine"></div>
    <div class="userConent">
      <div class="userItem">
      <p>头像:</p> <img :src="userInfo.hpci" class="imgPic">
      <a class="updateBtn">
        <up-load :up-load-name='upLoadName' @basePicPath='picBasePath' >
        </up-load>
      </a>
      </div>
      <div class="userItem" v-if="userInfo.createTime">
        <P>账号注册时间:</P>{{ (userInfo.createTime).substring(0, 10)}}
      </div>
      <div class="userItem">
        <p>昵称:</p> {{ userInfo.userName}}
      </div>
      <div class="userItem">
        <p>密码:</p>
        <a class="updateBtn" @click="uodatePwd">修改密码</a>
      </div>
      <div class="userItem">
        <p>手机号:</p> {{  userInfo.userMobile}}
      </div>
    </div>
     <!-- 修改密码输入框 -->
    <el-dialog title="修改密码" :visible.sync="updatePwddialogVisible" width="30%">
      <el-form :model="UpdatePwdRuleForm" status-icon :rules="rules" ref="updatePwdRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码: " prop="oldPwd">
          <el-input type="password" v-model="UpdatePwdRuleForm.oldPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码: " prop="newPwd">
          <el-input type="password" v-model="UpdatePwdRuleForm.newPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证密码: " prop="validPwd">
          <el-input type="password" v-model="UpdatePwdRuleForm.validPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePwddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserPwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>  
</template>

<script>
import upLoad from '../../../../components/common/upLoad'
import {  queryUserInfoById, updateUserPic } from '../../../../network/query'
import { updateUserPwd } from '../../../../network/update'
 
export default {
  name: 'userInfo',
  components: {
     upLoad,
  },
  data() {
    const  validaPwd = ((rule, value, cd) => {
      if(value === '') {
        return cd(new Error('请再次输入密码'))
      } else if(value !== this.UpdatePwdRuleForm.newPwd) {
        cd(new Error('两次输入的密码不一致'))
      } else cd()
    })
    return {
       userInfo: {},
       upLoadName: '更换头像',
       isRightUpLoad: true,
       updatePwddialogVisible: false,
       UpdatePwdRuleForm: {
         oldPwd: '',
         newPwd: '',
         validPwd: ''
       },
       rules: {
         oldPwd: [
           { required: true, message: '请输入旧的密码', tirgger: 'blur' },
           { min: 6, max: 12, message: '密码长度为6-12位'}
         ],
         newPwd: [
           { required: true, message: '请输入旧的密码', tirgger: 'blur' },
           { min: 6, max: 12, message: '密码长度为6-12位'}
         ],
        validPwd: [
           { required: true, message: '请输入旧的密码'},
           { validator: validaPwd, tirgger: 'blur'}
         ],
      }
    }
  },
  created() {
    this.getCurrentUserInfo()
  },
  watch: {
    updatePwddialogVisible(newval, oldPwd) {
      if(!newval) {
        this.UpdatePwdRuleForm = {
          oldPwd: '',
          newPwd: '',
          validPwd: ''
        }
      }
    }
  },
  methods: {
    getCurrentUserInfo() {
      queryUserInfoById({
        useriid: this.$route.params.iid
      }).then(res => {
        this.userInfo = res.data.userinfo
      })
    }, 
    picBasePath(path) {
      const pathPic = 'http://127.0.0.1:3000/public/img/'+ path
      updateUserPic({
        useriid: this.$route.params.iid,
        path: pathPic
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data)
           this.getCurrentUserInfo()
           window.sessionStorage.setItem('headpic', this.userInfo.hpci)
           this.$message.success('修改用户头像成功')
        }
      })
    },
    //修改密码
    uodatePwd() {
      this.updatePwddialogVisible = true
    },
    updateUserPwd() {
      this.$refs.updatePwdRef.validate(valid => {
        if(!valid) {
          return this.$message.error('前填写完整')
        } else {
          this.UpdatePwdRuleForm.useriid = this.$route.params.iid
           updateUserPwd(this.UpdatePwdRuleForm).then(res => {
             if(res.data.status === 210) {
               this.$message.error('请检查原密码是否正确')
             } else if(res.data.status === 200) {
                window.sessionStorage.clear()
                this.$router.push('/login')
                this.$message.success('修改密码成功')
             } else {
               this.$message.error('修改密码失败')
             }
           })
        }
      })
    }
  },
  
}
</script>

<style>
  #userInfo {
    margin: 10px auto;
    width: 900px;
    height: 600px;
    /* border: 1px solid red; */
  }

  .mangeTitle {
    margin-left: 20px;
    margin-top: 20px;
    /* border-bottom: 1px solid #BBBBBB; */
  }

  .mangeLine {
    width: 900px;
    height: 1px;
    /* margin-left: 20px;
    margin-top: 10px; */
    margin: 10px 20px 20px 20px;
    background: #bbbbbb;
  }

  .userConent {
    margin-left: 50px;
  }

  .userItem {
    margin-bottom: 20px;
    display: flex;
    line-height: 35px;
  }

  p {
    margin-right: 20px;
  }

  .imgPic {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .updateBtn {
    color: #0099FF;
    margin-left: 20px;
  }

</style>