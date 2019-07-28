import api from 'API/index.js';

const state = {
  currentSchool: '苏州大学',
  cityList : [],
  schoolList : [],
};
const getters = {
  currentSchool(state){
    return state.currentSchool;
  },
  cityList(state){
    return state.cityList;
  },
  schoolList(state){
    return state.schoolList;
  },
};
const mutations = {
  changeCityList(state, payload){
    state.cityList = payload;
  },
  changeSchoolList(state, payload){
    state.schoolList = payload;
  },
  clearSchoolList(state){
    state.schoolList = [];
  },
  changeSchool(state, payload){
    state.currentSchool = payload;
  }
};
const actions = {
  //获取城市
  getCity({commit}, payload){
    return api.getCity(payload)
              .then((data) => {
                commit('changeCityList', data);
              })
              .catch((err) => {
                console.log(err);
              });
  },
  //获取学校
  getSchool({commit}, payload){
    return api.getSchool(payload)
              .then((data) => {
                commit('changeSchoolList', data);
              })
              .catch((err) => {
                console.log(err);
              });
  },
  //搜索学校
  searchSchool({commit}, payload){
    return api.searchSchool(payload)
              .then((data) => {
                commit('changeSchoolList', data);
              })
              .catch((err) => {
                console.log(err);
              });
  },
};
export default {state, getters, mutations, actions};