const member = (state = {
  accessToken: '',
  username: '',
  isLogging: false,
  message: '',
}, action) => {
  console.log(action);
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
        message: action.json.error.message,
      });
    } else {
      return Object.assign({}, state, {
        isLogging: false,
        accessToken: action.json.id,
        userId: action.json.user.userId,
        username: action.json.user.username,
        message: '登录成功',
      });
    }
  default:
    return state;
  }
};

export default member;
