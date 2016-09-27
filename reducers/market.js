const market = (state = {
  isLoading: false,
  shops: [],
  mkId: 0,
  page: 0,
  message: '',
}, action) => {
  switch (action.type) {
  case 'GET_SHOPS_REQUEST':
    return Object.assign({}, state, {
      isLoading: true,
      message: '',
    });
  case 'GET_SHOPS_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLoading: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isLoading: false,
        shops: [
          ...state.shops,
          ...action.json,
        ],
        page: state.page + 1,
        message: '',
      });
    }
  default:
    return state;
  }
};

export default market;
