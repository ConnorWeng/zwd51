import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from './TabBar';
import {changeMainTab} from '../actions';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import MarketPage from './MarketPage';
import UserPage from './UserPage';

class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           style={styles.toolbar}
           title={this.props.page.title}
           navIconName="md-reorder"
           iconSize={30}
           actions={[
             {title: 'Search', iconName: 'ios-search-outline', iconColor: '#f40', show: 'ifRoom'},
           ]}
           onActionSelected={this.onActionSelected.bind(this)}/>
        <ScrollableTabView
           ref="scrollableTabView"
           tabBarPosition="bottom"
           locked={true}
           initialPage={0}
           renderTabBar={() => <TabBar />}
          onChangeTab={this.props.onChangeTab}>
          <HomePage navigator={this.props.navigator} tabLabel="ios-home-outline" style={styles.tabView}/>
          <ScrollView tabLabel="ios-search-outline" style={styles.tabView}>
            <SearchPage />
          </ScrollView>
          <ScrollView tabLabel="ios-globe-outline" style={styles.tabView}>
            <MarketPage />
          </ScrollView>
          <UserPage navigator={this.props.navigator} tabLabel="ios-contact-outline" style={styles.tabView}/>
        </ScrollableTabView>
      </View>
    );
  }

  onActionSelected() {
    this.refs.scrollableTabView.goToPage(1);
  }

}

const actions = (dispatch) => {
  return {
    onChangeTab: (ins) => dispatch(changeMainTab(ins.i)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect(state => state, actions)(MainPage);
