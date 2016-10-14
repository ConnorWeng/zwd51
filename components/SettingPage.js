import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,

} from 'react-native';
import PrimaryButton from './PrimaryButton';
import MyItemsGroup from './MyItemsGroup';
import MyItem from './MyItem';

class SettingPage extends Component {

  render() {
    return (
      <View>
        <MyItemsGroup>
          <MyItem title="收货地址管理" iconName="ios-settings-outline"
                  onPress={() => {this.props.navigator.push({AddressPage: true, addr: {}});}}/>
        </MyItemsGroup>
        <PrimaryButton label="退出登录" onPress={() => {
            this.props.persistor.purge();
            this.props.navigator.pop();
          }}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({

});

export default SettingPage;
