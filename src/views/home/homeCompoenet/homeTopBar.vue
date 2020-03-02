<template>
  <div id="hoemTopBar">
    <div class="home_top_conent">
      <!-- 左边 -->
      <div class="left">
        <img src="../../../../public/logo.png"  class="logoImg">
        <h2>我的课堂</h2>
      </div>
      <!-- 中间 -->
      <div class="center">
        <div class="topInfo">
          <!-- <span class="nav ">课程</span> -->
          <el-dropdown>
            <span class="el-dropdown-link">课程<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" class="el-dropdown">
              <el-dropdown-item v-for="(item, index) in courses" :key="index">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="nav"><a>学校</a> </span>
          
        </div>
        <div class="courseSearch">
          <!-- 之后改成输入内容,有下拉内容提醒 -->
          <el-input  placeholder="搜索感兴趣的课程"></el-input>
          <el-button type="primary" class="searchBtn">搜索</el-button>
        </div>
      </div>
      <!-- 右边 -->
      <!-- <div class="right">{{uname}}</div> -->
      <div class="right">
        <img :src="getHeadPic" class="userPic">
        <span :class="{iname:isoverflow}">{{iname}}</span>
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
      courses: ['小学','初中','高中','大学'] 
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
     },
     isoverflow() {
       if(this.iname.length >= 5 ) {
          return true
      } else {
        return false
      }
       
     }
   },
}
</script>

<style>
  #hoemTopBar {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #E1E1E1;
  }

  .home_top_conent {
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
    display: flex;
    justify-content:space-between;
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
    margin-right: 3px;
  }

  .iname {
    width: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .topInfo {
    width: 300px;
    text-align: center;
  }

  .nav {
    padding-right: 80px;
  }

  .courseSearch {
    width: 250px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchBtn {
    height: 40px;
    margin-left: 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    padding-right: 40px;
    color: black;
  }

   

</style>