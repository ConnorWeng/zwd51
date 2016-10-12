import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ListView,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PleaseLogin from './PleaseLogin';
import {getCart} from '../actions';

const {height, width} = Dimensions.get('window');

class CartPage extends Component {

  constructor(props) {
    super(props);
    this.shopDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.goodDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      shops: this.shopDataSource.cloneWithRows(props.cart.getCartRequest.shops),
      selected: [],
    };
  }

  componentDidMount() {
    if (this.props.member.accessToken) {
      this.props.getCart(this.props.member.accessToken);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.member.accessToken) {
      if (nextProps.cart.getCartRequest.message) {
        ToastAndroid.show(nextProps.cart.getCartRequest.message, ToastAndroid.SHORT);
      } else {
        this.setState({
          shops: this.shopDataSource.cloneWithRows(nextProps.cart.getCartRequest.shops),
        });
      }
    }
  }

  render() {
    if (!this.props.member.accessToken) {
      return (
        <PleaseLogin navigator={this.props.navigator}/>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <ListView
               dataSource={this.state.shops}
               renderRow={this.renderShop.bind(this)}/>
          </ScrollView>
          <View style={styles.itemActionContainer}>
            <TouchableOpacity onPress={() => {this.props.navigator.push({OrderConfirmPage: true});}} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
              <Text style={[styles.itemActionText, {color: '#fff'}]}>结算({this.state.selected.length})</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderShop(shop) {
    return (
      <TouchableOpacity style={styles.shopContainer} onPress={() => {
          const allSpecs = [];
          const foundSpecs = [];
          shop.goods.forEach((good) => {
            if (~this.state.selected.indexOf(good.spec_id)) {
              foundSpecs.push(good.spec_id);
            }
            allSpecs.push(good.spec_id);
          });
          if (foundSpecs.length === 0) {
            this.setState({
              selected: [...this.state.selected, ...allSpecs],
            });
          } else {
            foundSpecs.forEach((foundSpecId) => {
              this.state.selected.splice(this.state.selected.indexOf(foundSpecId), 1);
            });
            this.setState({
              selected: this.state.selected,
            });
          }
        }}>
        <View style={styles.shopHeadContainer}>
          <Icon name="ios-home-outline" size={18} color="#000000"/>
          <Text style={styles.shopName}>{shop.store_name}</Text>
        </View>
        <View style={styles.shopBodyContainer}>
          <ListView
             dataSource={this.goodDataSource.cloneWithRows(shop.goods)}
             renderRow={this.renderGood.bind(this)}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderGood(good) {
    return (
      <TouchableOpacity style={styles.goodContainer} onPress={() => {
          const index = this.state.selected.indexOf(good.spec_id);
          if (~index) {
            this.state.selected.splice(index, 1);
            this.setState({
              selected: this.state.selected,
            });
          } else {
            this.setState({
              selected: [...this.state.selected, good.spec_id],
            });
          }
        }}>
        {~this.state.selected.indexOf(good.spec_id) ? <Icon style={{marginLeft: 10}} name="ios-checkbox" size={20} color="rgb(0,200,0)" /> : <View style={{marginLeft: 25}}></View>}
        <Image style={styles.goodImage} source={{uri: good.goods_image}}/>
        <View style={styles.goodDetailsContainer}>
          <Text style={styles.goodName} numberOfLines={2}>{good.goods_name}</Text>
          <View style={styles.goodPriceContainer}>
            <Text style={styles.goodSubtotal}>¥ {good.subtotal}</Text>
            <Text style={styles.goodQuantity}>x{good.quantity}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

const actions = (dispatch) => {
  return {
    getCart: (accessToken) => dispatch(getCart(accessToken)),
  };
};

const styles = StyleSheet.create({
  shopContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  shopHeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    height: 30,
  },
  shopName: {
    color: '#000000',
    marginLeft: 5,
  },
  goodContainer: {
    flexDirection: 'row',
  },
  goodDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  goodName: {
    fontSize: 12,
    color: '#000000',
  },
  goodImage: {
    height: 60,
    width: 60,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  goodPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goodSubtotal: {
    color: '#f40',
  },
  goodQuantity: {

  },
  itemActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width,
    height: 42,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  itemAction: {
    width: width / 3,
    justifyContent: 'center',
    borderWidth: 1,
  },
  itemActionText: {
    textAlign: 'center',
    fontSize: 24,
  },
  checkbox: {
    marginRight: 5,
  },
});

const MOCKED_DATA = {
  shops: [{
    "store_name": '第一家店',
    "amount": 20,
    "quantity": 1,
    "goods": [
      {
        "rec_id": "1113",
        "user_id": "8",
        "session_id": "c2fd35f79a49f530c33aa6fab0ea796c",
        "store_id": "5651",
        "goods_id": "964652",
        "goods_name": "2015夏装新款欧美洋气清凉无袖背心上衣7124＃",
        "spec_id": "5628819",
        "specification": "颜色分类:白色 尺码:均码",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i1/TB1ZuMfHFXXXXcEXVXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      }
    ],
    "store_id": "5651",
    "kinds": 1
  }, {
    "store_name": '第二家店',
    "amount": 20,
    "quantity": 1,
    "goods": [
      {
        "rec_id": "1113",
        "user_id": "8",
        "session_id": "c2fd35f79a49f530c33aa6fab0ea796c",
        "store_id": "5651",
        "goods_id": "964652",
        "goods_name": "2015夏装新款欧美洋气清凉无袖背心上衣7124＃",
        "spec_id": "5628820",
        "specification": "颜色分类:白色 尺码:均码",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i1/TB1ZuMfHFXXXXcEXVXXXXXXXXXX_!!0-item_pic.jpg_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      },
      {
        "rec_id": "19142",
        "user_id": "8",
        "session_id": "b78032360fc361104cb983170fd1fde5",
        "store_id": "15729",
        "goods_id": "1142193",
        "goods_name": "1513#  夏季新款不规则修身显瘦打底裙a字裙无袖背心连衣裙",
        "spec_id": "6640856",
        "specification": "颜色分类:黑色 尺码:S",
        "price": "20.00",
        "quantity": "1",
        "goods_image": "http://img.alicdn.com/bao/uploaded/i4/TB1QP6fHpXXXXbrXXXXXXXXXXXX_!!2-item_pic.png_240x240.jpg",
        "store_name": null,
        "subtotal": 20
      }
    ],
    "store_id": "15729",
    "kinds": 1
  }],
};

export default connect(state => state, actions)(CartPage);
