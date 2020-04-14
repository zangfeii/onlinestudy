<template>
  <div id="courseList">
    <div class="catalogBtn">
      <span>目录</span>
      <el-button type="primary" icon="el-icon-edit" class="updateBtn" size="small" @click="addChapter">添加新的一章</el-button>
    </div>
    <!-- 课程目录 -->
    <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
       <span class="custom-tree-node" target='_blank'  slot-scope="{ node, data }" @click="clickChapterDetails(data)">
        <span>{{ node.label }}</span>
        <span>
          <el-tag size='mini' type="success"  @click.stop="append(data)"  class="hoverUpremoveBtn" v-show="data.children">添加子目录</el-tag>
          <el-tag type="warning" size='mini' @click.stop="remove(node, data)" class="hoverUpremovideBtn deleteBTn">删除</el-tag>
        </span>
      </span>
    </el-tree>
    <!-- 添加新的一章 -->
      <el-dialog title="标题" :visible.sync="chaptedTitleDialogVisible" width="30%">
        <el-input v-model="inputChapter.label" placeholder="请输入章节标题"></el-input>
        <span slot="footer" class="dialog-footer">
           <el-button @click="chaptedTitleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="suerAddChapterTitle">确 定</el-button>
        </span>
      </el-dialog>

    <!-- 添加章节目录名字 -->
    <el-dialog title="标题" :visible.sync="chaptedNameDialogVisible" width="30%" ref="chapterDialokgRef">
      <el-input v-model="inputChaptedTitle.label" placeholder="请输入章节标题"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chaptedNameDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureBtnAddChapter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import  { createChapter, deleteChapter } from '../../../../../../network/user'
import { queryCurrentCourseChapters } from '../../../../../../network/query'
export default {
  name: 'courseList',
  data() {
   const data = []
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data)),
      chaptedNameDialogVisible: false,
      chaptedTitleDialogVisible: false,
      templateData: [],
      ids: 0,
      courseInfo: {},
      //添加的章
      inputChapter: {
        id: 0,
        label: '',
        children: []
      },
      //添加的节
      inputChaptedTitle: {
        id: 0,
        iid: '',
        label: ''
      },
      chapterTitleTempData: {},
    }
  },
  created() {
    this.getCourAndTeacherIndo()
    this.queryCourseChaptersTttles()
  },
  watch: {
    chaptedNameDialogVisible(newVal, oldVal) {
      if(!newVal) {
        this.inputChaptedTitle = {
        id: 0,
        iid: '',
        label: '',
       }
      }
    },
    chaptedTitleDialogVisible(newVal, oldVal) {
      if(!newVal) {
        this.inputChapter = {
          id: 0,
          label: '',
          children: []
        }
       }
     },
  },
  methods: {
    //获取当前课程信息
    getCourAndTeacherIndo() {
      const getCurrentCourseInfo = JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))
      this.courseInfo.currentcourseiid = getCurrentCourseInfo._id
      this.courseInfo.currentcoursename = getCurrentCourseInfo.ctitle
      this.courseInfo.currentteacheriid = getCurrentCourseInfo.cteacheriid
      this.courseInfo.currentteachername = getCurrentCourseInfo.cteacher
    },
  //查询当前的课程的信息,并给id赋值
  queryCourseChaptersTttles() {
    queryCurrentCourseChapters({
      currentcourseiid: this.courseInfo.currentcourseiid,
      currentteacheriid: this.courseInfo.currentteacheriid
    }).then(res => {
      if(res.data.status === 200) {
        if(Object.keys(res.data.data).length) {
          console.log(res.data.data.cc_chapters);
          // //给ids赋值
          this.data = res.data.data.cc_chapters
          this.ids = res.data.data.cc_ids + 1
          console.log(this.ids);
       }
      } else {
        this.data = []
        this.ids = 1
      }
    })
  },
  //修改当前课程信息前, 删除之前的课程信息
  // deleteBeforeCourseInfo() {
  //   this.queryCourseChaptersTttles()
  //   deleteChapter({
  //     currentcourseiid: this.courseInfo.currentcourseiid,
  //     currentteacheriid: this.courseInfo.currentteacheriid
  //   }).then(res => {
  //     if(res.data.status === 200) {
  //       this.isDeleteSucces = true
  //     } else {
  //       this.isDeleteSucces = false
  //     }
  //   })
  // },
  //传递后台添加课程
  addToDb() {
    this.ids = this.ids + 1
    createChapter({
      currentteacheriid: this.courseInfo.currentteacheriid,
      currentteachername: this.courseInfo.currentteachername,
      currentcourseiid: this.courseInfo.currentcourseiid,
      currentcoursename: this.courseInfo.currentcoursename,
      data: this.data,
      ids: this.ids 
    }).then(res => {
       if(res.data.status === 200) {
         this.isAddSuccess = true
       } else {
         this.isAddSuccess = false
       }
    })
  },
  // 添加新的章,弹窗
  addChapter() {
    this.chaptedTitleDialogVisible = true
  },
  // 生成课程章节唯一的标识iid
  setChapteriid() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36)
  },
  //确定添加新的一章
  suerAddChapterTitle() {
    this.inputChapter.id = this.ids + 1
    this.data.push(this.inputChapter) 
    this.addToDb()
    this.queryCourseChaptersTttles()
    this.chaptedTitleDialogVisible = false
  },
  //添加chanpterTitle
  append(data) {
    this.chaptedNameDialogVisible = true
    this.chapterTitleTempData = data
  },
  //确定添加新的小节-
  sureBtnAddChapter() {
    this.inputChaptedTitle.id = this.chapterTitleTempData.children.length + 1
    this.inputChaptedTitle.iid = this.setChapteriid()
    this.chapterTitleTempData.children.push(this.inputChaptedTitle)
    this.addToDb()
    this.chaptedNameDialogVisible = false
  },
    // 删除当前章节信息
    remove(node, data) {
        this.$confirm('是否删除该章节?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {         
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            this.addToDb()
            this.$message.success('删除成功')
        }).catch(() => {
             this.$message.info('已取消删除')
        });
      },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加子目录</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
          </span>);
      },
    clickChapterDetails(data) {
      window.sessionStorage.setItem('chapter', JSON.stringify(data))
      let chapterroute = this.$router.resolve({
        name: 'courseChapterContent',
      })
      window.open( chapterroute.route.path, '_blank')
    }
  },
}
</script>

<style>
  #courseList {
    width: 640px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #D7D7D7;
  }

  .catalogBtn {
    position: relative;
    height: 60px; width: 640px;
    font-size: 25px;
    line-height: 60px;
    /* background: skyblue; */
  }

  .updateBtn {
    position:absolute;
    right: 20px;
    top: 10px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .hoverUpremoveBtn:hover {
    background: pink;
    color: lightcoral;
  }

  .deleteBTn {
    width: 60px;
    text-align: center;
  }
</style>