<template>
  <div id="app">
    <z-header></z-header>
    <z-content></z-content>
    <z-footer></z-footer>
    <z-toolbar></z-toolbar>
  </div>
</template>

<script>
  import zHeader from './components/zHeader';
  import zContent from './components/zContent';
  import zFooter from './components/zFooter';
  import zToolbar from './components/zToolbar';
  
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    components:{
      zContent,
      zHeader,
      zFooter,
      zToolbar,
    },
    computed:{
    },
    methods: {
    },
    created(){
    },
  }
</script>

<style>
</style>