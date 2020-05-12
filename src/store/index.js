import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    changeUserInfo(state, payload) {
      const { data } = payload;
      state.userInfo = data;
    },
    deleteUserInfo(state) {
      state.userInfo = {};
    },
  },
  actions: {
    changeUserInfo(context, payload) {
      context.commit(payload);
    },
    deleteUserInfo(context) {
      context.commit("deleteUserInfo");
    },
  },
  modules: {},
});
