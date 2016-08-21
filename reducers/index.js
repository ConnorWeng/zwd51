import {combineReducers} from 'redux';
import page from './page';
import member from './member';
import order from './order';

const reducers = combineReducers({
  page,
  member,
  order,
});

export default reducers;
