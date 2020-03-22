<template>
  <div id="home">
    <home-top-bar @clickUserName='clickUser'></home-top-bar>  
     <!-- <up-load></up-load> -->
     <home-tab-bar ref='homeTabBarRef' ></home-tab-bar>
     <!-- <user-info :user-info='user' v-show="isShowUserMange"></user-info> -->
  </div>  
</template>

<script>
import homeTopBar from './homeCompoenet/homeTopBar'
import homeTabBar from './homeCompoenet/homeTabBar'
// import userInfo from './homeCompoenet/userInfo/userInfo'
import upLoad from '../../components/common/upLoad'
// import { queryUserInfoById } from '../../network/quer
export default {
  name: 'home',
  components: {
    homeTopBar,
    homeTabBar,
    upLoad
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
  
</style>

