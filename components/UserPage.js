import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import MyItemsGroup from './MyItemsGroup';
import MyItem from './MyItem';
import PleaseLogin from './PleaseLogin';
import {clearOrders} from '../actions';

class UserPage extends Component {

  render() {
    return (
      <ScrollView>
        {(() => {
          if (!this.props.accessToken) {
            return (
              <PleaseLogin navigator={this.props.navigator}/>
            );
          } else {
            return (
              <View>
                <TouchableHighlight style={{marginTop: 0}}>
                  <View style={styles.headContainer}>
                    <Image style={styles.headImage}
                           source={{uri: 'http://img.qq745.com/uploads/allimg/150510/1-150510223546-53.jpg'}}/>
                    <View style={styles.headUserNameContainer}>
                      <Text style={styles.headUserName}>{this.props.username}</Text>
                    </View>
                    <Icon style={styles.headArrow} name="ios-arrow-forward-outline" size={30} color="#000000" />
                  </View>
                </TouchableHighlight>
                <MyItemsGroup>
                  <MyItem title="我的订单" iconName="ios-list-box-outline"
                          onPress={() => {this.props.clearOrders(); this.props.navigator.push({OrderPage: true});}}/>
                </MyItemsGroup>
                <MyItemsGroup>
                  <MyItem title="设置" iconName="ios-settings-outline"
                          onPress={() => {this.props.navigator.push({SettingPage: true});}}/>
                </MyItemsGroup>
              </View>
            );
          }
        })()}
      </ScrollView>
    );
  }

}

const actions = (dispatch) => {
  return {
    clearOrders: () => dispatch(clearOrders()),
  };
};

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
  },
  headImage: {
    height: 65,
    width: 65,
    marginLeft: 20,
    borderRadius: 5,
  },
  headUserNameContainer: {
    flex: 8,
    height: 60,
    marginLeft: 20,
  },
  headUserName: {
    fontSize: 18,
    color: '#000000',
  },
  headArrow: {
    flex: 1,
  },
});

export default connect(state => state.member, actions)(UserPage);
