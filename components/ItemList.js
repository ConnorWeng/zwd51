import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  render() {
    return (
      <ListView
         contentContainerStyle={styles.itemContainer}
         dataSource={this.state.dataSource.cloneWithRows(this.props.items)}
         renderRow={this.renderItem.bind(this)}/>
    );
  }

  renderItem(item) {
    return (
      <TouchableHighlight style={styles.item} onPress={() => this.props.navigator.push({ItemPage: true, item: item})}>
        <View>
          <Image source={{uri: item.defaultImage}} style={styles.itemImage}/>
          <View style={styles.itemTitleContainer}>
            <Text numberOfLines={2} style={styles.itemTitle}>{item.goodsName}</Text>
          </View>
          <View style={styles.itemPriceContainer}>
            <Text numberOfLines={1} style={styles.itemPrice}>¥ {item.price} </Text>
            <Text style={styles.itemOriginPrice}>¥ {item.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  item: {
    width: width / 2 - 2.5,
    paddingBottom: 5,
  },
  itemImage: {
    width: width / 2 - 2.5,
    height: 200,
    resizeMode: 'cover',
  },
  itemTitleContainer: {
    width: width / 2 - 2.5,
    backgroundColor: '#ffffff',
  },
  itemTitle: {
    fontSize: 12,
    color: '#000000',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  },
  itemPrice: {
    color: '#f40',
  },
  itemOriginPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});

export default ItemList;
