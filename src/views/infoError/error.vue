<template>
  <div id="error">
    <home-top-bar :show-add-course-btn='false'></home-top-bar>
    <div class="errorImg">
      <img src="../../assets/img/error/error.png" alt="">
      <el-button type='primary' size='mini' @click="errorBackHome">返回首页</el-button>
    </div>
  </div>  
</template>

<script>
import homeTopBar from '../home/homeCompoenet/homeTopBar'
export default {
  name: 'error',
  components: { homeTopBar },
  created() {
    document.title = this.$route.meta.title
  },
  methods: {
    errorBackHome() {
      const userinfo = JSON.parse(window.sessionStorage.getItem('user'))
      this.$router.push({
        name: 'home',
        params: {
          iid: userinfo.user_id,
          iname: userinfo.name
        }
      })
    }
  },
}
</script>

<style>
  .errorImg {
    width: 400px;
    height: 430px;
    margin: 50px auto;
    text-align: center;
  }

  .errorImg img {
    width: 400px;
    height: 400px;
  }
</style>