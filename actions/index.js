import {loginService, submitOrderService} from './service';

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
