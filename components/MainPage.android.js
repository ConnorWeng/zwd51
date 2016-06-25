import React, { Component } from 'react';
import {
  StyleSheet,
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

class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={this.props.page.title}
          navIconName="menu"
          actions={[
            { title: 'Search', iconName: 'magnifying-glass', iconColor: "#4099FF", show: 'ifRoom' },
            { title: 'Settings', iconName: 'cog', show: 'always' },
          ]}
          onActionSelected={this.onActionSelected} />
        <ScrollableTabView
          tabBarPosition="bottom"
          initialPage={0}
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

export default MainPage;
