<template>
  <div id="topicItem">
    <div class="up" v-if="courseTopicItemData.tp_isTop">
      <img src="../../../../../../../../src/assets/img/icon/hot.png" class="topIcon">
      <div class="totop">置顶</div>
    </div>
    <div class="contnet">
      <div class="user">
        <div class="userImgTime">
          <img :src="courseTopicItemData.tp_topicCreaterPic" class="topicUserImg">
          <div>
            <p class="topicUserName">{{courseTopicItemData.tp_topicCreateName}}</p>
            <p class="topicCreateTime">{{courseTopicItemData.tp_createTime.substr(0, 10)}}</p>
          </div>
        </div>
        <div>
          <el-tooltip content="删除" placement="top">
            <i class="el-icon-delete deleteBtn" v-show="deleteBtn"   @click="deleteClick(courseTopicItemData._id, courseTopicItemData.tp_courseiid, courseTopicItemData.tp_courseTeacheriid)"></i>
          </el-tooltip>
          <el-tooltip content="置顶" placement="top" v-if='!courseTopicItemData.tp_isTop' v-show="deleteBtn">
             <i class="el-icon-top deleteBtn" @click="toTop(courseTopicItemData._id, courseTopicItemData.tp_courseiid, courseTopicItemData.tp_courseTeacheriid)"></i>
          </el-tooltip>
           <el-tooltip content="取消置顶" placement="top" v-if='courseTopicItemData.tp_isTop' v-show="deleteBtn">
             <i class="el-icon-bottom deleteBtn" @click="toDown(courseTopicItemData._id, courseTopicItemData.tp_courseiid, courseTopicItemData.tp_courseTeacheriid)"></i>
          </el-tooltip>
        </div>
      </div>
      <!-- 话题内容 -->
      <div class="topicContent">
        <p class="topicTitle">{{courseTopicItemData.tp_courseTopic.title}}</p>
        <p class="topicText">{{courseTopicItemData.tp_courseTopic.textarea}}</p>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'topicContentItem',
  props: {
    courseTopicItemData: {
      type: Object,
      default() {
        return {}
      }
    },
    deleteBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    deleteClick(topicid, courseid, teacherid) {
      this.$emit('deleteTopic', {topicid, courseid, teacherid})
    },
    toTop(topicid, courseid, teacherid) {
      this.$emit('updateTopicToUp', {topicid, courseid, teacherid})
    },
    toDown(topicid, courseid, teacherid) {
      this.$emit('updateTopicToDown', {topicid, courseid, teacherid})
    }
  },
}
</script>

<style>
  #topicItem {
    width: 100%;  
    /* background: red; */
    margin-top: 20px;
    border: 1px solid #E2E2E2;
  }

  .contnet {
    /* display: flex; */
    width: 470px;
    /* height: 220px; */
    /* background: skyblue; */
    margin: 0 auto;
  }
  .topicUserImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .user {
     display: flex;
     justify-content: space-between;
     justify-items: center;
     padding-top: 15px;
     margin-left: 10px;
  }
  
  .topicUserName {
    padding-left: 10px;
    font-size: 14px;
    color: #666;
  }

  .topicCreateTime {
    font-size: 11px;
    color: #666;
    padding-left: 10px;
  }

  .userImgTime {
    display: flex;
  }

  .deleteBtn {
    margin-right: 20px;
    /* margin-bottom: 20px; */
  } 
  .deleteBtn:hover {
    color: skyblue;
  }

  .topicContent {
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 20px;
  }

  .topicTitle {
    color: #59657d;
  }

  .topicText {
    color: #666;
    font-size: 14px;
    margin-top: 10px;
    word-wrap: break-word;
  }

  .totop {
    width: 100%;
    height: 20px;
    line-height: 20px;
    border-bottom: 1px solid #E2E2E2;
    color: red;
  }

  .topIcon {
    width: 15px;
    height: 15px;
    float: left;
    margin-top: 3px;
  }
 
 .el-tooltip__popper {
   white-space: nowrap;
 }
</style>