<template>
  <div>
    <main class="main">
      <figure>
        <img src="../assets/logo.png" alt="">
        <figcaption>摩拉旅行经营数据</figcaption>
      </figure>
      <div class="sTime">{{time}}秒跳转</div>
    </main>
  </div>
</template>
<script>
  export default {
    data() {
      return{
        time:5,
        show:false,
      }
    },
    methods:{
      countDown(){
        let THIS=this;
        THIS.time--;
      }

    },
    mounted(){
      let _this=this;
      _this.time=5;
      setInterval(_this.countDown,1000);
    },
    watch: {
      'time': function (newVal,) {
        if (newVal === 0) {
          this.show = true;
          //this.$router.push('/order');
          this.$router.push({path:'/order',query:{show:'zoom-in-center'}})
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  main {
    position: relative;
    height:100vh;
    margin:0;
    figure {
      display: block;
      top: 40%;
      position: relative;
      transform: translate(-50%,-50%);
      left: 50%;
      text-align:center;
      img {
        max-width: 100%;
      }
      figcaption {
        color:#fff;
      }
    }
    .sTime {
      position: absolute;
      top:1rem;
      right:1rem;
      background-color:rgba(0,0,0,.5);
      color:#fff;
      height:1.2rem;
      line-height:1.2rem;
      font-size:.6rem;
      padding:0 .3rem;
      border-radius:.65rem;
    }
  }
</style>
