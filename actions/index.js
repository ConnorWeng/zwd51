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

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function check(taobaoUsername, id, nick, avatarUrl, authorizationCode) {
  return serviceAction('CHECK', '/mobile_member/check', 'POST', {
    taobao_username: taobaoUsername,
    id: id,
    nick: nick,
    avatar_url: avatarUrl,
    authorization_code: authorizationCode,
  });
}

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

export function clearSubmitOrderInfo() {
  return {
    type: 'CLEAR_SUBMIT_ORDER_INFO',
  };
}

export function getOrders(page, accessToken) {
  return serviceAction('GET_ORDERS', '/mobile_order/index', 'GET', {
    page: page,
    access_token: accessToken,
  });
}

export function refreshOrders(accessToken) {
  return serviceAction('GET_ORDERS', '/mobile_order/index', 'GET', {
    page: 1,
    access_token: accessToken,
  });
}

export function clearOrders() {
  return {
    type: 'CLEAR_ORDERS',
  };
}

export function getAlipayOrderInfo(orderId, accessToken) {
  return serviceAction('GET_ALIPAY_ORDER_INFO', '/mobile_order/get_alipay_order_info', 'GET', {
    order_id: orderId,
    access_token: accessToken,
  });
}

export function clearAlipayOrderInfo() {
  return {
    type: 'CLEAR_ALIPAY_ORDER_INFO',
  };
}

export function getOrderInfoForRefund(orderId, accessToken) {
  return serviceAction('GET_ORDER_INFO_FOR_REFUND', '/mobile_order/get_order_info_for_refund', 'GET', {
    order_id: orderId,
    access_token: accessToken,
  });
}

export function clearOrderInfoForRefund() {
  return {
    type: 'CLEAR_ORDER_INFO_FOR_REFUND',
  };
}

export function applyRefund(orderId, refundAmount, refundReason, refundIntro, goodsIds, invoiceNo, deliveryName, accessToken) {
  return serviceAction('APPLY_REFUND', '/mobile_order/apply_refund', 'POST', {
    order_id: orderId,
    refund_amount: refundAmount,
    refund_reason: refundReason,
    refund_intro: refundIntro,
    goods_ids: goodsIds,
    invoice_no: invoiceNo,
    delivery_name: deliveryName,
    access_token: accessToken,
  });
}

export function confirmOrder(orderId, accessToken) {
  return serviceAction('CONFIRM_ORDER', '/mobile_order/confirm_order', 'POST', {
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

export function getCart(accessToken) {
  return serviceAction('GET_CART', '/mobile_cart/index', 'GET', {
    access_token: accessToken,
  });
}

export function addToCart(specId, quantity, accessToken) {
  return serviceAction('ADD_TO_CART', '/mobile_cart/add', 'POST', {
    spec_id: specId,
    quantity: quantity,
    access_token: accessToken,
  });
}

export function dropFromCart(recId, accessToken) {
  return serviceAction('DROP_FROM_CART', '/mobile_cart/drop', 'POST', {
    rec_id: recId,
    access_token: accessToken,
  });
}

export function dropFromCartLocal(storeId, recId) {
  return {
    type: 'DROP_FROM_CART_LOCAL',
    store_id: storeId,
    rec_id: recId,
  };
}

export function addAddress(consignee, regionId, regionName, address, zipcode, phoneMob, accessToken) {
  return serviceAction('ADD_ADDRESS', '/mobile_address/add', 'POST', {
    consignee: consignee,
    region_id: regionId,
    region_name: regionName,
    address: address,
    zipcode: zipcode,
    phone_mob: phoneMob,
    access_token: accessToken,
  });
}

export function getRegions(pid, layer, accessToken) {
  return serviceAction('GET_REGIONS', '/mobile_address/get_regions', 'GET', {
    pid: pid,
    layer: layer,
    access_token: accessToken,
  });
}

export function welcomed() {
  return {
    type: 'WELCOMED',
  };
}

export function clearWelcomed() {
  return {
    type: 'CLEAR_WELCOMED',
  };
}

export function getOrderInfo(orderId, accessToken) {
  return serviceAction('GET_ORDER_INFO', '/mobile_order/get_order_info', 'GET', {
    order_id: orderId,
    access_token: accessToken,
  });
}

export function addItem(goodsId, accessToken) {
  return serviceAction('ADD_ITEM', '/mobile_taobao/add_item', 'POST', {
    goods_id: goodsId,
    access_token: accessToken,
  });
}

export function makePictureCategory(accessToken) {
  return serviceAction('MAKE_PICTURE_CATEGORY', '/mobile_taobao/make_picture_category', 'POST', {
    access_token: accessToken,
  });
}
