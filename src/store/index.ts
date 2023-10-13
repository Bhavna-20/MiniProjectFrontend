import { createStore } from 'vuex';

import createPersistedStore from 'vuex-persistedstate';

export default createStore({
  state: {
    accessToken: null,
    isLoggedIn: false,
    userId: null,
  },

  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
      state.isLoggedIn = !!token;
    },

    setUserId(state, userId) {
      state.userId = userId;
    },
  },

  actions: {
    login({ commit }, { token, userId }) {
      commit('setAccessToken', token);
      commit('setUserId', userId);
    },
    logout({ commit }) {
      commit('setAccessToken', null);

      commit('setUserId', null);
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAccessToken: (state) => state.accessToken,
    getUserId: (state) => state.userId,
  },

  plugins: [
    createPersistedStore({
      key: 'mini-project',
      paths: ['accessToken', 'isLoggedIn', 'userId'],
    }),
  ],
});
