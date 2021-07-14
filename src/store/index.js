import Vue from 'vue';
import Vuex from 'vuex';
import cookie from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    userData: cookie.getCookie(),
    menuRoute: [],
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
    changeRoute(state, routes) {
      state.menuRoute = routes;
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
    asyncChangeMenuRoute({ commit }, routes) {
      commit('changeRoute', routes);
    },
  },
  modules: {},
});
