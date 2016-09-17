import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PrimaryButton from './PrimaryButton';

class SettingPage extends Component {

  render() {
    return (
      <PrimaryButton label="退出登录" onPress={() => {
          this.props.persistor.purge();
          this.props.navigator.pop();
        }}/>
    );
  }

}

const styles = StyleSheet.create({

});

export default SettingPage;
