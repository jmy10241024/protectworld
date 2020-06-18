import _ from 'lodash';

const defaultUser = {
  sessionid: '',
  account: {},
};

export const userInfo = {
  default: defaultUser,
  persist: true,
  actions: {
    UPDATE_USER: {
      reducer: (state, { payload }) => ({
        ...state,
        sessionid: payload.sessionid,
        account: _.cloneDeep(payload.account),
      }),
    },
    USER_LOGOUT_NOW: {
      reducer: () => defaultUser,
    },
  },
};
