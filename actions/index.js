import {serviceAction} from './builder';

export function changeMainTab(index) {
  return {
    type: 'CHANGE_MAIN_TAB',
    index: index,
  };
}

export function login(username, password) {
  return serviceAction('LOGIN', '/mobile_member/login', 'POST', {
    username: username,
    password: password,
  });
};

export function submitOrder(specIds, specNums, addressId,
                            behalfId, deliveryId, postscript,
                            accessToken) {
  return serviceAction('SUBMIT_ORDER', '/mobile_order/submit_order', 'POST', {
    spec_ids: specIds,
    spec_nums: specNums,
    address_id: addressId,
    behalf_id: behalfId,
    delivery_id: deliveryId,
    postscript: postscript,
    access_token: accessToken,
  });
}

export function getOrders(accessToken) {
  return serviceAction('GET_ORDERS', '/mobile_order/index', 'GET', {
    access_token: accessToken,
  });
}

export function getAlipayOrderInfo(orderId, accessToken) {
  return serviceAction('GET_ALIPAY_ORDER_INFO', '/mobile_order/get_alipay_order_info', 'GET', {
    order_id: orderId,
    access_token: accessToken,
  });
}

export function getShops(mkId, keywords, page) {
  return serviceAction('GET_SHOPS', '/mobile_shop/index', 'GET', {
    mk_id: mkId,
    keywords: keywords,
    page: page,
  });
}

export function changeMkId(mkId) {
  return {
    type: 'CHANGE_MK_ID',
    mkId: mkId,
  };
}

export function getGoods(storeId, page) {
  return serviceAction('GET_GOODS', '/mobile_goods/index', 'GET', {
    store_id: storeId,
    page: page,
  });
}

export function getDescription(goodsId) {
  return serviceAction('GET_DESCRIPTION', '/mobile_goods/describe', 'GET', {
    goods_id: goodsId,
  });
}

export function clearDescription() {
  return {
    type: 'CLEAR_DESCRIPTION',
  };
}

export function getSpecs(goodsId) {
  return serviceAction('GET_SPECS', '/mobile_goods/specs', 'GET', {
    goods_id: goodsId,
  });
}

export function getOrderGoodsInfo(specIds, specNums, accessToken) {
  return serviceAction('GET_ORDER_GOODS_INFO', '/mobile_order/get_order_goods_info', 'GET', {
    spec_ids: specIds,
    spec_nums: specNums,
    access_token: accessToken,
  });
}

export function searchGoods(keywords, page) {
  return serviceAction('SEARCH_GOODS', '/mobile_goods/search', 'GET', {
    keywords: keywords,
    page: page,
  });
}

export function clearSearchGoods() {
  return {
    type: 'CLEAR_SEARCH_GOODS',
  };
}

export function clearShopGoods() {
  return {
    type: 'CLEAR_SHOP_GOODS',
  };
}

export function getAddresses(accessToken) {
  return serviceAction('GET_ADDRESSES', '/mobile_address/index', 'GET', {
    access_token: accessToken,
  });
}

export function setAddress(address) {
  return {
    type: 'SET_ADDRESS',
    json: address,
  };
}
