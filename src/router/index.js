import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import zIndex from 'COMPONENT/zIndex';
import zSearch from 'COMPONENT/zSearch';
import zPublish from 'COMPONENT/zPublish';

const routes = [
  {path:'/', name:'index', component: zIndex},
  {path:'/search', name:'search', component: zSearch},
  {path:'/publish', name:'publish', component:zPublish}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;