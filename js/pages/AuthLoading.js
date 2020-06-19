import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';

import { useNavigation } from 'react-navigation-hooks';
import { dispatch } from '~/modules/redux-app-config';

function AuthLoadingScreen() {
  const { navigate } = useNavigation();
  const userInfo = useSelector(state => state.userInfo, shallowEqual);
  const { username, password } = userInfo;
  useEffect(
    () => {
      if (username) {
        dispatch('USER_LOGIN', {
          username,
          password,
          res: res => {},
        });
      }
      navigate('main', { transition: 'forFade' });
    },
    [navigate, password, username],
  );

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
