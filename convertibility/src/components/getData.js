import fetch from './fetch'

/**摩拉旅行*/
export const sendSMS = (code,authenticate,nonce_str,phone,token,sign) => fetch('/api/tms/tmsUser/sendSms?areaCode='+code+'&authenticate='+authenticate+'&client=web&language=Zh&nonce_str='+nonce_str+'&phone='+phone+'&token='+token+'&type=6&sign='+sign);
export const validateExchangeMoDian = (SMSCode,nonce_str,phone,sign) => fetch('/api/travel/customized/validateExchangeMoDian?client=web&code='+SMSCode+'&language=Zh&nonce_str='+nonce_str+'&phone='+phone+'&sign='+sign);
export const getBalance = (nonce_str,phone,tokenMy,sign) => fetch('/api/travel/customized/exchangeMoDianDeatil?client=web&language=Zh&nonce_str='+nonce_str+'&phone='+phone+'&tokenMy='+tokenMy+'&sign='+sign);
export const exchange = (lxMd,nonce_str,phone,tokenMy,sign) => fetch('/api/travel/customized/exchangeMoDian?client=web&language=Zh&moDian='+lxMd+'&nonce_str='+nonce_str+'&phone='+phone+'&tokenMy='+tokenMy+'&sign='+sign)
