<template>
  <div id="searchUser">
    <admin-user-content class="searchUserContent" :admin-user-info='adminSearchUserInfos' :is-page='false'></admin-user-content>
     <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage1"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>  
</template>

<script>
import  { searchUser } from '../../../../network/user'
import adminUserContent from '../adminUerCompoent/adminUserContent'
export default {
  name: "searchUser",
  components: { adminUserContent },
  data() {
    return {
      searchContent: '',
      adminSearchUserInfos: [],
      total: 0,
      currentPage1: 1
    }
  },
  created() {
    this.getSearchResult()
    this.searchContent = this.$route.params.name
    this.$bus.$on('thirdSearch', () => {
      this.getSearchResult()
    })
    this.$bus.$on('getSearchUpdataUserInfo', () => {
      this.getSearchResult()
    })
  },
  methods: {
    getSearchResult() {
      searchUser({
        searchContent: this.$route.params.name,
        page: 1
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data) 
          this.adminSearchUserInfos = res.data.result
          this.total = res.data.total
        } else {
          console.log('查询失败')
        }
      })
   },
   handleCurrentChange(page) {
     searchUser({
        searchContent: this.$route.params.name,
        page
      }).then(res => {
        if(res.data.status === 200) {
          console.log(res.data) 
          this.adminSearchUserInfos = res.data.result
          this.total = res.data.total
        } else {
          console.log('查询失败')
        }
      })
   }
  },
  
}
</script>

<style>
  .searchUserContent {
    margin: 0 0 0 10px;
  }
</style>