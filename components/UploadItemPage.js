import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {mapDispatchToProps} from '../actions/mapper';
import LabelAndInput from './LabelAndInput';
import PrimaryButton from './PrimaryButton';

class UploadItemPage extends Component {

  componentDidMount() {
    this.props.getDescription(this.props.goods_id);
  }

  render() {
    return (
      <ScrollView>
        <LabelAndInput label="宝贝标题:" flexDirection="column" value={this.props.goods_name} multiline={true} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
        <LabelAndInput label="一口价:" flexDirection="column" value={this.props.price} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
        <LabelAndInput label="图片搬家:" flexDirection="column">
          {
            this.props.good.getDescriptionRequest.imgsInDesc ? this.props.good.getDescriptionRequest.imgsInDesc.map((img) => {
              return (
                <Text>{img}</Text>
              );
            }) : null
          }
        </LabelAndInput>
        <PrimaryButton label="一键上传"></PrimaryButton>
        <Spinner visible={this.props.good.getDescriptionRequest.isLoading}/>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(UploadItemPage);
