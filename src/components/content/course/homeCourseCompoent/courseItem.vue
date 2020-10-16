<template>
  <div id="courseItem" v-show="coursesItem">
    <div class="itemCourse">
      <div v-if="isDeleteOrOut">
        <div class="hoverDeleteSingOut" v-if=" isDeleteSingOut" title="删除该课程" @click.stop="deleteCourse(coursesItem._id)">删除</div>
        <div class="hoverDeleteSingOut" v-if="!isDeleteSingOut" title="退出该课程" @click.stop="SingOutCourse(coursesItem._id)">退出</div>
      </div>
      <div class="hoverDeleteSingOut" v-if="isMangeCourses" title="管理该课程" @click.stop="mangeCourse">管理</div>
      <img :src="coursesItem.cpic" alt="" class="cItemImg">
      <div class="cItamTitle" :class="{courseTitle: isCourseTitleOverHidren}">{{coursesItem.ctitle}}</div>
      <p class="cItemTeacher" :class="{cdesOrNameOverHidren: isOverHidernName}">教师: {{coursesItem.cteacher}}</p>
      <div class="cItemTeacher courseTecNameDesc">
        <span class="descTitle">简介:  </span>
        <span class="courseDesc" :class="{cdesOrNameOverHidren: OverHidernDesc}">{{OverHidernDesc}}</span>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="mangeCouseDialogVisible" width="30%">
      <el-button type='warning' size='mini' @click="warningCourseQuestion">警告</el-button>
      <el-button type='danger' size='mini' @click="probiteCourse">禁封</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mangeCouseDialogVisible = false" size='mini'>取 消</el-button>
        <el-button type="primary" @click="mangeCouseDialogVisible = false" size='mini'>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { singOutCourseById, deleteCouse } from '../../../../network/delete'
import { sendCourseWring } from '../../../../network/notice'
import { probiteCouse } from '../../../../network/query'
export default {
  name: 'courseItem',
  data() {
    return {
      mangeCouseDialogVisible: false
    }
  },
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
    },
    isMangeCourses: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCourseTitleOverHidren() {
      if( this.coursesItem.ctitle && this.coursesItem.ctitle.length > 8) {
        return true
      } else {
        return false
      }
    },
    isOverHidernName() {
      if( this.coursesItem.cteacher && this.coursesItem.cteacher.length > 8) {
        return true
      } else {
        return false
      }
    },
    OverHidernDesc() {
     if( this.coursesItem.cdesc && this.coursesItem.cdesc.length > 30) {
        return this.coursesItem.cdesc.substr(0, 30) + '...'
      } else {
        return this.coursesItem.cdesc
      }
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
    },
    mangeCourse() {
      this.mangeCouseDialogVisible = true
    },
    warningCourseQuestion() {
      this.mangeCouseDialogVisible = false
      console.log(this.coursesItem.cteacheriid)
      sendCourseWring({
        sendid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        id: this.coursesItem.cteacheriid,
        courseName: this.coursesItem.ctitle
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('发送警告通知成功')
        } else {
          this.$message.error('发送警告通知失败')
        }
      })
    },
    probiteCourse() {
      probiteCouse({
        courseiid: this.coursesItem._id,
        sendid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        id: this.coursesItem.cteacheriid,
        courseName: this.coursesItem.ctitle
      }).then(res => {
        if(res.data.status === 200) {
          this.mangeCouseDialogVisible = false
          this.$message.success('禁封该课程成功')
        } else {
          this.$message.error('禁封该课程失败')
        }
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
    height: 265px;
    width: 252px;
    /* margin-right: 5px; */
    border: 1px solid #A2A2A2;
    background: white;
  }

  .itemCourse:hover {
    transform: scale(1.05);
    transition-duration: .3s;
    /* box-shadow:10px 10px 8px 3px skyblue; */
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

  .courseTitle {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cItemTeacher {
    margin-left: 5%;
    margin-top: 2%;
    color: #666666;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
  }

  .descTitle {
    margin-right: 5px;
  }

  .courseTecNameDesc {
    display: flex;
  }

  .courseDesc {
    word-break: break-all;
    white-space: normal;
    width: 200px;
    height: 40px;
    display: inline-block;
  }

  .cdesOrNameOverHidren {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>