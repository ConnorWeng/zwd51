import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class UserPage extends Component {

  render() {
    return (
      <View style={[theme.cardStyle, styles.card]}>
        <Text style={theme.cardTitleStyle}>User</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    height: 150
  }
});

export default UserPage;
