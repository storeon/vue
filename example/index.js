import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import StoreonVue from '../';

Vue.config.productionTip = false;

Vue.use(StoreonVue)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
