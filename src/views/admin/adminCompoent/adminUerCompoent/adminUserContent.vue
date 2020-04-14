<template>
  <div id="adminUserContent">
    <div class="adminUserInfoTitless">
      <span class="adminUserNameTitle">用户</span>
      <span class="adminUserNameMobile">电话</span>
      <span class="adminUserTime">注册日期</span>
      <span class="adminUserStatus">账号状态</span>
      <span class="adminUserTec">老师角色</span>
    </div>
    <div v-if="isHaveUsers" class="userShowContent">
      <div v-for="(item, index) in adminUserInfo" :key="index">
        <admin-user-item :admin-user-item='item'></admin-user-item>
      </div>
    </div>
    <div v-if="!isHaveUsers" class="whenNoUser">暂无用户</div>
    <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage1"
      :page-size="5"
      layout="total, prev, pager, next"
      v-if="isPage"
      :total="this.$store.state.userNums">
    </el-pagination>
  </div>  
</template>

<script>
import adminUserItem from './adminUserItem'
export default {
  name: 'adminUserContent',
  components: { adminUserItem },
  data() {
    return {
      currentPage1: 1
    }
  },
  props: {
    adminUserInfo: {
      type: Array,
      default() {
        return []
      }
    },
    isPage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isHaveUsers() {
      if(this.adminUserInfo.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('chageCurrentSize', val)
    },
  },
}
</script>

<style>
  .adminUserInfoTitless {
    display: flex;
    margin-top: 10px;
  }

  .adminUserNameTitle {
    margin: 0 250px 0 20px;
  }

  .adminUserNameMobile {
    margin-right: 120px;
  }

  .adminUserStatus {
    margin: 0 70px 0 60px;
  }

  .adminUserTime {
     margin: 0 40px 0 20px;
  }

  .userShowContent {
    height: 240px;
  }

  .whenNoUser {
    height: 240px;
    width: 890px;
    line-height: 240px;
    text-align: center;
    color: #D0D0D0;
  }
</style>