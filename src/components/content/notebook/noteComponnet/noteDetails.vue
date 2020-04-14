<template>
  <div id="noteDetails">
    <div v-html="noteDetailData" class="noteDetailP"></div>
  </div>  
</template>

<script>
export default {
  name: 'noteDetails',
  props: {
    noteDetailData: {
      type: String,
    }
  }
}
</script>

<style>
   .noteDetailP {
     margin-left: 15px;
      word-wrap: break-word; 
   }
</style>