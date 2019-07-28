import 'STYLE/index.scss';
import Vue from 'vue';
import App from 'SRC/App';
import router from 'SRC/router/index';
import store from 'SRC/store/index';
import ElementUi from 'element-ui';
import zPlug from './plugins/index.js';   //自定义插件
// const Vue = require('vue');
// const App = require('./App.vue');
// const router = require('./router/index.js');
// const store = require('./store/index.js');
// const ElementUi = require('element-ui');

Vue.use(ElementUi);
Vue.use(zPlug);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');