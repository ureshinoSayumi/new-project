import { createStore } from 'vuex';

export default createStore({
  state: {
    isLogged: false,
  },
  getters: {
  },
  mutations: {
    updateAuth(state, val) {
      state.isLogged = val;
    },
  },
  actions: {
  },
  modules: {
  },
});
