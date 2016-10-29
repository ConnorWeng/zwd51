import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PageContainer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           navIconName="md-arrow-back"
           onIconClicked={this.props.navigator.pop}
           style={styles.toolbar}
           iconSize={30}/>
        {this.props.children}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56,
  },
});

export default PageContainer;
