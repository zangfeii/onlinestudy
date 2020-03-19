<template>
  <div id="courseContent">
    <div class="courseItem" v-show="computedItemShow" :class="{isCheckedStyle: isChecked }" >
      <course-item :courses-item='item' v-for="item in coursesInfo" :key="item._id" @click.native='itemClick(item, item._id, item.cteacheriid, item.cteacher)' class="hoverCss" target='_blank'></course-item>
    </div>
    <div v-show="!computedItemShow" class="noData">暂无数据</div>
  </div>
</template>

<script>
import courseItem from './courseItem'
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
      console.log(paramsData);
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
    itemClick(item, ciid, cteciid, name) {
      // const routeData = this.$router.resolve(path)
      window.sessionStorage.setItem('currentCourseInfo', JSON.stringify(item))
      const currentUserid = this.getCurrentUserId().user_id
      const iname = this.getCurrentUserId().name
      if(cteciid === currentUserid) {
        this.toTeacherCourse(ciid, name)
        console.log('老师课程界面');
      } else {
          this.toStuCourse(ciid, iname)
          console.log('学生课程界面');
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

  .noData {
    width: 870px;
    height: 380px;
  }

  .isCheckedStyle {
    border: 4px solid skyblue;
  }

  
</style>