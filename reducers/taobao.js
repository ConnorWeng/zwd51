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
  makePictureCategoryRequest: {
    name: 'MAKE_PICTURE_CATEGORY',
    mapping: {
      pcid: 'pcid',
    }
  },
  uploadPicturesRequest: {
    name: 'UPLOAD_PICTURES',
    mapping: {
      urlPairs: {init: []},
    }
  }
};

export default buildReducer(defaultState, defaultHandler, requestState);
