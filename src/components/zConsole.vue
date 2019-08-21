<template>
  <div id="console">
    <div class="wrap true-wrap">
      
      <i-menu width="20%" active-name="changePassword"
      @on-select="changeMenuItem">
        <menu-group title="用户管理">
          <menu-item name="changePassword">
            密码修改
          </menu-item>
          <menu-item name="unregister">
            <span style="color: red;">账户注销</span>
          </menu-item>
        </menu-group>
        <menu-group title="物品管理">
          <menu-item name="itemList">物品列表</menu-item>
        </menu-group>
      </i-menu>
      
      <div class="main-content">
        <keep-alive>
          <component :is="which"></component>
        </keep-alive>
      </div>
      
    </div>
  </div>
</template>

<script>
  import changePassword from './zConsole/changePassword.vue';
  import unregister from './zConsole/unregister.vue';
  import itemList from './zConsole/showAllItem.vue';
  
  export default {
    name: 'zConsole',
    components: {changePassword,unregister,itemList},
    props:{},
    data() {
      return {
        which: 'changePassword',
      }
    },
    computed: {},
    methods: {
      changeMenuItem(name){
        this.which = name;
      }
    },
    created(){},
    updated(){},
  }
</script>

<style lang="scss">
  #console{
    .ivu-menu{
      float: left;
      .ivu-menu-item-group-title{
        color: #b6b6b6;
      }
    }
    .main-content{
      float: right;
      width: 75%;
      margin-left: 5%;
    }
  }
</style>