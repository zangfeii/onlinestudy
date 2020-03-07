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
          <el-input  placeholder="请输入课程邀请码" v-model="invitedCode"></el-input>
          <el-button type="primary" class="searchBtn"  @click="enterCourse">添加</el-button>
        </div>
      </div>

      <el-dialog title="查询结果" :visible.sync="enterCoursedialogVisible" width="30%" height="40%">
        <course-content :courses-info='queriedCourse' class="addCourseDialog"
                         @click.native="sureEnterCourse"  :is-checked='isCheckedEnter'>
        </course-content>
        <span slot="footer" class="dialog-footer">
          <el-button @click="enterCoursedialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="successAddCourse">确定加入</el-button>
        </span>
      </el-dialog>
      <!-- 右边 -->
      <div class="right">
        <img :src="getHeadPic" class="userPic">
        <span :class="{iname:isoverflow}">{{iname}}</span>
        <a @click="quit" class="quitbtn">退出</a>
      </div>
    </div>
  </div>  
</template>

<script>
import  courseContent from '../../../components/content/course/homeCourseCompoent/courseContent'
import { queryCourseByInCode, beforeEnterCuorseQuery } from '../../../network/query'
import { stuEnterCourse, oneCourseStuInfo } from '../../../network/user'
export default {
  name: 'homeTopBar',
  components: { courseContent },
  data() {
    return {
      iid:'',
      iname: '',  
      courses: ['小学','初中','高中','大学'],
      invitedCode: '',
      enterCoursedialogVisible: false,
      queriedCourse: [],
      isCheckedEnter: false,
      isEnter: false,
      courseStu: {},
      //用户进入课程前的查询
      useEnterBeforeQueryResult : {}
    }
  },
  methods: {
    getParams() {
     this.iid = this.$route.params.iid 
     this.iname = this.$route.params.iname
    },
    quit() {
      window.sessionStorage.clear()
      setTimeout(() => {
        this.$router.push('/login')
      }, 600);
    },
    enterCourse() {
      const getInvitedCode = this.invitedCode
      queryCourseByInCode({invitedCode: getInvitedCode}).then(res => {
        if(res.data.status === 200 ) {
          this.queriedCourse = res.data.courses
          console.log(this.queriedCourse);
        }
      })
      this.enterCoursedialogVisible = true
    },
    sureEnterCourse() {
      this.isCheckedEnter = !this.isCheckedEnter
      this.isEnter = !this.isEnter
     },
     //获取进入课程所需要保存的数据
    getStuCourseInfo() {
      const courseStuInfo = JSON.parse(window.sessionStorage.getItem('user'))
      this.courseStu = new oneCourseStuInfo(this.queriedCourse[0], courseStuInfo)
      return this.courseStu
    },
     
    //用户进入课程
    lastEnterCurse(enterCourerParamsData) {
     stuEnterCourse(enterCourerParamsData).then(res => {
          if(res.data.status === 200) {
            if(this.queriedCourse[0].cstatus === 1) {
              this.$message.success('成功添加该课程')
              this.isEnter = false
              this.enterCoursedialogVisible = false
            } else {
              return this.$message.error('该课程已经结束')
            }
          } else {
              this.$message.error('添该加课程失败')
          }
        })
    },
    successAddCourse() {
      if(this.isEnter === true){
        const courseStuParams = this.getStuCourseInfo()
        beforeEnterCuorseQuery({useIid:courseStuParams.cs_stuiid, courseId: courseStuParams.cs_courseiid}).then(res => {
          if(res.data.status === 210) {
            this.$message.error('您已经进入该课程学习,不能重复添加')
        } else if(res.data.status === 209) {
            this.$message.error('抱歉您不能进入自己创建的课程学习')
        } else {
            this.lastEnterCurse(courseStuParams)
        }
       })
      } else {
        this.$message.error('请先点击选择该课程')
      }
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
     },
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
  
  .addCourseDialog {
    width: 282px;
    cursor: pointer;
  }
</style>