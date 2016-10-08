const good = (state = {
  isLoading: false,
  isLoadingSpecs: false,
  specs: [],
  specName1: '',
  specName2: '',
  description: '',
  goods: [],
  page: 0,
  end: false,
  isSearching: false,
  searchGoods: [],
  searchPage: 0,
  searchEnd: false,
  message: '',
}, action) => {
  switch (action.type) {
  case 'CLEAR_SHOP_GOODS':
    return Object.assign({}, state, {
      isLoading: false,
      goods: [],
      page: 0,
      end: false,
    });
  case 'GET_GOODS_REQUEST':
    return Object.assign({}, state, {
      isLoading: true,
      message: '',
    });
  case 'GET_GOODS_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isLoading: false,
        goods: [],
        page: 0,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isLoading: false,
        goods: [
          ...state.goods,
          ...action.json,
        ],
        page: action.json.length > 0 ? state.page + 1 : state.page,
        end: action.json.length < 20 ? true : false,
        message: '',
      });
    }
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
  case 'CLEAR_SEARCH_GOODS':
    return Object.assign({}, state, {
      isSearching: false,
      searchGoods: [],
      searchEnd: false,
      searchPage: 0,
    });
  case 'SEARCH_GOODS_REQUEST':
    return Object.assign({}, state, {
      isSearching: true,
      message: '',
    });
  case 'SEARCH_GOODS_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isSearching: false,
        message: actions.json.message,
        searchGoods: [],
        searchPage: 0,
      });
    } else {
      return Object.assign({}, state, {
        isSearching: false,
        searchGoods: [
          ...state.searchGoods,
          ...action.json,
        ],
        searchPage: action.json.length > 0 ? state.searchPage + 1 : state.searchPage,
        searchEnd: action.json.length < 20 ? true : false,
        message: '',
      });
    }
  default:
    return state;
  }
};

export default good;
