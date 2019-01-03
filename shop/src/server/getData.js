import fetch from './fetch'

export const shopList = (nonce_str,page,type,sign) => fetch('/api/travel/shopGoods/shopList?client=web&language=Zh&nonce_str='+nonce_str+'&page='+page+'&type='+type+'&sign='+sign);
export const itemDes = (goodsId,nonce_str,sign) => fetch('/api/travel/shopGoods/shopDetail?client=web&goodsId='+goodsId+'&language=Zh&nonce_str='+nonce_str+'&sign='+sign);
