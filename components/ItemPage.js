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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import SpecSelector from './SpecSelector';

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

  render() {
    let html = '<html><head><title></title></head><body>' + this.props.description + '</body></html>';
    return (
      <View style={styles.container}>
        <ScrollView style={styles.itemContainer}>
          <Image style={styles.itemImage} source={{uri: this.props.defaultImage}}/>
          <View style={styles.itemHead}>
            <Text numberOfLines={2} style={styles.itemTitle}>{this.props.goodsName}</Text>
            <Text style={styles.itemPrice}>¥ {this.props.price}</Text>
            <Text style={styles.itemOriginPrice}>淘宝价 ¥ {this.props.price}</Text>
          </View>
          <TouchableOpacity style={styles.itemSku} onPress={()=>{this.refs.modal.open();}}>
            <Text style={styles.pleaseSelect}>选择  尺码 颜色分类</Text>
            <Text style={styles.arrow}>></Text>
          </TouchableOpacity>
          <WebView style={[styles.itemDesc, {height: this.state.webViewHeight}]}
                   javaScriptEnabled={true}
                   onNavigationStateChange={(navState) => {
                     this.setState({webViewHeight: parseInt(navState.title, 10) || 0});
                   }}
                   source={{html: codeInject(html)}}/>
        </ScrollView>
        <View style={styles.itemActionContainer}>
          <TouchableOpacity onPress={() => {}} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>上传淘宝</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.refs.modal.open();}} style={[styles.itemAction, {borderColor: '#F0CAB6', backgroundColor: '#FFE4D0'}]}>
            <Text style={[styles.itemActionText, {color: '#E5511D'}]}>立刻购买</Text>
          </TouchableOpacity>
        </View>
        <Modal style={styles.modal} position={'bottom'} ref={'modal'}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => this.refs.modal.close()}>
            <Icon name="ios-close-circle-outline" size={24}/>
          </TouchableOpacity>
          <SpecSelector category="颜色" specs={[{label: '红色', value: '红色'}, {label: '黑色', value: '黑色'}]}/>
          <SpecSelector category="尺码" specs={[{label: 'L', value: 'L'}, {label: 'XL', value: 'XL'}, {label: 'XXL', value: 'XXL'}]}/>
          <SpecSelector category="数量" specs={[{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}, {label: 4, value: 4}, {label: 5, value: 5}, {label: 6, value: 6}, {label: 7, value: 7}, {label: 8, value: 8}, {label: 9, value: 9}, {label: 10, value: 10}]}/>
          <TouchableOpacity onPress={() => {this.props.navigator.push({OrderConfirmPage: true});}} style={[styles.itemAction, {borderColor: '#F22D00', backgroundColor: '#f40'}]}>
            <Text style={[styles.itemActionText, {color: '#fff'}]}>立即购买</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  taobaoUpload() {
    NativeModules.AlibabaAPI.login();
  }

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
    height: 250,
  },
  modalCloseBtn: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default ItemPage;
