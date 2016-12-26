import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {mapDispatchToProps} from '../actions/mapper';

class CategoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cate_id: 16,
      sub_cate_id: 0,
    };

    this.categories = [{
      cate_id: 16,
      cate_name: '女装',
    }, {
      cate_id: 30,
      cate_name: '男装',
    }, {
      cate_id: 50006843,
      cate_name: '女鞋',
    }, {
      cate_id: 1625,
      cate_name: '家居服',
    }, {
      cate_id: 50006842,
      cate_name: '包包',
    }];
  }

  componentDidMount() {
    this.props.getNextLayer(this.state.cate_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.leftView}>
          {
            this.categories.map((cate) => {
              const checked = cate.cate_id === this.state.cate_id ? {backgroundColor: '#f5f5f5'} : {};
              return (
                <TouchableOpacity key={cate.cate_id} style={[styles.categoryContainer, checked]} onPress={() => {
                    this.setState({
                      cate_id: cate.cate_id,
                    });
                    this.props.getNextLayer(cate.cate_id);
                  }}>
                  <Text style={styles.categoryName}>{cate.cate_name}</Text>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
        <ScrollView style={styles.rightView}>
          <View style={styles.rightContent}>
            {
              this.props.category.getNextLayerRequest.categories.map((subCate) => {
                return (
                  <TouchableOpacity key={subCate.cate_id} style={styles.subCategoryContainer} onPress={() => this.props.navigator.push({CategoryItemsPage: true, category: subCate})}>
                    <Image source={{uri: 'http://www.51zwd.com/data/files/mall/template/48x48-m.png'}} style={styles.subCategoryLogo}/>
                    <Text style={{color: '#000000'}}>{subCate.cate_mname ? subCate.cate_mname : subCate.cate_name}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </ScrollView>
        <Spinner visible={this.props.category.getNextLayerRequest.isLoading}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 3,
  },
  categoryContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ffffff',
  },
  categoryName: {
    fontSize: 18,
    color: '#000000',
  },
  rightContent: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subCategoryContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  subCategoryLogo: {
    width: 48,
    height: 48,
    borderRadius: 20,
  },
});

export default connect(state => state, mapDispatchToProps)(CategoryPage);
