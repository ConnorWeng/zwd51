import React, {Component} from 'react';
import {
  StyleSheet,
  Navigator,
  BackAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import MainPage from '../components/MainPage';
import ItemPage from '../components/ItemPage';
import LoginPage from '../components/LoginPage';
import OrderConfirmPage from '../components/OrderConfirmPage';
import PaymentPage from '../components/PaymentPage';
import OrderPage from '../components/OrderPage';
import ShopPage from '../components/ShopPage';
import SettingPage from '../components/SettingPage';
import AddressPage from '../components/AddressPage';

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
         renderScene={this.renderScene.bind(this)}
         configureScene={(route) => {
           return Navigator.SceneConfigs.FloatFromBottomAndroid;
         }}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.ItemPage) {
      return (
        <ItemPage navigator={navigator} {...route.item}/>
      );
    }
    if (route.LoginPage) {
      return (
        <LoginPage navigator={navigator}/>
      );
    }
    if (route.OrderConfirmPage) {
      return (
        <OrderConfirmPage navigator={navigator} specIds={route.specIds} specNums={route.specNums}/>
      );
    }
    if (route.PaymentPage) {
      return (
        <PaymentPage navigator={navigator} orderInfo={route.orderInfo} orderAmount={route.orderAmount}/>
      );
    }
    if (route.OrderPage) {
      return (
        <OrderPage navigator={navigator}/>
      );
    }
    if (route.ShopPage) {
      return (
        <ShopPage navigator={navigator} shop={route.shop}/>
      );
    }
    if (route.SettingPage) {
      return (
        <SettingPage navigator={navigator} persistor={this.props.persistor}/>
      );
    }
    if (route.AddressPage) {
      return (
        <AddressPage navigator={navigator} addr={route.addr}/>
      );
    }
    return (
      <MainPage navigator={navigator}/>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect()(App);
