import {combineReducers} from 'redux';
import page from './page';
import member from './member';

const reducers = combineReducers({
  page,
  member,
});

export default reducers;
