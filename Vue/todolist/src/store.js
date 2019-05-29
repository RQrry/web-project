import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: []
  },
  mutations: {
    addItem (state, value) {
      state.lists.unshift(value)
    },
    deleteItem (state, id) {
      state.lists.splice(state.lists.findIndex(item => item.id === id), 1)
    }
  },
  actions: {

  }
})
