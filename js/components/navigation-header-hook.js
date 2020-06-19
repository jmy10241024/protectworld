import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from 'react-navigation-hooks';

import UI from '~/modules/UI';
import MyTouchable from '~/components/my-touchable';

function NavigationHeader() {
  const { goBack } = useNavigation();

  return (
    <MyTouchable delay={0} onPress={goBack} style={styles.container}>
      <Text>返回</Text>
    </MyTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: UI.scaleSize(10),
    top: UI.scaleSize(40),
    width: UI.scaleSize(40),
    height: UI.scaleSize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavigationHeader;
