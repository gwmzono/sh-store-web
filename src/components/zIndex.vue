<template>
  <div id="index">
    <index-header></index-header>
    <index-content></index-content>
    <index-footer></index-footer>
  </div>
</template>

<script>
  import indexHeader from './zIndex/indexHeader.vue';
  import indexContent from './zIndex/indexContent.vue';
  import indexFooter from './zIndex/indexFooter.vue';
  
  export default {
    name: 'zContent',
    components:{indexHeader, indexContent, indexFooter},
    data(){
      return {}
    },
    methods:{
    },
  }
</script>

<style>
</style>