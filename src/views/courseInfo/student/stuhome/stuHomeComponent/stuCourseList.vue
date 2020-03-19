<template>
  <div id="stuCourseList">
    <div class="courseMl"><p>课程目录</p></div>
    <el-tree :data="couChapers"   default-expand-all ></el-tree>
  </div>
</template>

<script>
export default {
  name: 'stuCourseList',
  props: {
    couChapers: {
      type: Array,
      defaule() {
        return []
      }
    }
  },
  
}
</script>

<style>
  #stuCourseList {
    padding: 10px;
    width: 50%;
    border: 1px solid #D7D7D7;
  }

  .courseMl {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    border-bottom: 1px solid #D7D7D7;
  }
</style>