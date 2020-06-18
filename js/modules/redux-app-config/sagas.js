import { Image, Alert } from 'react-native';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import api from '~/modules/api';

export function* userLogin(actions) {
  const { payload = {} } = actions;
  const res = yield call(api.login, payload);
  console.log('====......res: ', res);

  if (res && res.ret === 1) {
    yield put({ type: 'UPDATE_USER', payload: { sessionid: res.sessionid, account: res.account } });
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

export default function* rootSaga() {
  yield all([takeEvery('USER_LOGIN', userLogin), takeEvery('USER_LOGOUT', userLogout)]);
}
