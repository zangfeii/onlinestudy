<template>
  <div :class="{checkbutton:ischek}">
    <img src='../../assets/img/login/tick.svg' alt="" class="checkbuttonimg">  
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
  .checkbuttonimg {
    border: 0.5px solid #919191;
    border-radius: 50%;
    width: 17px;
    height: 17px;
  }

  .checkbutton {
    background: red;
    border-radius: 50%;
    width: 17px;
    height: 17px;
  }
</style>