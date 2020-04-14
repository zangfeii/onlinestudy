const mutations = {
  commitTecInfoInMessage(state, tecInfo) {
    state.inMessageTec = tecInfo
  },
  commitStuInfoMessage(state, stuInfo) {
    state.inMessageStu = stuInfo
  },
  getNoteDetailsUpdate(state, noteInfo) {
    state.noteDetailsInfo = noteInfo
  },
  getNoteId(state, id) {
    state.noteid = id
  },
  restMseeageDetailUserInfo(state) {
    state.inMessageTec = {}
    state.inMessageStu = {}
  },
  getUSerNums(state, nums) {
    state.userNums = nums
  },
  getSearchCourse(state, coursName) {
    state.searchCourse = coursName
  }
}

export default mutations