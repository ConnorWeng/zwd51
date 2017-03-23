import React, {Component} from 'react';
import {
  NativeModules,
  StyleSheet,
  Navigator,
  BackAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../actions/mapper';
import PageContainer from '../components/PageContainer';
import MainPage from '../components/MainPage';
import ItemPage from '../components/ItemPage';
import LoginPage from '../components/LoginPage';
import OrderConfirmPage from '../components/OrderConfirmPage';
import PaymentPage from '../components/PaymentPage';
import OrderPage from '../components/OrderPage';
import ShopPage from '../components/ShopPage';
import SettingPage from '../components/SettingPage';
import AddressPage from '../components/AddressPage';
import OrderGoodsPage from '../components/OrderGoodsPage';
import OrderInfoPage from '../components/OrderInfoPage';
import AboutPage from '../components/AboutPage';
import RefundPage from '../components/RefundPage';
import UploadItemPage from '../components/UploadItemPage';
import CategoryPage from '../components/CategoryPage';
import CategoryItemsPage from '../components/CategoryItemsPage';
import MobileShopPage from '../components/MobileShopPage';

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
    // 等10秒是为了等待检查完是否需要更新版本，如果用户选择更新，则logout app
    setTimeout(() => {
      NativeModules.Zwd51API.isUpdatingVersion((isUpdating) => {
        if (isUpdating) {
          this.props.logout();
        }
      });
    }, 10000);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <Navigator
         ref="navigator"
         style={styles.container}
         initialRoute={{MainPage: true}}
         renderScene={this.renderScene.bind(this)}
         configureScene={(route) => {
           return Navigator.SceneConfigs.FloatFromBottomAndroid;
         }}
      />
    );
  }

  renderScene(route, navigator) {
    if (route.MainPage) {
      return (
        <MainPage navigator={navigator}/>
      );
    }
    return (
      <PageContainer navigator={navigator}>
        {(() => {
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
          if (route.OrderGoodsPage) {
            return (
              <OrderGoodsPage navigator={navigator} goods={route.goods}/>
            );
          }
          if (route.OrderInfoPage) {
            return (
              <OrderInfoPage navigator={navigator} orderId={route.orderId}/>
            );
          }
          if (route.AboutPage) {
            return (
              <AboutPage navigator={navigator}/>
            );
          }
          if (route.RefundPage) {
            return (
              <RefundPage navigator={navigator} orderAmount={route.orderAmount} orderId={route.orderId} orderStatus={route.orderStatus}/>
            );
          }
          if (route.UploadItemPage) {
            return (
              <UploadItemPage navigator={navigator} {...route.item}/>
            );
          }
          if (route.CategoryPage) {
            return (
              <CategoryPage navigator={navigator} {...route.category}/>
            );
          }
          if (route.CategoryItemsPage) {
            return (
              <CategoryItemsPage navigator={navigator} {...route.category}/>
            );
          }
          if (route.MobileShopPage) {
            return (
              <MobileShopPage navigator={navigator}/>
            );
          }
        })()}
      </PageContainer>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(state => state, mapDispatchToProps)(App);
