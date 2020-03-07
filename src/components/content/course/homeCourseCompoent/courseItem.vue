<template>
  <div id="courseItem" v-show="coursesItem.cteacher">
    <div class="itemCourse">
      <img :src="coursesItem.cpic" alt="" class="cItemImg">
      <div class="cItamTitle">{{coursesItem.ctitle}}</div>
      <p class="cItemTeacher">教师: {{coursesItem.cteacher}}</p>
      <p class="cItemTeacher">简介:{{coursesItem.cdesc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courseItem',
  props: {
    coursesItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  
}
</script>

<style>
  #courseItem {
    margin: 5px;
    cursor: pointer;
  }

  .itemCourse {
    height: 282px;
    width: 272px;
    /* margin-right: 5px; */
    border: 1px solid #A2A2A2;
    background: white;
  }

  .itemCourse:hover {
    box-shadow:0px 0px 2px 3px skyblue;
  }

  .cItemImg {
    width: 100%;
  }

  .cItamTitle {
    font-size: 19px;
    margin-left: 5%;
  }

  .cItemTeacher {
    margin-left: 5%;
    margin-top: 2%;
    color: #666666;
    font-size: 13px;
    overflow: hidden;
    word-wrap: inherit;
  }
</style>