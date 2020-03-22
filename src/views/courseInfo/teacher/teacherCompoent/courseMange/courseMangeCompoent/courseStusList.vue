<template>
  <div id="courseStuList">
    <stu-list-conent :stu-list-conent='stuListData'></stu-list-conent>
  </div>
</template>

<script>
import stuListConent from './stuListCompoent/stuListConent'
export default {
  name: 'courseStusList',
  components: { stuListConent },
  props: {
    stuListData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  #courseStuList {
    width: 20%;
    margin-right: 20px;
    border-radius: 10px;
    background: #272C33;
    color: white;
  }
</style>