<template>
  <div class="upload-area">
  <!-- 图片展示区 -->
    <p>上传物品的图片</p>
    <div class="upload-list" v-for="(item,index) in uploadList"
    :key=index>
      <template v-if="item.status === 'finished'">
        <img :src="baseUrl + item.response.path">
        <div class="upload-list-cover">
            <Icon type="ios-eye-outline" @click="handleView(item.response.path)"></Icon>
            <Icon type="ios-trash-outline" @click="handleRemove(index)"></Icon>
        </div>
      </template>
      <template v-else>
          <Progress :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <!-- 新增区 -->
    <template v-if="uploadList.length<5">
      <upload
        ref="upload"
        :action="upUrl"
        name="image"
        multiple
        :show-upload-list="false"
        :format="['jpg','jpeg','png']" 
        :max-size="1024"
        :on-success="handleSuccess" 
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :default-file-list="originImgList"
        >
        <div class="up-plus">
          <Icon type="ios-add" size="80" style="color: #c6c6c6;"/>
        </div>
      </upload>
    </template>
    <!-- 预览图 -->
    <Modal title="图片预览" v-model="visible" :footer-hide="true">
      <img :src="baseUrl + imgName" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import {deleteUp} from 'API/index.js';
  import ls from 'API/storage.js';
  import {mapMutations, mapGetters} from 'vuex';
  
  export default {
    name: 'publishUpload',
    components: {},
    props:{},
    data() {
      return {
        //上传接口
        upUrl: '//api.store.zono.com/upload',
        //图片基础地址
        baseUrl: '//store.zono.com/uploads/',
        imgName: '',
        visible: false,
        uploadList: [],
        originImgList: [],
      }
    },
    computed: {
      ...mapGetters(['loginStatus']),
    },
    methods: {
      ...mapMutations(['changeLoginStatus']),
      handleBeforeUpload(){
        this.changeLoginStatus();
        if(!this.loginStatus){
          this.$Message.error('请先登录');
          return false;
        }
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (index) {
        //服务器图片基础地址
        const item = this.uploadList[index];
        let filePath = item.response.path;
        deleteUp({file: filePath}).then(()=>{
          this.uploadList.splice(index, 1);
          ls.set('upload-cache',JSON.stringify(this.uploadList));
          if(this.uploadList.length === 0){
            ls.delete('upload-cache');
          }
        }).catch(err=>{
          this.$Message.error(err);
        });
      },
      handleSuccess (res, file, fileList) {
        // console.log(res);
        // console.log(file);
        // console.log(fileList);
        this.uploadList = fileList;
        ls.set('upload-cache',JSON.stringify(this.uploadList));
      },
      handleFormatError () {
        this.$Message.warning('图片格式错误, 只允许jpg和png');
      },
      handleMaxSize () {
        this.$Message.warning('图片大小超出限制');
      },
    },
    created(){
      let upCache = ls.get('upload-cache');
      if(upCache){
        this.originImgList = JSON.parse(upCache);
        this.uploadList = this.originImgList;
      }
    },
    updated(){
    }
  }
</script>

<style lang="scss">
  @import '~STYLE/var.scss';
  $img-size: 180px;
  #publish{
    .publish-main{
      .upload-area{
        margin: 0 48px 24px 48px;
        text-align: center;
        p{
          color: #777;
          font-size: $font-m;
          margin-bottom: 10px;
        }
        //已上传图片显示
        .upload-list{
          position: relative;
          border-radius: 5px;
          display: inline-block;
          width: $img-size;
          height: $img-size;
          line-height: $img-size;
          text-align: center;
          border: 1px dashed #a6a6a6;
          margin-right: 10px;
          img{
            max-width: $img-size;
            max-height: $img-size;
            vertical-align: middle;
            margin-top: -4px;
          }
          .upload-list-cover{
            i{
              color: rgba(255,255,255,0.6);
              position: absolute;
              top: $img-size/2 - 16;
              cursor: pointer;
              font-size: 32px;
              font-weight: 600;
            }
            i:first-of-type{
              left: 25%;
              &:hover{
                color: $primary-color;
              }
            }
            i:last-of-type{
              right: 25%;
              &:hover{
                color: $danger-color;
              }
            }
          }
        }
        //图片新增区
        .ivu-upload{
          display: inline-block;
          width:$img-size;
          height:$img-size;
          vertical-align: top;
          .up-plus{
            width: $img-size;
            height: $img-size;
            border: 1px dashed #a6a6a6;
            border-radius: 5px;
            text-align: center;
            line-height: $img-size;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>