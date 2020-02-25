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
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerFormRef" label-width="70px">
            <el-form-item label="账号" prop="name">
              <el-input  v-model="registerForm.name" autocomplete="off" prefix-icon='el-icon-user-solid'  placeholder="请输账号名" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input  v-model="registerForm.mobile" autocomplete="off" prefix-icon='el-icon-user-solid'  placeholder="请输手机号" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="registerForm.pwd" autocomplete="off" prefix-icon='el-icon-lock'  placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认" prop="checkPwd">
              <el-input type="password" v-model="registerForm.checkPwd" autocomplete="off" prefix-icon='el-icon-lock' placeholder="请再次输入密码密码" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <verify-code class="verifyCode" ref='verifyCodeRef' :ischek-code='ischeckcode'></verify-code>
        <div class='isregister'>
          <check-button :ischek='isagree' @click.native="registerTo" class="checBtn"></check-button>
          <span>我已阅读并同意<a href="https://mi-static.oss-cn-hangzhou.aliyuncs.com/eula/eula_teach.html" class="userAreement">{{UserAgreement}}</a></span>
        </div>
        <!-- <div :class="{regbtny:!regbtn}"></div> -->
        <el-button type="primary" class="registerbtn" v-if="regbtn" @click="toRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import checkButton from '../../components/common/checkButton'
import verifyCode from '../../components/common/verifyCode'

import {registerUsers} from '../../network/user'

export default {
  name: 'registerUser',
  components: {
    checkButton,
    verifyCode
  },
  data() {
    //验证来两次输入密码是否一致
    var  validatorPwd = ((rule, value, cd) => {
      if(value === '') {
        return cd(new Error("请再次输入密码"))
      } else if (value !== this.registerForm.pwd) {
        cd(new Error('两次输入的密码不一致'))
      } else cd();
    })
    //验证手机号的合法性
    var validatorMobile = ((rule, value,cd) => {
      const regMoblie = /^1[34578]\d{9}$$/
      if(regMoblie.test(value)){
        return cd()
      } else cd(new Error('请输入合法的手机号'))
    })
    return {
      registerForm: {
        name: '',
        pwd: '',
        mobile: '',
        checkPwd: ''
      },
      UserAgreement: '<<用户协议>>',
      isagree: false,
      ischeckcode:false,
      rules: {
        name: [
          { required: true, message: '请输入登陆用户名', trigger: 'blur'},
          { min: 1, max: 10, message: '用户名长度为1到10位', trigger: 'blur'}
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 6, max: 12, message: '密码长度在6至12位之间', trigger: 'blur' }
        ],
        checkPwd: [
          { required: true ,message: '请确认密码'},
          { validator: validatorPwd, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: "请输入手机号"},
          { validator: validatorMobile, trigger: 'blur'}
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
    },
    toRegister() {
      const verifyCodeIsRigth = this.$refs.verifyCodeRef.ischekCode
      this.$refs.registerFormRef.validate(valid =>{
        if(!valid || !verifyCodeIsRigth){
          return this.$message.error('请填写完整')
        } else{
          registerUsers(this.registerForm).then(result => {
            console.log(result);
            if(result.data.status === 203) {
              return this.$message.error('该手机号已被注册')
            } else  return this.$message.success('注册账号成功') 
          })
        } 
      })
    },
  },
  computed: {
    regbtn() {
      return this.isagree
    }
  },
  
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
    height: 550px;
    margin: 20px auto;
  }

  .loginp {
    font-size: 20px;
  }

  .registeruser {
    width: 350px;
    margin-top: 30px;
  }

  .registerbtn {
    position: absolute;
    top: 500px;
    left: 50px;
    width: 325px;
  }

  .isregister {
    display: flex;
    align-self: flex-start;
    align-items: center;
    color: #666;
    position: absolute;
    left: 50px;
    top: 470px;
  }

  .checBtn {
    margin-right: 5px;
  }

  .isregister a {
    color: aqua !important;
  }

  .isregister a:hover {
    color: aquamarine !important;
  }

</style>