import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from './PrimaryButton';
import MyItemsGroup from './MyItemsGroup';
import MyItem from './MyItem';
import {logout} from '../actions';

class SettingPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <MyItemsGroup>
          <MyItem title="收货地址管理" iconName="ios-settings-outline"
                  onPress={() => {this.props.navigator.push({AddressPage: true, addr: {}});}}/>
        </MyItemsGroup>
        <MyItemsGroup>
          <MyItem title="关于" iconName="ios-information-circle-outline"
                  onPress={() => {this.props.navigator.push({AboutPage: true, addr: {}});}}/>
        </MyItemsGroup>
        <PrimaryButton label="退出登录" onPress={() => {
            this.props.persistor.purge();
            this.props.logout();
            this.props.navigator.pop();
          }}/>
      </View>
    );
  }

}

const actions = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(state => state, actions)(SettingPage);
