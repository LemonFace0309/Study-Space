const ROLES = {
  STUDENT: {
    value: 'Student',
    password: null,
  },
  TEACHER: {
    value: 'Teacher',
    password: '/api/spaces/check-password', // api route
  },
};

export default ROLES;
