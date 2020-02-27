<template>
  <div id="hoemTabBar">
    <div class="home_tab_conent">
      <!-- 左边 -->
      <div class="left">
        <img src="../../../../public/logo.png"  class="logoImg">
        <h2>我的课堂</h2>
      </div>
      <!-- 中间 -->
      <div class="center">中间</div>
      <!-- 右边 -->
      <!-- <div class="right">{{uname}}</div> -->
      <div class="right">
        <img :src="getHeadPic" class="userPic">
        <span>{{iname}}</span>
        <a @click="quit" class="quitbtn">退出</a>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'homeTopBar',
  data() {
    return {
      iid:'',
      iname: '',     
    }
  },
  methods: {
    getParams() {
     this.iid = this.$route.params.iid 
     this.iname = this.$route.params.iname
     console.log('221222');
    },
    quit() {
      window.sessionStorage.clear()
      setTimeout(() => {
        this.$router.push('/login')
      }, 600);
     
    }
  },
   created() {
     this.getParams()
   },
   computed: {
     getHeadPic() {
      return window.sessionStorage.getItem('headpic')
     }
   },
}
</script>

<style>
  #hoemTabBar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #E1E1E1;
  }

  .home_tab_conent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  
  .left {
    display: flex;
    width: 200px;
    align-items: center;
  }
  
  .center {
    flex: 1;
  }

  .right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 150px;
  }

  .logoImg {
    width: 40px;
    height: 40px;
    padding-right: 10px;
  }

  .quitbtn {
    margin-left: 10px;
    cursor: pointer;
  }

  .userPic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>