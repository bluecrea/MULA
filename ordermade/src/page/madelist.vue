<template>
    <div>
      <div class="head">
        <div class="back" @click="close"></div>
        <div class="title">定制行程</div>
        <div class="server" @click="call"></div>
      </div>
      <div class="made-wrap">
        <ul>
          <li v-if="madeList.length === 0" class="no-order">
            您还没有任何定制行程哟～
            <router-link :to="{path:'/',query:{userId:userId}}" tag="div" class="to-index">去定制行程</router-link>
          </li>
          <li v-else v-for="item in madeList">
            <header>
              <span class="h-left" v-if="item.depServiceTime">{{timestampToTime(item.depServiceTime)}} - {{timestampToTime(item.endTime)}}</span>
              <span class="h-left" v-else>未选择出发时间</span>
              <span class="h-right" v-if="item.orderStatus === '1'">已提交</span>
              <span class="h-right" v-else-if="item.orderStatus === '2'">规划中</span>
              <span class="h-right" v-else-if="item.orderStatus === '3'">已完成</span>
            </header>
            <section>
              <div class="title">{{item.depCityName}} — {{item.arrCityName}}</div>
              <div class="sn" v-if="item.sn">{{item.sn}}</div>
              <div class="m-people" v-if="item.dayNum">{{item.dayNum}}天<em>{{item.peopleNum}}人出发</em></div>
              <div class="m-people" v-else="item.dayNum"><em>{{item.peopleNum}}人出发</em></div>
              <div class="xq">
                <div class="xq-item" v-for="list in item.businessTypeArray">
                  <span v-if="list === '1'">订机票</span>
                  <span v-if="list === '2'">订餐厅</span>
                  <span v-if="list === '3'">用车</span>
                  <span v-if="list === '4'">签证</span>
                  <span v-if="list === '5'">预定酒店</span>
                </div>
              </div>
              <div class="state" v-if="item.orderStatus === '1'">
                提交成功，旅行顾问30分钟内将会联系您。
              </div>
              <div class="state" v-else>
                <div class="bz">
                  <div class="bz-title">客服备注</div>
                  <div class="bz-cont">
                    {{item.customerRemark}}
                  </div>
                </div>
              </div>
            </section>
          </li>
        </ul>
      </div>
      <div class="message" @click="server">在线咨询</div>
      <Toast v-show="show" :message="message"></Toast>
    </div>
</template>
<script>
  import md5 from 'js-md5'
  import {getCustomizedList} from '../server/getData'
  import Toast from '../components/toast'

  export default {
    data () {
      return {
        CustomList: {},
        madeList:{},
        nonce_str: Date.parse(new Date()) / 1000,
        show:false,
        userId:'',
        message:'',
        phone:'4006961188',
      };
    },
    components:{
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
      }
    },
    mounted(){
      this.initList();
    },
    methods:{
      async initList() {
        let sign;
        sign = md5('client=web&language=Zh&nonce_str='+this.nonce_str+'&userId='+this.userId+'&key=aaaaaa');
        this.sign = sign.toUpperCase();
        this.CustomList = await getCustomizedList(this.nonce_str,this.userId,this.sign);
        if (this.CustomList.code !== 'success') {
          this.show = true;
          this.message = this.CustomList.message;
          setTimeout(()=>{
            this.show = false;
          },3000);
        } else {
          this.madeList = this.CustomList.result.list
        }
        console.log(this.madeList)
      },
      timestampToTime (cjsj) {
        let date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-'
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        const D = date.getDate() + ' '
        //const h = date.getHours() + ':'
        //const m = date.getMinutes() + ':'
        //const s = date.getSeconds()
        return Y+M+D
        //console.log(timestampToTime (1533293827000))
      },
      server(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.helpToOrder.postMessage(null);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.helpToOrder()
        }
      },
      close() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.closeWindow.postMessage(null);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.closeWindow()
        }
      },
      call(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          window.webkit.messageHandlers.callPhone.postMessage(null);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          window.android.callPhone()
        }
      }
    }
  };
</script>
