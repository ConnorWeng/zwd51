'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  BackAndroid
} from 'react-native';
import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import ItemPage from '../components/ItemPage';

class App extends Component {

  componentDidMount() {
    let nav = this.refs.navigator;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (nav && nav.getCurrentRoutes().length > 1) {
        nav.pop();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <Navigator
         ref="navigator"
         style={styles.container}
         initialRoute={{}}
         renderScene={this.renderScene}
         configureScene={(route) => {return Navigator.SceneConfigs.FloatFromBottomAndroid;}}/>
    );
  }

  renderScene(route, navigator) {
    if (route.ItemPage) {
      return (
        <ItemPage navigator={navigator} {...route.item}/>
      );
    }
    return (
      <MainPage navigator={navigator}/>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(App);