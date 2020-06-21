import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import i18n from '~/i18n';
import UI from '~/modules/UI';
import actions, { dispatch } from '~/modules/redux-app-config';
import MyTouchable from '~/components/my-touchable';

const accountImg = require('~/images/account.png');

@connect(
  R.pick(['userInfo', 'deviceInfo']),
  actions,
)
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = () => ({
    tabBarLabel: i18n.t('tab.account'),
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

  onLoginPress = () => {
    this.props.navigation.navigate('pageLogin');
  };

  componentDidMount() {
    dispatch('SET_LOADING', { visible: true });
    dispatch('GET_COURSE_LIST', {
      page: 1,
      pageSize: 10,
      res: res => {},
    });
    dispatch('SET_LOADING', { visible: false });
  }

  render() {
    const { deviceInfo, userInfo } = this.props;
    const { sessionId } = userInfo;
    const { uniqueId, brand } = deviceInfo;
    this.info = [{ title: '设备唯一id', value: uniqueId }, { title: '手机品牌', value: brand }];
    return (
      <View style={styles.container}>
        {this.info.map((item, index) => (
          <View style={styles.item} key={item.title}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        ))}
        {!sessionId && (
          <LinearGradient style={styles.linear} colors={['#4c669f', '#3b5998', '#192f6a']}>
            <MyTouchable onPress={this.onLoginPress} style={styles.loginTouch}>
              <Text style={styles.loginText}>登陆</Text>
            </MyTouchable>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: UI.scaleSize(100),
    paddingHorizontal: UI.scaleSize(8),
  },
  icon: {
    width: UI.scaleSize(28),
    height: UI.scaleSize(28),
  },
  item: {
    height: UI.scaleSize(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: UI.scaleSize(16),
    color: '#6666',
    fontWeight: 'bold',
    lineHeight: UI.scaleSize(20),
  },
  linear: {
    position: 'absolute',
    left: (UI.size.deviceWidth - UI.scaleSize(140)) / 2,
    bottom: UI.scaleSize(200),
    width: UI.scaleSize(140),
    height: UI.scaleSize(60),
    borderRadius: UI.scaleSize(8),
  },
  loginTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: UI.scaleSize(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
    lineHeight: UI.scaleSize(20),
    letterSpacing: UI.scaleSize(4),
  },
});

export default Account;
