<template>
  <div id="login">
    <login-in></login-in>
  </div>  
</template>

<script>
import loginIn from './loginComponent/loginIn'
export default {
  name: 'login',
  components: {loginIn}
}
</script>

<style>
  #login {
    /* height: 100%; */
    /* width: 100vh; */
    /* height: 100vh; */
    background: url('../../assets/img/login/loginBackGround.jpg');
    /* 背景图自适应大小 */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    /* 背景图占据全屏 */
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
   }
</style>