<template>
  <div class="z-item">
    <template v-if="itemList && itemList.length">
      <ul>
        <li v-for="(item, index) in itemList"
        class="item-box"
        :key="index"
        @click="handleClickItem(index)">
          <div class="img-box" :style="picList[index]"></div>
          <div class="desc">
            <span class="price">&yen;{{item.price}}</span>
            <span v-if="item.old_price" class="price old-price">原价: &yen;{{item.old_price}}</span>
            <p class="title">{{item.title}}</p>
          </div>
          <div class="underline"></div>
        </li>
      </ul>
    </template>
  
    <template v-else>
      <div>no result</div>
    </template>
    
  </div>
</template>

<script>
  // 只要传进来一个itemList 就可以渲染出搜索页
  export default {
    name: 'itemList',
    components: {},
    props:['itemList'],
    data() {
      return {
      }
    },
    computed: {
      picList(){
        let imgList = [];
        for(let item of this.itemList){
          if(item.pic){
            imgList.push({
              backgroundImage: 'url(' + this.imgRoot + item.pic.split(';')[0] + ')'
            });
          }else{
            imgList.push({
              backgroundImage: 'url(' + this.failedImg + ')'
            });
          }
        }
        return imgList;
      },
    },
    methods: {
      handleClickItem(index){
        window.open(this.protocol + location.host + '/item/'
          + this.itemList[index].id);
      },
    },
    mounted(){
    },
  }
</script>

<style lang="scss">
 @keyframes box-shadow{
   from{}
   to{background-color: #00A694;}
 }
  $item-size: 260px;
  $space: 20px;
  .z-item{
    .item-box{
      position: relative;
      border-bottom: 5px solid #fff;
      cursor: pointer;
      margin-right: $space;
      margin-bottom: $space;
      display: inline-block;
      list-style: none;
      width: $item-size;
      vertical-align: top;
      &:nth-of-type(4n+0){
        margin-right: 0;
      }
      .img-box{
        width: $item-size;
        height: $item-size;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .desc{
        border-top: 0;
        padding: 10px;
        .price{
          color: #ff4400;
          font-weight: 600;
          font-size: 20px;
          &.old-price{
            float: right;
          }
        }
        .title{
          color: #333;
          margin: 10px 0;
        }
      }
      .underline{
        width: 100%;
        height: 375px;
        padding-top: 370px;
        position: absolute;
        top: 0px;
        background-clip: content-box;
        &:hover{
          animation: box-shadow forwards 1s;
        }
      }
    }
  }
</style>