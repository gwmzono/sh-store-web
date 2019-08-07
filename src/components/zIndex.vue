<template>
  <div id="index">
    <index-top></index-top>
    <index-content></index-content>
  </div>
</template>

<script>
  import indexTop from './zIndex/indexTop.vue';
  import indexContent from './zIndex/indexContent.vue';
  
  export default {
    name: 'zContent',
    components:{indexTop, indexContent},
    data(){
      return {}
    },
    methods:{
    },
  }
</script>

<style>
</style>