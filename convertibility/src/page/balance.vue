<template>
  <div class="balance">
    <div class="banner">
      <div class="phone">{{balance.phone}}账户金额</div>
      <div class="balance-box">
        <div class="md-cx">
          <p class="md-num">{{balanceYe.modianZh}}</p>
          <p class="md-cx-xq">出行摩点</p>
        </div>
        <div class="line"></div>
        <div class="md-cx">
          <p class="md-num">{{balanceYe.balanceZh}}</p>
          <p class="md-lx-xq">旅行摩点</p>
        </div>
      </div>
    </div>
    <div class="exchange">
      <label>
        <span class="nm">出行摩点</span>
        <input type="text" v-model.number="cxMd" @keydown="oninput" maxlength="11" placeholder="请输入兑换摩点">
        <span class="all" @click="allMd">全部</span>
      </label>
      <div v-show="tips" class="tips">您的出行账户余额可用额度不足！</div>
      <div class="convent">1:1 <em>兑换为</em></div>
      <label>
        <span class="nm">旅行摩点</span>
        <input type="number" v-model.number="lxMd" readonly>
      </label>
    </div>
    <div class="login-btn" style="margin-top:1.2rem;">
      <button v-if="lxMd <= 0 || lxMd > balanceYe.modianZh" disabled="disabled" style="width: 8rem!important;">立即兑换</button>
      <button v-else @click="exChange" style="width: 8rem!important;background-color:#1dafec;">立即兑换</button>
      <div class="tips">
        <label>温馨提示</label>
        <p>仅限摩拉出行摩点兑换成摩拉旅行摩点，不可逆转。</p>
      </div>
    </div>
    <div class="popup-mask" v-show="confirm">
      <div class="popup-con"></div>
      <div class="popup-container">
        <div class="popup-content">
          <div class="dialog-main">
            <div class="dialog-confirm">
              <div class="dialog-content">
                <p>出行摩点<em>{{cxMd}}</em>兑换为旅行摩点<em>{{lxMd}}</em></p>
              </div>
              <div class="dialog-btns">
                <div class="dialog-btn" @click="cancel">
                  取消
                </div>
                <div class="dialog-btn dialog-btn_highlight" @click="sure">
                  确定
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast v-show="show" :message="message"></Toast>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import {getBalance,exchange} from '../components/getData'
  import Toast from '../components/toast'

  export default {
    data() {
      return {
        balance:{},
        balanceYe:{},
        nonce_str:Date.parse(new Date()) / 1000,
        cxMd:'',
        lxMd:'',
        show:false,
        message:'',
        tips:false,
        confirm:false,
      }
    },
    created(){
      this.balance = JSON.parse(sessionStorage.getItem('token'));
      if (this.balance === null) {
        this.$router.push('/');
      }
    },
    watch:{
      cxMd(val){
        this.cxMd = val;
        this.lxMd = this.cxMd;
        if (val > this.balanceYe.modianZh) {
          this.tips = true;
        } else {
          this.tips = false;
        }
      },
    },
    components:{
      Toast
    },
    mounted(){
      this.initBalance()
    },
    methods:{
      allMd() {
        this.cxMd = this.balanceYe.modianZh;
        this.lxMd = this.cxMd;
      },
      oninput(e) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
      },
      async initBalance(){
        let sign;
        sign = md5('client=web&language=Zh&nonce_str='+this.nonce_str+'&phone='+this.balance.phone+'&tokenMy='+this.balance.tokenMy+'&key=aaaaaa')
        this.sign = sign.toUpperCase()
        this.obj = await getBalance(this.nonce_str,this.balance.phone, this.balance.tokenMy,this.sign);
        this.balanceYe = this.obj.result;
      },
      exChange(){
        this.confirm = true;
      },
      async sure(){
        let sign;
        sign = md5('client=web&language=Zh&moDian='+this.lxMd+'&nonce_str='+this.nonce_str+'&phone='+this.balance.phone+'&tokenMy='+this.balance.tokenMy+'&key=aaaaaa')
        this.sign = sign.toUpperCase()
        this.result = await exchange(this.lxMd,this.nonce_str,this.balance.phone,this.balance.tokenMy,this.sign);
        if (this.result.code !== 'success') {
          this.confirm = false;
          this.show = true;
          this.message = this.result.message;
          this.cxMd = '';
          setTimeout(() => {
            this.show = false;
          }, 2500);
        } else {
          this.confirm = false;
          this.$router.push('/success');
        }
      },
      cancel(){
        this.confirm = false;
      }
    }
  }
</script>
