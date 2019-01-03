import fetch from './fetch'

export const cityList = (cityName,nonce_str,type,sign) => fetch('/api/travel/customized/getCustomizedCityList?cityName='+cityName+'&client=web&language=Zh&nonce_str='+nonce_str+'&type='+type+'&sign='+sign,{});
export const create = (backCityId,backCity,arrCityType,averagePrice,businessType,client,goCityId,goCity,dayNum,depCityType,beginTime,endTime,houseNum,language,nonce_str,othMade,peopleNum,starClass,userId,sign) => fetch('/api/travel/customized/createCustomized?arrCityId='+backCityId+'&arrCityName='+backCity+'&arrCityType='+arrCityType+'&averagePrice='+averagePrice+'&businessType='+businessType+'&client='+client+'&depCityId='+goCityId+'&depCityName='+goCity+'&dayNum='+dayNum+'&depCityType='+depCityType+'&depServiceTimes='+beginTime+'&endTimes='+endTime+'&houseNum='+houseNum+'&language='+language+'&nonce_str='+nonce_str+'&otherDemand='+othMade+'&peopleNum='+peopleNum+'&starClass='+starClass+'&userId='+userId+'&sign='+sign,{

});
//'arrCityId='+arrCityId+'&arrCityName='+arrCityName+'&arrCityType='+arrCityType+'&averagePrice='+averagePrice+'&businessType='+businessType+'&client='+client+'&depCityId='+depCityId+'&depCityName='+depCityName+'&depCityType='+depCityType+'&depServiceTimes='+depServiceTimes+'&houseNum='+houseNum+'&language='+language+'&nonce_str='+nonce_str+'&otherDemand='+otherDemand+'&peopleNum='+peopleNum+'&starClass='+starClass+'&userId='+userId+'&sign='+sign
/*
* arrCityId:backCityId,
  arrCityName:backCity,
  arrCityType:arrCityType,
  averagePrice:averagePrice,
  businessType:businessType,
  client:client,
  depCityId:goCityId,
  depCityName:goCity,
  depCityType:depCityType,
  depServiceTimes:beginTime,
  houseNum:houseNum,
  language:language,
  nonce_str:nonce_str,
  otherDemand:othMade,
  peopleNum:peopleNum,
  starClass:starClass,
  userId:userId,
  sign:sign,
* */

export const getCustomizedList = (nonce_str,userId,sign) => fetch('/api/travel/customized/getCustomizedList?client=web&language=Zh&nonce_str='+nonce_str+'&userId='+userId+'&sign='+sign);
