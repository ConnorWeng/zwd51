import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PleaseLogin extends Component {

  render() {
    return (
      <TouchableHighlight style={{marginTop: 0}}
                          onPress={() => { this.props.navigator.push({LoginPage: true}); }}>
        <View style={styles.headContainerNotLogged}>
          <Icon name="ios-contact-outline" size={60} />
          <Text style={styles.pleaseLogin}>请登录/注册</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  headContainerNotLogged: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
  },
  pleaseLogin: {
    fontSize: 18,
    color: '#000000',
  },
});

export default PleaseLogin;
