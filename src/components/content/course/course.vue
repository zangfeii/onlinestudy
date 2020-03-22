<template>
  <div id="CourseMain">
    <div class="homeMyCourse">
      <div class="myCourseConent">
        <div class="myCourse " v-for="(item, index) in  myCourse" :key="index" >
          <span :class="{courseControl:  whichMyCouese === index}" @click="myCourseControl(index)">{{item}}</span>
        </div>
      </div>
      <div class="createOrEnterCourse">
        <div class="enterCourse" v-if="createCourse"><i class="el-icon-circle-plus-outline"></i> 进入课程</div>
        <div class="createCourse" v-if="!createCourse" @click="addCourse"><i class="el-icon-circle-plus-outline"></i> 创建课程</div>
      </div>
      <!-- <up-load></up-load> -->
      
      <!-- 创建课程提示 -->
      <el-dialog title="提示" :visible.sync="addCourseDialogVisible" width="30%">
        <span>该账号不能创建课程,请联系管理员获取<a :href="connectQQ">466602093</a></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCourseDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCourseDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 课程展示 -->
    <course-content :courses-info='queryUserEnterCourses' :delete-or-sing-out='!deleteCourse' v-if="enterShowl" class="courseContentStyle"></course-content>
    <course-content :courses-info='queryUserCreateCourses' :delete-or-sing-out='deleteCourse' v-if="createShow" class="courseContentStyle"></course-content>
  </div>  
</template>

<script>
import upLoad from '../../common/upLoad'
import courseContent from './homeCourseCompoent/courseContent'

import { getCotranct } from '../../../network/user'
import { queryCoursesById, getUserEnterCourseIdds, getUserEnterCoueses } from '../../../network/query'

export default {
  name: 'course',
  components: { upLoad, courseContent},
  data() {
    return {
      myCourse: ['我学的课', '我教的课'],
      whichMyCouese: 0,
      createCourse: true,
      addCourseDialogVisible: false,
      connectQQ: '',
      queryUserCreateCourses: [],
      createShow: false,
      queryUserEnterCourses: [],
      enterShowl: true,
      //查询用户添加的课程详细信息的id
      queryCourseEnterIds: [],
      //用户是否添加过课程
      isEnterCourse: false,
      deleteCourse: true

    }
  },
  created() {
    this.queryUserEnterCourseInfoByIds()
  },
  methods: {
    getUserId() {
      return JSON.parse(window.sessionStorage.getItem('user')).user_id
    },
    //查询用户创建的课程
    queryUserCourses() {
      this.createCourse = false
      this.createShow = true
      this.enterShowl = false
      const userIid =  this.getUserId()
        queryCoursesById({userIid}).then(res => {
          if(res.data.status === 200) {
            this.queryUserCreateCourses = res.data.courses 
          } else {
              this.queryUserCreateCourses = [{}]
          }
          this.queryUserEnterCourses =[{}]
        })
    },

    //查询用户参加的所有课程的id
    queryUserEnterCoursesTemporary(){
      const queryId = this.getUserId()
      getUserEnterCourseIdds({enterCoursesUserId: queryId}).then(res => {
        if(res.data.status ===200) {
          this.isEnterCourse = true
          const queryUserEnterCourseResult = res.data.result 
          queryUserEnterCourseResult.forEach(ele => {
            this.queryCourseEnterIds.push(ele.cs_courseiid)
          })
        } else {
            this.isEnterCourse = false
        }
      })
      this.queryUserCreateCourses =[{}]
    },

    //根据查询所有的参加的课程id查询用户添加学习的课程信息
    queryUserEnterCourseInfoByIds() {
      this.createCourse = true 
      this.enterShowl = true,
      this.createShow = false
      this.queryUserEnterCoursesTemporary() 
      if(this.isEnterCourse === true) {
        getUserEnterCoueses({sendParams: this.queryCourseEnterIds}).then(res => {
        this.queryUserEnterCourses = res.data.data
        })
      } else {
        this.queryUserEnterCourses = [{}]
      }
      this.queryCourseEnterIds = []
    },
    //点击切换进入和创建的课程
    myCourseControl(index) {
      this.whichMyCouese = index
      if(index === 0) {
        this.deleteCourse = true
        console.log('退出');
        this.queryUserEnterCourseInfoByIds()
      } else {
        console.log('删除');
        this.deleteCourse = true
        this.queryUserCourses()
      }
    },
    //用户创建课程
    addCourse() {
      const UserRole = JSON.parse(window.sessionStorage.getItem('user')).role
      if(UserRole === 1) {
         getCotranct().then(res => {
          this.connectQQ = res.data
          this.addCourseDialogVisible = true
          return
        })
      } else {
        this.$router.push('/createCourse')
      }
     }
  },
}
</script>

<style>
  .homeMyCourse {
    height: 60px;
    width: 870px;
    margin-left: 20px;
    font-size: 19px;
    color: #848684;
    cursor: pointer;
    border-bottom: 2px solid #9EA9B4;
    display: flex;
    justify-content: space-between;
  }

  .myCourseConent {
    width: 170px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .courseControl {
    border-bottom: 2px solid skyblue;
    padding-bottom: 5px;
    color: #333;
  }

  .myCourse span:hover {
    padding-bottom: 5px;
    color: #333;
  }

  .createOrEnterCourse {
    line-height: 60px;
    color: #268093;
    font-size: 17px;
  }

  .createOrEnterCourse:hover {
    color: #409EFF;
  }

  .courseContentStyle {
    margin-left: 30px;
    margin-top: 10px;
  }

</style>