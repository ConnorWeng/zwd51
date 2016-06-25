import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import { changeMainTab } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTab: (ins) => {
      dispatch(changeMainTab(ins.i));
    }
  };
};

const App = connect(state => state, mapDispatchToProps)(MainPage);

export default App;
