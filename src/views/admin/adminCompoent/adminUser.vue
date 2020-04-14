<template>
  <div id="admin">
    <inbox-bread :bread-titles='adminUserBreadTtiels' :isHaveBack='false'></inbox-bread> 
    <admin-user-content :admin-user-info='adminUserInfos' @chageCurrentSize='changeSize'></admin-user-content> 
  </div>  
</template>

<script>
import { getAllUserSomeInfo } from '../../../network/user'
import inboxBread from '../../../components/content/inbox/inboxBread/inboxBread'
import adminUserContent from './adminUerCompoent/adminUserContent'
export default {
  name: 'adminUser',
  components: { inboxBread, adminUserContent },
  data() {
    return {
      adminUserBreadTtiels: ['首页', '用户'],
      adminUserInfos: []
    }
  },
  created() {
    this.getAllUserInfo()
  },
  methods: {
    getAllUserInfo() {
      getAllUserSomeInfo({page: 1}).then(res => {
        if(res.data.status === 200) {
          this.adminUserInfos = res.data.data
          this.$store.commit('getUSerNums', res.data.total)
        }
      })
    },
    changeSize(page) {
      console.log(page);
      getAllUserSomeInfo({page}).then(res => {
        if(res.data.status === 200) {
          console.log(this.adminUserInfos[0].name);
          this.adminUserInfos = res.data.data
        }
      })
    }
  },
}
</script>

<style>
  #admin {
    margin-left: 10px;
    margin-top: -10px;
  }
</style>