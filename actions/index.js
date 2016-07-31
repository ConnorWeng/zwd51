import {loginService} from './service';

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
