<template>
  <div class="rating_container">
    <section class="star_container">
      <div :style="'width:' + divisor/divided*100 + '%'" class="star_overflow">
      </div>
    </section>
    <section class="rating_num">{{(divisor/divided*100).toFixed(1) + '%'}}</section>
  </div>
</template>

<script>
  export default {
    data(){
      return{
      }
    },
    mounted(){
    },
    props:['divisor','divided'],
  }
</script>
