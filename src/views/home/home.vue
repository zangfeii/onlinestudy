<template>
  <div id="home">
    <home-top-bar @clickUserName='clickUser'></home-top-bar>  
    <home-tab-bar ref='homeTabBarRef' class="homeTatBarTitles" :tab-bar-titles='homeBarTitles' ></home-tab-bar>
  </div>  
</template>

<script>
import homeTopBar from './homeCompoenet/homeTopBar'
import homeTabBar from './homeCompoenet/homeTabBar'
export default {
  name: 'home',
  components: {
    homeTopBar,
    homeTabBar,
  },
  data () {
    return {
      homeBarTitles: [
        {title: '课程', path: 'course', icon: 'el-icon-tickets'},
        {title: '首页', path: 'main', icon: 'el-icon-s-home'},
        {title: '收件箱', path: 'inbox', icon: 'el-icon-receiving'},
        {title: '消息', path: 'message', icon: 'el-icon-chat-dot-round'},
        {title: '笔记', path: 'notebook', icon: 'el-icon-notebook-2'},
        {title: '账号管理', path: 'mange', icon: 'el-icon-setting'}
      ]
    }
  },
  methods: {
    clickUser() {
      this.isshowCurrent = false
      window.sessionStorage.setItem('tabTitlePath', 'mange')
      this.$refs.homeTabBarRef.rightTitleClick(5, 'mange')
      this.$router.push('mange')
    }
  },
   
}
</script>
 
<style>
  .homeTatBarTitles {
    margin: 10px auto;
  }
</style>

