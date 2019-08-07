<template>
  <div class="wrap true-wrap top">
    <!-- 搜索 -->
    <div class="search">
      <i-input type="text" v-model="searchText"
      placeholder="用空格分隔来分词搜索"
      search @on-search="searchItem"></i-input>
    </div>
    <!-- 搜索 END -->
    <!-- 发布按钮 -->
    <div class="publish">
      <i-button class="fr" @click="publishItem">
        <Icon type="md-add-circle" size="24" color="#57a3f3"/>
        发布闲置
      </i-button>
    </div>
    <!-- 发布按钮 END -->
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  
  export default {
    name: 'indexTop',
    components: {},
    props:{},
    data() {
      return {
        searchText: '',
      }
    },
    computed: {
      ...mapGetters(['loginStatus','currentSchool']),
    },
    methods: {
      ...mapMutations(['changeLoginStatus']),
      searchItem(){
        this.$router.push({
          name: 'search',
          query:{school: this.currentSchool, keyword: this.searchText}
        });
      },
      publishItem(){
        this.changeLoginStatus();
        if(this.loginStatus === false){
          this.$Message.destroy();
          this.$Message.error('请先登录');
        }else{
          window.open(this.protocol + location.host + '/publish');
        }
      }
    },
    created(){},
    updated(){},
  }
</script>

<style lang="scss">
  @import '~STYLE/var.scss';
  #index{
    .top{
      @extend %shadow;
      padding: 20px 100px;
      margin-bottom: 24px;
      .search{
        float: left;
        width: 40%;
        .ivu-input{
          height: 40px;
          line-height: 40px;
          font-size: $font-s;
        }
        .ivu-icon{
          height: 40px;
          line-height: 40px;
          width: 40px;
          font-size: $font-l;
        }
      }
      .publish{
        float: right;
        .ivu-btn{
          height: 40px;
          font-size: $font-s;
        }
      }
    }
  }
</style>