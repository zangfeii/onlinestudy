<template>
  <div id="upData">
    <el-upload action="http://127.0.0.1:3000/api/up/upData" :show-file-list='false' :on-success="handleAvatarSuccess">
     <!-- <p>上传</p> -->
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