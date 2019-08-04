<template>
  <div class="sign fr">
    <template v-if="!loginStatus">
      <i-button @click="regModal=true">注册</i-button>
      <i-button type="primary" @click="loginModal=true">登录</i-button>
    </template>
    <template v-if="loginStatus">
      <dropdown @on-click="userMenuSelect" placement="bottom-end">
        <a href="javascript:;">
          {{userInfo.nickname}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <dropdown-menu slot="list">
          <dropdown-item name="console">个人中心</dropdown-item>
          <dropdown-item name="exit">退出</dropdown-item>
        </dropdown-menu>
      </dropdown>
    </template>
    <!-- 注册 -->
    <modal v-model="regModal" class="register">
      <div slot="header">注册</div>
      <i-form :model="regData" label-position="top" :rules="regRules"
              ref="regForm">
        <form-item label="所在学校:" prop="school">
          <i-select v-model="regData.school" filterable remote
          :remote-method="searchSchool" :loading="loading">
            <i-option v-for="option in schoolList" :key="option.id"
            :value="option.name">{{option.name}}</i-option>
          </i-select>
        </form-item>
        <form-item label="手机号码:" prop="phone">
          <i-input type="text" v-model="regData.phone" 
          placeholder="手机号"></i-input>
        </form-item>
        <form-item label="密码:" prop="password">
          <i-input type="password" v-model="regData.password"
          placeholder="密码" @on-enter="handleRegSubmit('regForm')"></i-input>
        </form-item>
        <form-item label="确认密码:" prop="repassword">
          <i-input type="password" v-model="regData.repassword"
          placeholder="确认密码" @on-enter="handleRegSubmit('regForm')"></i-input>
        </form-item>
        <form-item label="昵称:" prop="nickname">
          <i-input type="text" v-model="regData.nickname"
          placeholder="昵称, 不填默认为手机号"
          @on-enter="handleRegSubmit('regForm')"></i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleRegSubmit('regForm')">注册</i-button>
          <i-button @click="regModal = false;">取消</i-button>
        </form-item>
      </i-form>
      <div slot="footer" style="display: none;"></div>
    </modal>
    <!-- 注册 END -->
    <!-- 登录 -->
    <modal v-model="loginModal" class="login">
      <div slot="header">登录</div>
      <div slot="footer" style="display: none;"></div>
      <i-form :model="loginData" label-position="top" :rules="loginRules"
              ref="loginForm">
        <form-item label="手机号码:" prop="phone">
          <i-input type="text" v-model="loginData.phone" 
          placeholder="手机号" @on-enter="handleLoginSubmit('loginForm')"></i-input>
        </form-item>
        <form-item label="密码:" prop="password">
          <i-input type="password" v-model="loginData.password"
          placeholder="密码" @on-enter="handleLoginSubmit('loginForm')"></i-input>
        </form-item>
        <form-item>
          <i-button type="primary" @click="handleLoginSubmit('loginForm')">登录</i-button>
          <i-button @click="loginModal=false;">取消</i-button>
          <a href="javascript:;"
            @click="loginModal=false; regModal=true;"
            style="float: right;">注册>></a>
        </form-item>
      </i-form>
    </modal>
    <!-- 登录 END -->
  </div>
</template>

<script>
  import api from 'API/index.js';
  import {checkExist, register} from 'API/index.js';
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import ls from 'API/storage.js';
  
  export default {
    name: 'zSign',
    props:{},
    data() {
      //注册 验证
      const checkPhoneExist = (rule, value, callback) =>{
        checkExist({phone: value})
        .then(() =>{
          callback();
        })
        .catch(msg=> {
          callback(new Error(msg));
        })
      };
      const checkNicknameExist = (rule, value, callback) => {
        checkExist({nickname: value})
        .then(() => {
            callback();
        })
        .catch(msg => {
          callback(new Error(msg));
        })
      };
      const checkRepassword = (rule, value, callback) => {
        if(value !== this.regData.password){
          callback(new Error('两次密码不一致'));
        }else{
          callback();
        }
      };
      
      return {
        //注册 data
        regModal: false,
        regData:{
          school:'',
          phone:'',
          password:'',
          repassword: '',
          nickname:'',
        },
        loading: false,
        schoolList:[],
        regRules: {
          school:[
            {required:true, message:'必须填写', trigger:'blur'},
            {type:"string", min:2, max:20, message:'2-20个汉字', trigger:"blur"}
          ],
          phone:[
            {required: true, message:'手机号必须', trigger:'blur'},
            {type:'string', pattern:/^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur'},
            {validator:checkPhoneExist, trigger:'no'},
          ],
          password:[
            {required: true, message:'密码必须', trigger:'blur'},
            {type: "string", pattern:/^[a-zA-Z]\w{7,31}$/, message:'必须以字母开头且大于8位',trigger:'blur'}
          ],
          repassword:[
            {required: true, message:'必须确认',trigger:'blur'},
            {validator:checkRepassword, trigger:'blur'},
          ],
          nickname:[
            {type:'string', min:2, max:16, message:'昵称2-16个字',trigger:'blur'},
            {validator:checkNicknameExist, trigger:'no'},
          ],
        },
        
        //登录 data
        loginModal: false,
        loginData: {
          phone: '',
          password: '',
        },
        loginRules: {
          phone:[
            {required: true, message:'手机号必须', trigger:'blur'},
            {type:'string', pattern:/^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur'},
          ],
          password:[
            {required: true, message:'密码必须', trigger:'blur'},
            {type: "string", pattern:/^[a-zA-Z]\w{7,31}$/, message:'必须以字母开头且大于8位',trigger:'blur'}
          ],
        }
      } //data return END
    },
    computed: {
      ...mapGetters(['loginStatus','userInfo']),
    },
    methods: {
      ...mapMutations(['changeLoginStatus']),
      ...mapActions(['login']),
      // 搜索学校
      searchSchool(query){
        let flag = query.search(/^[\u4e00-\u9fa5 ]{2,20}$/);
        if(flag !== -1){
          api.searchSchool(query).then(data=>{
            this.schoolList = data;
          }).catch(err=>{
            this.$Message.error(err);
          });
        }else{
          this.$Message.destroy();
          this.$Message.error('学校名称必须是汉字');
        }
      },
      //注册 方法
      handleRegSubmit(ref){
        this.$refs[ref].validate((valid) => {
          if(valid){
            this.$Message.loading({
              content: '表单提交中...',
              duration: 0,
            });
            register(this.regData).then(data =>{
              this.$Message.destroy();
              if(data.err !== false){
                this.$Message.error(data.err);
              }else{
                this.$Message.success('注册成功');
                this.regModal = false;
              }
            }).catch(err => {
              this.$Message.destroy();
              this.$Message.error(err);
            });
          }else{
            this.$Message.error('信息填写不正确');
          }
        });
      },
      
      //登录 方法
      handleLoginSubmit(ref){
        this.$refs[ref].validate(valid => {
          if(valid){
            this.login(this.loginData);
          }else{
            this.$Message.error('请更改错误');
          }
        })
      },
      //用户管理
      userMenuSelect(name){
        switch(name){
          case 'console':
            break;
          case 'exit':
            ls.delete('x-token');
            this.changeLoginStatus();
            break;
          default: break;
        }
      },
    },//-------------------------------methods
    watch:{
      loginStatus(newStatus){
        if(newStatus === true){
          this.loginModal=false;
        }else{
          this.loginModal=true;
        }
      },
    },
    created(){
      this.changeLoginStatus();
    },
    updated(){
    },
  }
</script>

<style lang="scss">
@import '~STYLE/var.scss';
  // 按钮
  .sign{
    line-height: $header-height;
    .ivu-btn{
      &:first-of-type{
        margin-right: 20px;
      }
    }
  }
  //对话框
  .ivu-modal{
    .ivu-modal-header{
      text-align: center;
      font-size: $font-l;
    }
    .ivu-modal-body{
      padding: 16px 48px;
      .ivu-form-item-content{
        text-align: center;
        .ivu-btn:first-of-type{
          margin-right: 60px;
        }
        .ivu-select-input{
          cursor: text;
        }
      }
      .ivu-form-item-label{
        font-size: $font-s;
      }
    }
    .ivu-modal-footer{
      border-top: 0;
      padding: 0;
    }
  }
  //登录特别样式
  .login{
    .ivu-modal{
      .ivu-modal-body{
        padding: 40px 72px 16px;
        .ivu-form-item{
          margin-bottom: 32px;
        }
      }
    }
  }
  
</style>