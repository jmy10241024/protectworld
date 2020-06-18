import { Alert } from 'react-native';
import { dispatch, store } from '~/modules/redux-app-config';
import Config from 'react-native-config';

function checkStatus(response) {
  console.log(' ============ response ============ ', response);
  if (response.code === 401) {
  }
  return response;
}

function checkNet() {
  return store.getState().netInfoStatus.status;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let newUrl = url;
  const status = checkNet();
  if (!status) {
    return new Promise(res => {
      Alert.alert('请检查网络');
      res({ msg: 'fail' });
    });
  }
  if (!newUrl.startsWith('http')) {
    newUrl = Config.API_URL + newUrl;
  }
  const defaultOptions = {};
  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    Connection: 'close',
    type: 'getUserData',
    'Content-Type': 'application/json; charset=utf-8',
    ...newOptions.headers,
  };

  console.log(' ============ request ============ ', { url, newOptions });
  return Promise.race([
    fetch(newUrl, newOptions),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request Timeout'));
      }, 10000);
    }),
  ])
    .then(response => response.json())
    .then(checkStatus)
    .catch(e => {
      if (e.toString() === 'Error: Request Timeout') {
        Alert.alert('请求超时');
      }
    });
}
