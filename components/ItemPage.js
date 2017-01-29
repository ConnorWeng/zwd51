import React, {Component} from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  WebView,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import InputNumber from '../node_modules/rc-input-number/lib/index';
import inputNumberStyles from '../node_modules/rc-input-number/lib/styles';
import SpecPicker from './SpecPicker';
import SpecContainer from './SpecContainer';
import Loading from './Loading'
import {getDescription, clearDescription, getSpecs, addToCart} from '../actions';

const {height, width} = Dimensions.get('window');

const BODY_TAG_PATTERN = /\<\/ *body\>/;

const script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;

const style = `
<style>
body, html, #height-wrapper {
    margin: 0;
    padding: 0;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
}
img {
    width: ${width};
}
</style>
<script>
${script}
</script>
`;

const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + '</body>');

class ItemPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: 600,
      selected: null,
    };
  }

  componentWillMount() {
    this.props.clearDescription();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.addToCartRequest.message) {
      ToastAndroid.show(nextProps.cart.addToCartRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.cart.addToCartRequest.success) {
      ToastAndroid.show('添加成功', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.itemContainer}>
          <Image style={styles.itemImage} source={{uri: this.props.default_image.replace('_240x240.jpg', '')}}/>
          <View style={styles.itemHead}>
            <Text numberOfLines={2} style={styles.itemTitle}>{this.props.goods_name}</Text>
            <Text style={styles.itemOuterIid}>商家编码：{this.getOuterIid()}</Text>
            <Text style={styles.itemPrice}>¥ {this.props.price}</Text>
            <Text style={styles.itemOriginPrice}>淘宝价 ¥ {this.props.price}</Text>
          </View>
          <TouchableOpacity style={styles.touchableContainer} onPress={()=>{this.refs.modal.open();}}>
            {this.state.selected ? <Text style={styles.pleaseSelect}>已选择  {this.state.selected.specification}</Text> : <Text style={styles.pleaseSelect}>选择  尺码 颜色分类</Text>}
            <Text style={styles.arrow}>></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableContainer} onPress={()=>{this.props.navigator.push({ShopPage: true, shop: this.props.shop})}}>
            <Text style={styles.pleaseSelect}>店铺  {this.props.shop ? this.props.shop.store_name : ''}</Text>
            <Text style={styles.arrow}>></Text>
          </TouchableOpacity>
          {(() => {
            const html = '<html><head><title></title></head><body>' + this.props.good.getDescriptionRequest.description + '</body></html>';
            if (this.props.good.getDescriptionRequest.description !== '') {
              return (
                <WebView style={[styles.itemDesc, {height: this.state.webViewHeight}]}
                   javaScriptEnabled={true}
                   onNavigationStateChange={(navState) => {
                     this.setState({webViewHeight: parseInt(navState.title, 10) || 0});
                   }}
                   source={{html: codeInject(html)}}/>
              );
            } else if (this.props.good.getDescriptionRequest.isLoading) {
              return (
                <Loading style={styles.loading}/>
              );
            } else {
              return (
                <TouchableOpacity style={styles.clickToDisplayContainer} onPress={this.getDescription.bind(this)}>
                  <Text>点击查看图文详情</Text>
                </TouchableOpacity>
              );
            }
          })()}
        </ScrollView>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={this.taobaoUpload.bind(this)} style={[styles.itemAction, {borderColor: '#F0CAB6', backgroundColor: '#FFE4D0'}]}>
            <Text style={[styles.itemActionText, {color: '#E5511D'}]}>上传淘宝</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addToCart.bind(this)} style={styles.addToCartContainer}>
            {this.props.cart.addToCartRequest.isLoading ? this.renderActivityIndicator() : <Icon name="ios-cart" size={30} color="#f40"/>}
            <Text style={styles.addToCartText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.buy.bind(this)} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>立刻购买</Text>
          </TouchableOpacity>
        </View>
        <Modal style={styles.modal} position={'bottom'} ref={'modal'} onOpened={this.onModalOpened.bind(this)}>
        {(() => {
          if (this.props.good.getSpecsRequest.isLoading) {
            return (
              <Loading style={styles.loading}/>
            );
          } else {
            return (
              <View>
                <TouchableOpacity style={styles.modalCloseBtn} onPress={() => this.refs.modal.close()}>
                  <Icon name="ios-close-circle-outline" size={24}/>
                </TouchableOpacity>
                <SpecPicker ref="specPicker" specs={this.props.good.getSpecsRequest.specs} specName1={this.props.good.getSpecsRequest.specName1} specName2={this.props.good.getSpecsRequest.specName2}/>
                <SpecContainer specName="数量">
                  <InputNumber ref="num" styles={inputNumberStyles} defaultValue={1} min={1}/>
                </SpecContainer>
                <TouchableOpacity onPress={this.selectSpec.bind(this)} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
                  <Text style={[styles.itemActionText, {color: '#fff'}]}>确认</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })()}
        </Modal>
      </View>
    );
  }

  renderActivityIndicator() {
    return (
      <Loading style={styles.loading}/>
    );
  }

  getDescription(e) {
    this.props.getDescription(this.props.goods_id);
  }

  getOuterIid() {
    let outerIid = '';
    if (this.props.attr_value) {
      outerIid = this.props.attr_value;
    }
    return outerIid;
  }

  onModalOpened() {
    if (this.props.good.getSpecsRequest.specs.length === 0 || this.props.good.getSpecsRequest.specs[0].goods_id !== this.props.goods_id) {
      this.props.getSpecs(this.props.goods_id);
    }
  }

  selectSpec() {
    const num = this.refs.num.getCurrentValidValue();
    const spec = this.refs.specPicker.getSelected();
    if (!spec) {
      ToastAndroid.show('请选择商品规格', ToastAndroid.SHORT);
      return ;
    } else {
      this.setState({
        selected: {
          specId: spec.spec_id,
          quantity: num,
          specification: spec.spec_1 + ' ' + spec.spec_2,
        },
      });
      this.refs.modal.close();
    }
  }

  buy() {
    if (!this.state.selected) {
      ToastAndroid.show('请选择商品规格', ToastAndroid.SHORT);
      return ;
    } else {
      this.props.navigator.push({
        OrderConfirmPage: true,
        specIds: [this.state.selected.specId],
        specNums: [this.state.selected.quantity],
      });
    }
  }

  addToCart() {
    if (!this.props.member.accessToken) {
      return this.props.navigator.push({LoginPage: true});
    }
    if (!this.state.selected) {
      ToastAndroid.show('请选择商品规格', ToastAndroid.SHORT);
      return ;
    } else {
      this.props.addToCart(this.state.selected.specId,
                           this.state.selected.quantity,
                           this.props.member.accessToken);
    }
  }

  taobaoUpload() {
    if (!this.props.member.isTaobao) {
      ToastAndroid.show('只有使用淘宝登录的用户才能上传宝贝，请退出账户后使用淘宝用户重新登录', ToastAndroid.LONG);
      return false;
    }

    this.props.navigator.push({UploadItemPage: true, item: {
      goods_id: this.props.goods_id,
      goods_name: this.props.goods_name,
      price: this.props.price,
      desc: this.props.good.getDescriptionRequest.description,
    }});
  }

}

const actions = (dispatch) => {
  return {
    getDescription: (goodsId) => dispatch(getDescription(goodsId)),
    clearDescription: () => dispatch(clearDescription()),
    getSpecs: (goodsId) => dispatch(getSpecs(goodsId)),
    addToCart: (specId, quantity, accessToken) => dispatch(addToCart(specId, quantity, accessToken)),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemActionContainer: {
    flexDirection: 'row',
    width: width,
    height: 42,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  itemAction: {
    flex: 2,
    justifyContent: 'center',
    borderWidth: 1,
  },
  itemActionText: {
    textAlign: 'center',
    fontSize: 24,
  },
  addToCartContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  addToCartText: {
    fontSize: 20,
    color: '#f40',
  },
  itemContainer: {
    marginBottom: 42,
  },
  itemImage: {
    width: width,
    height: 400,
  },
  itemHead: {
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
  },
  itemPrice: {
    fontSize: 16,
    color: '#f40',
  },
  itemOriginPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  itemOuterIid: {
    fontSize: 14,
  },
  touchableContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pleaseSelect: {
    fontSize: 16,
    color: '#000000',
  },
  arrow: {
    fontSize: 16,
    color: '#000000',
  },
  itemDesc: {
    marginTop: 5,
    width: width,
    backgroundColor: '#ffffff',
  },
  modal: {
    height: 285,
  },
  modalCloseBtn: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  clickToDisplayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
    borderWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderRightColor: 'rgba(0,0,0,0.3)',
    borderBottomColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'rgba(0,0,0,0.1)',
  },
  loading: {
    marginTop: 10,
  },
});

export default connect(state => state, actions)(ItemPage);
