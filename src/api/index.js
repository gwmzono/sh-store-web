import axios from 'axios';
import ls from './storage.js';

axios.defaults.baseURL = 'http://api.store.zono.com';
axios.defaults.timeout = 3000;

function axiosGet(url, obj){
  return axios.get(url, {params: obj});
}

//添加请求拦截器
axios.interceptors.request.use(config=>{
  let token = ls.get('x-token');
  token ? config.headers['x-token'] = token : undefined;
  return config;
}, err=>{
  return Promise.reject(err.message);
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
  if(res.data.err){  //有错误内容
    return Promise.reject(res.data.err);
  }
  if(res.headers['x-token']){  //有token
    ls.set('x-token', res.headers['x-token']);
  }
  return Promise.resolve(res.data);
}, err => {
  if(err.response && err.response.status === 401){
    ls.delete('x-token');
  }
  return Promise.reject(err.message);
});

export default {
  //用首字母搜索城市
  getCity(alpha){
    return axiosGet('city', {alpha});
  },
  //用城市搜索学校
  getSchool(city){
    return axiosGet('school', {city});
  },
  //用名字搜索学校
  searchSchool(name){
    return axiosGet('schoolName', {name});
  },
  //登录
  login(payload){
    return axios.post('login', payload);
  },
}
  
//注册
export function register(payload){
  return axios.post('register', payload);
}
//验证手机号或昵称是否存在
export function checkExist(payload){
  return axiosGet('validate', payload);
}