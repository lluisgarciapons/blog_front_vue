import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.login) {
      console.log(store.getters.login);
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch('getPosts');
  }
}).$mount('#app');
