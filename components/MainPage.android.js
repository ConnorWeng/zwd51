import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AppState,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {mapDispatchToProps} from '../actions/mapper';
import TabBar from './TabBar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import MarketPage from './MarketPage';
import UserPage from './UserPage';
import CartPage from './CartPage';
import WelcomePage from './WelcomePage';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(currentAppState) {
    if (currentAppState === 'inactive') {
      this.props.clearWelcomed();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           style={styles.toolbar}
           title={this.state.title}
           iconSize={30}
           actions={
             this.state.title !== '搜款式' ? [
               {title: 'Search', iconName: 'ios-search-outline', iconColor: '#f40', show: 'ifRoom'},
             ] : []
           }
           onActionSelected={this.onActionSelected.bind(this)}/>
        <ScrollableTabView
           ref="scrollableTabView"
           tabBarPosition="bottom"
           locked={true}
           initialPage={0}
           renderTabBar={() => <TabBar />}
           onChangeTab={this.onChangeTab.bind(this)}>
          <HomePage navigator={this.props.navigator} tabLabel="ios-home-outline" style={styles.tabView}/>
          <SearchPage navigator={this.props.navigator} tabLabel="ios-search-outline" style={styles.tabView}/>
          <CartPage navigator={this.props.navigator} tabLabel="ios-cart-outline" style={styles.tabView}/>
          <MarketPage navigator={this.props.navigator} tabLabel="ios-globe-outline" style={styles.tabView}/>
          <UserPage navigator={this.props.navigator} tabLabel="ios-contact-outline" style={styles.tabView}/>
        </ScrollableTabView>
        {this.props.page.welcomed ? null : <WelcomePage/>}
      </View>
    );
  }

  onActionSelected() {
    this.refs.scrollableTabView.goToPage(1);
  }

  onChangeTab(position) {
    let title = '';
    switch (position.i) {
    case 1:
      title = '搜款式';
      break;
    case 2:
      title = '购物车';
      break;
    case 3:
      title = '逛市场';
      break;
    case 4:
      title = '我的';
      break;
    }
    this.setState({
      title: title,
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    height: 56,
  },
  tabView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    height: 150,
  },
});

export default connect(state => state, mapDispatchToProps)(MainPage);
