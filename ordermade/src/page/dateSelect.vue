<template>
  <div>
    <input @click="showDatePicker" v-model="beginTime" type="text" placeholder="开始日期" readonly>
    <input type="text" v-model="endTime" placeholder="结束日期" readonly>
    <date-picker v-show="showPicker" @confirm="confirm" @hide-time-picker="hideDatePicker"></date-picker>
  </div>
</template>

<script>
  import datePicker from '../components/datePicker'

  export default {
    data() {
      return {
        showPicker: false,
        beginTime:'',
        spacesDays:'',
        endTime:'',
      }
    },
    components: {
      datePicker
    },
    methods: {
      showDatePicker() {
        this.showPicker = true
      },
      hideDatePicker() {
        this.showPicker = false
      },
      confirm(startDate, endDate, invalDay) {
        this.beginTime = startDate
        this.endTime = endDate
        this.spacesDays = invalDay
        this.showPicker = false
        console.log(this.spacesDays)
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
    width: 100%;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    background-color: #efeff4;
  }
  [v-cloak]{
    display: none;
  }
</style>
