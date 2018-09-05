// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* Required by BootstrapVue */
import 'babel-polyfill';

/* Global Components */
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';

/* Local Components and modules */
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Add router state to store
sync(store, router);

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
