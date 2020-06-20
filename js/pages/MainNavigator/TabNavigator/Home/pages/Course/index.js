import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

// import FastImage from 'react-native-fast-image';
import { useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { useNavigation } from 'react-navigation-hooks';
import { Toast } from 'teaset';

import UI from '~/modules/UI';
import MyTouchable from '~/components/my-touchable';
import NavigationHeader from '~/components/navigation-header-hook';
import { dispatch } from '~/modules/redux-app-config';

function Course() {
  // 路由
  const { goBack } = useNavigation();

  // 连接redux
  const courses = useSelector(state => state.course.courses, shallowEqual);

  // 定义state
  const [tip, updateTip] = useImmer({
    visible: false,
    left: UI.scaleSize(195),
  });

  const getStateName = studyState => {
    let state = '';
    if (studyState === 0) {
      state = '未学习';
    } else if (studyState === 1) {
      state = '学习中';
    } else {
      state = '已完成';
    }
    return state;
  };

  useEffect(() => {
    dispatch('SET_LOADING', { visible: true });
    dispatch('GET_COURSE_LIST', {
      page: 1,
      pageSize: 10,
      res: res => {},
    });
    dispatch('SET_LOADING', { visible: false });
  }, []);

  // 点击事件更新state
  function onTipTouchPress() {
    updateTip(draft => {
      let newDraft = draft;
      newDraft.visible = false;
    });
  }

  const onItemPress = item => {
    const { id, coursewareId } = item;
    dispatch('COURSE_START', {
      businessId: id,
      coursewareId: coursewareId,
      businessType: 6,
      coursewareType: 3,
      res: res => {
        if (res) {
          Toast.smile(res.tip);
        }
      },
    });
  };

  if (_.isEmpty(courses)) {
    <View style={styles.container}>
      <NavigationHeader />
    </View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ScrollView style={styles.main}>
          {courses.map((item, index) => {
            const arr = _.toArray(item);
            return (
              <MyTouchable onPress={() => onItemPress(item)} key={arr[0]} style={styles.item}>
                {arr.map((itemSub, indexSub) => (
                  <Text key={`${itemSub}${indexSub}`} style={styles.text}>
                    {`${indexSub === 5 ? getStateName(itemSub) : itemSub}`}
                  </Text>
                ))}
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

export default Course;
