<template>
  <div id="mangeConent">
   <h3>课程管理</h3>
   <div class="courseMageLine"></div>
   <div class="courseCoverImg courItem">
     <p>封面:</p>
     <div class="updateImg">
       <!-- <span class="updateP" @click="updateCoverImg">更换封面</span> -->
       <up-load class="updateP" :up-load-name='updateImgName' @basePicPath='updateCourseCoverPic' ></up-load>
       <img :src="mangeCourseInfo.cpic" class="courseImg">
     </div>
   </div>
   <div class="courseStatus courItem">
     <p>课程状态:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.cstatus}}</span>
   </div>
   <div class="courseTeacher courItem">
     <p>老师:</p>
     <p class="courseTwoItem">{{mangeCourseInfo.cteacher}}</p>
   </div>
    <div class="courseName courItem">
     <p>课程:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.ctitle}}</span>
   </div>
   <div class="courseDesc courItem">
     <p>课程简介:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.cdesc}}</span>
   </div>
   <div class="courseIncoe courItem">
     <p>课程邀请码:</p>
     <span class="courseTwoItem">{{mangeCourseInfo.cincode}}</span>
   </div>
  </div>
</template>

<script>
import { updateCourseCoverImg } from '../../.././../../../network/update'

import upLoad from '../../../../../../components/common/upLoad'
export default {
  name: 'courseMangeConent',
  components: { upLoad },
  props: {
    mangeCourseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      updateImgName: '更换封面'
    }
  },
  methods: {
    updateCourseCoverPic(basePicPath) {
      const courseCoverImgPath = 'http://127.0.0.1:3000/public/img/' + basePicPath
      updateCourseCoverImg({
        courseiid: this.mangeCourseInfo._id,
        teacheriid: this.mangeCourseInfo.cteacheriid,
        coverImg: courseCoverImgPath
      }).then(res => {
        if(res.data.status === 200) {
          this.$parent.queryCurrentTecCourseInfo()
          this.$message.success('修改课程封面成功')
        } else {
          this.$message.error('修改课程封面失败')
        }
      })
    }
  },
}
</script>

<style>
  #mangeConent {
    width: 100%;
    height: 600px;
  }

  h3 {
    margin-left: 20px;
    margin-top: 20px;
  }

  .courseMageLine {
    height: 1.5px;
    width: 100%;
    border-radius: 5px;
    margin-top: 3px;
    background: #9EA9B4;
  }

  .courItem {
    display: flex;
    margin-top: 20px;
  }

  .courseTwoItem {
    margin-left: 20px;
  }

  .courseImg {
    width: 100%;
    height: 100%;
  }
  
  .updateImg {
    width: 272px;
    height: 182px;
    position: relative;
    margin-left: 20px;
  }

  .updateP {
    position: absolute;
    top: 1px;
    right: 1px;
    width: 80px;
    height: 20px;
    white-space: nowrap;
    color: #0099FF;
    background: oldlace;
    display: none;
    cursor: pointer;
    text-align: center;
  }

  .updateImg:hover .updateP {
    display: block;
  }
</style>