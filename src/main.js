import Vue from 'vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueLoading, {
  height: 80,
  width: 80,
});

router.beforeEach((to, from, next) => {
  if ((to.name === 'success' || to.name === 'error') && from.name !== 'validate') {
    router.push('preview');
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    this.$store.dispatch('getAPI');
  },
}).$mount('#app');
