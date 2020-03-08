import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      // localStorage 存储 string 而不是 object
      localStorage.setItem('user', JSON.stringify(userData))
      // 将token 加到 header
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    LOGOUT (state) {
      localStorage.removeItem('user')
      // it is essentially forcing a refresh of our page.
      location.reload()
      // state.user = null;
      // axios.defaults.headers.common['Authorization'] = null
      
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios.post('//localhost:3000/register',
        credentials).then(({ data }) => {
        commit('SET_USER_DATA', data)
      })
    },
    login ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout ({ commit }) {
      commit('LOGOUT')
    }
  }
})
