<template>
  <div id="detail">
    <div class="wrap">
      <breadcrumb separator=">" style="margin-bottom: 24px;">
        <breadcrumb-item to="/">首页</breadcrumb-item>
        <breadcrumb-item>宝贝详情</breadcrumb-item>
      </breadcrumb>
      
      <div class="item-main true-wrap">
        <div class="item-photo">
          <Carousel v-model="imgIndex" loop :height="560" arrow="always"
          dots="outside">
            <carousel-item v-for="(img,index) in bgImgList" :key="index">
              <div class="img-box" :style='img'>
              </div>
            </carousel-item>
          </Carousel>
        </div>
        <div class="item-title">
          <div class="item-title-1">
            <p>{{itemInfo.title}}</p>
          </div>
          <div class="item-title-2">
            <p>价 格 : <span>&yen; {{itemInfo.price}}</span>
              <template v-if="itemInfo.old_price">
                原 价 : <span>&yen; {{itemInfo.old_price}}</span>
              </template>
            </p>
          </div>
          <div class="item-title-3">
            <p>所 在 学 校 : {{itemInfo.school}}</p>
          </div>
          <div class="item-title-4">
            <p>发 布 者 : {{itemInfo.nickname}}</p>
          </div>
          <div class="item-title-5">
            <p v-if="itemInfo.create_time">发 布 于 : <i-time :time="itemInfo.create_time"/></p>
          </div>
          <div class="item-title-6">
            <i-button type="primary" @click="sendMsg">给 ta 留言</i-button>
          </div>
        </div>
      </div>
      
      <div class="item-desc">
        <p class="desc-title">宝贝描述 :</p>
        <p>{{itemInfo.desc}}</p>
        <div class="img-detail">
          <div v-for="(img,index) in imgList"
          :key="index"
          style="margin-bottom: 24px;">
            <p>图 {{index+1}} :</p>
            <img :src="img" alt="图片加载失败">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //商品详情页
  import {detail, sendMessage} from 'API/index.js';
  import ls from 'API/storage.js';
  import {mapGetters} from 'vuex';
  
  export default {
    name: 'zDetail',
    components: {},
    props:{},
    data() {
      return {
        imgIndex: 0,
        itemId: this.$route.params.id,
        itemInfo: {},
        inputMsg: '',
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      imgList(){
        let list = [];
        let tmp;
        if(this.itemInfo.pic){
          tmp = JSON.parse(this.itemInfo.pic);
        }else{
          return [];
        }
        if(tmp.length === 0){
          list.push(this.noneImg);
          return list;
        }
        for(let img of tmp){
          list.push(this.imgRoot + img);
        }
        return list;
      },
      bgImgList(){
        let list = [];
        for (let img of this.imgList){
          list.push('background-image: url(' + img + ');');
        }
        return list;
      }
    },
    methods: {
      sendMsg(){
        this.$Modal.confirm({
          title: '请输入留言内容',
          closable: true,
          okText: '发送',
          render: (h) => {
            return h('i-input', {
              props:{
                value: this.inputMsg,
                autofocus: true,
                type: 'textarea',
                autosize: {minRows:3},
              },
              on: {
                input: (val) => {
                  this.inputMsg = val;
                }
              },
            })
          },
          onOk: () => {
            let from = this.userInfo.id;
            let to = this.itemInfo.user_id;
            let item_id = this.itemId;
            let message = this.inputMsg;
            sendMessage({from, to, item_id, message}).then(() => {
              this.$Message.success({
                content: '留言成功, 可以在"我的消息"中查看详细内容',
                duration: 10,
                closable: true,
              });
              this.inputMsg = '';
            }).catch(err => {
              this.$Message.error(err);
            });
          }
        });
      },
    },
    created(){
      //请求物品id
      this.$Spin.show();
      detail({id: this.itemId}).then(data=>{
        this.itemInfo = data;
        this.$Spin.hide();
      }).catch(() => {
        this.$Spin.hide();
        this.$router.replace({name: '404'});
      });
      //删除之前遗留的表单
      if(ls.get('publish-form')){
        ls.delete('publish-form');
      }
    },
    updated(){},
  }
</script>

<style lang="scss">
  $photo-width: 560px;
  #detail{
    .item-main{
      margin-bottom: 24px;
      .item-photo{
        width: $photo-width;
        float: left;
        .ivu-carousel{
          .ivu-carousel-item{
            .img-box{
              width: 100%;
              height: 100%;
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
            }
          }
        }
      }
      .item-title{
        width: 1060px - $photo-width;
        float: right;
        .item-title-1{
          margin-bottom: 48px;
          font-size: 32px;
          font-weight: 600;
        }
        .item-title-2{
          margin-bottom: 48px;
          font-size: 20px;
          p:first-of-type{
            vertical-align: middle;
          }
          span{
            font-size: 32px;
            color: #ff4400;
            margin-left: 24px;
            &:first-of-type{
              margin-right: 48px;
            }
          }
        }
        .item-title-3{
          margin-bottom: 24px;
        }
        .item-title-4{
          margin-bottom: 24px;
        }
        .item-title-5{
          margin-bottom: 48px;
        }
        .item-title-6{
          text-align: center;
          .ivu-btn{
            font-size: 24px;
          }
        }
      }
    }
    .item-desc{
      p{
        margin-bottom: 24px;
        &.desc-title{
          font-size: 28px;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 2px solid #ddd;
        }
      }
      .img-detail{
        width: 800px;
        margin: 0 auto;
        p{
          font-size: 20px;
        }
        img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>