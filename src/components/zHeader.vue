<template>
  <div id="header">
    <div class="wrap true-wrap">
      <div class="logo fl">
        <h1>Idle 闲置物品站</h1>
      </div>
      <!-- logo END -->
      <z-school-picker></z-school-picker>
      <z-sign></z-sign>
    </div>
    <!-- wrap END -->
  </div>
</template>

<script>
  import zSchoolPicker from './zHeader/zSchoolPicker.vue';
  import zSign from './zHeader/zSign.vue';
  
  export default {
    name: 'zHeader',
    data(){
      return {}
    },
    components:{
      zSchoolPicker,
      zSign,
    },
  }
</script>

<style lang="scss">
@import '~STYLE/var.scss';
  #header{
    margin-bottom: 24px;
    @extend %shadow;
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