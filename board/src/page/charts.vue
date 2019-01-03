<template>
  <div>
    <main class="main">
      <div class="charts">
        <h4>用户分析(人)</h4>
        <div id="userAnalysis" style="height:8.5rem"></div>
        <h4>交易金额分析(元)</h4>
        <div id="salesAnalysis" style="height:8.5rem"></div>
        <h4>交易金额来源分布</h4>
        <div id="salesForm" style="height:10rem;"></div>
      </div>
    </main>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import footGuide from '../components/footGuide'
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/dataZoom'
  import 'zrender/lib/svg/svg'
  import {getData} from "../components/js/getData";

  export default {
    data() {
      return {
        userAnalysis: null,
        salesAnalysis:null,
        salesForm:null,
        startDate:'',
        endDate:'',
        nonce_str:Date.parse(new Date()) / 1000,
        now:new Date(),
        DataInit:{},
        AmountSourceb:0,
        AmountSourcex:0,
        AmountSourcej:0,
        AmountSources:0,
      }
    },
    components:{
      footGuide
    },
    mounted(){
      //初始化 ECharts 实例，不能在created生命周期内初始化，因为那时候DOM还没有渲染，是找不到元素的
      this.initChart()
    },
    beforeDestroy () {
      //组件销毁前先销毁 ECharts 实例
      if (!this.userAnalysis) {
        return
      }
      if (!this.salesAnalysis) {
        return
      }
      if (!this.salesForm) {
        return
      }
      this.userAnalysis.dispose();
      this.salesAnalysis.dispose();
      this.salesForm.dispose();
      this.userAnalysis = null
      this.salesAnalysis = null
      this.salesForm = null
    },
    methods:{
      formatDate(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth()+1;
        let myweekday = date.getDate();

        if(mymonth < 10){
          mymonth = "0" + mymonth;
        }
        if(myweekday < 10){
          myweekday = "0" + myweekday;
        }
        return (myyear+"-"+mymonth + "-" + myweekday);
      },
      getMonthDays(myMonth){
        let nowYear = this.now.getYear();
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
        return days;
      },
      getMonthStartDate(){
        let nowMonth = this.now.getMonth();
        let nowYear = this.now.getYear();
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let monthStartDate = new Date(nowYear, nowMonth, 1);
        return this.formatDate(monthStartDate);
      },
      getMonthEndDate(){
        let nowMonth = this.now.getMonth();
        let nowYear = this.now.getYear();
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth));
        return this.formatDate(monthEndDate);
      },
      async initChart(){
        let nowYear = this.now.getYear();
        nowYear += (nowYear < 2000) ? 1900 : 0;
        if (this.startDate === '' && this.endDate === '') {
          let sign = md5('client=web&language=Zh&nonce_str='+this.nonce_str+'&key=aaaaaa')
          this.sign = sign.toUpperCase();
        } else {
          let sign = md5('client=web&endDate='+this.endDate+'&language=Zh&nonce_str='+this.nonce_str+'&startDate='+this.startDate+'&key=aaaaaa')
          this.sign = sign.toUpperCase();
        }
        let res = await getData(this.endDate,this.nonce_str,this.startDate,this.sign);
        this.DataInit = {...res.result};
        let AnalysisMap = this.DataInit.userAnalysisMap,
          AmountMap = this.DataInit.transactionAmountMap,
          dataArr = [],
          AmountArr = [];
        this.AmountSourceb = this.DataInit.transactionAmountSourceMap.transactionAmountSourceb; // 按天包车交易金额
        this.AmountSourcex = this.DataInit.transactionAmountSourceMap.transactionAmountSourcex; // 线路包车
        this.AmountSourcej = this.DataInit.transactionAmountSourceMap.transactionAmountSourcej;
        this.AmountSources = this.DataInit.transactionAmountSourceMap.transactionAmountSources;


        for (let key in AnalysisMap) {
          dataArr.push(AnalysisMap[key])
        }
        for (let key in AmountMap) {
          AmountArr.push(AmountMap[key])
        }
        let dateArr = Object.keys(AnalysisMap),
          AmountDate = Object.keys(AmountMap);

        // 基于准备好的dom，初始化echarts实例,移动端建议使用 svg模式
        this.userAnalysis = echarts.init(document.getElementById('userAnalysis'), null, {renderer: 'svg'});
        this.salesAnalysis = echarts.init(document.getElementById('salesAnalysis'), null, {renderer: 'svg'});
        this.salesForm = echarts.init(document.getElementById('salesForm'), null, {renderer: 'svg'});
        this.userAnalysis.setOption({
          color:['#fff'],
          tooltip : {
            trigger: 'axis',
          },
          textStyle:{
            color: '#fff',
            fontSize:'.5rem',
            fontWeight:300,
            fontFamily: 'Helvetica',
          },
          /*toolbox: {
            itemSize: 12,
            right: 0,
            top:0,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {}
            }
          },*/
          grid: {
            left: '0',
            top:'5%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          dataZoom: [{
            type: 'inside',
            throttle: 50
          }],
          xAxis: [
            {
              type : 'category',
              boundaryGap : false,
              data : dateArr,
              axisLine:{
                lineStyle:{
                  color:'#ddd'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              scale: true,
              axisLine:{
                lineStyle:{
                  color:'#ddd'
                }
              }
            }
          ],
          series : [
            {
              name:'用户',
              symbol:'none',
              smooth:true,
              type:'line',
              stack: '总量',
              areaStyle:{
                color: {
                  type: 'linear',
                  x: 0, y: 0,x2: 0, y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fff' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255,255,255,.2)' // 100% 处的颜色
                  }],
                }
              },
              /*label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },*/
              data:dataArr
            },
          ]
        });
        this.salesAnalysis.setOption({
          color:['#fff'],
          textStyle:{
            color: '#eee',
          },
          tooltip : {
            trigger: 'axis',
          },
          toolbox: {
            /*feature: {
              saveAsImage: {}
            }*/
          },
          grid: {
            left: '3%',
            top:'3%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : AmountDate,
              axisLine:{
                lineStyle:{
                  color:'#fff'
                }
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              scale: true,
              axisLine:{
                lineStyle:{
                  color:'#fff'
                }
              }
            }
          ],
          series : [
            {
              name:'交易金额',
              smooth:true,
              symbol:'none',
              type:'line',
              stack: '总量',
              label: {
                /*fontSize:'10',
                normal: {
                  show: true,
                  position: 'top'
                }*/
              },
              areaStyle:{
                color: {
                  type: 'linear',
                  x: 0, y: 0,x2: 0, y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fff' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(255,255,255,.2)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              },
              data:AmountArr
            },
          ]
        });
        this.salesForm.setOption({
          color:['#59FFB5','#C93737','#FEFF36','#00E8FF'],
          grid: {
            left: '3%',
            top:'3%',
            right: '5%',
            bottom: '0',
            containLabel: true
          },
          tooltip: {
            trigger: 'item',
            //formatter: "{a} <br/>{b}: {c} ({d}%)",
            formatter: "{b}: {d}%<br/>{c}"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['按天包车','线路包车','接机','送机']
          },
          series: [
            {
              name:'交易来源',
              type:'pie',
              selectedMode: 'single',
              radius: ['45%', '70%'],
              center: ['50%', '55%'],

              data:[
                {value:this.AmountSourceb, name:'按天包车'},
                {value:this.AmountSourcex, name:'线路包车'},
                {value:this.AmountSourcej, name:'接机'},
                {value:this.AmountSources, name:'送机'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        //图标根据窗口大小自动缩放
        window.addEventListener("resize", this.userAnalysis.resize,this.salesAnalysis.resize);
      }
    }
  }
</script>
<style scoped>
  body {
    -webkit-text-size-adjust:none;
  }
</style>
