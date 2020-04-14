<template>
  <div id="adminHome">
    <div class="adminHeader">
      <div class="adminIconNme">
        <img src="../../../public/logo.png" class="adminIcon">
        <span>后台管理</span>
      </div>
      <el-input placeholder="请输入查询内容" v-model="inputSearch" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户昵称" value="1"></el-option>
          <el-option label="课程名称" value="2"></el-option>
        </el-select>
       <el-button slot="append" icon="el-icon-search" v-if="whichSearch" @click="seachAByP"></el-button>
       <el-button slot="append" icon="el-icon-search" v-if="!whichSearch" @click="thirdSeach"></el-button>
      </el-input>
        <el-button type='success' class="adminOut" @click="adminOutlogin">退出</el-button>
    </div>
      <home-tab-bar :tab-bar-titles='adminBaRtTieles' class="adminBarTitles"></home-tab-bar>
  </div>  
</template>

<script>
import homeTabBar from '../home/homeCompoenet/homeTabBar'
export default {
  name: 'adminHome',
  components: { homeTabBar },
  data () {
    return {
      adminBaRtTieles: [
        {title: '用户', path: 'mangeuser', icon: 'el-icon-user-solid'},
        {title: '课程', path: 'mangecourse', icon: 'el-icon-reading'},
        {title: '通知', path: 'sendnotice', icon: 'el-icon-edit'},
      ],
      inputSearch: '',
      select: '',
      whichSearch: true
    }
  },
  watch: {
    select(newVal, oldVal) {
      if(newVal === '1') {
        this.whichSearch = false
      } else if(newVal === '2') {
        this.whichSearch = true
      } else {}
    }
  },
  methods: {
    adminOutlogin() {
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    searchCourse(searchContnet) {
      this.$router.push({
          name: 'searchCourse',
          params: {
            course: searchContnet
          }
        })
    },
    seachAByP() {
      if(this.select === '1') {
        this.$router.push({
          name: 'searchUser',
          params: {
            name: this.inputSearch
          }
        })
        this.whichSearch = false
      } else if(this.select === '2') {
        // this.$router.push({
        //   name: 'searchCourse',
        //   params: {
        //     course: searchContne
        //   }
        // })
        if(this.$route.name === 'searchCourse') {
          this.$bus.$emit('getThirdSearchCourse', this.inputSearch)
        } else {
          this.searchCourse(this.inputSearch)
        }
        
      } else {
        return
      }
    },
    thirdSeach() {
      this.$router.push({
          name: 'searchUser',
          params: {
            name: this.inputSearch
          }
        })
        this.$bus.$emit('thirdSearch')
    }
  },
}
</script>

<style>
    
   .adminHeader {
    width: 100%;
    background: #272C33;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .adminIcon {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }

  .adminOut {
    height: 35px;
  }

  .adminIconNme {
    display: flex;
    align-items: center;
  }

  .adminIconNme span {
    color: #D3DCE6;
    font-size: 20px;
    width: 80px;
  }

  .adminBarTitles {
    /* margin-left: -20px; */
    margin: 10px auto;
  }

  .input-with-select {
    width: 600px;
    margin-left: 200px;
  }

  .el-select {
    width: 110px;
  }
</style>