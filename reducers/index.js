import {combineReducers} from 'redux';
import page from './page';
import member from './member';
import order from './order';
import market from './market';
import good from './good';

const reducers = combineReducers({
  page,
  member,
  order,
  market,
  good,
});

export default reducers;
