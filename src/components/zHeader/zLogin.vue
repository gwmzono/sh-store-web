<template>
  <div class="login fr">
    <el-button plain>注册</el-button>
    <el-button type="primary" plain>登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'zLogin',
    components: {},
    props:{},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    created(){},
    updated(){},
  }
</script>

<style lang="scss">
@import '~STYLE/var.scss';
  .login{
    line-height: $header-height;
  }
</style>