import zInput from './components/zInput.vue';

const components = [
  zInput,
];

export default {
  install: function(Vue) {
    for (let c of components){
      Vue.component(c.name, c);
    }
    const PROTOCOL = 'http://'
    Vue.prototype.protocol = PROTOCOL;
    Vue.prototype.failedImg = PROTOCOL + 'store.zono.com/assets/default_pic.png';
    Vue.prototype.imgRoot = PROTOCOL + 'store.zono.com/uploads/';
  }
}