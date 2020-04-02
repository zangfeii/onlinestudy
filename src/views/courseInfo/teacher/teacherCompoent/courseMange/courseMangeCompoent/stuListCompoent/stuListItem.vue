<template>
  <div id="stuListItem">
    <div class="userList">
      <img :src="stuListItem.headPic" alt="">
      <span class="userName" :class="{ userNameHidden: stuListItem.name.length > 6}">{{stuListItem.name}}</span>
      <div class="leaveMessageHover"  @click="userClick(stuListItem)">交流</div>
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
   userClick(stu) {
     window.sessionStorage.setItem('chatStuInfo', JSON.stringify(stu))
     const chat =  this.$router.resolve({
       name: 'leaveMessage',
       params: {
         siid: stu._id,
         ciid: this.$route.params.cciid
       }
     })
     window.open(chat.href, '_blank')
     this.$bus.$emit('clickUserTurnMessage')
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

  .userName {
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .userNameHidden {
    overflow: hidden;
  }
  
  #stuListItem:hover {
    cursor: pointer;
  }

  .userList * {
     margin-left: 10px;
     display: inline-block;
     vertical-align: middle;
  }

  .userList {
    position: relative;
  }

  .userList:hover .leaveMessageHover {
    display: inline-block;
  }

  .leaveMessageHover {
    display: none;
    position: absolute;
    top: 6px;
    right: 5px;
  }

  #stuListItem img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

</style>