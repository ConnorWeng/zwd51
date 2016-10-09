export const REQUEST_INITIAL_STATE = {
  isLoading: false,
  data: [],
  page: 1,
  isEnd: false,
  message: '',
};

export function buildReducer(defaultState, defaultHandler, requestState) {
  const handlers = [];
  const mergeState = {};
  for (var key in requestState) {
    mergeState[key] = REQUEST_INITIAL_STATE;
    const requestName = requestState[key];
    handlers.push((state, action) => {
      const newState = {};
      switch (action.type) {
      case `${requestName}_REQUEST`:
        newState[key] = {
          isLoading: true,
          data: state[key].data,
          page: state[key].page,
          isEnd: false,
          message: '',
        };
        return Object.assign({}, state, newState);
      case `${requestName}_CHECK`:
        if (action.json.error) {
          newState[key] = Object.assign({}, REQUEST_INITIAL_STATE, {
            message: action.json.message,
          });
          return Object.assign({}, state, newState);
        } else {
          newState[key] = {
            isLoading: false,
            data: [
              ...state[key].data,
              ...action.json,
            ],
            page: action.json.length > 0 ? state[key].page + 1 : state[key].page,
            isEnd: action.json.length < 10 ? true : false,
            message: '',
          };
          return Object.assign({}, state, newState);
        }
      }
      return null;
    });
  }
  handlers.push(defaultHandler);
  return (state = Object.assign({}, defaultState, mergeState), action) => {
    for (let i = 0; i < handlers.length; i++) {
      const newState = handlers[i](state, action);
      if (newState) {
        return newState;
      }
    }
    return state;
  };
}
