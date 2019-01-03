<template>
  <div>
    <main class="main">
      <div class="tab bgWhite">
        <section class="tab_title">
          <span :class="{choosed: categoryType === 1}" @click="categoryType = 1">昨天</span>
          <span :class="{choosed: categoryType === 2}" @click="categoryType = 2">近7天</span>
          <span :class="{choosed: categoryType === 3}" @click="categoryType = 3">近30天</span>
          <span :class="{choosed: categoryType === 4}" @click="categoryType = 4">近3个月</span>
        </section>
        <transition name="router-fade">
          <div class="crossWise">
            <section v-if="categoryType === 1">
              <ul>
                <li>
                  <div class="pt5">
                    <p class="goal blue">{{DataInit.yesterdayRegisterNum}}</p>
                    <p style="text-align: center">注册用户总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentRegister}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.YpercentRegister}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal blue">{{DataInit.yesterdayActivityNum}}</p>
                    <p style="text-align: center">用户活跃度</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentActivity}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentActivity}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.yesterdayOrderAmentCancle}}</p>
                    <p style="text-align: center">订单取消总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentOrderAmentCancle}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HYpercentOrderAmentCancle}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.yesterdayRechargeAment}}</p>
                    <p style="text-align: center">钱包充值总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentRechargeAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentRechargeAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.yesterdayOrderAmentCancle}}</p>
                    <p style="text-align: center">O2O充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentRechargeAmentOther}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HYpercentRechargeAmentOther}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.yesterdayRechargeAmentCash}}</p>
                    <p style="text-align: center">现金充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentRechargeAmentCash}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HYpercentRechargeAmentCash}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.yesterdayOrderAment}}</p>
                    <p style="text-align: center">支付订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentOrderAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentOrderAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.yesterdayOrderAments}}</p>
                    <p style="text-align: center">完成服务订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentOrderAments}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentOrderAments}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayKeDanJia}}</p>
                    <p style="text-align: center">客单价</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentKeDanJia}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentKeDanJia}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayOrderReNum}}</p>
                    <p style="text-align: center">支付订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentOrders}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentOrders}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayDriverReNum}}</p>
                    <p style="text-align: center">完成服务订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentOrder}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentOrder}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.yesterdaySharNum}}</p>
                    <p style="text-align: center">累计分享总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentSharNum}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.YpercentSharNum}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.yesterdaySharNumZ}}</p>
                    <p style="text-align: center">累计新增下线总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentSharNumZ}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.YpercentSharNumZ}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.yesterdaySharNumA}}</p>
                    <p style="text-align: center">累计领取魔豆总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TYpercentSharNumA}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.YpercentSharNumA}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayDriverReNum}}</p>
                    <p style="text-align: center">司机加盟数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentDriver}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentDriver}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayCancelNum}}</p>
                    <p style="text-align: center">取消订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentCancel}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentCancel}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayCancelNumu}}</p>
                    <p style="text-align: center">用户取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentCancelu}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentCancelu}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.yesterdayCancelNumd}}</p>
                    <p style="text-align: center">司机取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TYpercentCanceld}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HYpercentCanceld}}</span></p>
                  </div>
                </li>
              </ul>
            </section>
            <section v-if="categoryType === 2">
              <ul>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayRegisterNum}}</p>
                    <p style="text-align: center">注册用户总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentRegister}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentRegister}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal blue">{{DataInit.qidayActivityNum}}</p>
                    <p style="text-align: center">用户活跃度</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentActivity}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentActivity}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.qidayOrderAmentCancle}}</p>
                    <p style="text-align: center">订单取消总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentOrderAmentCancle}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HQpercentOrderAmentCancle}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.qidayRechargeAment}}</p>
                    <p style="text-align: center">钱包充值总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentRechargeAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentRechargeAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.qidayRechargeAmentOther}}</p>
                    <p style="text-align: center">O2O充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentRechargeAmentOther}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HQpercentRechargeAmentOther}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.qidayRechargeAmentCash}}</p>
                    <p style="text-align: center">现金充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentRechargeAmentCash}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HQpercentRechargeAmentCash}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.qidayOrderAment}}</p>
                    <p style="text-align: center">支付订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentOrderAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentOrderAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.qidayOrderAments}}</p>
                    <p style="text-align: center">完成服务订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentOrderAments}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentOrderAments}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayKeDanJia}}</p>
                    <p style="text-align: center">客单价</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentKeDanJia}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentKeDanJia}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayOrderNums}}</p>
                    <p style="text-align: center">支付订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentOrders}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentOrders}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayDriverReNum}}</p>
                    <p style="text-align: center">完成服务订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentOrder}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentOrder}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.qidaySharNum}}</p>
                    <p style="text-align: center">累计分享总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentSharNum}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.QpercentSharNum}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.qidaySharNumZ}}</p>
                    <p style="text-align: center">累计新增下线总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentSharNumZ}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.QpercentSharNumA}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.qidaySharNumA}}</p>
                    <p style="text-align: center">累计领取魔豆总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TQpercentSharNumA}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.YpercentSharNumA}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayDriverReNum}}</p>
                    <p style="text-align: center">司机加盟数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentDriver}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentDriver}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayCancelNum}}</p>
                    <p style="text-align: center">取消订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentCancel}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentCancel}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayCancelNumu}}</p>
                    <p style="text-align: center">用户取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentCancelu}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentCancelu}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.qidayCancelNumd}}</p>
                    <p style="text-align: center">司机取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TQpercentCanceld}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HQpercentCanceld}}</span></p>
                  </div>
                </li>
              </ul>
            </section>
            <section v-if="categoryType === 3">
              <ul>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayRegisterNum}}</p>
                    <p style="text-align: center">注册用户总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentRegister}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentRegister}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal blue">{{DataInit.sanShidayActivityNum}}</p>
                    <p style="text-align: center">用户活跃度</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentActivity}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentActivity}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanShidayOrderAmentCancle}}</p>
                    <p style="text-align: center">订单取消总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentOrderAmentCancle}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentOrderAmentCancle}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanShidayRechargeAment}}</p>
                    <p style="text-align: center">钱包充值总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentRechargeAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentRechargeAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanShidayRechargeAmentOther}}</p>
                    <p style="text-align: center">O2O充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentRechargeAmentOther}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentRechargeAmentOther}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanShidayRechargeAmentCash}}</p>
                    <p style="text-align: center">现金充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentRechargeAmentCash}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentRechargeAmentCash}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanShidayOrderAment}}</p>
                    <p style="text-align: center">支付订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentOrderAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentOrderAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanShidayOrderAments}}</p>
                    <p style="text-align: center">完成服务订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentOrderAments}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentOrderAments}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayKeDanJia}}</p>
                    <p style="text-align: center">客单价</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentKeDanJia}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentKeDanJia}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayOrderNums}}</p>
                    <p style="text-align: center">支付订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentOrders}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentOrders}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayDriverReNum}}</p>
                    <p style="text-align: center">完成服务订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentOrder}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentOrder}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanShidaySharNum}}</p>
                    <p style="text-align: center">累计分享总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentSharNum}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentSharNum}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanShidaySharNumZ}}</p>
                    <p style="text-align: center">累计新增下线总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentSharNumZ}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentSharNumZ}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanShidaySharNumA}}</p>
                    <p style="text-align: center">累计领取魔豆总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanShipercentSharNumA}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanShipercentSharNumA}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayDriverReNum}}</p>
                    <p style="text-align: center">司机加盟数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentDriver}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentDriver}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayCancelNum}}</p>
                    <p style="text-align: center">取消订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentCancel}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentCancel}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayCancelNumu}}</p>
                    <p style="text-align: center">用户取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentCancelu}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentCancelu}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanShidayCancelNumd}}</p>
                    <p style="text-align: center">司机取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanShipercentCanceld}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanShipercentCanceld}}</span></p>
                  </div>
                </li>
              </ul>
            </section>
            <section v-if="categoryType === 4">
              <ul>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayRegisterNum}}</p>
                    <p style="text-align: center">注册用户总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentRegister}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentRegister}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal blue">{{DataInit.sanYuedayActivityNum}}</p>
                    <p style="text-align: center">用户活跃度</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentActivity}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentActivity}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanYuedayOrderAmentCancle}}</p>
                    <p style="text-align: center">订单取消总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentOrderAmentCancle}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentOrderAmentCancle}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanYuedayRechargeAment}}</p>
                    <p style="text-align: center">钱包充值总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentRechargeAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentRechargeAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanYuedayRechargeAmentOther}}</p>
                    <p style="text-align: center">O2O充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentRechargeAmentOther}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentRechargeAmentOther}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{newData.sanYuedayRechargeAmentCash}}</p>
                    <p style="text-align: center">现金充值总额</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentRechargeAmentCash}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentRechargeAmentCash}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanYuedayOrderAment}}</p>
                    <p style="text-align: center">支付订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentOrderAment}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentOrderAment}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal red">{{DataInit.sanYuedayOrderAments}}</p>
                    <p style="text-align: center">完成服务订单总额</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentOrderAments}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentOrderAments}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayKeDanJia}}</p>
                    <p style="text-align: center">客单价</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentKeDanJia}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentKeDanJia}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayOrderNums}}</p>
                    <p style="text-align: center">支付订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentOrders}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentOrders}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayDriverReNum}}</p>
                    <p style="text-align: center">完成服务订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentOrder}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentOrder}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanYuedaySharNum}}</p>
                    <p style="text-align: center">累计分享总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentSharNum}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentSharNum}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanYuedaySharNumZ}}</p>
                    <p style="text-align: center">累计新增下线总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentSharNumZ}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentSharNumZ}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{newData.sanYuedaySharNumA}}</p>
                    <p style="text-align: center">累计领取魔豆总数</p>
                    <p class="txt">同比：<span class="blue">{{newData.TSanYuepercentSharNumA}}</span></p>
                    <p class="txt">环比：<span class="green">{{newData.HSanYuepercentSharNumA}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayDriverReNum}}</p>
                    <p style="text-align: center">司机加盟数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentDriver}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentDriver}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayCancelNum}}</p>
                    <p style="text-align: center">取消订单总数</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentCancel}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentCancel}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayCancelNumu}}</p>
                    <p style="text-align: center">用户取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentCancelu}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentCancelu}}</span></p>
                  </div>
                </li>
                <li>
                  <div class="pt5">
                    <p class="goal">{{DataInit.sanYuedayCancelNumd}}</p>
                    <p style="text-align: center">司机取消</p>
                    <p class="txt">同比：<span class="blue">{{DataInit.TSanYuepercentCanceld}}</span></p>
                    <p class="txt">环比：<span class="green">{{DataInit.HSanYuepercentCanceld}}</span></p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </transition>
      </div>
    </main>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import Rating from '../components/rating'
  import footGuide from '../components/footGuide'
  import {getData} from "../components/js/getData";

  export default {
    data() {
      return {
        categoryType: 1,
        DataInit:{},
        newData:{},
        startDate:'',
        endDate:'',
        nonce_str:Date.parse(new Date()) / 1000,
        now:new Date(),
      }
    },
    components:{
      Rating,
      footGuide
    },
    mounted(){
      //初始化 ECharts 实例，不能在created生命周期内初始化，因为那时候DOM还没有渲染，是找不到元素的
      this.initChart()
    },
    methods: {
      async initChart () {
        //获取数据
        /*if (this.startDate === '') {
          this.startDate = this.getMonthStartDate();
        }
        if (this.endDate === '') {
          this.endDate = this.getMonthEndDate();
        }*/
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
      },
    },
  }
</script>
