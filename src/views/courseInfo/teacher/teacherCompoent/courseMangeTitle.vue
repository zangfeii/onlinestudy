<template>
  <div id="courseMangeTitle">
    <div class="mangeTitle">
      <div class="coursename">{{currentCourseInfo.ctitle}}</div>
      <div class="mangeTitleBtns">
        <span class="mangeTitleBtn" v-for="(item, index) in  mangeTitleBtns" :key="index" 
        :class="{ whichMangeSty: item.path === titleIndexPath }" @click="mangeTitleBtnClick(index, item.path)">{{ item.title }}</span>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'courseMangeTitle',
  props: {
    mangeTitleBtns: {
      type: [],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // mangeTitleBtns: [
      //   { title: '首页', path: 'homePage'},
      //   { title: '资料', path: 'courseData',},
      //   { title: '消息', path: 'courseMessage'},
      //   { title: '通知', path: 'courseNotice'},
      //   { title: '管理', path: 'courseMange'},
      // ],
       titleIndexPathData: '',
    }
  },
  methods: {
    mangeTitleBtnClick(index, path) {
      this.titleIndexPathData = path
      window.sessionStorage.setItem('currenTitleIndex', path)
      this.$router.push(this.mangeTitleBtns[index].path)
    },
    defaulPath() {
      if(!this.titleIndexPathData) {
        // this.titleIndexPathData = window.sessionStorage.getItem('currenTitleIndex') || 'homePage'
        this.titleIndexPathData = window.sessionStorage.getItem('currenTitleIndex') || this.mangeTitleBtns[0].path
      } else {
        this.titleIndexPathData = this.mangeTitleBtns[0].path
      }
    }
  },
  computed: {
    currentCourseInfo() {
      return JSON.parse(window.sessionStorage.getItem('currentCourseInfo')) 
    },
    titleIndexPath() {
      const getStorageTitlePath = window.sessionStorage.getItem('currenTitleIndex')
        if(this.titleIndexPathData === getStorageTitlePath) {
          return getStorageTitlePath
        } else {
          return this.titleIndexPathData  ||  getStorageTitlePath
        }
      }
  },
  mounted() {
    this.defaulPath()
  }
}
</script>

<style>
  #courseMangeTitle {
    width: 1200px; height: 380px;
    margin: 10px auto;
  }

  .mangeTitle {
    height: 60px; width: 1200px;
    /* line-height: 60px;; */
    background: white;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .coursename {
    font-size: 20px;
    margin-left: 50px;
  }

  .mangeTitleBtns {
    width: 350px;
    height: 30px;
    margin-right: 20px;
    display: flex;
    justify-content: space-around;
    justify-items: center;
  }
 
 .mangeTitleBtn {
   height: 30px; width: 60px;
   line-height: 30px;
   text-align: center;
 }

 .mangeTitleBtn:hover {
   background: #999999;
   border-radius: 4px;
   color: white;
   font-size: 17px;
   cursor: pointer;
  }

  .whichMangeSty {
    background: #999999;
    border-radius: 4px;
    color: white;
    font-size: 17px;
  }
  
  
</style>