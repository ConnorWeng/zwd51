import {loginService, submitOrderService, getOrdersService, getAlipayOrderInfoService} from './service';

export function changeMainTab(index) {
  return {
    type: 'CHANGE_MAIN_TAB',
    index: index,
  };
}

export function login(username, password) {
  return async (dispatch) => {
    dispatch(loginRequest());
    const responseJson = await loginService(username, password);
    dispatch(loginCheck(responseJson));
  };
};

function loginRequest() {
  return {
    type: 'LOGIN_REQUEST',
  };
}

function loginCheck(json) {
  return {
    type: 'LOGIN_CHECK',
    json: json,
  };
}

export function submitOrder(specIds, specNums, addressId,
                            behalfId, deliveryId, postscript,
                            accessToken) {
  return async (dispatch) => {
    dispatch(submitOrderRequest());
    const responseJson = await submitOrderService(specIds, specNums, addressId,
                                                  behalfId, deliveryId, postscript,
                                                  accessToken);
    dispatch(submitOrderCheck(responseJson));
  };
}

function submitOrderRequest() {
  return {
    type: 'SUBMIT_ORDER_REQUEST',
  };
}

function submitOrderCheck(json) {
  return {
    type: 'SUBMIT_ORDER_CHECK',
    json: json,
  };
}

export function getOrders(accessToken) {
  return async (dispatch) => {
    dispatch(getOrdersRequest());
    const responseJson = await getOrdersService(accessToken);
    dispatch(getOrdersCheck(responseJson));
  };
}

function getOrdersRequest() {
  return {
    type: 'GET_ORDERS_REQUEST',
  };
}

function getOrdersCheck(json) {
  return {
    type: 'GET_ORDERS_CHECK',
    json: json,
  };
}

export function getAlipayOrderInfo(orderId, accessToken) {
  return async (dispatch) => {
    dispatch(getAlipayOrderInfoRequest(orderId));
    const responseJson = await getAlipayOrderInfoService(orderId, accessToken);
    dispatch(getAlipayOrderInfoCheck(responseJson));
  };
}

function getAlipayOrderInfoRequest(orderId) {
  return {
    type: 'GET_ALIPAY_ORDER_INFO_REQUEST',
    orderId: orderId,
  };
}

function getAlipayOrderInfoCheck(json) {
  return {
    type: 'GET_ALIPAY_ORDER_INFO_CHECK',
    json: json,
  };
}
