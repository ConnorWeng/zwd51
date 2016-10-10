import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TouchableContainerItem extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          <View style={[styles.bodyContainer, this.props.bodyStyle]}>
            {this.props.children}
          </View>
          {this.props.arrow ? <Icon style={styles.arrow} name="ios-arrow-forward-outline" size={30} color="#000000" /> : <View />}
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  bodyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  arrow: {
    flex: 1,
  },
});

export default TouchableContainerItem;
