import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from 'react-navigation-hooks';
import { useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { Toast } from 'teaset';

import actions, { dispatch } from '~/modules/redux-app-config';
import UI from '~/modules/UI';
import i18n from '~/i18n';
import NavigationHeader from '~/components/navigation-header-hook';

const logoImg = require('./img/logo.png');

function PageLogin() {
  const { navigate, goBack } = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUserNameChanged = text => {
    setUsername(text);
  };

  const onPasswordChanged = text => {
    setPassword(text);
  };

  const login = () => {
    Keyboard.dismiss();
    if (username.length !== 11) {
      Toast.fail('账号为11位手机号');
      return;
    }
    if (!password.length) {
      Toast.fail('请输入密码');
      return;
    }
    dispatch('SET_LOADING', { visible: true });
    dispatch('USER_LOGIN', {
      username,
      password,
      res: res => {
        if (res) {
          if (res.ret === 1) {
            goBack();
          }
          Toast.success(res.tip);
        }
      },
    });
    dispatch('SET_LOADING', { visible: false });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={-UI.scaleSize(110) - UI.size.statusBarHeight - UI.scaleSize(20)}
      >
        <View style={{ paddingBottom: UI.scaleSize(110) }} />
        <Image source={logoImg} style={styles.logoImg} />
        <TextInput
          style={styles.email}
          placeholder={i18n.t('login.email')}
          placeholderTextColor={UI.color.text3}
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={11}
          onChangeText={onUserNameChanged}
        />
        <TextInput
          style={styles.password}
          placeholder={i18n.t('login.password')}
          placeholderTextColor={UI.color.text3}
          // keyboardType="email-address"
          autoCorrect={false}
          secureTextEntry
          onChangeText={onPasswordChanged}
        />
        <TouchableOpacity onPress={login} style={styles.btnView} activeOpacity={1}>
          <Text style={styles.loginText}>{i18n.t('login.login')}</Text>
        </TouchableOpacity>
        <NavigationHeader />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logoImg: {
    width: UI.scaleSize(100),
    height: UI.scaleSize(100),
    alignSelf: 'center',
  },
  email: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    marginTop: UI.scaleSize(44),
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: UI.scaleSize(10),
    paddingHorizontal: UI.scaleSize(20),
  },
  password: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    marginTop: UI.scaleSize(15),
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: UI.scaleSize(10),
    paddingHorizontal: UI.scaleSize(20),
  },
  btnView: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UI.color.primary,
    borderRadius: UI.scaleSize(10),
    marginTop: UI.scaleSize(15),
  },
  loginText: {
    fontSize: UI.scaleSize(24),
    fontWeight: 'bold',
    color: UI.color.white,
  },
});

export default PageLogin;
