import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchPage extends Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput style={styles.searchInput} underlineColorAndroid="rgba(0,0,0,0)" placeholder="搜索..."/>
          </View>
          <TouchableOpacity style={styles.searchFilter} onPress={() => {}}>
            <Icon name="ios-funnel-outline" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row'
  },
  searchInputContainer: {
    flex: 5,
    height: 35,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff'
  },
  searchInput: {
    height: 40,
    marginLeft: 10,
    fontSize: 16
  },
  searchFilter: {
    flex: 1,
    alignItems: 'center'
  }
});

export default SearchPage;
