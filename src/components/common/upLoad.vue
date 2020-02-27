<template>
  <div id="upload">
  
      <el-upload class="avatar-uploader" action="http://127.0.0.1:3000/api/upload/uploadPic" :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </div>
</template>

<script>
export default {
  name: 'upLoad',
  data() {
    return {
      imageUrl:''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.status === '0') {
      this.$message.success(res.msg)
      this.imageUrl = 'localhost:8000' + res.result.data
      } else {
        this.$message.error(res.msg)
    }
  },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
}
</script>

<style>

</style>