/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Entypo';
import TabBar from './TabBar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import ShopPage from './ShopPage';
import UserPage from './UserPage';

class zwd51 extends Component {

  state = {
    title: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={this.state.title}
          navIconName="menu"
          actions={[
            { title: 'Search', iconName: 'magnifying-glass', iconColor: "#4099FF", show: 'ifRoom' },
            { title: 'Settings', iconName: 'cog', show: 'always' },
          ]}
          onActionSelected={this.onActionSelected} />
        <ScrollableTabView
          tabBarPosition="bottom"
          initialPage={1}
          renderTabBar={() => <TabBar />}>
          <ScrollView tabLabel="home" style={styles.tabView}>
            <HomePage />
          </ScrollView>
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
}

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

AppRegistry.registerComponent('zwd51', () => zwd51);
