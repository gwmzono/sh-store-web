<template>
  <div>
    <i-table :columns="itemHeader" :data="itemContent"
    height="500">
      <template slot="action" slot-scope="{row}">
        <i-button type="primary" size="default" style="margin-right: 10px;"
        @click="editItem(row.id)">编辑</i-button>
        <i-button type="warning" size="default"
        @click="deleteItem(row.id, row.title)">删除</i-button>
      </template>
    </i-table>
  </div>
</template>

<script>
  import {allItem, detail, deleteItem} from 'API/index.js';
  import {mapGetters} from 'vuex';
  import ls from 'API/storage.js';
  
  export default {
    name: 'showAllItem',
    components: {},
    props:{},
    data() {
      return {
        itemHeader:[
          {title: '分类', key: 'cate', maxWidth: 100},
          {title: '标题', key: 'title', width: 200, tooltip: true,},
          {title: '描述', key: 'desc', width: 200, tooltip: true},
          {title: '价格', key: 'price', maxWidth: 100},
          {title: '原价', key: 'old_price', maxWidth: 100},
          {title: '操作', slot: 'action', width: 160, align:'center'},
        ],
        itemContent:[],
      }
    },
    computed: {...mapGetters(['userInfo']),},
    methods: {
      listAllItem(){
        let user_id = this.userInfo.id;
        allItem({user_id}).then(data => {
          this.itemContent = data;
        }).catch(err => {
          this.$Message.error(err);
        });
      },
      
      editItem(id){
        detail({id}).then(data => {
          //成功过标志
          let form = {
            cate: data.cate,
            title: data.title,
            desc: data.desc,
            price: data.price,
            oldPrice: data.old_price,
          };
          //处理pic
          let upload = [];
          let tempArr = JSON.parse(data.pic);
          for (let index in tempArr){
            upload[index] = {
              status:'finished',
              percentage:100,
              response:{
                path: tempArr[index]
              }
            }
          }
          //缓存
          ls.set('upload-cache', JSON.stringify(upload));
          ls.set('publish-form', JSON.stringify(form));
        }).catch(err => {
          this.$Message.error(err);
        });
        window.open(`${this.protocol}${location.host}/publish?item=${id}`);
      },
        
      deleteItem(id,title){
        this.$Modal.error({
          title: `您确定要删除吗?`,
          content: `删除后不可恢复--[${title}]`,
          okText: '删除',
          closable: true,
          onOk: () => {
            deleteItem({id}).then(()=>{
              this.listAllItem();
              this.$Message.success(`删除成功! -- [${title}]`);
            }).catch(err=>{
              this.$Message.error(err);
            });
          }
        })
      },
    },
    created(){
      this.listAllItem();
    },
    updated(){},
  }
</script>

<style></style>