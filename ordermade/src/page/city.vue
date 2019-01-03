<template>
    <div>
      <div class="head-wrap">
        <div class="search-wrap" style="padding-right:.8rem;">
          <div class="search-box">
            <input type="text" autocomplete="off" @click="toSearch" placeholder="请输入地点">
          </div>
          <span class="s-back" @click="$router.go(-1)"></span>
        </div>
      </div>
      <div class="header">
        <ul class="toggle">
          <li :class="{current: categoryType === 1}" @click="categoryType = 1">国内</li>
          <li :class="{current: categoryType === 2}" @click="categoryType = 2">国际/港澳台</li>
        </ul>
      </div>
      <transition name="router-fade">
        <section v-if="categoryType === 1">
          <div class="city_select">
            <section class="menu_container">
              <section class="menu_right" ref="menuCityList">
                <ul>
                  <li v-for="(item,index) in cityList" :key="index">
                    <header v-if="item.name ==='热门'">热门城市</header>
                    <header v-else>{{item.name}}</header>
                    <section v-if="item.name ==='热门'" style="height:4.3rem">
                      <div>
                        <span v-for="city in item.city" @click="chooseCity($event)" :data-id="city.cityId">{{ city.cityName }}</span>
                      </div>
                    </section>
                    <section v-else v-for="city in item.city"  @click="chooseCity($event)" :data-id="city.cityId">{{city.cityName}}</section>
                  </li>
                </ul>
              </section>
              <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                <ul>
                  <li v-for="(item,index) in cityList" :key="index" :class="{activity_menu: index === menuIndex}" @click="chooseMenu(index)">
                    {{ item.name }}
                  </li>
                </ul>
              </section>
            </section>
          </div>
        </section>
        <section v-if="categoryType === 2">
          <div class="city_select">
            <section class="menu_container">
              <section class="menu_right" ref="menuCityList">
                <ul>
                  <li v-for="(item,index) in globalCity" :key="index">
                    <header v-if="item.name ==='热门'" id="anchor-0">热门城市</header>
                    <header v-else :id="'anchor-'+index">{{item.name}}</header>
                    <section v-if="item.name ==='热门'" style="height:4.3rem">
                      <div>
                        <span v-for="city in item.city" @click="chooseCity($event)" :data-id="city.cityId">{{ city.cityName }}</span>
                      </div>
                    </section>
                    <section v-else v-for="city in item.city" @click="chooseCity($event)" :data-id="city.cityId">{{city.cityName}}</section>
                  </li>
                </ul>
              </section>
              <section class="menu_left">
                <ul>
                  <li v-for="(item,index) in globalCity" :key="index" :class="{activity_menu: index === menuIndex}" @click="chooseGlobalMenu('#anchor-'+index,index)">
                    {{ item.name }}
                  </li>
                </ul>
              </section>
            </section>
          </div>
        </section>
      </transition>
    </div>
</template>
<style>
  header {
    display: flex;
    width: 100%;
    z-index: 11;
  }
</style>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  /*import md5 from 'js-md5'
  import {cityList } from '../server/getData'*/

  export default {
    data() {
      return {
        categoryType: 1,
        menuIndex: 0, //菜单索引值，默认为0
        menuIndexChange: true,
        Scroll: null,// 列表
        shopListTop: [], //列表的高度集合
        windowHeight: null, //屏幕的高度
        nonce_str:Date.parse(new Date()) / 1000,//随机数 时间戳
        go:null,
        City:[],
      }
    },
    computed: {
      ...mapState([
        'cityList','globalCity'
      ])
    },
    created(){
      this.go = this.$route.query.go;
    },
    mounted(){
      this.getCityListHeight();
      //this.getData();
    },
    methods: {
      //获取城市列表的高度，存入shopListTop
      getCityListHeight(){
        const listContainer = this.$refs.menuCityList;
        const listArr = Array.from(listContainer.children[0].children);
        listArr.forEach((item, index) => {
          this.shopListTop[index] = item.offsetTop;
        });
        this.listenScroll(listContainer)
      },
      //当滑动城市列表时，监听其scrollTop值来设置对应的食品列表标题的样式
      listenScroll(element){
        this.Scroll = new BScroll(element, {
          probeType: 3,
          deceleration: 0.001,
          bounce: false,
          swipeTime: 2000,
          click: true,
        });

        const wrapperMenu = new BScroll('#wrapper_menu', {
          click: true,
        });
        const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
        this.Scroll.on('scroll', (pos) => {
          if (!this.$refs.wrapperMenu) {
            return
          }
          this.shopListTop.forEach((item, index) => {
            if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              this.menuIndex = index;
              const menuList=this.$refs.wrapperMenu.querySelectorAll('.menu');
              const el = menuList[0];
              wrapperMenu.scrollToElement(el, 800, 0, - (wrapMenuHeight/2 - 50));
            }
          })
        })
      },
      //点击左侧城市列表标题，相应列表移动到最顶层
      chooseMenu(index){
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        this.Scroll.scrollTo(0, -this.shopListTop[index], 400);
        this.Scroll.on('scrollEnd', () => {
          this.menuIndexChange = true;
        })
      },
      chooseGlobalMenu(selector, index){
        this.menuIndex = index;
        document.querySelector(".menu_right").scrollTop = this.$el.querySelector(selector).offsetTop;
      },
      chooseCity(status) {
        if (this.go === 1) {
          let obj = {};
          obj.goCity = status.currentTarget.innerText;
          obj.goCityId = status.target.getAttribute('data-id');
          obj.depCityType = this.categoryType;
          sessionStorage.setItem('goCity',JSON.stringify(obj));
          this.$router.go(-1)
        } else {
          let obj = {};
          obj.backCity = status.currentTarget.innerText
          obj.backCityId = status.target.getAttribute('data-id')
          obj.arrCityType = this.categoryType;
          sessionStorage.setItem('backCity',JSON.stringify(obj));
          this.$router.go(-1)
        }
      },
      toSearch(){
        this.$router.push({path:'/search',query:{go:this.go}})
      }
    }
  }
</script>
