<template>
  <div id="app">
    <z-header></z-header>
    <router-view></router-view>
    <z-footer></z-footer>
    <z-toolbar></z-toolbar>
  </div>
</template>

<script>
  import zHeader from './components/zHeader';
  import zFooter from './components/zFooter';
  import zToolbar from './components/zToolbar';

  export default {
    name: 'app',
    data(){
      return {
      }
    },
    components:{
      zHeader,
      zFooter,
      zToolbar,
    },
    computed:{
    },
    methods: {
    },
    updated(){
    },
    created(){
    },
    mounted(){
    }
  }
</script>

<style>
</style>