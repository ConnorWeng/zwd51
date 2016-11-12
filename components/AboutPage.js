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
        <View style={styles.versionContainer}>
          <Image source={require('../images/logo_welcome.gif')}/>
          <Text style={styles.version}>{version}</Text>
        </View>
        <Text style={styles.copyright}>我要做网店 版权所有</Text>
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
  versionContainer: {
    alignItems: 'center',
  },
  version: {
    fontSize: 24,
  },
});

export default AboutPage;
