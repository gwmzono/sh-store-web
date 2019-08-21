import zInput from './components/zInput.vue';

const components = [
  zInput,
];

export default {
  install: function(Vue) {
    for (let c of components){
      Vue.component(c.name, c);
    }
    const PROTOCOL = 'http://';
    const SERVER = 'store.zono.com/';
    Vue.prototype.protocol = PROTOCOL;
    Vue.prototype.serverRoot = SERVER;
    Vue.prototype.noneImg = PROTOCOL + SERVER + 'assets/none_img.png';
    Vue.prototype.logoImg = PROTOCOL + SERVER + 'assets/logo.png';
    Vue.prototype.imgRoot = PROTOCOL + SERVER + 'uploads/';
  }
}