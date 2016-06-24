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
            <View style={styles.card}>
              <Text>Home</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="magnifying-glass" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Search</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="shop" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Shop</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="user" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Me</Text>
            </View>
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
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
});

AppRegistry.registerComponent('zwd51', () => zwd51);
