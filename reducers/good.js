const good = (state = {
  isLoading: false,
  isLoadingSpecs: false,
  specs: [],
  specName1: '',
  specName2: '',
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
  case 'GET_SPECS_REQUEST':
    return Object.assign({}, state, {
      isLoadingSpecs: true,
      message: '',
      specs: [],
      specName1: '',
      specName2: '',
    });
  case 'GET_SPECS_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLoadingSpecs: false,
        message: action.json.message,
        specs: [],
        specName1: '',
        specName2: '',
      });
    } else {
      return Object.assign({}, state, {
        isLoadingSpecs: false,
        message: '',
        specs: action.json.specs,
        specName1: action.json.spec_name_1,
        specName2: action.json.spec_name_2,
      });
    }
  default:
    return state;
  }
};

export default good;
