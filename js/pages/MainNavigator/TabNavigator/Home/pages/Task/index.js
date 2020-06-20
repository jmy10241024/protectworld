import React from 'react';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';

// import FastImage from 'react-native-fast-image';
import { useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { useNavigation } from 'react-navigation-hooks';

import UI from '~/modules/UI';
import MyTouchable from '~/components/my-touchable';
import NavigationHeader from '~/components/navigation-header-hook';
import { dispatch } from '~/modules/redux-app-config';

function Task() {
  // 路由
  const { goBack } = useNavigation();

  // 连接redux
  const hutHome = useSelector(state => state.hut.home, shallowEqual);

  // 定义state
  const [tip, updateTip] = useImmer({
    visible: false,
    left: UI.scaleSize(195),
  });

  // 点击事件更新state
  function onTipTouchPress() {
    updateTip(draft => {
      let newDraft = draft;
      newDraft.visible = false;
    });
  }

  return (
    <View style={styles.container}>
      <NavigationHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Task;
