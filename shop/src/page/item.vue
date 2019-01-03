<template>
  <div class="item">
    <header :class="[ scrollFlag ? 'navActive' : 'nav' ]">
      <div class="go-back" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title" v-if="scrollFlag">{{goodsHead.goodsTitle}}</div>
    </header>
    <nav class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in goodsDes.imageArry">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
    </nav>
    <main class="item">
      <div class="title">
        <span class="tag" v-if="goodsHead.orderClass === 10 && goodsHead.type === 10">电子签</span>{{goodsHead.goodsTitle}}
      </div>
      <div class="price">
        ¥{{goodsHead.preferentialPrice}} <span>¥{{goodsHead.originalPrice}}</span>
      </div>
      <ul class="title-dis">
        <li><em>{{goodsHead.salesVolume}}</em>人已买</li>
        <li style="text-align: center">库存剩<em>{{goodsHead.inventory}}</em>份</li>
        <li>评分：<em>{{goodsHead.score}}</em>分</li>
      </ul>
    </main>
    <section>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item,index) in goodsDes.table" :key="index" :label="item.tabTitle">
          <div class="tab-con" v-html="item.content"></div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <footer>
      <div class="msg" @click="service">
        <i class="el-icon-service"></i>
        在线咨询</div>
      <div v-if="goodsHead.status === 1" class="buy" @click="buyNow">立即购买</div>
      <div v-else class="buy disable">商品已经下架啦~</div>
    </footer>
  </div>
</template>

<script>
  import '../plugins/swiper.min'
  import md5 from 'js-md5'
  import {itemDes} from '../server/getData'

  export default {
    data(){
      return {
        scrollFlag:false,
        activeName: '0',
        nonce_str:Date.parse(new Date()) / 1000,
        goodsId:this.goodsId,
        goodsDes:{},
        goodsHead:{},
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId;
    },
    mounted(){
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        longSwipesRatio: 0.3,
        touchRatio:1,
        observer:true,
        observeParents:true,
        loop: false
      });
      this.initData();
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      async initData(){
        let sign;
        sign = md5('client=web&goodsId='+this.goodsId+'&language=Zh&nonce_str='+this.nonce_str+'&key=aaaaaa')
        this.sign = sign.toUpperCase();
        let res = await itemDes(this.goodsId,this.nonce_str,this.sign)
        this.goodsDes = {...res.result}
        this.goodsHead = this.goodsDes.trShopGoods;
      },
      service(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.helpToBuy.postMessage(this.goodsId);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.helpToBuy(this.goodsId)
        }else {
          let down = window.confirm('请在摩拉出行App内打开')
          if (down) {
            window.location.href = 'http://down.mulatravel.com/'
          }
        }
      },
      buyNow(){
        this.orderClass = this.goodsHead.orderClass;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.buyGoodsNow.postMessage(this.goodsId);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.buyGoodsNow(this.goodsId,this.orderClass)
        } else {
          let down = window.confirm('请在摩拉出行App内打开')
          if (down) {
            window.location.href = 'http://down.mulatravel.com/'
          }
        }
      },
      handleScroll () {
        let _this=this;
        let scrollTop;
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 345){
          _this.scrollFlag=true
        }else{
          _this.scrollFlag=false
        }
      }
    }
  }
</script>
<style lang="css">
  @import "../plugins/swiper.min.css";
</style>
