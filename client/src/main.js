import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import ElementUI from "element-ui";
import FormRender from "@femessage/el-form-renderer";
import refMixin from '@/mixins/refMixin';
import * as api from '@/http/api'

import "@/assets/style/index.scss";

// 引入 axios
import "@/http";

Vue.use(ElementUI);
Vue.mixin(refMixin)
Vue.prototype.$api = api
Vue.component(FormRender.name, FormRender);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
