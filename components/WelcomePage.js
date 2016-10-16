import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

class WelcomePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/logo_welcome.gif')}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default WelcomePage;
