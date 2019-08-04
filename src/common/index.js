import zInput from './components/zInput.vue';

const components = [
  zInput,
];

export default {
  install: function(Vue) {
    for (let c of components){
      Vue.component(c.name, c);
    }
  }
}