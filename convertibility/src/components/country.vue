<template>
  <div>
    <div class="country_select">
      <section class="menu_container">
        <section class="menu_right" ref="menuCountryList">
          <ul>
            <li v-for="(item,index) in countryList" :key="index">
              <header v-if="item.name ==='🇨🇳'">中国</header>
              <header v-else>{{item.name}}</header>
              <div class="cn" v-if="item.name ==='🇨🇳'">
                <section v-for="country in item.country" @click="chooseCity($event)" :code="country.phoneCode" :flag="country.flag">
                  <div class="flag">
                    <div class="flag-country" :style="{backgroundPosition:country.flag}"></div>
                  </div>
                  <div class="country">
                    {{ country.countryName }}
                    <span class="code" dir="ltr">+{{country.phoneCode}}</span>
                  </div>
                </section>
              </div>
              <section v-else v-for="country in item.country"  @click="chooseCity($event)" :code="country.phoneCode" :flag="country.flag">
                <div class="flag">
                  <div class="flag-country" :style="{backgroundPosition:country.flag}"></div>
                </div>
                <div class="country">
                  {{ country.countryName }}
                  <span class="code" dir="ltr">+{{country.phoneCode}}</span>
                </div>
              </section>
            </li>
          </ul>
        </section>
        <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
          <ul>
            <li v-for="(item,index) in countryList" :key="index" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
              {{ item.name }}
            </li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    data(){
      return {
        menuIndex: 0, //菜单索引值，默认为0
        menuIndexChange: true,
        Scroll: null,// 列表
        shopListTop: [], //列表的高度集合
        showLoading:true,
        windowHeight: null, //屏幕的高度
        channelId:this.channelId,
      }
    },
    computed: {
      ...mapState([
        'countryList'
      ])
    },
    mounted(){
      this.getCountryListHeight();
    },
    created(){
      this.channelId = this.$route.query.channelId;
    },
    methods:{
      getCountryListHeight(){
        const listContainer = this.$refs.menuCountryList;
        const listArr = Array.from(listContainer.children[0].children);
        listArr.forEach((item, index) => {
          this.shopListTop[index] = item.offsetTop;
        });
        this.listenScroll(listContainer);
      },
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
              wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
            }
          })
        })
      },
      chooseMenu(index){
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        this.Scroll.scrollTo(0, -this.shopListTop[index], 400);
        this.Scroll.on('scrollEnd', () => {
          this.menuIndexChange = true;
        })
      },
      chooseCity(status) {
        //localStorage.setItem('city',status.currentTarget.innerText);
        //this.$router.go(-1);
        //console.log(status.target.getAttribute('code'));
        this.$router.push({path:'/', query:{code:status.currentTarget.getAttribute('code'),flag:status.currentTarget.getAttribute('flag')}});
      }
    }
  }
</script>
