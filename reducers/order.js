import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = (state, action) => {
  const newState = {};
  switch (action.type) {
  case 'SET_ADDRESS':
    newState.getOrderGoodsRequest = Object.assign({}, state.getOrderGoodsRequest, {
      goodsInfo: Object.assign({}, state.getOrderGoodsRequest.goodsInfo, {
        default_address: action.json,
      }),
    });
    return Object.assign({}, state, newState);
  case 'CLEAR_ORDERS':
    return Object.assign({}, state, {
      getOrdersRequest: REQUEST_INITIAL_STATE,
    });
  case 'CLEAR_ALIPAY_ORDER_INFO':
    newState.getAlipayOrderInfoRequest = Object.assign({}, state.getAlipayOrderInfoRequest, {
      orderInfo: false,
    });
    return Object.assign({}, state, newState);
  case 'CLEAR_SUBMIT_ORDER_INFO':
    newState.submitOrderRequest = Object.assign({}, state.submitOrderRequest, {
      orderInfo: false,
    });
    return Object.assign({}, state, newState);
  case 'CLEAR_ORDER_INFO_FOR_REFUND':
    newState.getOrderInfoForRefundRequest = Object.assign({}, state.getOrderInfoForRefundRequest, {
      order: null,
      deliverys: null,
      levyRebackGoodsFee: null,
    });
    return Object.assign({}, state, newState);
  }
};

const requestState = {
  submitOrderRequest: {
    name: 'SUBMIT_ORDER',
    mapping: {
      orderInfo: {init: false},
    },
  },
  getOrdersRequest: 'GET_ORDERS',
  getAlipayOrderInfoRequest: {
    name: 'GET_ALIPAY_ORDER_INFO',
    mapping: {
      orderInfo: {init: false},
    },
  },
  getOrderGoodsRequest: {
    name: 'GET_ORDER_GOODS_INFO',
    mapping: {
      goodsInfo: {init: false},
    }
  },
  getOrderInfoRequest: {
    name: 'GET_ORDER_INFO',
    mapping: {
      orderInfo: {init: false},
    },
  },
  confirmOrderRequest: {
    name: 'CONFIRM_ORDER',
    mapping: {
      success: 'success',
    },
  },
  applyRefundRequest: {
    name: 'APPLY_REFUND',
    mapping: {
      success: 'success',
    },
  },
  getOrderInfoForRefundRequest: {
    name: 'GET_ORDER_INFO_FOR_REFUND',
    mapping: {
      order: 'order',
      deliverys: 'deliverys',
      levyRebackGoodsFee: 'levy_reback_goods_fee',
    },
  }
};

export default buildReducer(defaultState, defaultHandler, requestState);
