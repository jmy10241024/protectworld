import { Image, Alert } from 'react-native';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import 'dayjs';

import api from '~/modules/api';
import dayjs from 'dayjs';

export function* userLogin(actions) {
  const { payload = {} } = actions;
  const { username, password } = payload;
  const res = yield call(api.login, payload);
  if (res && res.ret === 1) {
    yield put({
      type: 'UPDATE_USER',
      payload: { sessionid: res.sessionid, account: res.account, username, password },
    });
  }
  payload.res && payload.res(res);
}

// 用户退出登录
export function* userLogout(actions) {
  const { payload = {} } = actions;
  const res = yield call(api.logout, payload);
  if (res && res.msg === 'Success') {
    yield put({ type: 'UPDATE_USER', payload: { user: res.result } });
  }
  payload.res && payload.res(res);
}

// 课程列表
export function* courseList(actions) {
  const { payload = {} } = actions;
  const res = yield call(api.courseList, payload);
  if (res && res.ret === 1) {
    yield put({
      type: 'UPDATE_COURSES',
      payload: { courses: res.data },
    });
  }
  payload.res && payload.res(res);
}

// 课程开始
export function* courseStart(actions) {
  const { payload = {} } = actions;
  const { name } = payload;
  const res = yield call(api.courseStart, payload);
  if (res && res.ret === 1) {
    yield put({
      type: 'UPDATE_COURSE_IDS',
      payload: {
        id: res.data.id,
        time: dayjs().format('YYYY.MM.DD HH:mm:ss'),
        name,
      },
    });
  }
  payload.res && payload.res(res);
}

// 课程暂停
export function* courseEnd(actions) {
  const { payload = {} } = actions;
  const res = yield call(api.courseEnd, payload);
  payload.res && payload.res(res);
}

export default function* rootSaga() {
  yield all([
    takeEvery('GET_COURSE_LIST', courseList),

    takeEvery('COURSE_START', courseStart),
    takeEvery('COURSE_END', courseEnd),
    takeEvery('USER_LOGIN', userLogin),
    takeEvery('USER_LOGOUT', userLogout),
  ]);
}
