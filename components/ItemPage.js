import React, { Component } from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  WebView
} from 'react-native';

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
    width: 320;
}
</style>
<script>
${script}
</script>
`;

const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");

class ItemPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: 600
    };
  }

  render() {
    let html = '<html><head><title></title></head><body>' + this.props.description + '</body></html>';
    return (
      <ScrollView>
        <Image style={styles.itemImage} source={{uri: this.props.defaultImage}}/>
        <View style={styles.itemHead}>
          <Text numberOfLines={2} style={styles.itemTitle}>{this.props.goodsName}</Text>
          <Text style={styles.itemPrice}>¥ {this.props.price}</Text>
          <Text style={styles.itemOriginPrice}>淘宝价 ¥ {this.props.price}</Text>
        </View>
        <TouchableHighlight style={styles.itemSku}>
          <Text style={styles.pleaseSelect}>选择  尺码 颜色分类</Text>
        </TouchableHighlight>
        <WebView style={[styles.itemDesc, {height: this.state.webViewHeight}]}
                 javaScriptEnabled={true}
                 onNavigationStateChange={(navState) => {
                   this.setState({webViewHeight: parseInt(navState.title, 10) || 0});
                   console.log(navState);
                 }}
                 source={{html: codeInject(html)}}/>
      </ScrollView>
    );
  }

  taobaoUpload() {
    NativeModules.AlibabaAPI.login();
  }

}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  itemImage: {
    width: width,
    height: 400
  },
  itemHead: {
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: '#ffffff'
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000'
  },
  itemPrice: {
    fontSize: 16,
    color: '#f40'
  },
  itemOriginPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through'
  },
  itemSku: {
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    height: 35,
    justifyContent: 'center'
  },
  pleaseSelect: {
    fontSize: 16,
    color: '#000000'
  },
  itemDesc: {
    marginTop: 5,
    width: width,
    backgroundColor: '#ffffff'
  }
});

export default ItemPage;
