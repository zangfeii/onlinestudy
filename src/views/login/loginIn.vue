<template>
  <div id='loginIn'>
    <div class="userPwd">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="70px">
        <el-form-item label="用户名" prop="user">
          <el-input  v-model="loginForm.user" autocomplete="off" prefix-icon='el-icon-user-solid'  clearable></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="pwd">
          <el-input  v-model="loginForm.pwd" autocomplete="off" prefix-icon='el-icon-lock'  clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="Btn">
        <el-button type="success" class="btn">登陆</el-button>
        <el-button type="primary" class="btn" @click="register">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import registerUser from './registerUser'
export default {
  name: 'loginIn',
  components:{ registerUser },
  data() {
    return {
      loginForm: {
        user: '',
        pwd: '',
      },
      rules: {
        user: [
          { required: true, message: '请输入登陆用户名', trigger: 'blur'},
          { min: 1, max: 10, message: '用户名长度为1到10位', trigger: 'blur'}
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 12, message: '密码长度在6至12位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      setTimeout(() => {
        this.$router.push('/register') 
      },300)
    }
  }, 
}
</script>

<style>
  #loginIn {
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
</style>