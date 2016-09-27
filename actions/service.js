// TODO: handle network error
export async function loginService(username, password) {
  let json;
  try {
    const response = await fetch(remoteService('/mobile_member/login'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
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
};

export async function submitOrderService(specIds, specNums, addressId,
                                         behalfId, deliveryId, postscript,
                                         accessToken) {
  let json;
  try {
    const response = await fetch(remoteService('/mobile_order/submit_order'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `spec_ids=${specIds}&spec_nums=${specNums}&address_id=${addressId}&behalf_id=${behalfId}&delivery_id=${deliveryId}&postscript=${postscript}&access_token=${accessToken}`,
    });
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
};

export async function getOrdersService(accessToken) {
  let json;
  try {
    const response = await fetch(remoteService('/mobile_order/index') + '&access_token=' + accessToken);
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

export async function getAlipayOrderInfoService(orderId, accessToken) {
  let json;
  try {
    const response = await fetch(remoteService(
      '/mobile_order/get_alipay_order_info') + `&order_id=${orderId}&access_token=${accessToken}`);
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

export async function getShopsService(mkId, page) {
  let json;
  try {
    const response = await fetch(
      remoteService('/mobile_shop/index') + `&mk_id=${mkId}&page=${page}`);
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

import {SERVICE_URL} from "../service.json";

function remoteService(serviceName) {
  const parts = serviceName.split('/');
  return SERVICE_URL + '/index.php?app=' + parts[1] + '&act=' + parts[2];
}
