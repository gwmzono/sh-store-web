<template>
  <div id="dialogue">
    <div class="wrap">
      
      <breadcrumb separator=">">
        <breadcrumb-item to="/">首页</breadcrumb-item>
        <breadcrumb-item>"{{userInfo.nickname}}" 的对话页</breadcrumb-item>
      </breadcrumb>
      
      <tabs type="card" closable 
      :before-remove="beforeRemoveTab"
      :animated="false">
        <tab-pane v-for="dialogue in distictItem"
        :label="dialogue.nickname"
        :key="dialogue.create_time"
        >
          <divider>{{dialogue.item_title}}</divider>
          <div v-for="content in dialogueList"
          :key="content.id" class="true-wrap">
            <p v-if="dialogue.item_id === content.item_id"
            :class="{sender:userInfo.id===content.from,receiver:userInfo.id!==content.from}"
            >
              {{content.message}}
              <i @click="handleDelete(content.id)">撤回</i>
            </p>
          </div>
          <i-input v-model="msg" type="textarea"
          :autosize="{minRows: 3}" :maxlength="10000"
          autofocus @on-keydown="sendMsg($event,dialogue)">
          </i-input>
          
          <div style="position: absolute;bottom:0;right: 20px;">
            <tag>Ctrl</tag> +
            <tag>Enter</tag> 发送
          </div>
          
        </tab-pane>
      </tabs>
      
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {dialogue, hideDialogue, sendMessage, deleteMessage} from 'API/index';
  
  export default {
    name: 'zDialogue',
    components: {},
    props:{},
    data() {
      return {
        handler: 0,
        msg: '',
        dialogueList: [],
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      distictItem(){
        //返回列表中不同的item
        let distictArr = [];
        function isExist(val){
          for(let item of distictArr){
            if(item.item_id === val){
              return true;
            }
          }
          return false;
        }
        for(let i = 0; i < this.dialogueList.length; i++){
          if(!isExist(this.dialogueList[i].item_id)){
            distictArr.push(this.dialogueList[i]);
          }
        }
        return distictArr;
      }
    },
    methods: {
      flushDialogue(){
        dialogue({user_id: this.userInfo.id})
        .then(data => {
          this.dialogueList = data;
        })
        .catch(err => {
          this.$Message.error(err);
        });
      },
      handleDelete(id){
        this.$Modal.confirm({
          title: '您确定删除这条消息吗?',
          content: '删除后对方也将看不到!',
          onOk: function(){
            deleteMessage({id}).then(() => {
              this.flushDialogue();
              this.$Message.success('删除成功');
            }).catch(err => {
              this.$Message.error(err);
            });
          },
        });
      },
      sendMsg(e,dialogue){
        let from = this.userInfo.id;
        let to = undefined;
        if(dialogue.from !== from){
          to = dialogue.from;
        }else{
          to = dialogue.to;
        }
        let message = this.msg;
        let item_id = dialogue.item_id;
        if(e.keyCode === 13 && e.ctrlKey){
          sendMessage({from, to, message, item_id}).then(() => {
            this.msg = '';
            this.flushDialogue();
          }).catch(err => {
            this.$Message.error(err);
          })
        }else{return false}
      },
      beforeRemoveTab(index){
        let removeTab = function(index){
          let item_id = this.distictItem[index].item_id;
          let user_id = this.userInfo.id;
          hideDialogue({user_id, item_id}).then(() => {
            this.flushDialogue();
            this.$Message.success('您已成功删除该对话');
          }).catch(err => {
            this.$Message.error(err);
          });
        }.bind(this);
        this.$Modal.confirm({
          title: '确定要删除该对话吗?',
          content: '删除后将不可恢复! 但不会影响对方的对话列表~',
          onOk: function(){
            removeTab(index);
          },
        });
        return new Promise(()=>{});
      }
    },
    created(){
      this.flushDialogue();
      this.handler = setInterval(function(){
        this.flushDialogue();
      }.bind(this),5000);
    },
    //组件内路由守卫
    beforeRouteLeave(to, from, next){
      if(from.name === 'dialogue'){
        clearInterval(this.handler);
      }
      next();
    },
  }
</script>

<style lang="scss">
  #dialogue{
    .ivu-breadcrumb{
      margin-bottom: 24px;
    }
    .ivu-tabs{
      width: 80%;
      margin: 0 auto;
      .ivu-tabs-content{
        max-height: 500px;
        overflow-y: auto;
        .ivu-tabs-tabpane{
          padding-bottom: 80px;
        }
        .ivu-divider{
          margin-bottom: 32px;
          color: #999;
        }
        p{
          position: relative;
          clear: both;
          margin-bottom: 36px;
          padding: 10px 20px;
          border-radius: 5px;
          max-width: 80%;
          i{
            padding-right: 10px;
            font-style: normal;
            position: absolute;
            left: -50px;
            margin: auto;
            font-size: 20px;
            color: #5cadff;
            cursor: pointer;
            visibility: hidden;
          }
        }
        p.sender{
          float: right;
          background-color: #5fb878;
          color: #fff;
        }
        p.receiver{
          float: left;
          background-color: #e2e2e2;
          i{
            display: none;
          }
        }
        p:hover{
          i{
            visibility: visible;
          }
        }
        .ivu-input-wrapper{
          width: 80%;
          position: absolute;
          bottom: 0px;
        }
      }
    }
  }
</style>