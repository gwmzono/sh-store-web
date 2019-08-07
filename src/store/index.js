import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import school from './modules/school.js';
import sign from './modules/sign.js';

const store = new Vuex.Store({
  modules: {school, sign}
});

export default store;