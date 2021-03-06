import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = (state, action) => {
  switch (action.type) {
  case 'CLEAR_SHOP_GOODS':
    return Object.assign({}, state, {
      getGoodsRequest: REQUEST_INITIAL_STATE,
    });
  case 'CLEAR_SEARCH_GOODS':
    return Object.assign({}, state, {
      searchGoodsRequest: REQUEST_INITIAL_STATE,
    });
  case 'CLEAR_DESCRIPTION':
    return Object.assign({}, state, {
      getDescriptionRequest: {
        isLoading: false,
        message: '',
        description: '',
      }
    });
  case 'CLEAR_GOODS_IN_CATE':
    return Object.assign({}, state, {
      getGoodsInCateRequest: REQUEST_INITIAL_STATE,
    });
  }
};

const requestState = {
  getGoodsRequest: 'GET_GOODS',
  getDescriptionRequest: {
    name: 'GET_DESCRIPTION',
    mapping: {
      description: 'description',
      imgsInDesc: {name: 'imgs_in_desc', init: []},
      needMovePics: 'need_move_pics',
    },
  },
  searchGoodsRequest: 'SEARCH_GOODS',
  getGoodsInCateRequest: 'GET_GOODS_IN_CATE',
};

export default buildReducer(defaultState, defaultHandler, requestState);
