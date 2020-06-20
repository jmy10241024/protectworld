import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
    dispatch('SET_LOADING', { visible: true });
    dispatch('GET_COURSE_LIST', {
      page: 1,
      pageSize: 10,
      res: res => {},
    });
    dispatch('SET_LOADING', { visible: false });
  }

  render() {
    const { privacyVisible } = this.state;
    const { navigation, course } = this.props;
    const { courses } = course;
    if (_.isEmpty(courses)) {
      return (
        <View style={styles.container}>
          <Text>暂无数据</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {course.map((item, index) => {
            const arr = _.toArray(item);
            return (
              <MyTouchable key={arr[0]} style={styles.item}>
                {arr.map((itemSub, indexSub) => (
                  <Text key={`${itemSub}${indexSub}`} style={styles.text}>
                    {itemSub}
                  </Text>
                ))}
              </MyTouchable>
            );
          })}
        </View>
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
    paddingTop: UI.scaleSize(80),
  },
  icon: {
    width: UI.scaleSize(28),
    height: UI.scaleSize(28),
  },
  main: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    paddingHorizontal: UI.scaleSize(8),
    shadowColor: UI.color.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    fontSize: UI.scaleSize(18),
    color: '#000',
    fontWeight: 'bold',
    lineHeight: UI.scaleSize(20),
    letterSpacing: UI.scaleSize(2),
  },
});

export default Home;
