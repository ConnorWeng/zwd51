import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      ToastAndroid.show(nextProps.message, ToastAndroid.SHORT);
    }
    if (nextProps.accessToken && nextProps.username) {
      nextProps.navigator.pop();
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.nameAndPasswordContainer}>
          <View style={styles.userInputContainer}>
            <Text style={styles.userInputLabel}>账号</Text>
            <TextInput onChangeText={(text) => this.setState({username: text})} style={styles.userInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="用户名"/>
          </View>
          <View style={styles.userInputContainer}>
            <Text style={styles.userInputLabel}>密码</Text>
            <TextInput onChangeText={(text) => this.setState({password: text})} style={styles.userInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="密码" secureTextEntry={true}/>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.login(this.state.username, this.state.password)}>
          <Text style={styles.loginButtonText}>{this.props.isLogging ? '登录中...' : '登录'}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}

const actions = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
};

const styles = StyleSheet.create({
  nameAndPasswordContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  userInputContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  userInputLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  userInput: {
    flex: 6,
    fontSize: 16,
    height: 40,
    padding: 0,
  },
  loginButton: {
    height: 42,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: '#f40',
    justifyContent: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
  },
});

export default connect(state => state.member, actions)(LoginPage);
