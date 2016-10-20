import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import ItemPage from './ItemPage';
import ItemList from './ItemList';
import {SERVICE_URL} from "../service.json";

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  render() {
    return (
      <View>
        <WebViewBridge
           onBridgeMessage={this.onBridgeMessage.bind(this)}
           style={styles.webViewBridge}
           source={{uri: SERVICE_URL + '/index.php?app=mobile_home'}}/>
      </View>
    );
  }

  onBridgeMessage(message) {
    const parts = message.split('|,|');
    if (parts.length === 3) {
      this.props.navigator.push({ItemPage: true, item: {
        goods_name: parts[0],
        default_image: parts[1],
        price: parts[2],
      }});
    }
  }

  renderTrendyItem(item) {
    return (
      <TouchableHighlight style={styles.trendyItemContainer} onPress={() => this.props.navigator.push({ItemPage: true, item: item})}>
        <View>
          <Image source={{uri: item.defaultImage}} style={styles.trendyItemImage} />
          <View style={styles.trendyItemTitleContainer}>
            <Text numberOfLines={2} style={styles.trendyItemTitle}>{item.goodsName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  webViewBridge: {
    height: height - 56 - 60,
  },
  banner: {
    height: 150,
    backgroundColor: 'rgba(140,140,140,1)',
  },
  separator: {
    fontSize: 20,
    textAlign: 'center',
  },
  trendyItemContainer: {
    marginTop: 5,
  },
  trendyItemImage: {
    flex: 1,
    height: 170,
    resizeMode: 'cover',
  },
  trendyItemTitleContainer: {
    position: 'absolute',
    top: 125,
    width: width,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  trendyItemTitle: {
    color: '#000000',
    fontSize: 18,
  },
});

export default HomePage;
