const page = (state = {welcomed: false}, action) => {
  switch (action.type) {
  case 'CHANGE_MAIN_TAB':
    return Object.assign({}, state, {
      title: (() => {
        switch (action.index) {
        case 1:
          return '搜款式';
        case 2:
          return '购物车';
        case 3:
          return '逛市场';
        case 4:
          return '我的';
        default:
          return '';
        }
      })(),
    });
  case 'WELCOMED':
    return Object.assign({}, state, {
      welcomed: true,
    });
  case 'CLEAR_WELCOMED':
    return Object.assign({}, state, {
      welcomed: false,
    });
  default:
    return state;
  }
};

export default page;
