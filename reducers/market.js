const market = (state = {
  isLoading: false,
  shops: [],
  mkId: 0,
  page: 0,
  end: false,
  message: '',
}, action) => {
  switch (action.type) {
  case 'CHANGE_MK_ID':
    return Object.assign({}, state, {
      shops: [],
      mkId: action.mkId,
      page: 0,
      end: false,
      message: '',
    });
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
        shops: [],
        page: 0,
      });
    } else {
      return Object.assign({}, state, {
        isLoading: false,
        shops: [
          ...state.shops,
          ...action.json,
        ],
        page: action.json.length > 0 ? state.page + 1 : state.page,
        end: action.json.length < 10 ? true : false,
        message: '',
      });
    }
  default:
    return state;
  }
};

export default market;
