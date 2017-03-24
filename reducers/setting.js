import {buildReducer, REQUEST_INITIAL_STATE} from './builder';

const defaultState = {};

const defaultHandler = null;

const requestState = {
  saveMobileShopSettingsRequest: {
    name: 'SAVE_MOBILE_SHOP_SETTINGS',
    mapping: {
      success: 'success',
    },
  },
  getMobileShopSettingsRequest: {
    name: 'GET_MOBILE_SHOP_SETTINGS',
    mapping: {
      settings: {init: false},
    },
  },
};

export default buildReducer(defaultState, defaultHandler, requestState);
