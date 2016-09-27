import {combineReducers} from 'redux';
import page from './page';
import member from './member';
import order from './order';
import market from './market';

const reducers = combineReducers({
  page,
  member,
  order,
  market,
});

export default reducers;
