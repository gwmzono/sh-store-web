<template>
  <div class="wrap content">
    <tabs v-model="currentCate">
      <tab-pane v-for="prop in tabProp" :key="prop.id"
      :name="prop.label" :label="prop.label">
        <item-list :item-list="itemList"></item-list>
      </tab-pane>
    </tabs>
    <page :page-size="size" :total="total" @on-change="handleClickPage"></page>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {category} from 'API/index.js';
  import itemList from '../zSearch/itemList.vue';
  
  export default {
    name: 'indexContent',
    components: {itemList},
    props:{},
    data() {
      return {
        itemList:{},
        currentCate: '最新',
        tabProp:[
          {id: 1, label: '最新'},
          {id: 2, label: '电瓶车'},
          {id: 3, label: '自行车'},
          {id: 4, label: '书籍'},
          {id: 5, label: '艺术品'},
          {id: 6, label: '其他'},
        ],
        size:8,
        total:0,
      }
    },
    computed: {
      ...mapGetters(['currentSchool']),
    },
    methods: {
      handleClickPage(index){
        this.$Spin.show();
        let req = {
          school: this.currentSchool,
          page: index,
          size: this.size,
        };
        if(this.currentCate !== '最新'){
          req.cate = this.currentCate;
        }
        category(req).then(data => {
          this.itemList = data.data;
          this.total = data.count;
          this.$Spin.hide();
        }).catch(err => {
          this.$Message.warning(err);
          this.itemList = {};
          this.total = 0;
          this.$Spin.hide();
        });
      }
    },
    watch:{
      currentSchool(){
        this.handleClickPage(1);
      },
      currentCate(){
        this.handleClickPage(1);
      }
    },
    created(){
      this.handleClickPage(1);
    },
    updated(){},
  }
</script>

<style lang="scss">
  @function tabWidth($num){
    @return (1100px-16px*5)/$num;
  }
  #index{
    .content{
      .ivu-tabs .ivu-tabs-nav{
        .ivu-tabs-tab{
          width: tabWidth(6);
          text-align: center;
          font-size: 20px;
          &:last-of-type{
            margin-right: 0;
          }
        }
        .ivu-tabs-tab-active{
          font-size: 24px;
        }
      }
      .ivu-page{
        text-align: center;
      }
    }
  }
</style>