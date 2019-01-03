<template>
  <div class="success">
    <div class="sc-icon sc-success sc-animate-success-icon" style="display: block;">
      <div class="sc-success-circular-line-left"></div>
      <span class="sc-success-line-tip sc-animate-success-line-tip"></span>
      <span class="sc-success-line-long sc-animate-success-line-long"></span>
      <div class="sc-success-ring"></div>
      <div class="sc-success-fix"></div>
      <div class="sc-success-circular-line-right"></div>
    </div>
    <div class="txt">
      <h4>兑换成功</h4>
      <p>可在摩拉旅行APP-钱包查看</p>
    </div>
    <div class="login-btn">
      <button style="width: 7rem!important;" @click="$router.go(-1)">返回上一级</button>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      goBack(){
        this.$router.push('/');
      }
    }
  }
</script>
