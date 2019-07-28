<template>
  <div id="header">
    <div class="wrap true-wrap">
      <div class="logo fl">
        <h1>Idle 闲置物品站</h1>
      </div>
      <!-- logo END -->
      <z-school-picker></z-school-picker>
      <z-login></z-login>
    </div>
    <!-- wrap END -->
  </div>
</template>

<script>
  import zSchoolPicker from './zHeader/zSchoolPicker.vue';
  import zLogin from './zHeader/zLogin.vue';
  
  export default {
    name: 'zHeader',
    data(){
      return {}
    },
    components:{
      zSchoolPicker,
      zLogin,
    }
  }
</script>

<style lang="scss">
@import '~STYLE/var.scss';
  #header{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .logo{
      height: $header-height;
      width: 160px;
      background-color: #ccc;
      h1{
        display: none;
      }
    }
  }
</style>