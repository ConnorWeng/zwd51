import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid,
  NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import LabelAndInput from './LabelAndInput';
import {login, check} from '../actions';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      nick: '',
      avatarUrl: '',
      authorizationCode: '',
      isTaobaoLogin: false,
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
    if (this.state.isTaobaoLogin) {
      return (
        <ScrollView>
          <View style={styles.prompt}>
            <Text>请输入完整的淘宝用户名，进行二次验证：</Text>
          </View>
          <View style={styles.nameAndPasswordContainer}>
            <LabelAndInput label={'您正在登陆的淘宝用户名是：' + this.state.nick} placeholder="" inputStyle={{flex: 0}}/>
            <LabelAndInput ref="taobaoUsername" label="淘宝用户名" placeholder="完整淘宝用户名" inputStyle={{flex: 2}}/>
          </View>
          <View style={styles.prompt}>
            <Text>注意：</Text>
            <Text>只有在www.51zwd.com网站上使用过淘登陆的用户才能在APP上登陆</Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={this.taobaoCheck.bind(this)}>
            <Text style={styles.loginButtonText}>{this.props.isLogging ? '登录中...' : '确认'}</Text>
          </TouchableOpacity>
          <Spinner visible={this.props.isLogging}/>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.nameAndPasswordContainer}>
            <LabelAndInput ref="username" label="账号" placeholder="用户名"/>
            <LabelAndInput ref="password" label="密码" placeholder="密码" secureTextEntry={true}/>
          </View>
          <TouchableOpacity style={styles.taobaoLoginContainer} onPress={this.taobaoLogin.bind(this)}>
            <Text style={styles.taobaoLogin}>淘宝登陆</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => this.props.login(this.refs.username.getText(), this.refs.password.getText())}>
            <Text style={styles.loginButtonText}>{this.props.isLogging ? '登录中...' : '登录'}</Text>
          </TouchableOpacity>
          <Spinner visible={this.props.isLogging}/>
        </ScrollView>
      );
    }
  }

  taobaoLogin() {
    NativeModules.AlibabaAPI.login((userId, nick, avatarUrl, authorizationCode) => {
      this.setState({
        userId: userId,
        nick: nick,
        avatarUrl: avatarUrl,
        authorizationCode: authorizationCode,
        isTaobaoLogin: true,
      });
    }, (errorCode, errorMessage) => {
      ToastAndroid.show('errorCode: ' + errorCode + ' errorMessage: ' + errorMessage, ToastAndroid.LONG);
      this.setState({
        isTaobaoLogin: false,
      });
    });
  }

  taobaoCheck() {
    const taobaoUsername = this.refs.taobaoUsername.getText();
    const head = taobaoUsername.substr(0, 1);
    const tail = taobaoUsername.substr(taobaoUsername.length - 1, 1);
    if (this.state.nick.replace(/\*/g, '') !== head + tail) {
      ToastAndroid.show('验证失败，淘宝用户名不匹配', ToastAndroid.LONG);
      return false;
    }
    this.props.check(taobaoUsername, this.state.userId, this.state.nick, this.state.avatarUrl, this.state.authorizationCode);
  }

}

const actions = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    check: (taobaoUsername, id, nick, avatarUrl, authorizationCode) => dispatch(check(taobaoUsername, id, nick, avatarUrl, authorizationCode)),
  };
};

const styles = StyleSheet.create({
  nameAndPasswordContainer: {
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
  taobaoLoginContainer: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 5,
    height: 50,
  },
  taobaoLogin: {
    color: 'blue',
    fontSize: 16,
  },
  prompt: {
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export default connect(state => state.member, actions)(LoginPage);
