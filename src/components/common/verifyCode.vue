<template> 
  <div class="join_formitem"> 
    <div class="captcha"> 
      <el-form  :model='checkCodeForm' :rules="rules" ref='verifyRef' label-width="70px">
        <el-form-item label="验证码" prop="picVerification"> 
          <el-input  v-model="checkCodeForm.picVerification" autocomplete="off" placeholder="请输入" class="inputclass"></el-input>
        </el-form-item>
      </el-form>
      <div @click="createdCode" class="verification">{{checkCode}}</div>
    </div> 
  </div> 
</template> 

<script>
export default {
  name: 'verifyCode', 
  data(){
    var validCode = ((rule, value, cd) => {
      if(value === '' ) {
        return cd(new Error("请输入验证码"))
      } else if(value !== this.checkCode){
          return cd(new Error('验证码不正确'))
      } else {
          this.ischekCode = true
          cd()
      }
    })
    return{
      code: '',
      // 随机产生的验证码
      checkCode: '', 
      // 输入的验证码         
      checkCodeForm: {
        picVerification: ''
      },
      //  验证码是否验证成功
      ischekCode: false,
      rules: {
        picVerification: [
          { required: true ,message: '请输入验证码'},
          { validator: validCode, trigger: 'blur' }
        ]
      }    
    }
 },
  created(){
    this.createdCode()
  },
  methods: {
    // 产生验证码
    createdCode() {
    // 先清空验证码输入
      this.code = ''
      this.checkCode = ''
      this.picVerification = ''
      // 验证码长度
      const codeLength = 4
      // 随机数
      const random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                               'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z')
      for(let i = 0;i < codeLength;i++){
        // 取得随机数的索引(0~35)
        let index = Math.floor(Math.random() * 62)
        // 根据索引取得随机数加到code上
        this.code += random[index]
      }
      // 把code值赋给验证码
      this.checkCode = this.code
    },
  }
}
</script> 

<style>
  .captcha {
    display: flex;
  }
  
  .join_formitem {
    height: 50px;
    line-height: 50px;
  }

  .inputclass {
    width: 100px;
  }

  .verification{
    width: 80px;
    height: 40px;
    line-height: 40px;
    letter-spacing: 5px;
    margin-left: 40px;
    cursor: pointer;
  }
</style>