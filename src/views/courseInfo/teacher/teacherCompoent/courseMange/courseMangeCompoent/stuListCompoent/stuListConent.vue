<template>
  <div id="stuListCon">
    <h5 class="stuNums">学生人数:{{ stuListConent.length}}</h5>
    <div>
      <stu-list-item :stu-list-item='item' v-for="(item, index) in stuListConent"
        :key="index">
      </stu-list-item>
    </div>
  </div>  
</template>

<script>
import stuListItem from './stuListItem'
export default {
  name: 'stuListConent',
  components: { stuListItem },
  props: {
    stuListConent: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    
  },
}
</script>

<style>
  .stuNums {
    margin-top: 10px;
    text-align: center;
  }
</style>