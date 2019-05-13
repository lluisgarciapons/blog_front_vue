import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';
// import Keys from '../config/keys.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: {
      payload: [],
      loading: false
    },
    login: false,
    auth: {
      login: false,
      access_token: null,
      refresh_token: null,
      token_type: null
    }
  },
  getters: {
    posts: state => {
      return state.posts;
    },
    login: state => {
      return state.auth.login;
    },
    auth: state => {
      return state.auth;
    }
  },
  mutations: {
    login: (state, data) => {
      state.auth.login = true;
      state.auth.refresh_token = data.refresh_token;
      state.auth.access_token = data.access_token;
      state.auth.token_type = data.token_type;
    },
    logout: state => {
      state.auth.login = false;
      state.auth.refresh_token = null;
      state.auth.access_token = null;
      state.auth.token_type = null;
    },
    postPosts: (state, data) => {
      state.posts.payload = data.reverse();
      state.posts.loading = false;
    },
    loadingPosts: state => {
      state.posts.loading = true;
    }

    // newPost: (state, data) => {
    //   state.posts.payload = [...state.posts.payload, data];
    // }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit('loadingPosts');
      axios({
        method: 'GET',
        url: 'https://quiet-savannah-72383.herokuapp.com/posts'
      })
        .then(res => {
          console.log(res);
          commit('postPosts', res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    login: ({ commit }, payload) => {
      var params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', payload.username);
      params.append('password', payload.password);
      axios({
        method: 'post',
        url: 'https://quiet-savannah-72383.herokuapp.com/oauth/token',
        auth: {
          username: 'my-trusted-client',
          password: 'secret'
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: params
      })
        .then(response => {
          console.log(response);
          commit('login', response.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    logout: function({ commit, state }) {
      var params = new URLSearchParams();
      params.append('access_token', state.auth.access_token);
      params.append('refresh_token', state.auth.refresh_token);

      axios({
        method: 'GET',
        url: 'https://quiet-savannah-72383.herokuapp.com/logouts',
        headers: {
          Authorization: `${state.auth.token_type} ${state.auth.access_token}`
        },
        params: params
      })
        .then(response => {
          console.log(response);
          commit('logout');
          router.push('/login');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    post: ({ dispatch, state }, payload) => {
      // var params = new URLSearchParams();
      // params.append('title', payload.title);
      // params.append('body', payload.content);
      // params.append('file', payload.image);

      var params = new FormData();
      params.append('title', payload.title);
      params.append('body', payload.content);
      params.append('file', payload.image);
      axios({
        method: 'POST',
        url: 'https://quiet-savannah-72383.herokuapp.com/post',
        headers: {
          Authorization: `${state.auth.token_type} ${state.auth.access_token}`
        },
        data: params
      })
        .then(res => {
          console.log(res);
          // commit('newPost', res.data);
          dispatch('getPosts');
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
});
