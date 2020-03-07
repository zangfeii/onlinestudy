<template>
  <div id="courseContent">
    <div class="courseItem" v-show="computedItemShow" :class="{isCheckedStyle: isChecked }">
      <course-item :courses-item='item' v-for="item in coursesInfo" :key="item._id" @click.native='itemClick(item._id, item.cteacheriid)' class="hoverCss"></course-item>
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
      return JSON.parse(window.sessionStorage.getItem('user')).user_id
    },
    //老师课程界面跳转
    toTeacherCourse(cid, tid) {
      const paramsData = { tecid: tid, cciid: tid}
      const routeData = this.$router.resolve({
        name: 'teacher',
        params: paramsData
      })
      window.open(routeData.href, '_blank')
      console.log(routeData);
    },
    itemClick(ciid, teciid) {
      // const routeData = this.$router.resolve(path)
      const currentUserid = this.getCurrentUserId()
      if(teciid === currentUserid) {
        this.toTeacherCourse(ciid, teciid)
        console.log('老师课程界面');
      } else {
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