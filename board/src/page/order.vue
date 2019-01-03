<template>
  <transition :name="show">
  <div>
    <!--<div class="loading" v-show="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>-->
    <main class="main">
      <section class="crossWise" @click="explain('show1')">
        <div class="face" :class="{toggle:Flipped.show1}">
          <div class="in">
            <h4>用户充值总额 <i>单位：元</i></h4>
            <div class="flex" v-if="DataInit">
              <div class="w50 pt5">
                <p>今日：</p>
                <p class="goal">{{DataInit.totalTodyAmount}}</p>
              </div>
              <div class="w50 pt5">
                <p>本月：</p>
                <p class="font-mont goal">{{DataInit.monthMoney}}</p>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>今日用户充值额=现金+O2O</p>
              <p>本月用户充值总额=现金+O2O</p>
              <p>月度目标：需后台设置目标值，统计目标达成率：【本月充值总额/本月目标充值总额】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show2')">
        <div class="face" :class="{toggle:Flipped.show2}" style="height:8rem">
          <div class="in">
            <h4>现金充值总额 <i>单位：元</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal">{{DataInit.todyCashMoney}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal">{{DataInit.monthCashMoney}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月现金目标：<span>{{DataInit.cashTarget}}</span></div>
                <Rating :divisor='DataInit.monthCashMoney' :divided="DataInit.cashTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>今日用户现金充值额=现金</p>
              <p>本月用户现金充值总额=现金</p>
              <p>月度目标：需后台设置目标值，统计目标达成率：【本月现金充值总额/本月现金目标充值总额】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show3')">
        <div class="face" :class="{toggle:Flipped.show3}" style="height:8rem">
          <div class="in">
            <h4>O2O充值总额 <i>单位：元</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal">{{DataInit.todyOtherAmount}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal">{{DataInit.monthOherMoney}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月O2O目标：<span>{{DataInit.otehrTarget}}</span></div>
                <Rating :divisor='DataInit.monthOherMoney' :divided="DataInit.otehrTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>今日O2O充值额=O2O</p>
              <p>本月O2O充值总额=O2O</p>
              <p>月度目标：需后台设置目标值，统计目标达成率：【本月O2O充值总额/本月O2O目标充值总额】*100%</p>
            </div>
          </div>
        </div>

      </section>
      <section class="crossWise" @click="explain('show4')">
        <div class="face" :class="{toggle:Flipped.show4}" style="height:8rem">
          <div class="in">
            <h4>支付订单总额 <i>单位：元</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal">{{newData.todyOrderAment1P}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal">{{newData.monthOrderAment1P}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{newData.orderTotalPaymentTarget}}</span></div>
                <Rating :divisor='newData.monthOrderAment1P' :divided="newData.orderTotalPaymentTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日订单完成支付的总额。</p>
              <p>2.本月1号开始截止到当前日期的下单完成支付的总额。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月订单完成支付总额/本月目标订单支付总额】*100%（包含订单取消总额）</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show5')">
        <div class="face" :class="{toggle:Flipped.show5}" style="height:8rem">
          <div class="in">
            <h4>订单完成服务总额 <i>单位：元</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal">{{DataInit.todyOrderAment}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal">{{DataInit.monthOrderAment}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.orderTotalTarget}}</span></div>
                <Rating :divisor='DataInit.monthOrderAment' :divided="DataInit.orderTotalTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日订单完成服务的总额。</p>
              <p>2.本月1号开始截止到当前日期的下单完成服务的总额</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月订单完成服务总额/本月目标订单服务完成总额】*100%（以上取消订单的不算）</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show6')">
        <div class="face" :class="{toggle:Flipped.show6}">
          <div class="in">
            <h4>取消订单总额 <i>单位：元</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal">{{newData.todayOrderAmentCancle}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal">{{newData.monthOrderAmentCancle}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日取消订单的总额。</p>
              <p>2.本月1号开始截止到当前日期的取消订单的总额。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show7')">
        <div class="face" :class="{toggle:Flipped.show7}">
          <div class="in">
            <h4>累计领取魔豆总数 </h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{newData.todySharNumA}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{newData.monthSharNumA}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日用户领取魔豆总数。（分享有奖页面，分享者领取摩豆总数）</p>
              <p>2.本月用户魔豆领取总数。</p>
              <p>3.统计累计用户魔豆领取总数。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show8')">
        <div class="face" :class="{toggle:Flipped.show8}" style="height: 8rem">
          <div class="in">
            <h4>注册用户总数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{DataInit.todyregisterNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthRegisterNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.userRegisterTarget}}</span></div>
                <Rating :divisor='DataInit.monthRegisterNum' :divided="DataInit.userRegisterTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日注册用户总数：统计当天的注册用户总数。（只统计旅行注册用户总数）</p>
              <p>2.本月用户数：统计本月1号开始截止到当前日期的用户总数。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月注册用户总数/本月目标注册用户总数】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show9')">
        <div class="face" :class="{toggle:Flipped.show9}" style="height: 8rem">
          <div class="in">
            <h4>支付订单总数 <i>单位：单</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{DataInit.todayOrderNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthOrderNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.successOrderTarget}}</span></div>
                <Rating :divisor='DataInit.monthOrderNum' :divided="DataInit.successOrderTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日支付订单总数：统计今日支付订单数。</p>
              <p>2.本月支付订单总数：统计本月1号开始截止到当前日期的支付的订单总数。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月支付订单总数/本月目标支付订单总数】*100%（以上包含取消订单总数）</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show10')">
        <div class="face" :class="{toggle:Flipped.show10}">
          <div class="in">
            <h4>取消订单总数 <i>单位：单</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{newData.todayCancelNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{newData.monthCancelNum}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日取消订单总数：统计今日取消订单总数。</p>
              <p>2.本月取消订单总数：统计本月1号开始截止到当前日期的取消订单的总数</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show11')">
        <div class="face" :class="{toggle:Flipped.show11}">
          <div class="in">
            <h4>完成服务总订单数 <i>单位：单</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{newData.todayOrderNumW}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{newData.monthOrderNumW}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日完成服务总订单数：统计今日完成服务总订单数  </p>
              <p>2.本月完成服务总订单数：统计本月1号开始截止到当前日期的完成服务的总订单数。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月完成服务的总订单数/本月目标完成服务的总订单数】*100%</p>
            </div>
          </div>
        </div>

      </section>
      <section class="crossWise" @click="explain('show12')">
        <div class="face" :class="{toggle:Flipped.show12}" style="height: 8em;">
          <div class="in">
            <h4>司机加盟数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>今日</p>
                  <p class="goal green">{{DataInit.todyDriverReNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthDriverReNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.driverJoinTarget}}</span></div>
                <Rating :divisor='DataInit.monthDriverReNum' :divided="DataInit.driverJoinTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日司机加盟数:当天注册审核通过的司机。</p>
              <p>2.本月司机加盟数:当月注册审核通过的司机。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月司导加盟数/本月目标司机加盟数】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show13')">
        <div class="face" :class="{toggle:Flipped.show13}" style="height: 8em;">
          <div class="in">
            <h4>用户活跃数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{DataInit.yUseractivity}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthUseractivity}}</p>
                </div>
              </div>
              <p class="txt">日活占比：<span class="red">{{DataInit.dayPercentActivity}}</span></p>
              <p class="txt">月活占比：<span class="red">{{DataInit.monthPercentActivity}}</span></p>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.昨日用户活跃数据，昨日登录用户进入APP首页的用户。 </p>
              <p>2.本月用户活跃数据，本月登录用户进入APP首页的用户。</p>
              <p>3.日活占比：昨日用户活跃数据/总注册人数。 （摩拉旅行注册用户总数+摩拉出行注册用户总数）</p>
              <p>4.月活占比：每天刷新的月活占比只能取平均值：【N天内累计用户数/N天】</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show14')">
        <div class="face" :class="{toggle:Flipped.show14}">
          <div class="in">
            <h4>累计分享总数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{newData.todySharNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{newData.monthSharNum}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.今日用户成功分享总数。（分享有奖页面，统计有下线的分享者）</p>
              <p>2.本月用户成功分享总数 。</p>
              <p>3.统计累计用户成功分享总数。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show15')">
        <div class="face" :class="{toggle:Flipped.show15}" style="height:8rem">
          <div class="in">
            <h4>微信粉丝数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{DataInit.wechatFansNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthWechatFansNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.wechatFansTarget}}</span></div>
                <Rating :divisor='DataInit.monthWechatFansNum' :divided="DataInit.wechatFansTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.昨日微信粉丝数：需运营在当天12点以后台录入粉丝数。</p>
              <p>2.本月微信粉丝数：需运营在后台录入本月1号到当前日期的微信粉丝数。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月微信粉丝数/本月目标微信粉丝数】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show16')">
        <div class="face" :class="{toggle:Flipped.show16}">
          <div class="in">
            <h4>累计新增下载总数 <i>单位：人</i></h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{newData.todySharNumZ}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{newData.monthSharNumZ}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>没有说明</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show17')">
        <div class="face" :class="{toggle:Flipped.show17}" style="height: 8rem">
          <div class="in">
            <h4>iOS下载数据</h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{DataInit.iosDowNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthIosDowNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.iosDownloadsTarget}}</span></div>
                <Rating :divisor='DataInit.monthIosDowNum' :divided="DataInit.iosDownloadsTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.昨日IOS下载数：需运营在当天12点以后录入IOS下载数据。</p>
              <p>2.本月IOS下载数：需运营在后台录入本月1号到当前日期IOS的下载数据。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月IOS下载数/本月目标IOS下载数】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show18')">
        <div class="face" :class="{toggle:Flipped.show18}" style="height: 8rem">
          <div class="in">
            <h4>Android下载数据</h4>
            <div class="pt5">
              <div class="flex">
                <div class="w50">
                  <p>昨日</p>
                  <p class="goal green">{{DataInit.androidDowNum}}</p>
                </div>
                <div class="w50">
                  <p align="right">本月</p>
                  <p class="goal green">{{DataInit.monthAndroidDowNum}}</p>
                </div>
              </div>
              <div class="rating">
                <div class="txt">本月目标：<span>{{DataInit.androidDownloadsTarget}}</span></div>
                <Rating :divisor='DataInit.monthAndroidDowNum' :divided="DataInit.androidDownloadsTarget"></Rating>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.昨日安卓下载数：需运营在当天12点以后录入安卓下载数据。</p>
              <p>2.本月安卓下载数：需运营在后台录入本月1号到当前日期安卓的下载数据。</p>
              <p>3.需后台设置目标值，统计目标达成率：【本月安卓下载数/本月目标安卓下载数】*100%</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show19')">
        <div class="face" :class="{toggle:Flipped.show19}">
          <div class="in">
            <h4>注册用户累计总数</h4>
            <div class="pt5">
              <div class="flex">
                <p class="goal green">{{newData.allRegisterNumLvXing}}</p>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.统计从上线开始到当前日期的注册总用户数（摩拉旅行）</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show20')">
        <div class="face" :class="{toggle:Flipped.show20}">
          <div class="in">
            <h4>微信粉丝累计总数</h4>
            <div class="pt5">
              <div class="flex">
                <p class="goal green">{{newData.wechatFansNumAll}}</p>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.统计从上线开始到当前日期的微信粉丝总数。（摩拉旅行+出行）</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show21')">
        <div class="face" :class="{toggle:Flipped.show21}">
          <div class="in">
            <h4>安卓累计下载总数</h4>
            <div class="pt5">
              <div class="flex">
                <p class="goal green">{{newData.androidDowNumAll}}</p>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.统计从系统上线开始截止到当前日期的下载总数。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="crossWise" @click="explain('show22')">
        <div class="face" :class="{toggle:Flipped.show22}">
          <div class="in">
            <h4>iOS累计下载总数</h4>
            <div class="pt5">
              <div class="flex">
                <p class="goal green">{{newData.iosDowNumAll}}</p>
              </div>
            </div>
          </div>
          <div class="out">
            <div class="txt">
              <p>1.统计从系统上线开始截止到当前日期的下载总数。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <foot-guide></foot-guide>
  </div>
  </transition>
</template>
<script>
  import md5 from 'js-md5'
  import Rating from '../components/rating'
  import footGuide from '../components/footGuide'
  import {getData} from "../components/js/getData";

  export default {
    data() {
      return {
        startDate:'',
        endDate:'',
        nonce_str:Date.parse(new Date()) / 1000,
        now:new Date(),
        DataInit:{},
        newData:{},
        show:'',
        Flipped:{
          show1:false,
          show2:false,
          show3:false,
          show4:false,
          show5:false,
          show6:false,
          show7:false,
          show8:false,
          show9:false,
          show10:false,
          show11:false,
          show12:false,
          show13:false,
          show14:false,
          show15:false,
          show16:false,
          show17:false,
          show18:false,
          show19:false,
          show20:false,
          show21:false,
          show22:false,
          show23:false,
          show24:false,
        },
        loading:true,
      }
    },
    created(){
      this.show = this.$route.query.show;
    },
    components:{
      Rating,
      footGuide
    },
    mounted(){
      this.initChart()
    },
    methods: {
      async initChart () {
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
        this.newData = this.DataInit.newmap;
        //this.loading = false;
      },
      explain(e){
        this.Flipped[e] = !this.Flipped[e];
      }
    },
  }
</script>
