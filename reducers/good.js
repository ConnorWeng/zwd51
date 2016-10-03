const good = (state = {
  isLoading: false,
  goods: [],
  page: 0,
  message: '',
}, action) => {
  switch (action.type) {
  case 'GET_GOODS_REQUEST':
    return Object.assign({}, state, {isLoading: true, message: ''});
  case 'GET_GOODS_CHECK':
    return Object.assign({}, state, {
      isLoading: false,
      goods: [
        ...state.goods,
        ...action.json,
      ],
      page: state.page + 1,
      message: '',
    });
  default:
    return state;
  }
};

export default good;
