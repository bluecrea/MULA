<template>
    <div class="picker" :class="{'show':show}">
      <div class="picker-header">
        <div class="picker-prev" @click="preMon">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z"></path>
          </svg>
        </div>
        <div class="picker-year">{{year}}年 {{month}}月</div>
        <div class="picker-next" @click="nextMon">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M492.675886 904.817574L885.696074 511.797385 492.675886 118.777197c-12.258185-12.258185-12.432147-32.892131 0.187265-45.51052 12.707416-12.707416 32.995485-12.703323 45.511543-0.187265l411.660734 411.660734c7.120165 7.120165 10.163477 17.065677 8.990768 26.624381 1.500167 9.755178-1.5104 20.010753-8.990768 27.491121L538.374694 950.515359c-12.258185 12.258185-32.892131 12.432147-45.511543-0.187265-12.707416-12.707416-12.703323-32.995485-0.187265-45.51052z"></path>
          </svg>
        </div>
      </div>
      <div class="picker-content">
        <div class="picker-week">
          <div class="picker-weekday">日</div>
          <div class="picker-weekday">一</div>
          <div class="picker-weekday">二</div>
          <div class="picker-weekday">三</div>
          <div class="picker-weekday">四</div>
          <div class="picker-weekday">五</div>
          <div class="picker-weekday">六</div>
        </div>
        <div class="picker-con">
          <div class="picker-day" v-for="pick in picker"
               :class="{'out-focus': pick.outfocus,
                                'today': pick.showday,
                                'start': showStartEnvfun(pick.dateNum,pick.outfocus),
                                'end': showEndEnvfun(pick.dateNum,pick.outfocus),
                                'black': showBlack(pick.dateNum,pick.outfocus),
                                'half': showHalffun(pick.dateNum,pick.outfocus)}"
               @click="checkDay(pick.dateNum,pick.outfocus)">
            {{pick.dateNum}}
          </div>
        </div>
      </div>
      <div class="confirm" @click="confimDate">确定</div>
    </div>

</template>

<script>
  export default {
    props:['show'],
    data () {
      return {
        year: '',
        month: '',
        startEnv: '', //开始日期
        endEnv: '',  //结束日期
        today: '',
        intervalDay: 3,
        picker: []
      }
    },
    mounted () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.today = date.getDate()
      this.startEnv = this.getOntDay(this.year + '-' + this.month + '-' + this.today);
      this.endEnv = this.getThreeDay(this.year + '-' + this.month + '-' + this.today);
      this.createCalendar(this.year, this.month)
    },
    methods: {
      createCalendar (year, month) {
        this.picker = [];
        let picks = [];
        let currentMonth = '';
        if (new Date().getFullYear() === year && new Date().getMonth() + 1 === month) {
          currentMonth = true
        } else {
          currentMonth = false
        }
        let monthStartDate = this.getFirstDay(year, month)
        var lastMonthRestDay = new Date(year, month - 1, 0).getDate()
        //求上个月剩余多少天显示在本月
        for (var i = 0; i < monthStartDate; i++) {
          picks.push({
            dateNum: lastMonthRestDay,
            outfocus: true
          });
          lastMonthRestDay--
        }
        picks = picks.reverse()
        let indexMoth = this.getMonthLen(year, month)
        //本月天数
        for (let i = 1; i <= indexMoth; i++) {
          let showday = '';
          if (currentMonth) {
            if (this.today === i) {
              showday = true;
            } else {
              showday = false;
            }
          }
          if (currentMonth && this.today > i) {
            picks.push({
              dateNum: i,
              outfocus: true,
              showday: showday
            });
          } else {
            picks.push({
              dateNum: i,
              outfocus: false,
              showday: showday
            });
          }
        }
        let nextMonLen = 42 - picks.length;
        //下月天数显示在本月
        for (let i = 1; i <= nextMonLen; i++) {
          picks.push({
            dateNum: i,
            outfocus: true
          })
        }
        this.picker = picks
      },
      preMon () {
        if (this.year === new Date().getFullYear() && this.month <= new Date().getMonth() + 1) {
          return;
        }
        this.month -= 1;
        if (this.month < 1) {
          this.year -= 1;
          this.month = 12;
        }
        this.createCalendar(this.year, this.month);
      },
      nextMon () {
        this.month += 1;
        if (this.month > 12) {
          this.year = parseInt(this.year) + 1;
          this.month = 1;
        }
        this.createCalendar(this.year, this.month);
      },
      checkDay (dateNum, outfocus) {
        if(!outfocus) {
          let check_day = this.year + '-' + this.month + '-' + dateNum;

          if (this.dateCompare(this.endEnv, check_day) === 0) { //开始后
            this.endEnv = check_day;
            this.showEndEnvfun(dateNum);
            this.intervalDay = this.getDatePeriod(this.startEnv, check_day) +1
          } else if (this.dateCompare(this.endEnv, check_day) === 3) {  //点结束当天
            this.startEnv = check_day;
            this.showHalffun(dateNum)
          } else if (this.dateCompare(this.startEnv, check_day) === 3) {  //点开始当天
            this.endEnv = check_day;
            this.showHalffun(dateNum);
            this.intervalDay = this.getDatePeriod(this.endEnv, check_day) +1;
          } else if (this.dateCompare(this.startEnv, check_day) === 1) {
            this.startEnv = check_day;
            this.showStartEnvfun(dateNum);
            this.intervalDay = this.getDatePeriod(this.endEnv, check_day) +1;
          } else if (this.dateCompare(this.startEnv, check_day) === 0 && this.dateCompare(this.endEnv, check_day) === 1) {
            const disStartEnvLen = this.getDatePeriod(this.startEnv, check_day) - 1;
            const disSEndEnvLen = this.getDatePeriod(this.endEnv, check_day) - 1;
            if (disStartEnvLen > disSEndEnvLen) {
              this.endEnv = check_day;
              this.showEndEnvfun(dateNum);
              this.intervalDay = this.getDatePeriod(this.startEnv, check_day) + 1
            } else {
              this.startEnv = check_day;
              this.showStartEnvfun(dateNum);
              this.intervalDay = this.getDatePeriod(this.endEnv, check_day) + 1
            }
          }
        }
      },
      //两个日期之间间隔多少天
      getDatePeriod (sDate1, sDate2) {
        let aDate, oDate1, oDate2, iDays;
        aDate = sDate1.split("-");
        oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12-18-2016格式
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
        return iDays;
      },
      //获得每个月的天数
      getMonthLen (year, month) {
        let nextMonth = new Date(year, month, 1);
        nextMonth.setHours(nextMonth.getHours() - 1);
        return nextMonth.getDate();
      },
      //获得每个月第一天星期几   0：星期日，1：星期一
      getFirstDay: function (year, month) {
        let firstDay = new Date(year, month - 1, 1);
        return firstDay.getDay();
      },
      // 明天日期
      getOntDay(date) {
        let result = new Date((new Date(date)).getTime() + 24 * 60 * 60 * 1000);
        return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
      },
      //计算距离今天的后三天日期
      getThreeDay: function (date) {
        let result = new Date((new Date(date)).getTime() + 3 * 24 * 60 * 60 * 1000);
        return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
      },
      //计算距离今天的后六天日期
      getSixDay: function (date) {
        let result = new Date((new Date(date)).getTime() + 6 * 24 * 60 * 60 * 1000);
        return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
      },
      confimDate () {
        this.$emit('showTimePicker')
        this.$emit('confirm', this.startEnv, this.endEnv, this.intervalDay)
      },
      //比较两日期的大小
      dateCompare (date1, date2) {
        let str1 = [];
        let str2 = [];
        str1 = date1.split('-');
        str2 = date2.split('-');
        if (parseInt(str1[0]) === parseInt(str2[0]) && parseInt(str1[1]) === parseInt(str2[1]) && parseInt(str1[2]) === parseInt(str2[2])) {
          return 3;
        } else {
          if (parseInt(str1[0]) > parseInt(str2[0])) {
            return 1;
          } else if (parseInt(str1[0]) < parseInt(str2[0])) {
            return 0;
          } else {
          }
          if (parseInt(str1[1]) > parseInt(str2[1])) {
            return 1;
          } else if (parseInt(str1[1]) < parseInt(str2[1])) {
            return 0;
          } else {
          }
          if (parseInt(str1[2]) > parseInt(str2[2])) {
            return 1;
          } else if (parseInt(str1[2]) < parseInt(str2[2])) {
            return 0;
          } else {
          }
          return 0;
        }
      },
      showStartEnvfun (dateNum, outfocus) {
        if (!outfocus) {
          if (this.startEnv === this.year + '-' + this.month + '-' + dateNum) {
            return true;
          } else {
            return false;
          }
        }
      },
      showEndEnvfun (dateNum, outfocus) {
        if (!outfocus) {
          if (this.endEnv === this.year + '-' + this.month + '-' + dateNum) {
            return true;
          } else {
            return false;
          }
        }
      },
      showBlack (dateNum, outfocus) {
        if (!outfocus) {
          if (this.dateCompare(this.startEnv, this.year + '-' + this.month + '-' + dateNum) === 0 &&
            this.dateCompare(this.year + '-' + this.month + '-' + dateNum, this.endEnv) === 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      showHalffun (dateNum, outfocus) {
        if (!outfocus) {
          if (this.startEnv === this.year + '-' + this.month + '-' + dateNum && this.endEnv === this.year + '-' + this.month + '-' + dateNum) {
            return true;
          } else {
            return false;
          }
        }
      },
      hideDatePicker () {
        this.$emit('hideDatePicker')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .picker {
    position: fixed;
    z-index: 1002;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: transform .3s;
    transform: translate(0,100%);
    background-color:#fff;
    color: #606266;
    .picker-header {
      display: flex;
      justify-content: space-between;
      margin: .5rem;
      text-align: center;
      align-items: center;
      font-size:.7rem;
      .picker-prev,
      .picker-next {
        text-align: center;
        margin-left:.5rem;
        margin-right:.5rem;
        width: 1rem;
        height:1rem;
        svg {
          fill: #606266;
        }
      }
      .picker-year {
        font-weight: 500;
        padding: 0 5px;
        line-height: 1rem;
        text-align: center;
        cursor: pointer;
        color: #606266;
      }
    }
    .picker-content {
      position: relative;
      margin: 15px;
      font-size:.7rem;
      .picker-week {
        display: flex;
        .picker-weekday {
          width: 100%;
          height:1.6rem;
          line-height:1rem;
          padding:.3rem 0;
          text-align: center;
        }
      }
      .picker-con {
        font-size:.65rem;
        display: flex;
        flex-wrap: wrap;
        .picker-day {
          position: relative;
          width: 14.28%;
          height: 1.8rem;
          line-height: 1rem;
          color: #606266;
          padding:.4rem 0;
          text-align: center;
        }
        .today {
          color:#FC6A3D;
          /*&::before {
            content: " ";
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-top: 8px solid #FC6A3D;
            border-left: 8px solid transparent;
          }*/
        }
        .start {
          color:#fff;
          background: #00cccc;
          font-weight: 700;
        }
        .black {
          background: #F0F4FA;
        }
        .end {
          color:#fff;
          font-weight: 700;
          background: #00cccc;
        }
        .half {
          color:#fff;
          background-color:#000;
        }
        .out-focus {
          color: #c0c4cc;
        }
      }
    }
    .confirm {
      border-top:1px solid #eee;
      width: 100%;
      height: 2.2rem;
      line-height: 2.1rem;
      text-align: center;
      font-size: .7rem;
      color: #00cccc;
      cursor: pointer;
    }
  }
  .show {
    transform: translate(0,0);
    transition: transform .3s;
  }
</style>
