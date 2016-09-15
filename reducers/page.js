const page = (state = {}, action) => {
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
  default:
    return state;
  }
};

export default page;
