<template>
  <div id="topicConten">
    <topic-content-item :course-topic-item-data='item' v-for="(item, index) in topicData" 
      :key="index" @deleteTopic='deleteTopic' :delete-btn='isDeleteBtn' @updateTopicToUp='updateToUp' @updateTopicToDown='updateToDown' ></topic-content-item>
  </div>  
</template>

<script>
import topicContentItem from './topicContentItem'
export default {
  name: 'topicContent',
  components: { topicContentItem },
  props: {
    topicData: {
      type: Array,
      default() {
        return []
      }
    },
    isDeleteBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    deleteTopic(topicid, courseid, teacherid) {
      this.$emit('deleteContentClick', topicid, courseid, teacherid)
    },
    updateToUp(topicid, courseid, teacherid) {
      this.$emit('updateCourseTopicUp', topicid, courseid, teacherid)
    },
    updateToDown(topicid, courseid, teacherid) {
      this.$emit('updateCourseTopicDown', topicid, courseid, teacherid)
       
    }
  },
}
</script>

<style>

</style>