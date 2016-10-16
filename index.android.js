/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import WelcomePage from './components/WelcomePage';
import App from './containers/App';
import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    autoRehydrate()
  )
);
const persistor = persistStore(store, {storage: AsyncStorage});

class zwd51 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      welcomed: false,
    };
  }

  componentDidMount() {
    setTimeout(((ref) => {
      return () => {
        ref.setState({welcomed: true});
      };
    })(this), 2000);
  }

  render() {
    if (this.state.welcomed) {
      return (
        <Provider store={store}>
          <App persistor={persistor}/>
        </Provider>
      );
    } else {
      return (
        <WelcomePage/>
      );
    }
  }

}

AppRegistry.registerComponent('zwd51', () => zwd51);
