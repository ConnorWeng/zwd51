import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  TextInput,
  ListView,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from 'react-native-checkbox';
import PrimaryButton from './PrimaryButton';
import LabelAndInput from './LabelAndInput';
import RegionPicker from './RegionPicker';
import {getAddresses, setAddress, addAddress} from '../actions';

const {height, width} = Dimensions.get('window');

class AddressPage extends Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      selected: props.addr,
      addresses: this.dataSource.cloneWithRows(props.address.getAddressesRequest.addresses),
    };
  }

  componentDidMount() {
    this.props.getAddresses(this.props.member.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address.getAddressesRequest.message) {
      ToastAndroid.show(nextProps.address.getAddressesRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.address.getAddressesRequest.addresses) {
      this.setState({
        addresses: this.dataSource.cloneWithRows(nextProps.address.getAddressesRequest.addresses),
      });
    }
    if (nextProps.address.addAddressRequest.message) {
      ToastAndroid.show(nextProps.address.addAddressRequest.message, ToastAndroid.SHORT);
    }
    if (nextProps.address.addAddressRequest.success) {
      ToastAndroid.show('新增成功', ToastAndroid.SHORT);
      this.refs.modal.close();
      // 等待CLEAR_MESSAGE事件触发之后再触发刷新
      setTimeout(((ref) => {
        return () => {
          ref.onRefresh();
        };
      })(this), 3000);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <ListView
             style={styles.addressListView}
             refreshControl={
                 <RefreshControl
                      refreshing={this.props.address.getAddressesRequest.isLoading}
                      onRefresh={this.onRefresh.bind(this)}/>
                 }
             dataSource={this.state.addresses}
             renderRow={this.renderAddress.bind(this)}
             enableEmptySections={true}/>
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
          <LabelAndInput ref="consignee" label="收货人"/>
          <LabelAndInput ref="phoneMob" label="手机号码"/>
          <LabelAndInput ref="region" label="所在地区">
            <RegionPicker ref="regionPicker" style={{flex: 4}}/>
          </LabelAndInput>
          <LabelAndInput ref="address" label="详细地址" placeholder="街道、楼牌号等"/>
          <LabelAndInput ref="zipcode" label="邮政编码"/>
          <PrimaryButton label={'确认'} onPress={this.addAddress.bind(this)} />
        </Modal>
        <Spinner visible={this.props.address.getAddressesRequest.isLoading}/>
      </View>
    );
  }

  renderAddress(address) {
    return (
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
  }

  onRefresh() {
    this.props.getAddresses(this.props.member.accessToken);
  }

  addAddress() {
    const region = this.refs.regionPicker.getWrappedInstance().getRegion();
    if (region === null) {
      ToastAndroid.show('所在地区选择不正确', ToastAndroid.SHORT);
    } else {
      const consignee = this.refs.consignee.getText();
      const regionId = region.regionId;
      const regionName = region.regionName;
      const address = this.refs.address.getText();
      const zipcode = this.refs.zipcode.getText();
      const phoneMob = this.refs.phoneMob.getText();
      this.props.addAddress(consignee, regionId, regionName, address, zipcode, phoneMob, this.props.member.accessToken);
    }
  }

}

const actions = (dispatch) => {
  return {
    getAddresses: (accessToken) => dispatch(getAddresses(accessToken)),
    setAddress: (address) => dispatch(setAddress(address)),
    addAddress: (consignee, regionId, regionName, address, zipcode, phoneMob, accessToken) => dispatch(addAddress(consignee, regionId, regionName, address, zipcode, phoneMob, accessToken)),
  };
}

const styles = StyleSheet.create({
  addressListView: {
    height: height - 42 - 80 - 60,
  },
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
    height: 320,
  },
  modalCloseBtn: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  userInputContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  userInputLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  userInput: {
    flex: 6,
    fontSize: 16,
    height: 40,
    padding: 0,
  },
});

export default connect(state => state, actions)(AddressPage);
