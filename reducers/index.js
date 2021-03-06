import {combineReducers} from 'redux';
import page from './page';
import member from './member';
import order from './order';
import market from './market';
import good from './good';
import address from './address';
import cart from './cart';
import taobao from './taobao';
import category from './category';
import setting from './setting';

const reducers = combineReducers({
  page,
  member,
  order,
  market,
  good,
  address,
  cart,
  taobao,
  category,
  setting,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {
      page: {
        welcomed: true,
      }
    };
  }
  return reducers(state, action);
};

export default rootReducer;
