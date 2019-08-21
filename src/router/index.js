import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'STORE/index.js';
import {Message} from 'iview';
Vue.use(VueRouter);

import zIndex from 'COMPONENT/zIndex';
import zSearch from 'COMPONENT/zSearch';
import zPublish from 'COMPONENT/zPublish';
import zDetail from 'COMPONENT/zDetail';
import zDialogue from 'COMPONENT/zDialogue';
import zConsole from 'COMPONENT/zConsole';
import notFound from 'COMPONENT/404.vue';

const routes = [
  {path:'/', name:'index', component: zIndex},
  
  {path:'/search', name:'search', component: zSearch},
  
  {path:'/item/:id', name:'item', component: zDetail},
  
  {path:'/publish', name:'publish', component:zPublish,
  meta:{requireLogin: true}},
  
  {path:'/dialogue', name:'dialogue', component:zDialogue,
  meta:{requireLogin: true}},
  
  {path:'/console', name:'console', component: zConsole,
  meta:{requireLogin: true}},
  
  {path:'/404', name:'404', component:notFound,},
  
  {path:'*', name: 'none', component: zIndex},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

//全局前置守卫
router.beforeEach((to, from, next) => {
  if(to.name === 'none'){
    next({name: 'index'});
  }else{
    //有requireLogin元信息就检查是否登录
    if(to.meta.requireLogin){
      store.commit('changeLoginStatus');
      if(!store.getters.loginStatus){
        next({name: 'index'});
        Message.error('请先登录');
      }else{
        next();
      }
    }else{
      next();
    }
  }
})

export default router;