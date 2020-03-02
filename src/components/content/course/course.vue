<template>
  <div id="homeMyCourse">
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
  </div>  
</template>

<script>
import upLoad from '../../common/upLoad'
export default {
  name: 'course',
  components: {upLoad},
  data() {
    return {
      myCourse: ['我学的课', '我教的课'],
      whichMyCouese: 0,
      createCourse: true,
      // addCourseParams: {
      //   cname: '',
      //   ciidL: ''
      // }
    }
  },
  methods: {
    myCourseControl(index) {
      this.whichMyCouese = index
      if(index === 0) {
        this.createCourse = true
      } else {
        this.createCourse = false
      }
    },
    addCourse() {
      // this.addCourseParams.cname = this.$route.params.iname
      // this.addCourseParams.ciid = this.$route.params.iid
      this.$router.push('/createCourse')
    //   this.$router.push({
    //     name: 'createClass',
    //     params: this.addCourseParams
    //   })
     }
  },
}
</script>

<style>
  #homeMyCourse {
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

</style>