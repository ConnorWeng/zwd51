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

export function getShops(mkId, page) {
  return serviceAction('GET_SHOPS', '/mobile_shop/index', 'GET', {
    mk_id: mkId,
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

function serviceAction(serviceName, path, method, params) {
  return async (dispatch) => {
    dispatch({
      type: serviceName + '_REQUEST',
    });
    let json;
    if (method === 'GET') {
      json = await callGetService(path, params);
    } else if (method === 'POST') {
      json = await callPostService(path, params);
    }
    dispatch({
      type: serviceName + '_CHECK',
      json: json,
    });
  };
}

import {SERVICE_URL} from "../service.json";

async function callGetService(path, params) {
  let json;
  try {
    const response = await fetch(
      remoteService(path) + buildQueryString(params));
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

async function callPostService(path, params) {
  let json;
  try {
    const response = await fetch(remoteService(path), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: buildQueryString(params),
    });
    json = await response.json();
  } catch (e) {
    // TODO: log error and send later?
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

function buildQueryString(params) {
  let query = '';
  for (var key in params) {
    query += `&${key}=${params[key]}`;
  }
  return query;
}

function remoteService(serviceName) {
  const parts = serviceName.split('/');
  return SERVICE_URL + '/index.php?app=' + parts[1] + '&act=' + parts[2];
}
