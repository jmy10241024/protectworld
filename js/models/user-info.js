import _ from 'lodash';

const defaultUser = {
  sessionId: '',
  account: {},
  username: '',
  password: '',
};

export const userInfo = {
  default: defaultUser,
  persist: true,
  actions: {
    UPDATE_USER: {
      reducer: (state, { payload }) => ({
        ...state,
        sessionId: payload.sessionid,
        username: payload.username,
        password: payload.password,
        account: _.cloneDeep(payload.account),
      }),
    },
    USER_LOGOUT_NOW: {
      reducer: () => defaultUser,
    },
  },
};
