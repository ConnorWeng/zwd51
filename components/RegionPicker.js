import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {getRegions} from '../actions';

class RegionPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layer1: [],
      selected1: null,
      layer2: [],
      selected2: null,
      layer3: [],
      selected3: null,
    };
  }

  componentDidMount() {
    this.props.getRegions(2, 1, this.props.member.accessToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address.getRegionsRequest.message) {
      ToastAndroid.show(nextProps.address.getRegionsRequest.message, ToastAndroid.SHORT);
    } else {
      const regions = nextProps.address.getRegionsRequest.regions;
      if (regions.length > 0) {
        if (regions[0].layer === '1') {
          this.setState({
            layer1: regions,
            selected1: regions[0].region_id + ':' + regions[0].region_name,
          });
          this.props.getRegions(regions[0].region_id, 2, this.props.member.accessToken);
        } else if (regions[0].layer === '2') {
          this.setState({
            layer2: regions,
            selected2: regions[0].region_id + ':' + regions[0].region_name,
          });
          this.props.getRegions(regions[0].region_id, 3, this.props.member.accessToken);
        } else if (regions[0].layer === '3') {
          this.setState({
            layer3: regions,
            selected3: regions[0].region_id + ':' + regions[0].region_name,
          });
        }
      }
    }
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <Picker style={styles.picker} selectedValue={this.state.selected1} onValueChange={this.onSelectLayer1.bind(this)}>
          {
            this.state.layer1.map((region) => {
              return (
                <Picker.Item key={region.region_id} label={region.region_name} value={region.region_id + ':' + region.region_name}/>
              );
            })
          }
        </Picker>
        <Picker style={styles.picker} selectedValue={this.state.selected2} onValueChange={this.onSelectLayer2.bind(this)}>
          {
            this.state.layer2.map((region) => {
              return (
                <Picker.Item key={region.region_id} label={region.region_name} value={region.region_id + ':' + region.region_name}/>
              );
            })
          }
        </Picker>
        <Picker style={styles.picker} selectedValue={this.state.selected3} onValueChange={this.onSelectLayer3.bind(this)}>
          {
            this.state.layer3.map((region) => {
              return (
                <Picker.Item key={region.region_id} label={region.region_name} value={region.region_id + ':' + region.region_name}/>
              );
            })
          }
        </Picker>
      </View>
    );
  }

  onSelectLayer1(value) {
    this.setState({
      selected1: value,
      layer2: [],
    });
    this.props.getRegions(value.split(':')[0], 2, this.props.member.accessToken);
  }

  onSelectLayer2(value) {
    this.setState({
      selected2: value,
      layer3: [],
    });
    this.props.getRegions(value.split(':')[0], 3, this.props.member.accessToken);
  }

  onSelectLayer3(value) {
    this.setState({
      selected3: value,
    });
  }

  getRegion() {
    if (this.state.selected3.indexOf(':')) {
      const parts1 = this.state.selected1.split(':');
      const parts2 = this.state.selected2.split(':');
      const parts3 = this.state.selected3.split(':');
      return {
        regionId: parts3[0],
        regionName: '中国' + parts1[1] + parts2[1] + parts3[1],
      };
    } else {
      return null;
    }
  }

}

const actions = (dispatch) => {
  return {
    getRegions: (pid, layer, accessToken) => dispatch(getRegions(pid, layer, accessToken)),
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  }
});

export default connect(
  state => state,
  actions,
  null,
  {withRef: true})(RegionPicker);
