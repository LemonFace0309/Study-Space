import { atom, selector } from 'recoil';

export const firstName = atom({
  key: 'auth-firstName',
  default: '',
});

export const lastName = atom({
  key: 'auth-lastName',
  default: '',
});

export const email = atom({
  key: 'auth-email',
  default: '',
});

export const password = atom({
  key: 'auth-password',
  default: '',
});

export const submitted = atom({
  key: 'auth-submitted',
  default: false,
});

export const validFirstName = selector({
  key: 'auth-validFirstName',
  get: ({ get }) => /^[a-z ,.'-]+$/i.test(get(firstName)),
});

export const validLastName = selector({
  key: 'auth-validLastName',
  get: ({ get }) => /^[a-z ,.'-]+$/i.test(get(lastName)),
});

export const validEmail = selector({
  key: 'auth-validEmail',
  get: ({ get }) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      get(email)
    ),
});

export const validPassword = selector({
  key: 'auth-validPassword',
  get: ({ get }) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      get(password)
    ),
});

export const validSignUp = selector({
  key: 'auth-validSignUp',
  get: ({ get }) =>
    get(validFirstName) &&
    get(validLastName) &&
    get(validEmail) &&
    get(validPassword),
});

export const validLogIn = selector({
  key: 'auth-validLogIn',
  get: ({ get }) => get(validEmail),
});

export const resetAll = selector({
  key: 'auth-resetAll',
  get: ({ get }) => ({
    firstName: get(firstName),
    lastName: get(lastName),
    email: get(email),
    password: get(password),
    submitted: get(submitted),
  }),
  set: ({ reset }) => {
    reset(firstName);
    reset(lastName);
    reset(email);
    reset(password);
    reset(submitted);
  },
});
