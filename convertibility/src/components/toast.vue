<template>
  <div class="toast">
    {{ message }}
  </div>
</template>
<style lang="scss" scoped>
  .toast {
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0,0,0,.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    padding:.5rem;
    font-size:.65rem;
  }
</style>
<script>
  export default {
    props: ['message']
  }
</script>
