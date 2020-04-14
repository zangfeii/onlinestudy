<template>
  <div id="courseItem">
    <div class="rourseConent">
      <div class="pic_name">
        <img :src="oneRousesInfo.datas[0].pic" class="rourse_pic">
        <div class="rouse_name" :title="oneRousesInfo.datas[0].name">{{oneRousesInfo.datas[0].name}}</div>
      </div>
      <span class="rourseSize">{{oneRousesInfo.datas[0].size}}</span>
      <span class="rourseDownNums">{{oneRousesInfo.Downnums}}</span>
      <span class="rourseUpTime">{{oneRousesInfo.upTime}}</span>
      <!-- <a :href="oneRousesInfo.datas[0].path" @click="addDownNums(oneRousesInfo._id)"><i class="el-icon-download" title="下载"></i></a> -->
      <!-- <a href="javascript:void(0)" @click="addDownNums(oneRousesInfo._id, oneRousesInfo.datas[0].path)"><i class="el-icon-download" title="下载"></i></a> -->
      <a href="javascript:void(0)" @click="addDownNums(oneRousesInfo)"><i class="el-icon-download" title="下载"></i></a>
      <a href="javascript:void(0)" @click="deleteRourse(oneRousesInfo._id)" v-if="isDelete"><i class="el-icon-delete" title="删除"></i></a>
    </div>
  </div>
</template>

<script>
import { addDownNums, deleteRourse } from '../../../../../../network/upStudyData'
export default {
  name: 'courseItem',
  props: {
    oneRousesInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    isDelete: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    addDownNums(dataInfos) {
      addDownNums({
        dataid: dataInfos._id,
        useriid: JSON.parse(window.sessionStorage.getItem('user')).user_id,
        courseiid: dataInfos.courseiid
      }).then(res => {
        if(res.data.status === 200) {
          window.location.href =  dataInfos.datas[0].path
        } else {
          this.$message.error('下载失败')
        }
      })
    },
    deleteRourse(rourseiid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRourse({
          riid: rourseiid
        }).then(res => {
          if(res.data.status === 200) {
            this.$parent.$parent.getCourseRourss()
          } else {
            this.$message.error('删除该资源失败')
          }
        })
      }).catch(() => {
          this.$message.info('已经取消删除')
        })
    }
  },
}
</script>

<style>
  #courseItem {
    height: 42px;
    text-align: center;
    line-height: 42px;
    padding: 5px;
    border-bottom: 1px solid #E0E0E0;
  }

  .rourseConent {
    display: flex;
    justify-content: space-between;
  }

  .pic_name {
    display: flex;
    width: 470px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .rourseSize, .rourseDownNums {
    width: 80px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 11px;
    color: #999;
  }

  .rourseUpTime {
    width: 100px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    /* margin-left: -55px; */
    font-size: 11px;
    color: #999;
  }
  
  .rouse_name {
    color: #202020;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    
  }

  .rourse_pic {
    width: 30px;
    height: 32px;
    line-height: 42px;
  }
  
  .el-icon-download:hover {
    color: turquoise;
  }
</style>