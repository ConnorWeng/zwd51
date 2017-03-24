const page = (state = {welcomed: false}, action) => {
  switch (action.type) {
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
