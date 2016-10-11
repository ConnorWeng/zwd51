import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-checkbox';
import PrimaryButton from './PrimaryButton';
import {getAddresses, setAddress} from '../actions';

const {height, width} = Dimensions.get('window');

class AddressPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: props.addr,
    };
  }

  componentDidMount() {
    this.props.getAddresses(this.props.member.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address.getAddressesRequest.message) {
      ToastAndroid.show(nextProps.address.getAddressesRequest.message, ToastAndroid.SHORT);
    }
  }

  render() {
    const addressList = [];
    this.props.address.getAddressesRequest.addresses.forEach((address) => {
      addressList.push(
        <TouchableOpacity key={'address_' + address.addr_id} onPress={() => {this.setState({selected: address});}}>
          <View style={styles.addressContainer}>
            <View style={styles.receiverContainer}>
              <Text style={styles.receiverName}>{address.consignee}</Text>
              <Text style={styles.receiverMobile}>{address.phone_mob}</Text>
              <Text style={styles.receiverAddress} numberOfLines={1}>{address.address}</Text>
            </View>
            {address.addr_id == this.state.selected.addr_id ? <Icon style={styles.checkbox} name="ios-checkbox-outline" size={30} color="rgb(0,200,0)" /> : null}
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          {addressList}
          <TouchableOpacity onPress={() => {this.refs.modal.open();}}>
            <View style={[styles.addressContainer, {justifyContent: 'center'}]}>
              <Text style={{fontSize: 80}}>+</Text>
            </View>
          </TouchableOpacity>
          <PrimaryButton label={'确认'} onPress={() => {this.props.setAddress(this.state.selected); this.props.navigator.pop();}} />
        </ScrollView>
        <Modal style={styles.modal} ref={'modal'}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => this.refs.modal.close()}>
            <Icon name="ios-close-circle-outline" size={24}/>
          </TouchableOpacity>
          <Text>building</Text>
        </Modal>
        <Spinner visible={this.props.address.getAddressesRequest.isLoading}/>
      </View>
    );
  }

}

const actions = (dispatch) => {
  return {
    getAddresses: (accessToken) => dispatch(getAddresses(accessToken)),
    setAddress: (address) => dispatch(setAddress(address)),
  };
}

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    height: 80,
  },
  receiverContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    flex: 8,
  },
  receiverName: {
    fontSize: 18,
    color: '#000000',
  },
  receiverMobile: {
    fontSize: 18,
    color: '#000000',
    marginLeft: 10,
  },
  receiverAddress: {
    marginTop: 10,
    width: width - 60,
  },
  checkbox: {
    flex: 1,
  },
  modal: {
    height: 285,
  },
  modalCloseBtn: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default connect(state => state, actions)(AddressPage);
