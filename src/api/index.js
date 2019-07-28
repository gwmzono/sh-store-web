import axios from 'axios';

axios.defaults.baseURL = 'http://api.store.zono.com';

function axiosGet(url, obj){
  return axios.get(url, {params: obj});
}

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  if (res.data.err) {
    return Promise.reject(res.data.err);
  }else{ return Promise.resolve(res.data); }
}, function (err){
  return Promise.reject(err);
})

export default {
  getCity(alpha){
    return axiosGet('city', {alpha});
  },
  getSchool(city){
    return axiosGet('school', {city});
  },
  searchSchool(name){
    return axiosGet('schoolName', {name});
  }
}