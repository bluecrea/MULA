<template>
  <mu-slide-bottom-transition>
    <div class="home">
      <div class="tourism-banner">
        <div class="go-back" @click="close"></div>
      </div>
      <div class="search-wrap">
        <div class="search">
          <div class="search-city">
            <router-link :to="{path:'/city', query:{go:1}}" class="city-item city-item-depart" tag="div">
              <span class="city-ds">出发地</span>
              <div class="city-item-input">
                <input readonly="readonly" placeholder="请选择" v-model="goCity">
              </div>
            </router-link>
            <div class="city-icon">
              <img src="../assets/images/icon_circle.jpg" alt="">
            </div>
            <router-link :to="{path:'/city', query:{go:0}}" class="city-item city-item-dest" tag="div">
              <span class="city-ds">目的地</span>
              <div class="city-item-input" style="width: 6rem;">
                <input readonly="readonly" placeholder="请选择" v-model="backCity">
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="search-date" @click="showDatePicker">
        <div class="date-go">
          <span class="date-hint">出行时间</span>
          <label class="date-label" v-if="beginTime">{{beginTime}}</label>
          <label v-else class="date-label" style="color: #c7c7cd">请选择您的出行时间</label>
          <span class="date-days" v-if="spacesDays">{{spacesDays}}天</span>
        </div>
      </div>
      <div class="search-date search-man">
        <span class="date-hint">出行人数</span>
        <div class="man-left">人数</div>
        <plus-minus max="999" min="1" v-model="peopleNum" value="1"></plus-minus>
      </div>
      <div class="search-date search-man">
        <span class="date-hint">出行需求</span>
        <ul class="item-select">
          <li v-for="(item,index) in needItem" :key="index" :class="{'click': item.click}" @click="needTourism(index)">{{item.label}}</li>
        </ul>
      </div>
      <div class="hotel" v-show="hotelShow">
        <div class="man-left">房间数</div>
        <plus-minus max="999" min="1" v-model="houseNum"></plus-minus>
      </div>
      <div class="hotel filter" v-show="hotelShow">
        <div class="filter-title" @click="showHotel" :class="{'filter-hover':hotelHover}">酒店级别</div>
        <ul class="filter-view" v-show="levelHeight">
          <li v-for="(item,index) in hotelItem" :key="index" :class="{'is-click':item.click}" @click="clickHotel(index)"><span class="radio-inner"></span>{{item.label}}</li>
        </ul>
      </div>
      <div class="search-date filter">
        <div class="filter-title" @click="showPrice" :class="{'filter-hover':filterHover}">人均预算费用</div>
        <ul class="filter-price" v-show="priceHeight">
          <li v-for="(item,index) in priceItem" :key="index" :class="{'is-click': item.click}" @click="clickPrice(index)"><span class="radio-inner"></span>{{item.label}}</li>
        </ul>
      </div>
      <div class="search-date search-man">
        <div class="date-hint">额外需求</div>
        <label>
          <textarea class="oth" maxlength="140" placeholder="您是否还有其他需求？例如：携带儿童，携带行李等140字以内" v-model="othMade"></textarea>
        </label>
      </div>
      <div class="stn-button">
        <div class="button" @click="subOrderMade" :class="{'disable':disable}">提交至旅行顾问</div>
      </div>
      <div v-if="loading" id="loading" class="loader-box">
        <em class="vertical-middle"></em>
        <div class="loader">loading...</div>
      </div>
      <div v-if="loading" class="load-mask" id="load-mask"><em class="middle"></em></div>
      <div class="picker-box" v-show="showPicker" @click="hideDatePicker"></div>
      <date-picker :show="showPicker" @confirm="confirm" @hide-time-picker="hideDatePicker"></date-picker>
      <Toast v-show="show" :message="message"></Toast>
    </div>
  </mu-slide-bottom-transition>
</template>
<script>
  import plusMinus from '../components/plusMinus'
  import datePicker from '../components/datePicker'
  import Toast from '../components/toast'
  import md5 from 'js-md5'
  import {create} from '../server/getData'

  export default {
    data(){
      return {
        needItem:[
          {click:false,label:'我要订机票'},
          {click:false,label:'我要订餐厅'},
          {click:false,label:'我要用车'},
          {click:false,label:'我要签证'},
          {click:false,label:'我要预订酒店'},
        ],
        hotelItem:[
          {label:'民宿',click:false},
          {label:'四星级',click:false},
          {label:'五星级',click:false},
          {label:'别墅',click:false},
        ],
        priceItem:[
          {label:'人均2000~3000元',click:false},
          {label:'人均3000~5000元',click:false},
          {label:'人均5000元以上',click:false},
        ],
        levelHeight:false,
        priceHeight:false,
        filterHover:false,
        hotelHover:false,
        hotelShow:false,
        houseNum: 1,
        peopleNum: 1,
        nonce_str: Date.parse(new Date()) / 1000,
        showPicker:false,
        show:false,
        loading:false,
        disable:false,
        userId:this.userId,
        message:'',
        goCity:'',//出发地
        goCityId:'',
        backCity:'',//目的地
        backCityId:'',
        beginTime:'',
        endTime:'',
        spacesDays:'',
        depCityType:'',//出发地城市类型（1：国内；2：国外）
        arrCityType:'',//目的地城市类型（1：国内；2：国外）
        businessTypeArr:[],//业务类型[数组]
        businessType:'', //业务类型数组转字符串
        starClass:'', //酒店星级
        averagePrice:'',//人均预算费用
        othMade:'',
        client: 'web',
        language:'Zh',
      }
    },
    components:{
      plusMinus,
      datePicker,
      Toast
    },
    created(){
      this.userId = this.$route.query.userId;
      if (!this.userId) {
        this.show = true;
        this.message = '你还没有登陆或登陆失效！';
        setTimeout(()=>{
          this.show = false;
        },3000);
        this.$router.go(-1)
      } else {
        sessionStorage.setItem('userId',this.userId)
      }
    },
    mounted(){
      let goCityInfo = JSON.parse(sessionStorage.getItem('goCity')),
        backCityInfo = JSON.parse(sessionStorage.getItem('backCity'));
      if (goCityInfo !== null ) {
        this.goCity = goCityInfo.goCity;
        this.goCityId = goCityInfo.goCityId;
        this.depCityType = goCityInfo.depCityType;
      }
      if (backCityInfo !== null) {
        this.backCity = backCityInfo.backCity;
        this.backCityId = backCityInfo.backCityId;
        this.arrCityType = backCityInfo.arrCityType;
      }
    },
    methods:{
      showDatePicker() {
        this.showPicker = true
      },
      hideDatePicker() {
        this.showPicker = false
      },
      confirm(startDate, endDate, interDay) {
        this.beginTime = startDate
        this.endTime = endDate
        this.spacesDays = interDay
        this.showPicker = false
      },
      needTourism(idx) {
        this.needItem[idx].click = !this.needItem[idx].click;
        if (idx === 4) {
          this.hotelShow = !this.hotelShow;
        }
        //提交类型(1:订机票；2：订餐厅；3：用车；4：签证；5：预定酒店)
        if (this.needItem[idx].click) {
          this.businessTypeArr.push(idx +1);
          this.businessType = this.businessTypeArr.join(','); //数组转字符串
        } else {
          let indice = this.businessTypeArr.indexOf(idx+1);
          this.businessTypeArr.splice(indice,1);              //取消选择移除数组元素
          this.businessType = this.businessTypeArr.join(',');
        }
        //let check = this.needItem[idx].click;
        //this.needItem[idx].check = !check //this.needItem[idx].check = check === true ? false : true;
      },
      showHotel() {
        this.levelHeight = !this.levelHeight;
        this.hotelHover = !this.hotelHover;
      },
      clickHotel(index){
        this.hotelItem[index].click = !this.hotelItem[index].click;
        for(let i=0;i<this.hotelItem.length;i++){
          if (this.hotelItem[i].label !== this.hotelItem[index].label) {
            this.hotelItem[i].click = false;
          }
        }
        // 提交星级(1:民宿;2:四星级;3:五星级;4:别墅)
        if (this.hotelItem[index].click) {
          this.starClass = index+1;
        } else {
          this.starClass = null;
        }
      },
      showPrice(){
        this.priceHeight = !this.priceHeight;
        this.filterHover = !this.filterHover;
      },
      clickPrice(index){
        this.priceItem[index].click = !this.priceItem[index].click;
        for (let i=0;i<this.priceItem.length;i++) {
          if (this.priceItem[i].label !== this.priceItem[index].label) {
            this.priceItem[i].click = false
          }
        }
        if (this.priceItem[index].click) {
          this.averagePrice = index+1;
        } else {
          this.averagePrice = null;
        }
      },
      async subOrderMade(){
        if (!this.userId) {
          this.show = true;
          this.message = '你还没有登陆或登陆失效！';
          setTimeout(()=>{
            this.show = false;
          },3000)
        } else if (!this.goCity || !this.backCity) {
          this.show = true;
          this.message = '必须选择出发地和目的地！';
          setTimeout(()=>{
            this.show = false;
          },3000)
        } else {
          this.loading = true;
          this.disable = true;
          let signObj = {
            client: this.client,
            language: this.language,
            nonce_str: this.nonce_str,
            userId:this.userId,
            businessType:this.businessType,
            depCityName:this.goCity,
            depCityId:this.goCityId,
            depCityType:this.depCityType,
            arrCityName:this.backCity,
            arrCityId:this.backCityId,
            arrCityType:this.arrCityType,
            depServiceTimes:this.beginTime,
            peopleNum:this.peopleNum,
            houseNum:this.houseNum,
            starClass:this.starClass,
            averagePrice:this.averagePrice,
            otherDemand:this.othMade,
            endTimes:this.endTime,
            dayNum:this.spacesDays,
          };
          // 剔除空属性值
          this.removeProperty(signObj);
          // 签名
          let sign = this.getSign(signObj);
          signObj.sign = sign;
          this.sign = sign.toUpperCase();

          this.subOrder = await create(this.backCityId,this.backCity,this.arrCityType,this.averagePrice,this.businessType,this.client,this.goCityId,this.goCity,this.spacesDays,this.depCityType,this.beginTime,this.endTime,this.houseNum,this.language,this.nonce_str,this.othMade,this.peopleNum,this.starClass,this.userId,this.sign);
          if (this.subOrder.code !== 'success') {
            this.loading = false;
            this.show = true;
            this.message = this.subOrder.message;
            setTimeout(()=>{
              this.show = false;
              this.disable = false;
            },3000);
          } else {
            this.loading = true;
            this.$router.push({path:'/madelist',query:{userId:this.userId}})
            this.disable = true;
          }
        }
      },
      removeProperty(object){
        for(let prop in object){
          if (object[prop] === '') {
            delete object[prop]
          }
        }
      },
      paramsStrSort(paramsStr) {
        let urlStr = paramsStr.split("&").sort().join("&");
        let md5String = urlStr + '&key=aaaaaa';
        return md5(md5String);
      },
      getSign(params) {
        if (typeof params === "string") {
          return this.paramsStrSort(params);
        } else if (typeof params === "object") {
          let arr = [];
          for (let i in params) {
            arr.push((i + "=" + params[i]));
          }
          return this.paramsStrSort(arr.join(("&")));
        }
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
