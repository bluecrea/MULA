<template>
  <div class="min" :style="{height:height}">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div  class="swiper-slide">
            <img src="../assets/images/banner.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="man-tel">
      <label>兑换账号</label>
      <div class="flag-input">
        <div class="flag-container">
          <div class="royt"></div>
          <div class="list-box">
            <router-link to="/country" class="flag" :style="{backgroundPosition:flag}"></router-link>
          </div>
        </div>
        <input name="phone" autocomplete="off" class="form-code" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="code">
        <input name="SMSCode" autocomplete="off" class="form-code" type="tel" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6" v-model="SMSCode" placeholder="请输入验证码">
        <div class="getCode" id="box" v-show="showCode">获取验证码</div>
        <span v-show="!showCode" class="getCode grayCode">{{count}}s 重新获取</span>
      </div>
    </div>
    <div class="login-btn">
      <button @click="register" :disabled="disabled">查询可兑换摩点</button>
    </div>
    <Toast v-show="show" :message="message"></Toast>
  </div>
</template>
<script>
  import Toast from '../components/toast'
  import md5 from 'js-md5'
  import {sendSMS,validateExchangeMoDian} from "../components/getData";
  import '../plugins/swiper.min.js'
  import '../plugins/swiper.min.css'

  export default {
    data() {
      return {
        count: '',
        phone:'',
        disable:false,
        nonce_str:Date.parse(new Date()) / 1000,
        code:this.code,
        flag:this.flag,
        show:false,
        showCode:true,
        SMSCode:'',
        message:'',
        token:'',
        authenticate:'',
        disabled:false,
        height:window.screen.height+'px',
      }
    },
    components:{
      Toast
    },
    created() {
      sessionStorage.removeItem('token');
      this.code = this.$route.query.code;
      this.flag = this.$route.query.flag;
      if (typeof(this.code) === 'undefined') {
        this.code = '86'
        this.flag = '-1px -1072px'
      }
    },
    mounted() {
      let _this = this;
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
        spaceBetween: 30,
        speed:1000,
      });
      new YpRiddler({
        expired: 10,
        mode: 'dialog',
        container: document.getElementById('box'),
        noButton:true,
        appId: 'bc6a16542748462e83884c33ad3c1fa6',
        version: 'v1',
        winWidth:document.body.clientWidth - 20,
        onError: function (param) {
          if (param.code === 429) {
            return
          }
          console.error('验证服务异常')
        },
        onSuccess(validInfo, close) {
          //console.log(`验证通过！, authenticate=${validInfo.authenticate}`)
          _this.token = validInfo.token;
          _this.authenticate = validInfo.authenticate;
          _this.getCode();
          close()
        },
        onFail: function (code, msg, retry) {
          retry()
        },
        beforeStart: function (next) {
          //console.log('验证马上开始')
          if (!_this.phone) {
            _this.show = true;
            _this.message = '请输入手机号！';
            setTimeout(() => {
              _this.show = false;
            }, 2500);
          } else {
            next()
          }
        },
        onExit: function() {
          // 退出验证 （仅限dialog模式有效）
        }
      })
    },
    methods:{
      async getCode() {
          const TIME_COUNT = 60,
            sign = md5('areaCode='+this.code+'&authenticate='+this.authenticate+'&client=web&language=Zh&nonce_str='+this.nonce_str+'&phone='+this.phone+'&token='+this.token+'&type=6&key=aaaaaa');
          this.sign = sign.toUpperCase();
          this.SMSData = await sendSMS(this.code,this.authenticate,this.nonce_str,this.phone,this.token,this.sign);
          if (this.SMSData.code !== 'success') {
            this.show = true;
            this.message = this.SMSData.message;
            setTimeout(() => {
              this.show = false;
            }, 2500);
          } else {
            this.show = true;
            this.message = '验证码发送成功！';
            // this.showCode = false;
            setTimeout(() => {
              this.show = false;
            }, 2500);
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.showCode = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.showCode = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          }
      },
      async register() {
        if (this.phone === '') {
          this.show = true;
          this.message = '请输入手机号';
          setTimeout(() => {
            this.show = false;
          }, 2000);
        } else if(this.SMSCode === '') {
          this.show = true;
          this.message = '请输入收到的验证码';
          setTimeout(() => {
            this.show = false;
          }, 2000);
        } else {
          const sign = md5('client=web&code='+this.SMSCode+'&language=Zh&nonce_str='+this.nonce_str+'&phone='+this.phone+'&key=aaaaaa');
          this.sign = sign.toUpperCase();
          this.RegistData = await validateExchangeMoDian(this.SMSCode,this.nonce_str,this.phone,this.sign);
          if (this.RegistData.code !== 'success') {
            this.show = true;
            this.message = this.RegistData.message;
            setTimeout(() => {
              this.show = false;
            }, 2500);
          } else {
            let balance = JSON.stringify(this.RegistData.result);
            sessionStorage.setItem('token',balance);
            this.$router.push('/balance');
            this.disabled = true;
            /*
            * "balance":{"balanceZh":101.10,"tokenMy":"127.0.0.1?201812181838146528","modianZh":0.90}
            * */
          }
        }
      },
    }
  }
</script>
