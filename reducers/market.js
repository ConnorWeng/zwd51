import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {
  mkId: 0,
};

const defaultHandler = (state, action) => {
  switch (action.type) {
  case 'CHANGE_MK_ID':
    return Object.assign({}, state, {
      mkId: action.mkId,
      getShopsRequest: REQUEST_INITIAL_STATE,
    });
  }
};

const requestState = {
  getShopsRequest: 'GET_SHOPS',
};

export default buildReducer(defaultState, defaultHandler, requestState);
