<template>
  <div id='registerUser'>
    <!-- 顶部 -->
    <div class="topTitle">
      <div class="logo">
        <span><img src="../../../public/logo.png" alt=""></span>
        <div>在线教育</div>
      </div>
      <div class="backlogin"><a href="#" @click="back">返回登陆</a></div>
    </div>
    <!-- 注册 -->
    <div class="register">
      <div class="conent">
        <div class="loginp">注册新的账号</div>
        <div class="registeruser">
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px">
            <el-form-item label="账号" prop="user">
              <el-input  v-model="registerForm.user" autocomplete="off" prefix-icon='el-icon-user-solid' clearable placeholder="请输账号名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input  v-model="registerForm.pwd" autocomplete="off" prefix-icon='el-icon-lock' clearable placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
         <div class='isregister'>
           <check-button :ischek='isagree' @click.native="registerTo"></check-button>
           <span>我已阅读并同意</span>
         </div>
         <div :class="{regbtny:!regbtn}"></div>
         <el-button type="primary" class="btn" v-if="regbtn">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import checkButton from '../../components/common/checkButton'
export default {
  name: 'registerUser',
  components: {checkButton},
  data() {
    return {
      registerForm: {
        user: '',
        pwd: ''
      },
      isagree: false,
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
    back() {
      this.$router.back()
    },
    registerTo() {
      this.isagree = !this.isagree
    }
  },
  computed: {
    regbtn() {
      return this.isagree
    }
  }

}
</script>

<style>
  .topTitle {
    display: flex;
    justify-content: space-between;
    width: 980px;
    height: 70px;
    margin: 0 auto;
  }

  .register {
    width: 980px;
    height: 600px;
    border: 1px solid #D7D7D7;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    font-size: 45px;
    line-height: 70px;
  }

  .topTitle img {
    height: 70px;
    width: 70px;
    margin: 10px;
  }

  .backlogin {
    line-height: 70px;
  }
 
  a {
    text-decoration: none;
  }

  a:link {
    color: black;
  }

  a:hover {
    color: skyblue;
  }

  .conent {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    margin: 80px auto;
  }

  .loginp {
    font-size: 20px;
  }

  .registeruser {
    
    width: 350px;
    margin-top: 30px;
  }

  .btn {
    position: relative;
    left: 15px;
    width: 325px;
  }

  .isregister {
    display: flex;
    align-self: flex-start;
    position: relative;
    left: 50px;
    margin-bottom: 10px;
  }

  .regbtny {
    width: 350px;
    height: 38px;
  }


</style>