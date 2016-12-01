import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = false;

const requestState = {
  addItemRequest: {
    name: 'ADD_ITEM',
    mapping: {
      success: 'success',
    }
  },
};

export default buildReducer(defaultState, defaultHandler, requestState);
