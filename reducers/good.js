const good = (state = {
  isLoading: false,
  description: '',
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
  case 'GET_DESCRIPTION_REQUEST':
    return Object.assign({}, state, {isLoading: true, message: '', description: ''});
  case 'GET_DESCRIPTION_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLoading: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isLoading: false,
        message: '',
        description: action.json.description,
      });
    }
  case 'CLEAR_DESCRIPTION':
    return Object.assign({}, state, {
      description: '',
    });
  default:
    return state;
  }
};

export default good;
