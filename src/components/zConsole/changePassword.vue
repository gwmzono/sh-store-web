<template>
  <div style="padding: 24px 96px;">
    
    <i-form :model="formData" :label-width="120" label-position="left"
    :rules="formRule" ref="formValid">
      <form-item label="初始密码: " prop="origin">
        <i-input type="text" v-model="formData.origin" clearable
        placeholder="请输入原来的密码..."></i-input>
      </form-item>
      <form-item label="新密码: " prop="newPass">
        <i-input type="text" v-model="formData.newPass" clearable
        placeholder="请输入新密码..."></i-input>
      </form-item>
      <form-item label="确认新密码: " prop="reNewPass">
        <i-input type="text" v-model="formData.reNewPass" clearable
        placeholder="请确认新密码..."></i-input>
      </form-item>
      <form-item>
        <i-button type="primary" style="margin-left: 30%;"
        @click="submitChange">确认修改</i-button>
      </form-item>
    </i-form>
    
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {changePassword} from 'API/index.js';
  
  export default {
    name: 'changePassword',
    components: {},
    props:{},
    data() {
      const checkPassword = (rule, value, callback) => {
        if(value === this.formData.origin){
          callback(new Error('新密码必须与原密码不一样哟~'))
        }else{
          callback();
        }
      };
      
      const checkRepassword = (rule, value, callback) => {
        if(value !== this.formData.newPass){
          callback(new Error('两次密码不一致'));
        }else{
          callback();
        }
      };
      
      return {
        formData:{
          origin:'',
          newPass:'',
          reNewPass:'',
        },
        formRule: {
          origin:[
            {required: true, message:'密码必须', trigger:'blur'},
            {type: "string", pattern:/^[a-zA-Z]\w{7,31}$/, message:'必须以字母开头且大于8位', trigger:'blur'},
          ],
          newPass:[
            {required: true, message:'密码必须', trigger:'blur'},
            {type: "string", pattern:/^[a-zA-Z]\w{7,31}$/, message:'必须以字母开头且大于8位', trigger:'blur'},
            {validator:checkPassword, trigger:'blur'},
          ],
          reNewPass:[
           {required: true, message:'必须确认', trigger:'blur'},
            {validator:checkRepassword, trigger:'blur'},
          ],
        },
      };
    },
    computed: {...mapGetters(['userInfo']),},
    methods: {
      submitChange(){
        this.$refs['formValid'].validate((valid) => {
          if(valid){
            let origin = this.formData.origin;
            let password = this.formData.newPass;
            let id = this.userInfo.id;
            changePassword({id, password, origin}).then(()=>{
              this.$Message.success({content:'密码修改成功, 下次登录时生效',duration:3});
            }).catch(err=>{
              this.$Message.error(err);
            });
          }
        })
      }
    },
    created(){},
    updated(){
      this.formData.origin = this.formData.origin.trim();
      this.formData.newPass = this.formData.newPass.trim();
      this.formData.reNewPass = this.formData.reNewPass.trim();
    },
  }
</script>

<style lang="scss">
  #console{
    .main-content{
      .ivu-form{
        .ivu-form-item{
          margin-bottom: 48px;
          label{
            font-size: 16px;
          }
          .ivu-btn{
            font-size: 16px;
          }
        }
      }
    }
  }
</style>