import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {mapDispatchToProps} from '../actions/mapper';
import LabelAndInput from './LabelAndInput';
import PrimaryButton from './PrimaryButton';

class UploadItemPage extends Component {

  componentDidMount() {
    this.props.getDescription(this.props.goods_id);
    this.props.makePictureCategory(this.props.member.accessToken);
  }

  render() {
    if (this.props.taobao.makePictureCategoryRequest.message) {
      ToastAndroid.show(this.props.taobao.makePictureCategoryRequest.message, ToastAndroid.SHORT);
    }

    return (
      <ScrollView>
        <LabelAndInput label="宝贝标题:" flexDirection="column" value={this.props.goods_name} multiline={true} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
        <LabelAndInput label="一口价:" flexDirection="column" value={this.props.price} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
        <LabelAndInput label="图片搬家:" flexDirection="column">
          {
            this.props.good.getDescriptionRequest.imgsInDesc ? this.props.good.getDescriptionRequest.imgsInDesc.map((img, i) => {
              return (
                <Text key={i}>{img}</Text>
              );
            }) : null
          }
        </LabelAndInput>
        <PrimaryButton label="一键上传" onPress={this.upload.bind(this)}></PrimaryButton>
        <Spinner visible={this.props.good.getDescriptionRequest.isLoading || this.props.taobao.makePictureCategoryRequest.isLoading}/>
      </ScrollView>
    );
  }

  upload() {
    if (!this.props.taobao.makePictureCategoryRequest.pcid) {
      ToastAndroid.show('获取淘宝相册失败，无法完成图片搬家，请重试', ToastAndroid.SHORT);
      this.props.navigator.pop();
      return ;
    }
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(UploadItemPage);
