import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(240,64,0) and rgb(150,150,150)
  iconColor(progress) {
    const red = 240 + (150 - 240) * progress;
    const green = 64 + (150 - 64) * progress;
    const blue = 0 + (150 - 0) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    const tabWidth = this.props.containerWidth / this.props.tabs.length;
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, tabWidth],
    });

    return (
      <View>
        <View style={[styles.tabs, this.props.style]}>
          {this.props.tabs.map((tab, i) => {
            return (
              <TouchableOpacity key={tab}
                                onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Icon
                  name={tab}
                  size={30}
                  color={this.props.activeTab == i ? 'rgb(240,64,0)' : 'rgb(150,150,150)'}
                  ref={(icon) => { this.tabIcons[i] = icon; }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 42,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
});

export default TabBar;
