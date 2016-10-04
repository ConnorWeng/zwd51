// TODO: handle network error
export async function loginService(username, password) {
  return await callPostService('/mobile_member/login', {
    username: username,
    password: password,
  });
};

export async function submitOrderService(specIds, specNums, addressId,
                                         behalfId, deliveryId, postscript,
                                         accessToken) {
  return await callPostService('/mobile_order/submit_order', {
    spec_ids: specIds,
    spec_nums: specNums,
    address_id: addressId,
    behalf_id: behalfId,
    delivery_id: deliveryId,
    postscript: postscript,
    access_token: accessToken,
  });
};

export async function getOrdersService(accessToken) {
  return await callGetService('/mobile_order/index', {
    access_token: accessToken,
  });
}

export async function getAlipayOrderInfoService(orderId, accessToken) {
  return await callGetService('/mobile_order/get_alipay_order_info', {
    order_id: orderId,
    access_token: accessToken,
  });
}

export async function getShopsService(mkId, page) {
  return await callGetService('/mobile_shop/index', {
    mk_id: mkId,
    page: page,
  });
}

export async function getGoodsService(storeId, page) {
  return await callGetService('/mobile_goods/index', {
    store_id: storeId,
    page: page,
  });
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
