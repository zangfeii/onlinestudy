<template>
  <div id="home">
    <home-top-bar></home-top-bar>  
     <!-- <up-load></up-load> -->
     <home-tab-bar></home-tab-bar>
  </div>  
</template>

<script>
import homeTopBar from './homeCompoenet/homeTopBar'
import homeTabBar from './homeCompoenet/homeTabBar'
import upLoad from '../../components/common/upLoad'
export default {
  name: 'home',
  components: {
    homeTopBar,
    homeTabBar,
    upLoad
  },
   
}
</script>
 
<style>
  
</style>

