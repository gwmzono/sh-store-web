<template>
  <div id="search" class="wrap">
    
    <breadcrumb separator=">">
      <breadcrumb-item to="/">首页</breadcrumb-item>
      <breadcrumb-item>结果为: "{{school}}" 的 "{{keyword}}"</breadcrumb-item>
    </breadcrumb>
    
    <item-list :item-list="response.data"></item-list>
    
    <page :total="response.total" :page-size="size" @on-change="changePage"></page>
  </div>
</template>

<script>
  import {search} from 'API/index.js';
  import itemList from './zSearch/itemList.vue';
  import {mapGetters} from 'vuex';
  
  export default {
    name: 'zSearch',
    components: {itemList},
    props:{},
    data() {
      return {
        response: [],
        school: this.$route.query.school,
        keyword: this.$route.query.keyword,
        size: 8,
      }
    },
    computed: {
      ...mapGetters(['currentSchool']),
    },
    methods: {
      changePage(index){
        this.$Message.loading('加载中...');
        search(
  {school: this.school, keyword: this.keyword, page:index, size:this.size}
          ).then(data=>{
          this.$Message.destroy();
          this.response = data;
        }).catch(err => {
          this.$Message.destroy();
          this.$Message.warning(err);
        });
      }
    },
    watch:{
      currentSchool(newValue){
        this.school = newValue;
        this.changePage(1);
      }
    },
    created(){
      this.changePage(1);
    },
    updated(){},
  }
</script>

<style lang="scss">
  #search{
    .ivu-breadcrumb{
      margin-bottom: 24px;
    }
    .ivu-page{
      text-align: center;
    }
  }
</style>