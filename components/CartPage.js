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
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import InputNumber from '../node_modules/rc-input-number/lib/index';
import PleaseLogin from './PleaseLogin';
import Loading from './Loading';
import {getCart, dropFromCart, dropFromCartLocal} from '../actions';

const {height, width} = Dimensions.get('window');

class CartPage extends Component {

  constructor(props) {
    super(props);
    this.refreshed = false;
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
      if (!this.refreshed) {
        this.refreshed = true;
        this.props.getCart(nextProps.member.accessToken);
      }
      if (nextProps.cart.dropFromCartRequest.message) {
        ToastAndroid.show(nextProps.cart.dropFromCartRequest.message, ToastAndroid.SHORT);
      }
    }
  }

  render() {
    if (!this.props.member.accessToken) {
      return (
        <PleaseLogin navigator={this.props.navigator}/>
      );
    } else if (this.props.cart.getCartRequest.isLoading) {
      return (
        <Loading style={styles.loading}/>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <ListView
               style={styles.cartList}
               refreshControl={
                   <RefreshControl
                        refreshing={this.props.cart.getCartRequest.isLoading}
                        onRefresh={this.onRefresh.bind(this)}/>
                   }
               dataSource={this.state.shops}
               renderRow={this.renderShop.bind(this)}
               enableEmptySections={true}/>
          </ScrollView>
          <View style={styles.itemActionContainer}>
            <TouchableOpacity onPress={this.buy.bind(this)} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
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
            if (~this.indexOfSelected(good.spec_id)) {
              foundSpecs.push(good);
            }
            allSpecs.push(good);
          });
          if (foundSpecs.length === 0) {
            this.setState({
              selected: [...this.state.selected, ...allSpecs],
            });
          } else {
            foundSpecs.forEach((foundSpec) => {
              this.state.selected.splice(this.indexOfSelected(foundSpec.spec_id), 1);
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
             renderRow={this.renderGood.bind(this)}
             enableEmptySections={true}/>
        </View>
      </TouchableOpacity>
    );
  }

  renderGood(good) {
    return (
      <TouchableOpacity style={styles.goodContainer} onPress={() => {
          const index = this.indexOfSelected(good.spec_id);
          if (~index) {
            this.state.selected.splice(index, 1);
            this.setState({
              selected: this.state.selected,
            });
          } else {
            this.setState({
              selected: [...this.state.selected, good],
            });
          }
        }}>
        {~this.indexOfSelected(good.spec_id) ? <Icon style={{marginLeft: 10}} name="ios-checkbox" size={20} color="rgb(0,200,0)" /> : <View style={{marginLeft: 25}}></View>}
        <TouchableOpacity onPress={() => this.props.navigator.push({ItemPage: true, item: good})}>
          <Image style={styles.goodImage} source={{uri: good.goods_image}}/>
        </TouchableOpacity>
        <View style={styles.goodDetailsContainer}>
          <Text style={styles.goodName} numberOfLines={2}>{good.goods_name}</Text>
          <Text style={styles.goodSpecification} numberOfLines={1}>{good.specification}</Text>
          <View style={styles.goodPriceContainer}>
            <Text style={styles.goodSubtotal}>¥ {good.subtotal}</Text>
            <InputNumber styles={numberStyles} defaultValue={parseInt(good.quantity)} min={0} max={99} onChange={(number) => {
                if (number === 0) {
                  this.props.dropFromCart(good.rec_id, this.props.member.accessToken);
                  this.props.dropFromCartLocal(good.store_id, good.rec_id);
                }
              }}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  indexOfSelected(specId) {
    for(let i = 0; i < this.state.selected.length; i++) {
      if (this.state.selected[i].spec_id === specId) {
        return i;
      }
    }
    return -1;
  }

  onRefresh() {
    this.props.getCart(this.props.member.accessToken);
  }

  buy() {
    if (this.state.selected.length < 1) {
      ToastAndroid.show('请选择需要结算的宝贝', ToastAndroid.SHORT);
    } else {
      const specIds = [];
      const specNums = [];
      this.state.selected.forEach((spec) => {
        specIds.push(spec.spec_id);
        specNums.push(spec.quantity);
      });
      this.props.navigator.push({OrderConfirmPage: true, specIds: specIds, specNums: specNums});
    }
  }

}

const actions = (dispatch) => {
  return {
    getCart: (accessToken) => dispatch(getCart(accessToken)),
    dropFromCart: (recId, accessToken) => dispatch(dropFromCart(recId, accessToken)),
    dropFromCartLocal: (storeId, recId) => dispatch(dropFromCartLocal(storeId, recId)),
  };
};

const styles = StyleSheet.create({
  cartList: {
    height: height - 56 - 40 - 68,
  },
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
  goodSpecification: {
    fontSize: 12,
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
    flex: 1,
    color: '#f40',
    height: 25,
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

const numberStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#222'
  },
  stepWrap: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: 'white'
  },
  stepText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    backgroundColor: 'transparent'
  },
  stepDisabled: {
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(239, 239, 239, 0.72)'
  },
  disabledStepTextColor: {
    color: '#ccc'
  },
  highlightStepTextColor: {
    color: '#2DB7F5'
  },
  highlightStepBorderColor: {
    borderColor: '#2DB7F5'
  },
  loading: {
    marginTop: 10,
  },
});

export default connect(state => state, actions)(CartPage);
