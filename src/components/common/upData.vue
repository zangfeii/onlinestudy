<template>
  <div id="upData">
    <el-upload action="http://192.168.1.8:8081/api/up/upData" :show-file-list='false' :on-success="handleAvatarSuccess">
      <el-button type='success' size='mini'>上   传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'upData',
  props: {
    sendIds: {
      
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.$emit('getDataInfo', res.result)
   }
  },
}
</script>

<style>
  .upContent {
    width: 100px;
    height: 100px;
    border: 1px solid red;
  }
</style>