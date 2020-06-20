import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import R from 'ramda';
import { connect } from 'react-redux';
import _ from 'lodash';

import i18n from '~/i18n';
import UI from '~/modules/UI';
import PrivacyModal from '~/components/modal/privacy-modal';
import actions, { dispatch } from '~/modules/redux-app-config';
import MyTouchable from '~/components/my-touchable';

const accountImg = require('~/images/account.png');

@connect(
  R.pick(['userInfo', 'deviceInfo', 'course']),
  actions,
)
class Home extends Component {
  static navigationOptions = () => ({
    tabBarLabel: i18n.t('tab.home'),
    tabBarIcon: ({ focused }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? UI.color.primary : '#666666' }]}
        source={accountImg}
      />
    ),
    tabBarOnPress: ({ navigation }) => {
      // do other things
      const { navigate, state } = navigation;
      navigate(state.routeName);
    },
  });
  constructor(props) {
    super(props);
    this.state = {
      privacyVisible: false, // 隐私协议弹窗
    };
  }

  setPrivacyVisible = () => {
    this.setState({ privacyVisible: false });
    dispatch('SET_ACCEPT_PRIVACY_STATUS', true);
  };

  componentDidMount() {
    const { deviceInfo } = this.props;
    if (!deviceInfo.acceptPrivacy) {
      this.setState({ privacyVisible: true });
    }
  }

  onCoursePress = () => {
    this.props.navigation.navigate('course');
  };

  render() {
    const { privacyVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text onPress={this.onCoursePress}>课程列表</Text>
        <PrivacyModal
          visible={privacyVisible}
          navigation={this.props.navigation}
          setVisible={this.setPrivacyVisible}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: UI.scaleSize(28),
    height: UI.scaleSize(28),
  },
});

export default Home;
