import React from 'react';
import { StyleSheet, ImageBackground, Text, View, ScrollView } from 'react-native';

// import FastImage from 'react-native-fast-image';
import { useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import { Toast } from 'teaset';
import { useNavigation } from 'react-navigation-hooks';

import UI from '~/modules/UI';
import MyTouchable from '~/components/my-touchable';
import NavigationHeader from '~/components/navigation-header-hook';
import { dispatch } from '~/modules/redux-app-config';

function Task() {
  // 路由
  const { goBack } = useNavigation();

  // 连接redux
  const tasks = useSelector(state => state.course.tasks, shallowEqual);

  if (_.isEmpty(tasks)) {
    return (
      <View style={styles.container}>
        <NavigationHeader />
      </View>
    );
  }

  const onItemPress = item => {
    const { id, time } = item;
    dispatch('SET_LOADING', { visible: true });
    dispatch('COURSE_END', {
      id,
      res: res => {
        if (res) {
          if (res.ret === 1) {
            dispatch('DELETE_COURSE_ID', {
              id,
            });
          }
          Toast.smile(res.tip);
        }
      },
    });
    dispatch('SET_LOADING', { visible: false });
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ScrollView style={styles.main}>
          {tasks.map((item, index) => {
            return (
              <MyTouchable key={item.id} onPress={() => onItemPress(item)} style={styles.item}>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.text}>{item.time}</Text>
                <Text style={styles.text}>{item.name || ''}</Text>
              </MyTouchable>
            );
          })}
        </ScrollView>
        <View height={10} />
      </View>
      <NavigationHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: UI.scaleSize(80),
    paddingHorizontal: UI.scaleSize(8),
  },
  main: {
    flex: 1,
  },
  item: {
    // alignItems: 'center',
    paddingHorizontal: UI.scaleSize(16),
    shadowColor: UI.color.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
    marginTop: UI.scaleSize(20),
    borderWidth: UI.scaleSize(2),
    borderColor: '#0f0',
  },
  text: {
    fontSize: UI.scaleSize(18),
    color: '#000',
    fontWeight: 'bold',
    lineHeight: UI.scaleSize(20),
    letterSpacing: UI.scaleSize(2),
  },
});

export default Task;
