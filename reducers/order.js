const order = (state = {
  isSubmitting: false,
  orders: [],
  lastSubmitted: null,
  message: '',
}, action) => {
  switch (action.type) {
  case 'SUBMIT_ORDER_REQUEST': ;
    return Object.assign({}, state, {
      isSubmitting: true,
      lastSubmitted: null,
      message: '',
    });
  case 'SUBMIT_ORDER_CHECK': ;
    if (action.json.error) {
      return Object.assign({}, state, {
        isSubmitting: false,
        message: action.json.message,
      });
    } else {
      const newOrder = {
        order_id: action.json.order_id,
        order_sn: action.json.order_sn,
        order_amount: action.json.order_amount,
        order_info: action.json.order_info,
        status: action.json.status,
        isProcessing: false,
      };
      return Object.assign({}, state, {
        isSubmitting: false,
        orders: [
          ...state.orders,
          newOrder,
        ],
        lastSubmitted: newOrder,
        message: '提交成功',
      });
    }
  case 'GET_ORDERS_CHECK':
    return Object.assign({}, state, {
      orders: action.json
    });
  default:
    return state;
  }
};

export default order;
