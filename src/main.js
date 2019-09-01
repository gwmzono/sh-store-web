import 'STYLE/index.scss';
import Vue from 'vue';
import App from 'SRC/App';
import router from 'SRC/router/index';
import store from 'SRC/store/index';
// import iView from 'iview';
const iView = require('iview');
import zCommon from './common/index.js';   //自定义内容

Vue.use(iView,{size: 'large'});
Vue.use(zCommon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');