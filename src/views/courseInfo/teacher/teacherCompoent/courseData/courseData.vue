<template>
  <div id="courseData">
    <el-button type='success' size='mini' @click="addData" class="addDatas">+ 添加资料</el-button>
    <div class="dataline"></div>
    <course-data-content :rouses-info='getRourseInfo'></course-data-content>
    <el-dialog title="上传" :visible.sync="upDataDialogVisible" width="40%" class="upDialogContnet">
      <div class="upline"></div>
      <div class="upSuccessTitles">
        <span>文件名</span>
        <span>大小</span>
        <span class="status_p">状态</span>
      </div>
      <div v-if="upSuccessInfo.length" class="upDataStatusInfo">
        <div class="upSuccessTitles upSuccessDataMsgs"  v-for="(item, index) in showAllUpSuccessInfo" :key="index">
          <span class="DataName">{{item.name}}</span>
          <span class="DataSize">{{item.size}}</span>
          <span> 
            <img src="http://127.0.0.1:3000/public/img/upSuessIon.jpg" class="successIcon">
          </span>
        </div>
      </div>
      <div v-if="!upSuccessInfo.length" class="upNotices">注: 每次只能上传一个</div>
      <span slot="footer" class="dialogfooter">
        <up-data @getDataInfo='getUpdataInfo'></up-data>
        <el-button type="primary" size='mini' class="sureUpBtn" @click="finishUpRourse">完  成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upStudyData, getCourseData } from '../../../../../network/upStudyData'

import upData from '../../../../../components/common/upData'
import courseDataContent from './courseDataCompoent/courseDataContent'
export default {
  name: 'courseData',
  components: { upData, courseDataContent },
  data() {
    return {
      upDataDialogVisible: false,
      upSuccessInfo: [],
      getRourseInfo: []
    }
  },
  created() {
    document.title = this.$route.meta.title
    this.getCourseRourss()
  },
  computed: {
    showAllUpSuccessInfo() {
      return this.upSuccessInfo
    }
  },
  watch: {
    upDataDialogVisible(newVal, OldVal) {
      if(!newVal) {
        this.upSuccessInfo = []
      }
    }
  },
  methods: {
    getUpdataInfo(dataInfo) {
      console.log('文件信息是: ')
      console.log(dataInfo)
      this.upSuccessInfo.push(dataInfo)
      this.isHaveUp = true
      upStudyData({
        courseid: this.$route.params.cciid,
        tecid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        updata: dataInfo
      }).then(res => {
        if(res.data.status === 200) {
          this.$message.success('上传成功')
        } else {
          this.$message.error('上传失败')
        }
      })
    },
    addData() {
      this.upDataDialogVisible = true
    },
    getCourseRourss() {
      getCourseData({
        courseiid: JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))._id
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data.data);
          this.getRourseInfo = res.data.data
        }
      })
    },
    finishUpRourse() {
      this.upDataDialogVisible = false
      this.getCourseRourss()
    }
  },
}
</script>

<style>
  .addDatas {
    margin-left: 87%;
  }

   

  .dataline {
    width: 90%;
    height: 2px;
    background: #666;
    margin: 10px auto;
  }

  .upline {
    width: 100%;
    height: 1px;
    background:#E0E0E0;
    margin-top: -20px;
    margin-bottom: 10px;
  }

 .dialogfooter {
   display: flex;
   margin-left: 75%;
   margin-top: 10px;
 }

 .status_p {
   margin-right: 10px;
 }

 .sureUpBtn {
   margin-left: 20px;
 }

 .upSuccessTitles {
   display: flex;
   justify-content: space-between;
   margin-left: 10px;
   width: 90%;
 }

 .upDataStatusInfo {
   height: 200px;
   overflow: hidden;
   overflow-y: scroll;
 }

 .upSuccessDataMsgs {
   margin-top: 10px;
   /* background: #D5EAB9; */
   justify-items: center;
 }

 .DataName {
   width: 200px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
 }

 .DataSize {
   width: 42%;
 }

 .successIcon {
   border-radius: 50%;
   width: 18px;
   height: 18px;
   /* margin-left: 5px; */
 }

 .upNotices {
   width: 100%;
   height: 200px;
   line-height: 200px;
   font-size: 19px;
   color: #CBCCCC;
   text-align: center;
 }
</style>