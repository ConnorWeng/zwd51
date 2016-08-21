const order = (state = {
  isSubmitting: false,
  orders: [],
  message: '',
}, action) => {
  switch (action.type) {
  case 'SUBMIT_ORDER_REQUEST': ;
    return Object.assign({}, state, {
      isSubmitting: true,
      message: '',
    });
  case 'SUBMIT_ORDER_CHECK': ;
    if (action.json.error) {
      return Object.assign({}, state, {
        isSubmitting: false,
        message: action.json.message,
      });
    } else {
      return Object.assign({}, state, {
        isSubmitting: false,
        orders: [
          ...state.orders,
          {
            orderId: action.json.order_id,
            totalAmount: action.json.total_amount,
            isPaid: false,
          },
        ],
        message: '提交成功',
      });
    }
  default:
    return state;
  }
};

export default order;
