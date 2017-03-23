import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {version} from '../package.json';

class AboutPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Image source={require('../images/logo_welcome.gif')}/>
          <Text style={styles.version}>{version}</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.copyright}>Copyright ©2017</Text>
          <Text style={styles.copyright}>上海轩颐网络科技有限公司</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
  centerContainer: {
    alignItems: 'center',
  },
  version: {
    fontSize: 24,
  },
});

export default AboutPage;
