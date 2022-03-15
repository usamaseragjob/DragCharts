import Vue from "vue";
import App from "./App.vue";
import VSwitch from "v-switch-case";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
Vue.use(VSwitch);

Vue.config.productionTip = false;
Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
