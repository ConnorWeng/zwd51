import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = null;

const requestState = {
  getNextLayerRequest: {
    name: 'GET_NEXT_LAYER',
    mapping: {
      categories: {init: []},
    },
  },
};

export default buildReducer(defaultState, defaultHandler, requestState);
