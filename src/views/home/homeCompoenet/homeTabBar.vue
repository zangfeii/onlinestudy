<template>
  <div id="homeTabBar" v-show="showCurrent">
    <div class="tabRight">
      <!-- <div class="tabRightTitle"  v-for="(item, index) in   tabRightTitlesPath" :key="index" -->
      <div class="tabRightTitle"  v-for="(item, index) in   tabBarTitles" :key="index"
        :class="{titleClickColor: item.path ===  titleIndexPath}" 
        @click="rightTitleClick(index, item.path)">
       <i :class="item.icon"></i> <a class="tabRightTitleA" >{{item.title}}</a>
      </div>
    </div>
    <div class="tabmain">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'homeTabBar',
  props: {
    showCurrent: {
      type: Boolean,
      default: true
    },
    tabBarTitles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // tabRightTitlesPath: [
      //   {title: '课程', path: 'course', icon: 'el-icon-tickets'},
      //   {title: '首页', path: 'main', icon: 'el-icon-s-home'},
      //   {title: '收件箱', path: 'inbox', icon: 'el-icon-receiving'},
      //   {title: '消息', path: 'message', icon: 'el-icon-chat-dot-round'},
      //   {title: '笔记', path: 'notebook', icon: 'el-icon-notebook-2'},
      //   {title: '账号管理', path: 'mange', icon: 'el-icon-setting'}
      // ],
      titleIndexPathData: '',
    }
  },
  computed: {
    titleIndexPath() {
      const getStorageTitlePath = window.sessionStorage.getItem('tabTitlePath')
        if(this.titleIndexPathData === getStorageTitlePath) {
          return getStorageTitlePath
        } else {
          return this.titleIndexPathData  ||  getStorageTitlePath
        }
      },
  },
  methods: {
    rightTitleClick(index, path) {
      this.titleIndexPathData = path
      window.sessionStorage.setItem('tabTitlePath', path)
      this.$router.push(this.tabBarTitles[index].path)
    },
    defaulPath() {
      if(!this.titleIndexPathData) {
        this.titleIndexPathData = window.sessionStorage.getItem('tabTitlePath') || this.tabBarTitles[0].path
      } else {
        this.titleIndexPathData = this.tabBarTitles[0].path
      }
    }
  }, 
  mounted() {
    this.defaulPath()
  },
  created() {
  },
}
</script>

<style>
  #homeTabBar {
    width: 1200px;
    display: flex;
    align-items:flex-start;
  }

  .tabRight {
    border-radius: 8px;
    background: #272C33;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
  }

  .tabRightTitle {
    padding: 10px 40px 0;
    height: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px
  }

  .tabRightTitle:hover {
    color: skyblue;
  }

  .tabmain {
    width: 900px;
    height: 600px;
  }

  .titleClickColor {
    color: skyblue;
  }
</style>