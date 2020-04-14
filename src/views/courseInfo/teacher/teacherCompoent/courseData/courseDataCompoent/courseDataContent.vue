<template>
  <div id="courseDataContent">
    <div class="rourseConent" v-if="rousesInfo.length">
      <div class="pic_name pic_name_padd">文件名</div>
      <span class="rourseSize">大小</span>
      <span class="rourseDownNums">下载数</span>
      <span class="rourseUpTime">上传时间</span>
      <span class="rourseDown" :class="{rourseDown_pa: isHaveDlete}">下载</span>
      <span class="rourseDelete" v-if="isHaveDlete">删除</span>
    </div>
    
    <div class="havaCourseDatas" v-if="rousesInfo.length">
      <course-item v-for="(item, index) in rousesInfo" :is-delete='isHaveDlete' :key="index" :one-rouses-info='item'></course-item>
    </div>
    <div class="noCourseDatas" v-if="!rousesInfo.length">暂无资源</div>
  </div>  
</template>

<script>
import courseItem from './courseItem'
import { getCourseData } from '../../../../../../network/upStudyData'
export default {
  name: 'courseDataContent',
  components: { courseItem },
  data () {
    return {
      isHaveDatas: false,
      isDlete: true
    }
  },
  props: {
    rousesInfo: {
      type: Array,
      default() {
        return []
      }
    },
    isHaveDlete: {
      type: Boolean,
      default: true
    }
  },
   
}
</script>

<style>
  #courseDataContent {
    height: 20px;
    width: 80%;
    margin: 10px auto;
    text-overflow: ellipsis;
  }

  .noCourseDatas {
    width: 80%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #D8D8D8;
    font-weight: bold;
  }

  .pic_name_padd {
    margin-left: 10px;
    color: #999;
  }

  .rourseDown, .rourseDelete {
    height: 42px;
    width: 30px;
    line-height: 42px;
    font-size: 11px;
    color: #999;
  }

  .rourseDown_pa {
    margin-right: -10px;
  }

  
</style>