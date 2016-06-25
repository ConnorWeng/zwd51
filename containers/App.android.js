import { connect } from 'react-redux';
import MainPage from '../components/MainPage';

const App = connect(state => state)(MainPage);

export default App;
