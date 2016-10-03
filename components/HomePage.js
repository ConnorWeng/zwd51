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
} from 'react-native';
import ItemPage from './ItemPage';
import ItemList from './ItemList';

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
      <ScrollView>
        <View style={styles.banner}>
          <Image style={{height: 150}} source={{uri: 'http://www.51zwd.com/data/files/mall/template/201607090053056375.jpg'}}/>
        </View>
        <Text style={styles.separator}> — 热卖精品 — </Text>
        <ListView
           dataSource={this.state.dataSource.cloneWithRows(MOCKED_DATA.items)}
           renderRow={this.renderTrendyItem.bind(this)}/>
        <Text style={styles.separator}> － 人气爆款 — </Text>
        <ItemList shopId={0} navigator={this.props.navigator}/>
      </ScrollView>
    );
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

const MOCKED_DATA = {
  items: [{
    goodsName: '实拍9671#欧美潮T短袖女装T恤洗水怀旧女上衣',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i4/TB1kTZSHFXXXXaDapXXXXXXXXXX_!!0-item_pic.jpg',
    price: '56.00',
    description: '<img src="https://img.alicdn.com/imgextra/i2/791543928/TB2iWr9nFXXXXbHXpXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/791543928/TB2iWr9nFXXXXbHXpXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB24zEonFXXXXbPXXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB24zEonFXXXXbPXXXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB2imsonFXXXXb2XXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB2imsonFXXXXb2XXXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB2Ap3onFXXXXbZXXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB2Ap3onFXXXXbZXXXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB2JY3InFXXXXXeXXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB2JY3InFXXXXXeXXXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB2JmT.nFXXXXa_XpXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB2JmT.nFXXXXa_XpXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/791543928/TB2D87xnFXXXXXFXXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/791543928/TB2D87xnFXXXXXFXXXXXXXXXXXX-791543928.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/791543928/TB2xZQHnFXXXXXnXXXXXXXXXXXX-791543928.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/791543928/TB2xZQHnFXXXXXnXXXXXXXXXXXX-791543928.jpg" align="middle">',
  }, {
    goodsName: '8736#2016年夏季新款女装民族风印花短袖盘扣文艺棉麻连衣裙',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/TB1aMZ.JFXXXXb8XFXXXXXXXXXX_!!0-item_pic.jpg',
    price: '52.00',
    description: '<img src="https://img.alicdn.com/imgextra/i2/102357263/TB2Yfk5oFXXXXaIXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2Yfk5oFXXXXaIXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB26OdwoVXXXXXCXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB26OdwoVXXXXXCXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2nF4ioVXXXXbQXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2nF4ioVXXXXbQXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2wC8noVXXXXaBXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2wC8noVXXXXaBXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2lgRcoVXXXXcIXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2lgRcoVXXXXcIXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2w64poVXXXXayXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2w64poVXXXXayXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB2kytyoVXXXXXhXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB2kytyoVXXXXXhXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2wiMOoFXXXXXkXFXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2wiMOoFXXXXXkXFXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2M5AWoFXXXXbJXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2M5AWoFXXXXbJXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB28EhloVXXXXbcXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB28EhloVXXXXbcXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2h5proVXXXXafXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2h5proVXXXXafXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2oQsIoFXXXXXVXFXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2oQsIoFXXXXXVXFXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2.4cRoFXXXXcGXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2.4cRoFXXXXcGXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2XRRboVXXXXcBXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2XRRboVXXXXcBXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB2d1M0oFXXXXbzXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB2d1M0oFXXXXbzXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2D3c.oFXXXXc6XXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2D3c.oFXXXXc6XXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2y.3OoFXXXXcWXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2y.3OoFXXXXcWXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2Xa.8oFXXXXX_XpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2Xa.8oFXXXXX_XpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB26OdwoVXXXXXCXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB26OdwoVXXXXXCXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2nF4ioVXXXXbQXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2nF4ioVXXXXbQXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2wC8noVXXXXaBXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2wC8noVXXXXaBXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2lgRcoVXXXXcIXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2lgRcoVXXXXcIXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2w64poVXXXXayXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2w64poVXXXXayXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB2kytyoVXXXXXhXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB2kytyoVXXXXXhXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2wiMOoFXXXXXkXFXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2wiMOoFXXXXXkXFXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2M5AWoFXXXXbJXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2M5AWoFXXXXbJXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB28EhloVXXXXbcXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB28EhloVXXXXbcXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i3/102357263/TB2h5proVXXXXafXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/102357263/TB2h5proVXXXXafXXXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i4/102357263/TB2.4cRoFXXXXcGXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/102357263/TB2.4cRoFXXXXcGXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i1/102357263/TB2VbBXoVXXXXXgXpXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/102357263/TB2VbBXoVXXXXXgXpXXXXXXXXXX-102357263.jpg" align="middle"><img src="https://img.alicdn.com/imgextra/i2/102357263/TB2JhpfoVXXXXcmXXXXXXXXXXXX-102357263.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/102357263/TB2JhpfoVXXXXcmXXXXXXXXXXXX-102357263.jpg" align="middle">',
  }, {
    goodsName: '实拍 春夏新款女装七分袖印花高腰中长款连衣裙一字领打底裙A字裙',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i2/685489829/TB25wNhopXXXXc1XpXXXXXXXXXX_!!685489829.jpg',
    price: '45.00',
    description: '<p><img src="https://img.alicdn.com/imgextra/i1/685489829/TB2LpXzopXXXXakXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/685489829/TB2LpXzopXXXXakXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2Q2tIopXXXXcGXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2Q2tIopXXXXcGXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB2jjpnopXXXXcXXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB2jjpnopXXXXcXXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i4/685489829/TB2dPFtopXXXXaUXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/685489829/TB2dPFtopXXXXaUXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB2ysxxopXXXXaxXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB2ysxxopXXXXaxXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i1/685489829/TB2_3RVopXXXXaXXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/685489829/TB2_3RVopXXXXaXXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2dvdqopXXXXbRXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2dvdqopXXXXbRXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i4/685489829/TB2XXdmopXXXXctXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/685489829/TB2XXdmopXXXXctXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2yshpopXXXXX6XpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2yshpopXXXXX6XpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB2lKFhopXXXXclXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB2lKFhopXXXXclXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB285dEopXXXXXsXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB285dEopXXXXXsXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2XKFwopXXXXaLXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2XKFwopXXXXaLXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2K6xVopXXXXaqXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2K6xVopXXXXaqXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i1/685489829/TB2eJxSopXXXXa0XXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/685489829/TB2eJxSopXXXXa0XXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i1/685489829/TB2OcFWopXXXXXBXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/685489829/TB2OcFWopXXXXXBXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB2Ozl0opXXXXXrXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB2Ozl0opXXXXXrXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i3/685489829/TB2EhRoopXXXXb1XpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/685489829/TB2EhRoopXXXXb1XpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB23_lwopXXXXayXpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB23_lwopXXXXayXpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i2/685489829/TB2RyBTopXXXXXUXXXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/685489829/TB2RyBTopXXXXXUXXXXXXXXXXXX_!!685489829.jpg" align="absmiddle"><img src="https://img.alicdn.com/imgextra/i1/685489829/TB2wzhzopXXXXX9XpXXXXXXXXXX_!!685489829.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/685489829/TB2wzhzopXXXXX9XpXXXXXXXXXX_!!685489829.jpg" align="absmiddle"></p>',
  }, {
    goodsName: '(实拍)新款8259 浅色宽松破洞休闲磨破牛仔哈伦裤女垮裤',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/855301567/TB2.h.HlpXXXXXZXXXXXXXXXXXX_!!855301567.jpg',
    price: '36.00',
    description: '<p><img src="https://img.alicdn.com/imgextra/i3/855301567/TB2hKdQlFXXXXckXpXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/855301567/TB2hKdQlFXXXXckXpXXXXXXXXXX-855301567.jpg" align="absmiddle"> <img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/855301567/TB2T4gnlpXXXXc9XXXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/855301567/TB2T4gnlpXXXXc9XXXXXXXXXXXX-855301567.jpg"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/855301567/TB2A82.lpXXXXb0XpXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/855301567/TB2A82.lpXXXXb0XpXXXXXXXXXX-855301567.jpg"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/855301567/TB2cl3tlpXXXXchXXXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/855301567/TB2cl3tlpXXXXchXXXXXXXXXXXX-855301567.jpg"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i1/855301567/TB2dW7elpXXXXaPXpXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/855301567/TB2dW7elpXXXXaPXpXXXXXXXXXX-855301567.jpg"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/855301567/TB2tjghlpXXXXX5XpXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/855301567/TB2tjghlpXXXXX5XpXXXXXXXXXX-855301567.jpg"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i2/855301567/TB2xpyllFXXXXa5XXXXXXXXXXXX-855301567.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/855301567/TB2xpyllFXXXXa5XXXXXXXXXXXX-855301567.jpg"></p>',
  }, {
    goodsName: '实拍现货9621#2016情侣装 韩版宽松 印花百搭情侣T恤潮',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i2/1993861789/TB2JSJ2oVXXXXbiXXXXXXXXXXXX_!!1993861789.jpg',
    price: '18.00',
    description: '<p align="center"><font size="4">此模特穿衣尺码为女S男XL</font></p> <div align="center"><font size="4">S&nbsp;长度66&nbsp;&nbsp;胸围92&nbsp;肩宽41&nbsp;袖长21<br>M&nbsp;长度68&nbsp;&nbsp;胸围94&nbsp;肩宽42&nbsp;袖长22<br>L&nbsp;长度70&nbsp;&nbsp;胸围98&nbsp;肩宽43&nbsp;袖长23<br>XL&nbsp;长度72&nbsp;&nbsp;胸围102&nbsp;肩宽44&nbsp;袖长24<br>XXL&nbsp;长度74&nbsp;&nbsp;胸围106&nbsp;肩宽45&nbsp;袖长25<br>XXXL&nbsp;长度76&nbsp;&nbsp;胸围110&nbsp;肩宽46&nbsp;袖长26 </font><img src="https://cbu01.alicdn.com/img/ibank/2016/711/590/3032095117_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/711/590/3032095117_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/378/680/3032086873_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/378/680/3032086873_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/406/543/3032345604_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/406/543/3032345604_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/280/453/3032354082_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/280/453/3032354082_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/293/843/3032348392_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/293/843/3032348392_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/036/243/3032342630_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/036/243/3032342630_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/542/153/3032351245_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/542/153/3032351245_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/096/980/3034089690_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/096/980/3034089690_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/732/290/3032092237_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/732/290/3032092237_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/254/290/3034092452_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/254/290/3034092452_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/921/590/3032095129_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/921/590/3032095129_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/647/980/3032089746_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/647/980/3032089746_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/050/753/3032357050_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/050/753/3032357050_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/269/380/3032083962_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/269/380/3032083962_39924798.jpg"> <img src="https://cbu01.alicdn.com/img/ibank/2016/769/933/3032339967_39924798.jpg" data-ks-lazyload="https://cbu01.alicdn.com/img/ibank/2016/769/933/3032339967_39924798.jpg"></div>',
  }, {
    goodsName: '实拍 8511# 新款韩版女装时尚短袖印花T恤宽松大码T恤衫',
    defaultImage: 'https://img.alicdn.com/bao/uploaded/i1/485700822/TB216FtnXXXXXcXXXXXXXXXXXXX_!!485700822.jpg',
    price: '21.00',
    description: '<p><img src="https://img.alicdn.com/imgextra/i1/485700822/TB22xXdnXXXXXa6XpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/485700822/TB22xXdnXXXXXa6XpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i1/485700822/TB2ULJinXXXXXXNXpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/485700822/TB2ULJinXXXXXXNXpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i4/485700822/TB2tv.7mVXXXXcpXpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/485700822/TB2tv.7mVXXXXcpXpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i2/485700822/TB2pzk2mVXXXXc8XpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/485700822/TB2pzk2mVXXXXc8XpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i4/485700822/TB2O5RrnXXXXXb9XXXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/485700822/TB2O5RrnXXXXXb9XXXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i3/485700822/TB2REJjnXXXXXaXXpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i3/485700822/TB2REJjnXXXXXaXXpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i1/485700822/TB2TRFtnXXXXXctXXXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i1/485700822/TB2TRFtnXXXXXctXXXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i4/485700822/TB2NVd2mVXXXXbvXpXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i4/485700822/TB2NVd2mVXXXXbvXpXXXXXXXXXX-485700822.jpg"><img src="https://img.alicdn.com/imgextra/i2/485700822/TB24ptznXXXXXbyXXXXXXXXXXXX-485700822.jpg" data-ks-lazyload="https://img.alicdn.com/imgextra/i2/485700822/TB24ptznXXXXXbyXXXXXXXXXXXX-485700822.jpg"></p>',
  }],
};

export default HomePage;
