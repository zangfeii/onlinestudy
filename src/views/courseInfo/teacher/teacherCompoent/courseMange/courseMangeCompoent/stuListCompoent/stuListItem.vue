<template>
  <div id="stuListItem" @click="userClick(stuListItem._id, stuListItem)">
    <div class="userList">
      <img :src="stuListItem.headPic" alt="">
      <span class="userName">{{stuListItem.name}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
 name: 'stuListItem',
 props: {
   stuListItem: {
     type: Object,
     default() {
       return {}
     }
   }
 },
 methods: {
   userClick(stuiid, stuInfo) {
    this.$router.push({
      name: 'chatwith',
      params: { stuiid, stuInfo }
    })
   }
 },
}
</script>

<style>
  #stuListItem {
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }
  
  #stuListItem:hover {
    cursor: pointer;
  }

  .userList * {
     margin-left: 20px;
     display:inline-block;
     vertical-align:middle
  }

  #stuListItem img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  
</style>