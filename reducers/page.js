const page = (state = {}, action) => {
  switch (action.type) {
  case 'CHANGE_MAIN_TAB':
    return Object.assign({}, state, {
      title: (() => {
        switch (action.index) {
        case 1:
          return 'Search';
        case 2:
          return 'Shop';
        case 3:
          return 'Me';
        default:
          return '';
        }
      })()
    });
  default:
    return state;
  }
};

export default page;
