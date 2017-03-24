import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {mapDispatchToProps} from '../actions/mapper';
import PrimaryButton from './PrimaryButton';
import LabelAndInput from './LabelAndInput';

class MobileShopPage extends Component {

  componentDidMount() {
    this.props.getMobileShopSettings(this.props.member.accessToken);
  }

  render() {
    if (this.props.setting.saveMobileShopSettingsRequest.success) {
      ToastAndroid.show('保存成功', ToastAndroid.SHORT);
      this.props.navigator.pop();
    }
    if (this.props.setting.saveMobileShopSettingsRequest.message) {
      ToastAndroid.show(this.props.setting.saveMobileShopSettingsRequest.message, ToastAndroid.SHORT);
    }
    if (this.props.setting.getMobileShopSettingsRequest.message) {
      ToastAndroid.show(this.props.setting.getMobileShopSettingsRequest.message, ToastAndroid.SHORT);
    }

    let settings = {};
    if (this.props.setting.getMobileShopSettingsRequest.settings) {
      settings = this.props.setting.getMobileShopSettingsRequest.settings;
    }

    return (
      <View style={{flex: 1}}>
        <LabelAndInput ref="profit" label="每件加价" defaultValue={settings['profit']}/>
        <LabelAndInput ref="shopNick" label="微店名称" defaultValue={settings['shop_nick']}/>
        <LabelAndInput ref="mobile" label="手机号" defaultValue={settings['mobile']}/>
        <LabelAndInput ref="imQQ" label="QQ" defaultValue={settings['im_qq']}/>
        <LabelAndInput ref="imWX" label="微信" defaultValue={settings['im_wx']}/>
        <LabelAndInput ref="imWW" label="旺旺" defaultValue={settings['im_ww']}/>
        <LabelAndInput ref="announcement" label="公告" defaultValue={settings['announcement']}/>
        <PrimaryButton label={'确认'} onPress={this.save.bind(this)}/>
        <Spinner visible={this.props.setting.saveMobileShopSettingsRequest.isLoading || this.props.setting.getMobileShopSettingsRequest.isLoading}/>
      </View>
    );
  }

  save() {
    const shopNick = this.refs.shopNick.getText();
    if (!shopNick) {
      ToastAndroid.show('微店名称不能为空', ToastAndroid.SHORT);
      return ;
    }
    const profit = this.refs.profit.getText();
    if (isNaN(parseFloat(profit)) || !isFinite(profit)) {
      ToastAndroid.show('每件加价必须是合理的数字', ToastAndroid.SHORT);
      return ;
    }
    const mobile = this.refs.mobile.getText();
    const imQQ = this.refs.imQQ.getText();
    const imWX = this.refs.imWX.getText();
    const imWW = this.refs.imWW.getText();
    if (!mobile && !imQQ && !imWX && !imWW) {
      ToastAndroid.show('必须填写一种联系方式', ToastAndroid.SHORT);
      return ;
    }
    const announcement = this.refs.announcement.getText();
    const accessToken = this.props.member.accessToken;
    this.props.saveMobileShopSettings(shopNick, profit, mobile, imQQ, imWX, imWW, announcement, accessToken);
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(MobileShopPage);
