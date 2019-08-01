import api from 'API/index.js';
import {error, loading, success} from 'UTIL/handler.js';
import ls from 'API/storage.js';

const state = {
  loginStatus: false,
  userInfo: {},
};

const getters = {
  loginStatus(state){
    return state.loginStatus;
  },
  userInfo(state){
    return state.userInfo;
  }
};

const mutations = {
  changeLoginStatus(state){
    let token = ls.get('x-token');
    if(token){
      state.userInfo = JSON.parse(atob(token.split('.')[1]));
      state.loginStatus = true;
    }else{
      state.loginStatus = false;
      state.userInfo = {};
    }
  },
};

const actions = {
  //登录
  login({commit},payload){
    loading();
    return api.login(payload).then(() => {
      commit('changeLoginStatus');
      success('登录成功');
    }).catch(msg=>{
      error(msg);
    });
  },
};

export default {state, getters, mutations, actions};