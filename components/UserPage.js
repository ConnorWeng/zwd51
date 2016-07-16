import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MyItemsGroup from './MyItemsGroup';
import MyItem from './MyItem';

class UserPage extends Component {

  render() {
    return (
      <ScrollView>
        <TouchableHighlight style={{marginTop: 20}} onPress={() => { this.props.navigator.push({LoginPage: true}); }}>
          <View style={styles.headContainer}>
            <Image style={styles.headImage} source={{uri: 'http://g.hiphotos.baidu.com/zhidao/wh%3D600%2C800/sign=a5656052494a20a4314b34c1a062b41a/79f0f736afc37931ec26be69edc4b74543a91127.jpg'}}/>
            <View style={styles.headUserNameContainer}>
              <Text style={styles.headUserName}>Administrator</Text>
            </View>
            <Icon style={styles.headArrow} name="ios-arrow-forward-outline" size={30} color="#000000" />
          </View>
        </TouchableHighlight>
        <MyItemsGroup>
          <MyItem title="我的订单" iconName="ios-list-box-outline"/>
          <MyItem title="淘宝订单" iconName="ios-list-box-outline"/>
        </MyItemsGroup>
        <MyItemsGroup>
          <MyItem title="设置" iconName="ios-settings-outline"/>
        </MyItemsGroup>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff'
  },
  headImage: {
    height: 60,
    width: 60,
    marginLeft: 20
  },
  headUserNameContainer: {
    flex: 8,
    height: 60,
    marginLeft: 20
  },
  headUserName: {
    fontSize: 18,
    color: '#000000'
  },
  headArrow: {
    flex: 1
  }
});

export default UserPage;
