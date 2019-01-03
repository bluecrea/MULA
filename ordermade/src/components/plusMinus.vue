<template>
  <div class="man-right">
    <span class="plus" @click="handleUp" :class="{'dis':currentValue >= max}">
      <i class="row"></i>
      <i class="cole"></i>
    </span>
    <span class="num">
      <input type="number" v-model="currentValue" @change="handleChange" pattern="\d*">
    </span>
    <span class="minus" :class="{'dis':currentValue <= min}" @click="handleDown">
      <i class="row"></i>
    </span>
  </div>
</template>
<script>
  export default {
    props:['max','min','value'],
    name: "plusMinus",
    data(){
      return {
        currentValue: this.value,
      }
    },
    watch:{
      currentValue: function (val) {
        //currentValue值变动就向父组件传值
        this.$emit('input',val);
        this.$emit('on-change',val);
      },
      value:function (val) {
        //对值进行验证
        //this.updataValue(val);
      }
    },
    mounted(){
      this.updataValue(this.value);
    },
    methods:{
      handleDown: function () {
        //减法
        if (this.currentValue <= this.min){
          return;
        } else {
          this.currentValue -= 1;
        }
      },
      handleUp: function () {
        //加法
        this.currentValue = parseInt(this.currentValue);
        if(this.currentValue >= this.max){
          return;
        }else{
          this.currentValue += 1;
        }
      },
      updataValue: function (val) {
        if (val > this.max){
          val = this.max
        }
        if (val < this.min){
          val = this.min
        }
        this.currentValue = val;

      },
      handleChange: function (event) {
        //对值进行验证
        let val = event.target.value.trim();
        let max = this.max;
        let min = this.min;
        if(this.isNumber(val)){
          val = Number(val);
          this.currentValue = val;
          if(val > max){
            this.currentValue = max;
          }else if (val < min){
            this.currentValue = min;
          }
        }else{
          this.currentValue = 1;
        }
      },
      isNumber: function (value) {
        return (/^\-?[0-9]+$/).test(value + '');
      }
    }
  }
</script>
