/** 课程相关接口 */
import Config from 'react-native-config';
import request from '~/modules/services/request';
import { store } from '~/modules/redux-app-config';
import { getHeader, filterUrl, getSessionId } from '~/modules/services/utils';

const { API_URL } = Config;

// 课件列表
async function courseList(params) {
  let newParams = params;
  newParams.sessionid = getSessionId(store);
  console.log('getSessionId(store): ', getSessionId(store));
  const url = filterUrl(newParams);
  return request(`${API_URL}/mobile/courseware/query/onlinecourseware/list?${url}`, {
    method: 'GET',
  });
}

// 开始课程1
async function courseStart(params) {
  let newParams = params;
  newParams.sessionid = getSessionId(store);
  const url = filterUrl(newParams);
  return request(`${API_URL}/mobile/courseware/start/study?${url}`, {
    method: 'POST',
  });
}

async function logout(params) {
  return request('/user/logout', {
    method: 'POST',
    body: params,
    headers: getHeader(store),
  });
}

module.exports = {
  courseList,
  courseStart,
  logout,
};
