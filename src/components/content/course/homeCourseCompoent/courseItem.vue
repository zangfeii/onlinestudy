<template>
  <div id="courseItem" v-show="coursesItem.cteacher">
    <div class="itemCourse">
      <div v-if="isDeleteOrOut">
        <div class="hoverDeleteSingOut" v-if=" isDeleteSingOut" title="删除该课程" @click.stop="deleteCourse(coursesItem._id)">删除</div>
        <div class="hoverDeleteSingOut" v-if="!isDeleteSingOut" title="退出该课程" @click.stop="SingOutCourse(coursesItem._id)">退出</div>
      </div>
      <img :src="coursesItem.cpic" alt="" class="cItemImg">
      <div class="cItamTitle">{{coursesItem.ctitle}}</div>
      <p class="cItemTeacher">教师: {{coursesItem.cteacher}}</p>
      <p class="cItemTeacher">简介:{{coursesItem.cdesc}}</p>
    </div>
  </div>
</template>

<script>
import { singOutCourseById, deleteCouse } from '../../../../network/delete'
export default {
  name: 'courseItem',
  props: {
    coursesItem: {
      type: Object,
      default() {
        return {}
      }
    },
    isDeleteSingOut: {
      type: Boolean,
      default: true
    },
    isDeleteOrOut: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    deleteCourse(courseiid) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          deleteCouse({
            teacheriid: this.$route.params.iid,
            courseiid: courseiid
          }).then(res => {
            if(res.data.status === 200) {
              this.$bus.$emit('deleteCourseGetOtherCourses')
              this.$message.success('删除该课程成功')
            } else {
              this.$message.error('删除该课程失败')
            }
          })
        }).catch(() => {
          this.$message.info('已经取消删除')       
        })
    },
    //退出课程
    SingOutCourse(courseiid) {
      this.$confirm('此操作将永久退出该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          singOutCourseById({
            courseStuiid: courseiid,
            stuiid: this.$route.params.iid
      }).then(res => {
        if(res.data.status === 200) {
          this.$bus.$emit('outCourseGetOtherCurses')
          this.$message.success('退出课程成功')
        } else {
          this.$message.error('退出课程课程失败')
        }
      })
        }).catch(() => {
          this.$message.info('已经取消退出')       
        })
    }
  },
  
}
</script>

<style>
  #courseItem {
    position: relative;
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

  .hoverDeleteSingOut {
    display: none;
    text-align: center;
    color: #0099FF;
  }

  .itemCourse:hover .hoverDeleteSingOut {
    width: 40px;
    height: 20px;
    display: block;
    background: white;
    position:absolute;
    right: 0;
  }

  .cItemImg {
    width: 100%;
    height: 170px;
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