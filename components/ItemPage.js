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
import Spinner from 'react-native-loading-spinner-overlay';
import InputNumber from '../node_modules/rc-input-number/lib/index';
import inputNumberStyles from '../node_modules/rc-input-number/lib/styles';
import SpecPicker from './SpecPicker';
import SpecContainer from './SpecContainer';
import {getDescription, clearDescription, getSpecs} from '../actions';

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
    };
  }

  componentWillMount() {
    this.props.clearDescription();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.itemContainer} onScroll={this.onScroll.bind(this)}>
          <Image style={styles.itemImage} source={{uri: this.props.default_image}}/>
          <View style={styles.itemHead}>
            <Text numberOfLines={2} style={styles.itemTitle}>{this.props.goods_name}</Text>
            <Text style={styles.itemPrice}>¥ {this.props.price}</Text>
            <Text style={styles.itemOriginPrice}>淘宝价 ¥ {this.props.price}</Text>
          </View>
          <TouchableOpacity style={styles.itemSku} onPress={()=>{this.refs.modal.open();}}>
            <Text style={styles.pleaseSelect}>选择  尺码 颜色分类</Text>
            <Text style={styles.arrow}>></Text>
          </TouchableOpacity>
          {(() => {
            const html = '<html><head><title></title></head><body>' + this.props.getDescriptionRequest.description + '</body></html>';
            if (this.props.getDescriptionRequest.description !== '') {
              return (
                <WebView style={[styles.itemDesc, {height: this.state.webViewHeight}]}
                   javaScriptEnabled={true}
                   onNavigationStateChange={(navState) => {
                     this.setState({webViewHeight: parseInt(navState.title, 10) || 0});
                   }}
                   source={{html: codeInject(html)}}/>
              );
            } else {
              return (
                <View style={styles.pleaseScrollContainer}>
                  <Text>------ 继续滚动，查看图文详情 ------</Text>
                </View>
              );
            }
          })()}
        </ScrollView>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => {}} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>上传淘宝</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.refs.modal.open();}} style={[styles.itemAction, {borderColor: '#F0CAB6', backgroundColor: '#FFE4D0'}]}>
            <Text style={[styles.itemActionText, {color: '#E5511D'}]}>立刻购买</Text>
          </TouchableOpacity>
        </View>
        <Modal style={styles.modal} position={'bottom'} ref={'modal'} onOpened={this.onModalOpened.bind(this)}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => this.refs.modal.close()}>
            <Icon name="ios-close-circle-outline" size={24}/>
          </TouchableOpacity>
          <SpecPicker ref="specPicker" specs={this.props.getSpecsRequest.specs} specName1={this.props.getSpecsRequest.specName1} specName2={this.props.getSpecsRequest.specName2}/>
          <SpecContainer specName="数量">
            <InputNumber ref="num" styles={inputNumberStyles} defaultValue={1} min={1}/>
          </SpecContainer>
          <TouchableOpacity onPress={this.buy.bind(this)} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>立即购买</Text>
          </TouchableOpacity>
        </Modal>
        <Spinner visible={this.props.getDescriptionRequest.isLoading || this.props.getSpecsRequest.isLoading}/>
      </View>
    );
  }

  onScroll(e) {
    const scrollY = e.nativeEvent.contentOffset.y;
    if (scrollY > 100 && this.props.getDescriptionRequest.description === '') {
      this.props.getDescription(this.props.goods_id);
    }
  }

  onModalOpened() {
    if (this.props.getSpecsRequest.specs.length === 0 || this.props.getSpecsRequest.specs[0].goods_id !== this.props.goods_id) {
      this.props.getSpecs(this.props.goods_id);
    }
  }

  buy() {
    const num = this.refs.num.getCurrentValidValue();
    const specId = this.refs.specPicker.getSelected();
    if (specId === '0') {
      ToastAndroid.show('请选择商品规格', ToastAndroid.SHORT);
      return ;
    } else {
      this.props.navigator.push({
        OrderConfirmPage: true,
        specIds: [specId],
        specNums: [num],
      });
    }
  }

  taobaoUpload() {
    NativeModules.AlibabaAPI.login();
  }

}

const actions = (dispatch) => {
  return {
    getDescription: (goodsId) => dispatch(getDescription(goodsId)),
    clearDescription: () => dispatch(clearDescription()),
    getSpecs: (goodsId) => dispatch(getSpecs(goodsId)),
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
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  itemActionText: {
    textAlign: 'center',
    fontSize: 24,
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
  itemSku: {
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
  pleaseScrollContainer: {
    alignItems: 'center',
    paddingTop: 10,
    height: 150,
  },
});

export default connect(state => state.good, actions)(ItemPage);
