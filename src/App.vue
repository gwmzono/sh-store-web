<template>
  <div id="app">
    <z-header></z-header>
    <router-view></router-view>
    <z-footer></z-footer>
  </div>
</template>

<script>
  import zHeader from './components/zHeader';
  import zFooter from './components/zFooter';

  export default {
    name: 'app',
    data(){
      return {
      }
    },
    components:{
      zHeader,
      zFooter,
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