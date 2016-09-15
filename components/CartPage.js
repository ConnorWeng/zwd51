import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import PleaseLogin from './PleaseLogin';

class CartPage extends Component {

  render() {
    return (
      <ScrollView>
        {(() => {
          if (!this.props.member.accessToken) {
            return (
              <PleaseLogin navigator={this.props.navigator}/>
            );
          } else {
            return (
              <View></View>
            );
          }
        })()}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state)(CartPage);
