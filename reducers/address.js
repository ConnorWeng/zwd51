import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = null;

const requestState = {
  getAddressesRequest: {
    name: 'GET_ADDRESSES',
    mapping: {
      addresses: {init: []},
    },
  },
};

export default buildReducer(defaultState, defaultHandler, requestState);
