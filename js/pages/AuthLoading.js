import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigation } from 'react-navigation-hooks';

function AuthLoadingScreen() {
  const { navigate } = useNavigation();
  const userInfo = useSelector(state => state.userInfo, shallowEqual);
  const { sessionid } = userInfo;
  if (sessionid) {
    navigate('main', { transition: 'forFade' });
  } else {
    navigate('pageLogin', { transition: 'forFade' });
  }
  // 强制登陆
  // useEffect(
  //   () => {
  //     if (user) {
  //       navigate('main', { transition: 'forFade' });
  //     } else {
  //       navigate('login', { transition: 'forFade' });
  //     }
  //   },
  //   [navigate, user, userInfo],
  // );
  // 非强制登陆

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
