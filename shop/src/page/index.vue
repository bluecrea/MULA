<template>
  <div>
    <header>
      <div class="close" @click="close"><i class="el-icon-arrow-left"></i></div>
      <div class="title">商品列表</div>
    </header>
    <main style="margin-top:2rem;padding-bottom:1rem;">
      <div class="grid-list">
        <router-link class="card" v-for="(item,index) in goodsItem" :key="index" :to="{path:'item',query:{goodsId:item.id}}" tag="div">
            <div class="card-media">
              <img :src="item.goodsImg" alt="">
            </div>
            <div class="card-title-container">
              <div class="card-title">{{item.goodsTitle}}</div>
              <div class="title-price">
                <span>¥{{item.preferentialPrice}}</span>
                <i>¥{{item.originalPrice}}</i>
              </div>
              <div class="rate">
                <p class="left" v-if="!item.salesVolume">0人已买</p>
                <p class="left" v-else>{{item.salesVolume}}人已买</p>
                <p class="right" v-if="item.score > 4">{{item.score}}分</p>
              </div>
            </div>
        </router-link>
      </div>
    </main>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import {shopList} from "../server/getData";

  export default {
    data() {
      return {
        num: 10,
        loading:false,
        nonce_str:Date.parse(new Date()) / 1000,
        page:1,
        goodsItem:{},
        type:'',
      }
    },
    created(){
      this.type = this.$route.query.type;
    },
    mounted(){
      this.initShopList();
    },
    methods:{
      async initShopList(){
          let sign;
          if (this.type === '') {
            sign = md5('client=web&language=Zh&nonce_str='+this.nonce_str+'&page='+this.page+'&key=aaaaaa');
          } else {
            sign = md5('client=web&language=Zh&nonce_str='+this.nonce_str+'&page='+this.page+'&type='+this.type+'&key=aaaaaa');
          }
          this.sign = sign.toUpperCase();
          let res = await shopList(this.nonce_str,this.page,this.type,this.sign);
          this.goodsItem = {...res.result.list}
      },
      close() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.closeWindow.postMessage(null);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.closeWindow()
        }
      }
    }
  }
</script>
