<template>
  <div id="adminUserItem">
    <div class="adminUserPic">
      <img :src="adminUserItem.headPic" class="adminUserPic">
    </div>
    <span class="adminName" :class="{adminUseOverflow: isFlowAdminName}">{{adminUserItem.name}}</span>
    <span class="adminMobile">{{adminUserItem.mobile}}</span>
    <span class="adminCreateTime">{{adminUserItem.createTime.substr(0, 10)}}</span>
    <div class="adminUSerActive">
      <el-switch v-model="isActive" @change='changeUserChange(adminUserItem._id)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </div>
    <div class="adminUserRole">
      <el-switch v-model="isTeacher"  active-color="#13ce66" inactive-color="#ff4949" @change="changeUserRole(adminUserItem._id)"></el-switch>
    </div>
  </div>  
</template>

<script>
import { setUserStatus, setUserRole } from '../../../../network/user'
export default {
  name: 'adminUserItem',
  props: {
    adminUserItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isFlowAdminName() {
      if(this.adminUserItem.name.length >= 8) {
        return true
      } else {
        return false
      }
    },
    isActive: {
      get() {
        if(this.adminUserItem.status === 1) {
          return true
        } else {
          return false
        }
      },
      set() {}
    },
    isTeacher: {
      get() {
        if(this.adminUserItem.role === 1) {
          return false
       } else {
        return true
        }
      },
      set() {}
    }
  },
  methods: {
    whichGetUserInfo() {
      if(typeof  this.$parent.$parent.getAllUserInfo === 'function') {
        this.$parent.$parent.getAllUserInfo()
      } else {
        this.$bus.$emit('getSearchUpdataUserInfo')
      }
    },
    changeUserChange(id) {
      setUserStatus({useriid: id}).then(res => {
        if(res.data.status === 200) {
          this.whichGetUserInfo()
          this.$message.success('修改该用户状态成功')
        } else {
          this.$message.error('修改该用户状态失败')
        }
      })
      
    },
    changeUserRole(id) {
      console.log(this.adminUserItem);
      setUserRole({id}).then(res => {
        if(res.data.status === 200) {
          this.whichGetUserInfo()
          this.$message.success('修改用户角色成功')
        } else {
          this.$message.error('修改用户角色失败')
        }
      })
    }
  },
}
</script>

<style>
  #adminUserItem {
    margin: 10px 0 5px;
    height: 40px;
    line-height: 40px;
    display: flex;
  }
  
  .adminUserPic {
    display: flex;
    width: 100px;
    margin: 2.5px 0 5px;
  }

  .adminName {
    display: block;
    white-space: nowrap;
    line-height: 40px;
    margin-left: 10px;
    margin-right: 20px;
    width: 150px;
  }

  .adminUseOverflow {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .adminUserPic {
    width: 30px;
    height: 30px;
    line-height: 40px;
    border-radius: 50%;
  }

  .adminMobile, .adminCreateTime, .adminUserRole,.adminUSerActive  {
     margin: 0 50px 0;
  }
</style>