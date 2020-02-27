<template>
  <div id="home">
    <home-top-bar></home-top-bar>  
     <up-load></up-load>
  </div>  
</template>

<script>
import homeTopBar from './homeCompoenet/homeTopBar'
import upLoad from '../../components/common/upLoad'
export default {
  name: 'home',
  components: {
    homeTopBar,
    upLoad
  },
   
}
</script>

<style>

