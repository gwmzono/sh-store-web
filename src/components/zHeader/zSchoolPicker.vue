<template>
  <div class="fl school-picker">
    <!-- picker -->
    <div class="select-city" @mouseenter="openPanel" 
    @mouseleave="closePanel">
      <span>{{currentSchool}} </span>
      <i class="el-icon-arrow-down"></i>
    </div>
    <!-- header-popup -->
    <div v-show="showPanel" class="header-popup"
    @mouseenter="openPanel" @mouseleave="closePanel">
      <!-- search school -->
      <p>选择城市: <z-input type="text" placeholder="搜索学校..."
        v-model.trim="schoolName" :maxlength="15"
        @z-keyup="searchSchoolByName(schoolName)"></z-input></p>
      <el-divider></el-divider>
      <!-- 字母列表区 -->
      <div class="inline-place">
        <span v-for="val in letter" @click="selectLetter(val,$event)"
        :key="val">{{val}}</span>
      </div>
      <el-divider></el-divider>
      <!-- 城市列表区 -->
      <div v-show="cityList.length" class="inline-place">
        <span v-for="city in cityList" @click="selectCity(city.name,$event)" 
        :key="city.id">{{city.name}}</span>
      </div>
      <el-divider></el-divider>
      <!-- 学校列表区 -->
      <div  v-show="schoolList.length" class="inline-place">
        <span v-for="school in schoolList"
        :key="school.id" @click="selectSchool(school.name,$event)"
        >{{school.name}}</span>
      </div>
    </div>
    <!-- header-popup END-->
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  
  export default {
    name: 'zSchoolPicker',
    data(){
      return {
        letter:['A','B','C','D','E','F','G',
                'H','I','J','K','L','M','N',
                'O','P','Q','R','S','T',
                'U','V','W','X','Y','Z'],
        currentLetter:'A',
        currentCity: '',
        showPanel: false,
        schoolName: '',
      }
    },
    /*-----------------------------------------------*/
    computed: {
      ...mapGetters(['cityList', 'schoolList','currentSchool']),
    },
    /*-----------------------------------------------*/
    methods: {
      ...mapMutations(['clearSchoolList','changeSchool']),
      ...mapActions(['getCity', 'getSchool', 'searchSchool']),
      openPanel(){
        this.showPanel = true;
      },
      closePanel(){
        this.showPanel = false;
      },
      changeSelect(e){
        let spanCol = e.target.parentNode.children;
        for(let span of spanCol){
          span.className = "";
        }
        e.target.className = "selected";
      },
      selectLetter(letter,e){
        if (this.currentLetter !== letter) {
          this.currentLetter = letter;
          this.clearSchoolList();
          this.getCity(letter);
          this.changeSelect(e);
        }
      },
      selectCity(city,e){
        if (this.currentCity !== city){
          this.currentCity = city;
          this.getSchool(city);
          this.changeSelect(e);
        }
      },
      selectSchool(school,e){
        this.changeSchool(school);
        this.closePanel();
        this.changeSelect(e);
      },
      searchSchoolByName(name){
        this.searchSchool(name);
      }
    },
    created(){
      this.getCity(this.currentLetter);
    },
  }
</script>

<style lang="scss">
@import '~STYLE/var.scss';
  .school-picker{
    position: relative;
    margin-left: 20px;
    .select-city{
      line-height: $header-height;
      &:hover{
        cursor: pointer;
        color: $primary-color;
      }
    }
    .header-popup{
      position: absolute;
      top: 60px;
      z-index: 100;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding:10px 20px;
      width: 880px;
      min-height: 150px;
      border-radius: 10px;
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
          border: 1px solid $primary-color;
        }
      }
      .el-divider{
        &:nth-of-type(1){
          margin: 20px 0;
        }
        margin: 10px 0;
        background-color: #f6f6f6;
      }
      .inline-place{
        span{
          padding: 0 5px;
          font-size: 17px;
          margin-right: 10px;
          margin-bottom: 10px;
          &:hover{
            cursor: pointer;
            color: $primary-color;
          }
          &.selected{
            color: $warning-color;
          }
        }
      }
    }
  }
      
</style>