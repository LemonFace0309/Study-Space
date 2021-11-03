const ROLES = {
  STUDENT: {
    value: 'Student',
    password: null,
  },
  TEACHER: {
    value: 'Teacher',
    password: '/api/spaces/check-password', // api route
  },
  ADMIN: {
    value: 'Admin',
    password: '/api/spaces/check-password',
  },
};

export default ROLES;
