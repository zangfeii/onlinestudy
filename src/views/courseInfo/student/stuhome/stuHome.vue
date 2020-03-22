<template>
  <div id='stuhome'>
    <stu-course-list :cou-chapers='courseChaper'></stu-course-list>
    <stu-course-topic :topic-info='courseTopic' :create-topics-user-info='createTopicInfo'></stu-course-topic>
  </div>
</template>

<script>
import stuCourseList from './stuHomeComponent/stuCourseList'
import stuCourseTopic from './stuHomeComponent/stuCourseTopic'

import {  queryCurrentCourseChapters, queryCurrentCourseTopic } from '../../../../network/query'
import { stuCreateOneTopic } from '../../../../network/user'
export default {
  name: 'stuhome',
  components: { stuCourseList, stuCourseTopic },
  created() {
     document.title = this.$route.meta.title
  },
  data() {
    return {
      courseInfo: {},
      currentUsersCourseInfo: {},
      courseChaper: [],
      courseTopic: [],
      createTopicInfo: {}
    }
  },
  created() {
    this.getCourseINfos()
    this.getCourChapters()
    this.getCourseTopics()
    console.log(this.currentUsersCourseInfo);
    this.createTopicInfo = new stuCreateOneTopic(this.currentUsersCourseInfo, this.courseInfo)
    this.createTopicInfo.createiid = this.currentUsersCourseInfo.user_id
  },
  methods: {
    //获取当前课信息 和用户信息
    getCourseINfos() {
      this.courseInfo = JSON.parse(window.sessionStorage.getItem('currentCourseInfo'))
      this.currentUsersCourseInfo = JSON.parse(window.sessionStorage.getItem('user'))
    },
    //获取当前课程列表
    getCourChapters() {
      queryCurrentCourseChapters({
        currentcourseiid: this.courseInfo._id,
        currentteacheriid: this.courseInfo.cteacheriid}).then(res => {
          if(res.data.status === 200) {
            this.courseChaper = res.data.data.cc_chapters
            console.log(this.courseChaper);
          }
        })
    },
    //获取话题内容
    getCourseTopics() {
      queryCurrentCourseTopic({
        teacheriid: this.courseInfo.cteacheriid,
        courseiid: this.courseInfo._id
      }).then(res => {
        if(res.data.status === 200) {
          this.courseTopic = res.data.result
        }
      })
    }
  },
}
</script>

<style>
  #stuhome {
    display: flex;
    align-items:flex-start;
  }
</style>