import fetch from './fetch'

export const getData = (endDate,nonce_str,startDate,sign) => fetch('/api/travel/managementData/getManagementData?client=web&endDate='+endDate+'&language=Zh&nonce_str='+nonce_str+'&startDate='+startDate+'&sign='+sign,{});
