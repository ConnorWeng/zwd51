import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SpecContainer from './SpecContainer';

class SpecPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSpec1: '0',
      selectedSpec2: '0',
    };
    this.relations = [];
    this.props.specs.forEach((spec) => {
      this.relations.push(spec.spec_vid_1 + ':' + spec.spec_vid_2);
    });
  }

  render() {
    const spec1Values = [];
    const spec1s = [];
    const spec2Values = [];
    const spec2s = [];
    this.props.specs.forEach((spec) => {
      if (spec.spec_1 !== '' && !~spec1Values.indexOf(spec.spec_1)) {
        const checked = spec.spec_vid_1 === this.state.selectedSpec1 ? styles.checked : {};
        const disabled = this.state.selectedSpec2 !== '0' && !this.hasRelation(spec.spec_vid_1, this.state.selectedSpec2);
        const disabledStyle = disabled ? styles.disabled : {}
        spec1Values.push(spec.spec_1);
        spec1s.push(
          <TouchableOpacity key={spec.spec_vid_1} style={[styles.specCheckbox, checked]} disabled={disabled} onPress={() => {
              this.setState({
                selectedSpec1: spec.spec_vid_1,
              });
            }}>
            <Text style={disabledStyle}>{spec.spec_1}</Text>
          </TouchableOpacity>
        );
      }
      if (spec.spec_2 !== '' && !~spec2Values.indexOf(spec.spec_2)) {
        const checked = spec.spec_vid_2 === this.state.selectedSpec2 ? styles.checked : {};
        const disabled = this.state.selectedSpec1 !== '0' && !this.hasRelation(this.state.selectedSpec1, spec.spec_vid_2);
        const disabledStyle = disabled ? styles.disabled : {}
        spec2Values.push(spec.spec_2);
        spec2s.push(
          <TouchableOpacity key={spec.spec_vid_2} style={[styles.specCheckbox, checked]} disabled={disabled} onPress={() => {
              this.setState({
                selectedSpec2: spec.spec_vid_2,
              });
            }}>
            <Text style={disabledStyle}>{spec.spec_2}</Text>
          </TouchableOpacity>
        );
      }
    });
    return (
      <View>
        <SpecContainer specName={this.props.specName1}>
          {spec1s}
        </SpecContainer>
        {(() => {
          if (spec2s.length > 0) {
            return (
              <SpecContainer specName={this.props.specName2}>
                {spec2s}
              </SpecContainer>
            );
          }
        })()}
      </View>
    );
  }

  hasRelation(spec1, spec2) {
    return ~this.relations.indexOf(spec1 + ':' + spec2);
  }

  getSelected() {
    let selectedSpec = '0';
    this.props.specs.forEach((spec) => {
      if (spec.spec_vid_1 === this.state.selectedSpec1 &&
          spec.spec_vid_2 === this.state.selectedSpec2) {
        selectedSpec = spec.spec_id;
      }
    });
    return selectedSpec;
  }

}

const styles = StyleSheet.create({
  specCheckbox: {
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  checked: {
    backgroundColor: '#f40',
  },
  disabled: {
    color: 'rgba(0,0,0,0.1)'
  },
});

export default SpecPicker;
