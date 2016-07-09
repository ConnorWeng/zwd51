'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Entypo';
import TabBar from './TabBar';
import { changeMainTab } from '../actions';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import ShopPage from './ShopPage';
import UserPage from './UserPage';

class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           style={styles.toolbar}
           title={this.props.page.title}
           navIconName="menu"
           actions={[
             { title: 'Search', iconName: 'magnifying-glass', iconColor: "#f40", show: 'ifRoom' }
           ]}
           onActionSelected={this.onActionSelected.bind(this)}/>
        <ScrollableTabView
           ref="scrollableTabView"
           tabBarPosition="bottom"
           locked={true}
           initialPage={0}
           renderTabBar={() => <TabBar />}
          onChangeTab={this.props.onChangeTab}>
          <HomePage navigator={this.props.navigator} tabLabel="home" style={styles.tabView}/>
          <ScrollView tabLabel="magnifying-glass" style={styles.tabView}>
            <SearchPage />
          </ScrollView>
          <ScrollView tabLabel="shop" style={styles.tabView}>
            <ShopPage />
          </ScrollView>
          <ScrollView tabLabel="user" style={styles.tabView}>
            <UserPage />
          </ScrollView>
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
    onChangeTab: (ins) => dispatch(changeMainTab(ins.i))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56
  },
  tabView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  card: {
    height: 150
  }
});

export default connect(state => state, actions)(MainPage);
