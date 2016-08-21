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
        orderId: action.json.order_id,
        totalAmount: action.json.total_amount,
        isPaid: false,
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
  default:
    return state;
  }
};

export default order;
