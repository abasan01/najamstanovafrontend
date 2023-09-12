import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import EasySlider from "vue-easy-slider";

Vue.use(EasySlider);

Vue.use(VueCompositionAPI)
Vue.config.productionTip = false

export const eventBus = new Vue();


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')