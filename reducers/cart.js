import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = (state, action) => {
  switch (action.type) {
  case 'DROP_FROM_CART_LOCAL':
    let newShop = null;
    const goods = [];
    const shops = [];
    state.getCartRequest.shops.forEach((shop) => {
      if (shop.store_id === action.store_id) {
        newShop = Object.assign({}, shop, {});
        newShop.goods.forEach((good) => {
          if (good.rec_id !== action.rec_id) {
            goods.push(good);
          }
        });
        newShop.goods = goods;
        if (newShop.goods.length > 0) {
          shops.push(newShop);
        }
      } else {
        shops.push(shop);
      }
    });
    const newState = {
      getCartRequest: Object.assign({}, state.getCartRequest, {
        shops: shops,
      }),
    };
    return Object.assign({}, state, newState);
  }
};

const requestState = {
  getCartRequest: {
    name: 'GET_CART',
    mapping: {
      shops: {init: []},
    },
  },
  addToCartRequest: {
    name: 'ADD_TO_CART',
    mapping: {
      success: 'success',
    },
  },
  dropFromCartRequest: {
    name: 'DROP_FROM_CART',
    mapping: {
      success: 'success',
    },
  }
};

export default buildReducer(defaultState, defaultHandler, requestState);
