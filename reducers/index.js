import {combineReducers} from 'redux';
import page from './page';
import member from './member';
import order from './order';
import market from './market';
import good from './good';
import address from './address';
import cart from './cart';

const reducers = combineReducers({
  page,
  member,
  order,
  market,
  good,
  address,
  cart,
});

export default reducers;
