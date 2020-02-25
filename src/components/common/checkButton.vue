<template>
  <div class="bg">
    <div :class="{checkbutton:ischek}">
      <img src='../../assets/img/login/tick.svg' alt="" class="checkbuttonimg">  
    </div>
  </div>
    
</template>

<script>

export default {
  name: 'checkButton',
  props: {
    ischek: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style>
  .bg {
    background:white;
    border-radius: 50%;
    width: 17px;
    height: 17px;
  }
  
  .checkbuttonimg {
    border: 0.5px solid #919191;
    border-radius: 50%;
    /* width: 17px;
    height: 17px; */
  }

  .checkbutton {
    background: blue;
    border-radius: 50%;
    width: 17px;
    height: 17px;
  }
</style>