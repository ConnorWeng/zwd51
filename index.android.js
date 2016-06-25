/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './containers/App';
import reducers from './reducers';

const store = createStore(reducers);

class zwd51 extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}

AppRegistry.registerComponent('zwd51', () => zwd51);
