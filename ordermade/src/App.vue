<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "assets/css/mode";
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .zoom-in-center-enter-active,.zoom-in-center-leave-active{
    -webkit-transition:all .3s cubic-bezier(.55,0,.1,1);
    transition:all .3s cubic-bezier(.55,0,.1,1)
  }
  .zoom-in-center-enter,.zoom-in-center-leave{
    opacity:0;-webkit-transform:scaleX(0);
    transform:scaleX(0)
  }
  #app {
    -webkit-backface-visibility:hidden;
  }
</style>
