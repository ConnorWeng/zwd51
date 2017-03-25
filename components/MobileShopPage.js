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

  constructor(props) {
    super(props);
    this.state = {
      settings: {},
    };
  }

  componentDidMount() {
    this.getSettings();
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

    return (
      <View style={{flex: 1}}>
        <LabelAndInput ref="profit" label="每件加价" defaultValue={this.state.settings['profit']}/>
        <LabelAndInput ref="shopNick" label="微店名称" defaultValue={this.state.settings['shop_nick']}/>
        <LabelAndInput ref="mobile" label="手机号" defaultValue={this.state.settings['mobile']}/>
        <LabelAndInput ref="imQQ" label="QQ" defaultValue={this.state.settings['im_qq']}/>
        <LabelAndInput ref="imWX" label="微信" defaultValue={this.state.settings['im_wx']}/>
        <LabelAndInput ref="imWW" label="旺旺" defaultValue={this.state.settings['im_ww']}/>
        <LabelAndInput ref="announcement" label="公告" defaultValue={this.state.settings['announcement']}/>
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

  async getSettings() {
    await this.props.getMobileShopSettings(this.props.member.accessToken);
    if (this.props.setting.getMobileShopSettingsRequest.settings) {
      const settings = this.props.setting.getMobileShopSettingsRequest.settings;
      this.refs.profit.setText(settings['profit']);
      this.refs.shopNick.setText(settings['shop_nick']);
      this.refs.mobile.setText(settings['mobile']);
      this.refs.imQQ.setText(settings['im_qq']);
      this.refs.imWX.setText(settings['im_wx']);
      this.refs.imWW.setText(settings['im_ww']);
      this.refs.announcement.setText(settings['announcement']);
      this.setState({
        settings: settings,
      });
    }
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(MobileShopPage);
