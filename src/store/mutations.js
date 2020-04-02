const mutations = {
  commitTecInfoInMessage(state, tecInfo) {
    state.inMessageTec = tecInfo
  },
  commitStuInfoMessage(state, stuInfo) {
    state.inMessageStu = stuInfo
  }
}

export default mutations