const member = (state = {
  accessToken: '',
  username: '',
  isLogging: false,
  message: '',
  isTaobao: false,
}, action) => {
  switch (action.type) {
  case 'LOGIN_REQUEST':
    return Object.assign({}, state, {
      isLogging: true,
      message: '',
    });
  case 'LOGIN_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLogging: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isLogging: false,
        accessToken: action.json.access_token,
        userId: action.json.user_id,
        username: action.json.user_name,
        message: '登录成功',
      });
    }
  case 'CHECK_REQUEST':
    return Object.assign({}, state, {
      isLogging: true,
      message: '',
    });
  case 'CHECK_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLogging: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isLogging: false,
        accessToken: action.json.access_token,
        userId: action.json.user_id,
        username: action.json.user_name,
        message: '登录成功',
        isTaobao: true,
      });
    }
  default:
    return state;
  }
};

export default member;
