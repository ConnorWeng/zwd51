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
    if (!this.props.member.accessToken) {
      this.props.navigator.push({LoginPage: true});
    } else if (!this.props.member.isTaobao) {
      ToastAndroid.show('该功能需要使用淘宝登录，请重新登录', ToastAndroid.LONG);
      this.props.navigator.push({LoginPage: true});
    } else {
      this.props.getDescription(this.props.goods_id);
      this.props.makePictureCategory(this.props.member.accessToken);
    }
  }

  render() {
    if (this.props.taobao.makePictureCategoryRequest.message) {
      ToastAndroid.show(this.props.taobao.makePictureCategoryRequest.message, ToastAndroid.SHORT);
    }

    if (this.props.taobao.addItemRequest.message) {
      ToastAndroid.show(this.props.taobao.addItemRequest.message, ToastAndroid.SHORT);
    }

    if (this.props.taobao.addItemRequest.success) {
      ToastAndroid.show('宝贝上传成功', ToastAndroid.SHORT);
      this.props.navigator.pop();
    }

    return (
      <ScrollView>
        <LabelAndInput ref="title" label="宝贝标题:" flexDirection="column" value={this.props.goods_name} multiline={true} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
        <LabelAndInput ref="price" label="一口价:" flexDirection="column" value={this.props.price} inputStyle={{fontSize: 14, color: 'rgb(100,100,100)'}}/>
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
        <Spinner visible={this.props.good.getDescriptionRequest.isLoading || this.props.taobao.makePictureCategoryRequest.isLoading || this.props.taobao.uploadPicturesRequest.isLoading || this.props.taobao.addItemRequest.isLoading}/>
      </ScrollView>
    );
  }

  async upload() {
    const pcid = this.props.taobao.makePictureCategoryRequest.pcid;
    const imgUrls = this.props.good.getDescriptionRequest.imgsInDesc.join(',');
    if (!pcid) {
      ToastAndroid.show('获取淘宝相册失败，无法完成图片搬家，请重试', ToastAndroid.SHORT);
      this.props.navigator.pop();
      return ;
    }
    const result = await this.props.uploadPictures(pcid, imgUrls, this.props.member.accessToken);
    if (result.error) {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
      return ;
    }
    const urlPairs = this.props.taobao.uploadPicturesRequest.urlPairs;
    let desc = this.props.good.getDescriptionRequest.description;
    for (var i in urlPairs) {
      const pair = urlPairs[i];
      desc = desc.replace(pair.oldImgUrl, pair.newImgUrl);
    }
    this.props.addItem(this.props.goods_id, this.refs.title.getText(), this.refs.price.getText(), desc, this.props.member.accessToken);
  }

}

const styles = StyleSheet.create({

});

export default connect(state => state, mapDispatchToProps)(UploadItemPage);
