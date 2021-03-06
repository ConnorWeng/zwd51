import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

class LabelAndInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.defaultValue ? this.props.defaultValue : '',
    };
  }

  render() {
    return (
      <View style={[styles.inputContainer, this.props.flexDirection === 'column' ? {flexDirection: 'column', alignItems: 'flex-start'} : {}]}>
        <Text style={[styles.inputLabel, this.props.flexDirection === 'column' ? {textAlign: 'right'} : {}]}>{this.props.label}</Text>
        {this.props.children ? this.props.children : <TextInput onChangeText={(text) =>{this.setState({text: text}); if (this.props.onChangeText) this.props.onChangeText(text);}} style={[styles.input, this.props.inputStyle]} underlineColorAndroid="rgba(0,0,0,0)" {...this.props}/>}
      </View>
    );
  }

  getText() {
    return this.state.text;
  }

  setText(text) {
    this.setState({
      text: text,
    });
  }

}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  input: {
    flex: 4,
    fontSize: 16,
    height: 40,
    padding: 0,
  },
});

export default LabelAndInput;
