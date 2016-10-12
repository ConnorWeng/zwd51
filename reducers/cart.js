import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = null;

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
  }
};

export default buildReducer(defaultState, defaultHandler, requestState);
