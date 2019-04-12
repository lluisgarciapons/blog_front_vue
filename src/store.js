import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import Keys from '../config/keys.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [
      {
        id: 7,
        title: 'Боксовите',
        body:
          'Скандалът с целувката може да попречи на кариерата на Кубрат Пулев в следващите месеци, смята авторитетното издание WorldBoxingNews.net.',
        creationDate: '2019-04-01T09:26:01.270+0000',
        image: 'https://placeimg.com/640/440/nature',
        creator: {
          id: 1,
          username: 'user',
          roles: [
            {
              id: 2,
              name: 'USER'
            },
            {
              id: 3,
              name: 'ACTUATOR'
            }
          ]
        }
      },
      {
        id: 8,
        title: 'Боксовите 0',
        body:
          'Скандалът с целувката може да попречи на кариерата на Кубрат Пулев в следващите месеци, смята авторитетното издание WorldBoxingNews.net.',
        creationDate: '2019-04-01T09:26:15.237+0000',
        image: 'https://placeimg.com/640/440/animals',
        creator: {
          id: 1,
          username: 'user',
          roles: [
            {
              id: 2,
              name: 'USER'
            },
            {
              id: 3,
              name: 'ACTUATOR'
            }
          ]
        }
      },
      {
        id: 9,
        title: 'Боксовите 1',
        body:
          'Скандалът с целувката може да попречи на кариерата на Кубрат Пулев в следващите месеци, смята авторитетното издание WorldBoxingNews.net.',
        creationDate: '2019-04-01T09:26:20.024+0000',
        image: 'https://placeimg.com/640/440/arch',
        creator: {
          id: 1,
          username: 'user',
          roles: [
            {
              id: 2,
              name: 'USER'
            },
            {
              id: 3,
              name: 'ACTUATOR'
            }
          ]
        }
      }
    ],
    login: false
  },
  getters: {
    posts: state => {
      return state.posts;
    },
    login: state => {
      return state.login;
    }
  },
  mutations: {
    login: state => {
      state.login = true;
    },
    logout: state => {
      state.login = false;
    }
  },
  actions: {
    login: ({ commit }) => {
      var params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', 'userthree');
      params.append('password', 'userthree');
      axios({
        method: 'post',
        url: 'https://warm-fjord-35879.herokuapp.com/oauth/token',
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
          commit('login');
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout: ({ commit }) => {
      commit('logout');
    }
  }
});
