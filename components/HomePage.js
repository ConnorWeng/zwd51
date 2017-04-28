import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
  WebView,
} from 'react-native';
import {connect} from 'react-redux';
import ItemPage from './ItemPage';
import {SERVICE_URL} from "../service.json";
import {welcomed} from '../actions';

const {height, width} = Dimensions.get('window');

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <WebView
           ref="webView"
           onMessage={this.onMessage.bind(this)}
           style={styles.webView}
           source={{uri: SERVICE_URL + '/index.php?app=mobile_home'}}
           onLoadEnd={this.onWebViewLoadEnd.bind(this)}
           renderError={this.renderWebViewError.bind(this)}/>
      </View>
    );
  }

  onMessage(event) {
    const message = event.nativeEvent.data;
    const content = JSON.parse(message);
    switch (content.type) {
    case 'viewItem':
      const item = content.data;
      this.props.navigator.push({ItemPage: true, item: item});
      break;
    case 'viewShop':
      const shop = content.data;
      this.props.navigator.push({ShopPage: true, shop: shop});
      break;
    case 'viewCategory':
      const category = content.data;
      this.props.navigator.push({CategoryItemsPage: true, category: category});
      break;
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

  onWebViewLoadEnd() {
    this.props.welcomed();
  }

  renderWebViewError() {
    return (
      <TouchableOpacity style={{alignItems: 'center', height: height}} onPress={() => {this.refs.webView.reload();}}>
        <Text style={{fontSize: 18}}>首页加载失败，请点击重试！</Text>
      </TouchableOpacity>
    );
  }

}

const actions = (dispatch) => {
  return {
    welcomed: () => dispatch(welcomed()),
  };
};

const styles = StyleSheet.create({
  webView: {
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

export default connect(state => state.page, actions)(HomePage);
