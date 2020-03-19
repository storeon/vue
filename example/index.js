import Vue from "vue";
import { StoreonVue } from "..";
import App from "./App.vue";
import { store } from "./store";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "./constants/TodoFilters";

Vue.config.productionTip = false;

Vue.use(StoreonVue);

function updateFilter() {
  if (window.location.hash === "#active") {
    store.dispatch("filter/set", SHOW_ACTIVE);
  } else if (window.location.hash === "#completed") {
    store.dispatch("filter/set", SHOW_COMPLETED);
  } else {
    store.dispatch("filter/set", SHOW_ALL);
  }
}

updateFilter();
window.addEventListener("hashchange", updateFilter);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
