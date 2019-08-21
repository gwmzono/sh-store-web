<template>
  <i-form label-position="left" :label-width="100" :model="publishForm"
    :rules="validateForm" ref="publishItemForm">
    <form-item prop="title" label="商品名称:">
      <i-input type="text" v-model="publishForm.title"
      style="width:500px;" :maxlength="30" placeholder="搜索的依据, 尽量全面一点"></i-input>
      <span style="margin-left:10px;color:#c6c6c6">输入4-30个字</span>
    </form-item>
    <form-item prop="desc" label="商品描述:">
      <i-input type="textarea" v-model="publishForm.desc"
      style="width:700px;" :rows="8" placeholder="10个字以上描述..."></i-input>
    </form-item>
      
    <row>
      <i-col :span="8">
        <form-item prop="cate" label="商品分类:">
          <i-select v-model="publishForm.cate" style="width: 150px;">
            <i-option v-for="item in itemCategory" :key="item"
            :value="item">{{item}}</i-option>
          </i-select>
        </form-item>
      </i-col>
      <i-col :span="8">
        <form-item prop="price" label="商品价格:">
          <i-input type="text" v-model="publishForm.price"
          style="width:150px;text-align: center;" :number="true"
          placeholder="0.00-9999.99">
            <template slot="append">元</template>
          </i-input>
        </form-item>
      </i-col>
      <i-col :span="8">
        <form-item prop="oldPrice" label="商品原价:">
          <i-input type="text" v-model="publishForm.oldPrice"
          style="width:150px;text-align: center;" :number="true"
          placeholder="0.00-9999.99">
            <template slot="append">元</template>
          </i-input>
        </form-item>
      </i-col>
    </row>
      
    <form-item>
      <i-button type="primary" @click="publish">
        <template v-if="this.$route.query.item">完成</template>
        <template v-else>提交</template>
      </i-button>
    </form-item>
    
  </i-form>
</template>

<script>
  import ls from 'API/storage.js';
  import {mapMutations, mapGetters} from 'vuex';
  import {publish, editItem} from 'API/index.js';
  
  export default {
    name: 'publishForm',
    components: {},
    props:{},
    data() {
      const checkOldprice = (rule, value, callback) =>{
        if(!value){
          callback();
        }else if(value < this.publishForm.price){
          callback(new Error('原价要比定价大哟'));
        }else{
          callback();
        }
      }
      
      return {
        itemInfo: {},
        publishForm: {
          title:'',
          desc:'',
          cate:'',
          price:'',
          oldPrice:'',
        },
        itemCategory:['电瓶车', '自行车', '书籍', '艺术品', '其他'],
        validateForm:{
          title:[
            {required: true, message:'必须填写标题', trigger:"blur"},
            {type:'string', min:4,max:30,message:'标题要4-30个字', trigger:"blur"},
          ],
          desc:[
            {required: true, message:'必须填写描述', trigger:"blur"},
            {type:'string', min:10, max:60000, message:'描述最少10个字', trigger:"blur"},
          ],
          cate:[
            {required: true, message:'必须选择一个分类', trigger:"blur"},
          ],
          price:[
            {type:'number',required:true, message:'必需填写数字', trigger:'blur'},
            {type:'number', min:0, max:9999.99, message:'价格超出范围', trigger:"blur"},
          ],
          oldPrice:[
            {validator: checkOldprice, trigger:'blur'},
          ],
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
    },
    methods: {
      ...mapMutations(['changeLoginStatus']),
      publish(){
        this.$refs['publishItemForm'].validate(valid=>{
          if(valid){
            //更新状态
            this.changeLoginStatus();
            if(JSON.stringify(this.userInfo) === '{}'){
              this.$Message.error('请先登录');
              return false;
            }
            ls.delete('publish-form');
            window.onbeforeunload = undefined;
            this.$Message.loading({content:'提交中...', duration:0});
            //处理pic
            if(ls.get('upload-cache')){
              let picArr = JSON.parse(ls.get('upload-cache'));
              let picStr = '';
              for(let item of picArr){
                picStr += item.response.path + ';';
              }
              this.publishForm.pic = picStr;
            }else{
              this.publishForm.pic = '';
            }
            ls.delete('upload-cache');
            //处理school和user_id
            this.publishForm.user_id = this.userInfo.id;
            this.publishForm.school = this.userInfo.school;
            //发送请求
            if(this.$route.query.item){
              editItem({
                ...this.publishForm,
                id:this.$route.query.item,
              }).then(data => {
                this.$Message.destroy();
                this.itemInfo = data;
                this.$Message.success('正在跳转商品详情页...');
                setTimeout(function(){
                  this.$router.replace({path: `/item/${this.itemInfo.id}`});
                }.bind(this), 1500);
              }).catch(err => {
                this.$Message.destroy();
                this.$Message.error(err);
              });
            }else{
              publish(this.publishForm).then(data => {
                this.$Message.destroy();
                this.itemInfo = data;
                this.$Message.success('正在跳转商品详情页...');
                setTimeout(function(){
                  this.$router.replace({path: `/item/${this.itemInfo.id}`});
                }.bind(this), 1500);
              }).catch(err => {
                this.$Message.destroy();
                this.$Message.error(err);
              });
            }
          }else{
            this.$Message.error('表单填写错误');
          }
        });
      }
    },
    created(){
      //浏览器离开前储存表单
      window.onbeforeunload = function(){
        ls.set('publish-form',JSON.stringify(this.publishForm));
        if(this.$route.query.item){
          let pic = '';
          if(ls.get('upload-cache')){
            let picArr = JSON.parse(ls.get('upload-cache'));
            let picStr = '';
            for(let item of picArr){
              picStr += item.response.path + ';';
            }
            pic = picStr;
          }
          editItem({
            pic,cancel:true,id:this.$route.query.item
          }).then(()=>{}).catch(()=>{});
          ls.delete('upload-cache');
          ls.delete('publish-form');
        }
      }.bind(this)
      //恢复表单
      if(ls.get('publish-form')){
        this.publishForm = JSON.parse(ls.get('publish-form'));
      }
    },
    updated(){
    },
  }
</script>

<style lang="scss">
  @import "~STYLE/var.scss";
  #publish{
    .ivu-breadcrumb{
      margin-bottom: 24px;
    }
    .publish-main{
      padding: 32px 0;
      border-radius: 10px;
      width: 100%;
      @extend %shadow;
      .ivu-form{
        margin: 0 48px;
        .ivu-form-item{
          .ivu-form-item-label{
            font-size: $font-s;
          }
          .ivu-btn{
            font-size: $font-m;
            width: 100px;
            height: 50px;
            margin-left: 38%;
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>