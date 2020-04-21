<template>
  <div id="courseContent">
    <div class="courseItem" v-show="computedItemShow" :class="{isCheckedStyle: isChecked }" >
      <course-item :courses-item='item' v-for="item in coursesInfo" 
        :key="item._id" 
        @click.native='itemClick(item, item._id, item.cteacheriid, item.cteacher)' 
        :is-delete-sing-out='deleteOrSingOut'
        :is-delete-or-out='deleteOrOutConent'
        :is-mange-courses='isMangeCourses'
        class="hoverCss" target='_blank'>
      </course-item>
    </div>
    <div v-show="!computedItemShow" class="noCourseData">暂无课程</div>
  </div>
</template>

<script>
import courseItem from './courseItem'

import {　 beforeEnterCuorseQuery　} from '../../../../network/query'
export default {
  name: 'courseContent',
  components: { courseItem },
  props: {
    coursesInfo: {
      type: Array,
      default() {
        return []
      }
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    deleteOrSingOut: {
      type: Boolean,
      default: true
    },
    deleteOrOutConent: {
      type: Boolean,
      default: true
    },
    isMangeCourses: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ishaventer: false
    }
  },
  computed: {
    computedItemShow() { 
      if(this.coursesInfo.length >= 1 &&  Object.keys(this.coursesInfo[0]).length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    //获取当前用户id
    getCurrentUserId() {
      return JSON.parse(window.sessionStorage.getItem('user'))
    },
    //老师课程界面跳转
    toTeacherCourse(cid,  teacname) {
      const paramsData = { 
        iname: teacname,
        cciid: cid 
      } 
      const routeData = this.$router.resolve({
        name: 'teacher',
        params: paramsData
      })
      window.open(routeData.href, '_blank')

    },
    //学生课程界面跳转
    toStuCourse(cid, stuName) {
      const stuParamsData = {
        iname: stuName,
        sciid: cid
      }
      const stuRoute = this.$router.resolve({
        name: 'student',
        params: stuParamsData
      })
      window.open( stuRoute.href, '_blank')
    },
    //查询当前用户是否已经添加了该课程
    isHaveEnterCourse(userid, courseid, name) {
       beforeEnterCuorseQuery({ useIid: userid, courseId: courseid }).then(res => {
        if(res.data.status === 210) {
          this.toStuCourse(courseid, name)
        } else {
          // this.$message.error('请先先进入该课程')
          return
        }
      })
    },
    itemClick(item, ciid, cteciid, name) {
      window.sessionStorage.setItem('currentCourseInfo', JSON.stringify(item))
      const currentUserid = this.getCurrentUserId().user_id
      const iname = this.getCurrentUserId().name
       if(cteciid === currentUserid) {
         this.toTeacherCourse(ciid, name)
          // window.sessionStorage.setItem('currentCourseInfo', '')
       } else {
         this.isHaveEnterCourse(currentUserid, ciid, iname)
        //  this.toStuCourse(ciid, iname)
        //  window.sessionStorage.setItem('currentCourseInfo', '')
       }
    }
  },
}
</script>

<style>
  .courseItem {
    /* width: 870px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: first baseline;
  }

  .noCourseData {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #9999;
    font-weight: bold;

  }

  .isCheckedStyle {
    border: 4px solid skyblue;
  }

  
</style>