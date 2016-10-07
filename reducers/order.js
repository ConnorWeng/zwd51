const order = (state = {
  isProcessing: false,
  orders: [],
  lastProcessed: null,
  goodsInfo: {},
  message: '',
}, action) => {
  switch (action.type) {
  case 'SUBMIT_ORDER_REQUEST': ;
    return Object.assign({}, state, {
      isProcessing: true,
      lastProcessed: null,
      message: '',
    });
  case 'SUBMIT_ORDER_CHECK': ;
    if (action.json.error) {
      return Object.assign({}, state, {
        isProcessing: false,
        message: action.json.message,
      });
    } else {
      const newOrder = {
        order_id: action.json.order_id,
        order_sn: action.json.order_sn,
        order_amount: action.json.order_amount,
        order_info: action.json.order_info,
        status: action.json.status,
      };
      return Object.assign({}, state, {
        isProcessing: false,
        orders: [
          ...state.orders,
          newOrder,
        ],
        lastProcessed: newOrder,
        message: '提交成功',
      });
    }
  case 'GET_ORDERS_CHECK':
    return Object.assign({}, state, {
      orders: action.json
    });
  case 'GET_ALIPAY_ORDER_INFO_REQUEST':
    return Object.assign({}, state, {
      isProcessing: true,
      lastProcessed: null,
      message: '',
    });
  case 'GET_ALIPAY_ORDER_INFO_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isProcessing: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isProcessing: false,
        lastProcessed: action.json,
      });
    }
  case 'GET_ORDER_GOODS_INFO_REQUEST':
    return Object.assign({}, state, {
      isProcessing: true,
      lastProcessed: null,
      message: '',
      goodsInfo: {},
    });
  case 'GET_ORDER_GOODS_INFO_CHECK':
    if (action.json.error) {
      return Object.assign({}, state, {
        isProcessing: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isProcessing: false,
        message: '',
        goodsInfo: action.json,
      });
    }
  default:
    return state;
  }
};

export default order;
