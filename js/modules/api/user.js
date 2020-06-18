/** 用户相关接口 */
import Config from 'react-native-config';
import request from '~/modules/services/request';
import { store } from '~/modules/redux-app-config';
import { getHeader, filterUrl, getSessionId } from '~/modules/services/utils';

const { API_URL } = Config;

// 登录
async function login(params) {
  let newParams = params;
  // newParams.sessionid = getSessionId(store);
  newParams.remember = 'true';
  newParams.isShowMessage = 'true';
  newParams.phoneOnlyCode =
    '{"name":"HUAWEIHMA-AL00","uuid":"76216087cdc7fe2f","systemVersion":"10","systemName":"Android"}';

  const url = filterUrl(newParams);
  return request(`${API_URL}/account/app/login?${url}`, {
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
  login,
  logout,
};
