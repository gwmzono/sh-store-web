<template>
  <div id="publish">
    <div class="wrap">
      <breadcrumb separator=">">
        <breadcrumb-item to="/">首页</breadcrumb-item>
        <breadcrumb-item>发布页</breadcrumb-item>
      </breadcrumb>
      <!-- 表单域 -->
      <div class="publish-main">
        <publish-upload></publish-upload>
        <publish-form></publish-form>
      </div>
      <!-- 表单域 END -->
    </div>
  </div>
</template>

<script>
  import publishUpload from './zPublish/publishUpload.vue';
  import publishForm from './zPublish/publishForm.vue';
  
  export default {
    name: 'zPublish',
    components: {publishUpload,publishForm},
    props:{},
    data() {
      return {
      }
    },
    computed: {},
    methods: {},
    created(){},
    updated(){},
  }
</script>

<style lang="scss">
</style>