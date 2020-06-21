import _ from 'lodash';

const defaultCourse = {
  courses: [],
  tasks: [],
};

export const course = {
  default: defaultCourse,
  persist: true,
  actions: {
    UPDATE_COURSES: {
      reducer: (state, { payload }) => ({
        ...state,
        courses: _.cloneDeep(payload.courses),
      }),
    },
    UPDATE_COURSE_IDS: {
      reducer: (state, { payload }) => {
        return {
          ...state,
          tasks: _.concat(state.tasks, payload),
        };
      },
    },
    DELETE_COURSE_ID: {
      reducer: (state, { payload }) => {
        return {
          ...state,
          tasks: _.dropWhile(state.tasks, item => item.id === payload.id),
        };
      },
    },
  },
};
