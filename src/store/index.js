import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import pickSchool from './modules/pickSchool.js';
import sign from './modules/sign.js';

const store = new Vuex.Store({
  modules: {pickSchool, sign}
});

export default store;