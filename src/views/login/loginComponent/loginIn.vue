<template>
  <div id='loginInn'>
    <div class="userPwd">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input  v-model="loginForm.name" autocomplete="off" prefix-icon='el-icon-user-solid'  clearable></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="pwd">
          <el-input  v-model="loginForm.pwd" autocomplete="off" prefix-icon='el-icon-lock' show-password></el-input>
        </el-form-item>
        <verify-code ref='verifyCodeRef' class="verifyCode"></verify-code>
      </el-form>
      <div class="Btn">
        <el-button type="success" class="btn" @click="login">登陆</el-button>
        <el-button type="primary" class="btn" @click="register">注册</el-button>
      </div>
    </div>
    <!-- 用户登陆提醒 -->
    <el-dialog title="提示" :visible.sync="remindDialogVisible" width="30%">
      <span>这该账号已经被禁止登陆,请联系管理员<a :href="connectionQQ">466602093</a></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="remindDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="remindDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {userLogin, getCotranct} from '../../../network/user'
import verifyCode from '../../../components/common/verifyCode'

export default {
  name: 'loginIn',
  components: { verifyCode },
  data() {
    return {
      remindDialogVisible: false,
      connectionQQ: '',
      loginForm: {
        name: '老师',
        pwd: '123456',
        verifyCode: ''
      },
      paramsform: {
        iid : '',
        iname: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入登陆用户名', trigger: 'blur'},
          { min: 1, max: 10, message: '用户名长度为1到10位', trigger: 'blur'}
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 12, message: '密码长度在6至12位之间', trigger: 'blur' }
        ],
        verifyCode :[
          { required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register() {
      this.$router.push('/register') 
    },
    login() {
      let veifyCodeResult = this.$refs.verifyCodeRef.ischekCode
      console.log(this.$refs.verifyCodeRef)
      this.$refs.loginForm.validate(valid =>{
        if(!valid || !veifyCodeResult) {
          return this.$message.error('请填写完整')
        } 
        // userLogin(this.loginForm).then((res => {
        // if(res.data.status === 200) {
        //   if(res.data.userInfo.status === 1 &&  res.data.userInfo.role <= 2) {
        //   this.paramsform.iid = res.data.userInfo.user_id
        //   this.paramsform.iname = res.data.userInfo.name
        //   // 在sessionStorage中储存token
        //   window.sessionStorage.setItem('token', res.data.token)
        //   // 在sessionStorage中储存头像图片
        //   window.sessionStorage.setItem('headpic', res.data.userInfo.hpic)
        //   //保存用户信息
        //   delete res.data.userInfo.role
        //   window.sessionStorage.setItem('user', JSON.stringify(res.data.userInfo))
        //   this.$router.push({
        //     name: 'home',
        //     params:  this.paramsform
        //   })
        //   return this.$message.success("登陆成功")
        //   } else if(res.data.userInfo.role === 3) {
        //     window.sessionStorage.setItem('token', res.data.token)
        //     delete res.data.userInfo.role
        //     window.sessionStorage.setItem('user', JSON.stringify(res.data.userInfo))
        //     this.$router.push('/adminhome')
        //    } else {
        //       getCotranct().then(res => {
        //         this.connectionQQ = res.data
        //         this.remindDialogVisible = true
        //         return
        //       })
        //     }
        // } else {
        //    return this.$message.error("登陆失败,请检查账号密码")
        // }
        // }))
         window.sessionStorage.setItem('token',  'ADADADADDA')
          this.paramsform.iid = 'idjaoijoij1jewia09201'
          this.paramsform.iname = '老师'
          this.$router.push({
            name: 'home',
            params: this.paramsform
          })
          console.log(this.$router)
          // this.$router.push('/register')
      })
    }
  }, 
}
</script>

<style scoped>
  #loginInn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 360px;
    height: 400px;
    border-radius: 10px;
    background:#95E3F1;
    margin-top: 100px;
    margin-left: 300px;
  }

  .userPwd {
    width: 300px;
  }
  
  .Btn {
    text-align: center;
  }

  .btn {
    width: 140px;
    height: 40px;
  }
   
  .verifyCode {
    margin-bottom: 10px;
  }
</style>