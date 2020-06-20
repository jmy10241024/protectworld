import _ from 'lodash';

const defaultCourse = {
  courses: [],
  courseIds: [],
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
      reducer: (state, { payload }) => ({
        ...state,
        courseIds: _.cloneDeep(payload.courseIds),
      }),
    },
  },
};
