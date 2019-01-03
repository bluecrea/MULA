<template>
  <div>
    <div class="bar"></div>
    <div class="head-wrap">
      <div class="search-wrap">
        <div class="search-box">
          <input v-focus type="text" autocomplete="off" v-model="cityName" placeholder="请输入地点">
        </div>
        <span class="s-back" @click="$router.go(-1)"></span>
        <button class="s-btn" @click="searchCity">搜索</button>
      </div>
    </div>
    <div class="header">
      <ul class="toggle">
        <li v-for="(item,index) in country" :class="{current: categoryType === index+1}" @click="category(index+1)">{{item}}</li>
      </ul>
    </div>
    <ul class="search-list">
      <li v-for="city in cityList" @click="chooseCity($event)" :data-id="city.cityId">{{city.cityName}}</li>
      <li v-show="show" class="no-city"></li>
    </ul>
    <!--<Toast v-show="show" :message="message"></Toast>-->
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import {cityList} from '../server/getData'
  import Toast from '../components/toast'

  export default {
    data(){
      return{
        categoryType:1,
        country:['国内','国际/港澳台'],
        cityName:'',
        cityList:'',
        show:false,
        message:'',
        nonce_str: Date.parse(new Date()) / 1000,
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
    components:{
      Toast
    },
    created(){
      this.go = this.$route.query.go;
    },
    mounted(){

    },
    methods:{
      category(index){
        this.categoryType = index;
        if (this.cityName !== '') {
          this.categoryType = index;
          this.searchCity();
        }
      },
      async searchCity() {
        let sign;
        sign = md5('cityName='+this.cityName+'&client=web&language=Zh&nonce_str='+this.nonce_str+'&type='+this.categoryType+'&key=aaaaaa');
        this.sign = sign.toUpperCase();
        this.City = await cityList(this.cityName,this.nonce_str, this.categoryType, this.sign);
        if (this.City.code !== 'success') {
          this.cityList = '';
          this.show = true;
        } else {
          this.show = false;
          this.cityList = this.City.result.list;
        }
      },
      chooseCity(status) {
        let userId = sessionStorage.getItem('userId');
        if (this.go === 1) {
          let obj = {};
          obj.goCity = status.currentTarget.innerText;
          obj.goCityId = status.target.getAttribute('data-id');
          obj.depCityType = this.categoryType;
          sessionStorage.setItem('goCity',JSON.stringify(obj));
          this.$router.push({path:'/',query:{userId:userId}})
        } else {
          let obj = {};
          obj.backCity = status.currentTarget.innerText;
          obj.backCityId = status.target.getAttribute('data-id');
          obj.arrCityType = this.categoryType;
          sessionStorage.setItem('backCity',JSON.stringify(obj));
          this.$router.push({path:'/',query:{userId:userId}})
        }
      },
    }
  }
</script>
