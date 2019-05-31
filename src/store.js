import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    success_msg: '',
    error_msg: [],
    loginState: false,
    userInfo: null,
    userId: JSON.parse(sessionStorage.getItem('userInof')),
  },
  mutations: {

  },
  actions: {

  }
})
