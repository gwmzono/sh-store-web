<template>
  <input
  :type="type"  :value="value"  :disabled="disabled" :class="classObj"
  @input="$emit('input', value)" :autocomplete="autocomplete"
  @keyup.enter="$emit('z-keyup', value)">
</template>

<script>
  export default {
    name: 'zInput',
    components: {},
    props:{
      type: {
        type: String,
        default: 'text'
      },
      value: [String, Number],
      autocomplete: {
        type: String,
        default: 'off'
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        classObj: {
          'z-input': true,
          'disabled': this.disabled,
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  input{
    display: inline-block;
    margin-left: 20px;
    width: 280px;
    border: 1px solid #eee;
    border-radius: 5px;
    width: 280px;
    height: 40px;
    font-size: 14px;
    color: #aaa;
    margin-left: 20px;
    padding: 0 10px;
    &:hover{
      border: 1px solid #ccc;
    }
    &:focus{
      border: 1px solid #409EFF;
    }
    &.disabled{
      cursor: not-allowed;
    }
  }
</style>