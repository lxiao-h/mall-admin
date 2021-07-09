import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userData: cookie.getCookie(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    changeUserData(state, user) {
      cookie.setCookie(user);
      state.userData = user;
    },
    logout() {
      this.state.userData = {
        appkey: '',
        email: '',
        role: '',
        username: '',
      };
      cookie.removeCookie();
    },
  },
  actions: {
    asyncChangeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserData({ commit }, user) {
      commit('changeUserData', user);
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {},
});
