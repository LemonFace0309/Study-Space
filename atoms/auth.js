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

export const username = atom({
  key: 'auth-username',
  default: '',
});

export const phoneNumber = atom({
  key: 'auth-phoneNumber',
  default: '',
});

export const password = atom({
  key: 'auth-password',
  default: '',
});

export const newPassword = atom({
  key: 'auth-newPassword',
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

export const validUsername = selector({
  key: 'auth-validUsername',
  get: ({ get }) =>
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
      get(username)
    ),
});

export const validPhoneNumber = selector({
  key: 'auth-validPhoneNumber',
  get: ({ get }) =>
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
      get(phoneNumber)
    ),
});

export const sanitizedPhoneNumber = selector({
  key: 'auth-sanitizedPhoneNumber',
  get: ({ get }) => ('' + get(phoneNumber)).replace(/\D/g, ''),
});

export const validPassword = selector({
  key: 'auth-validPassword',
  get: ({ get }) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      get(password)
    ),
});

export const validNewPassword = selector({
  key: 'auth-validNewPassword',
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
    reset(username);
    reset(phoneNumber);
    reset(password);
    reset(newPassword);
    reset(submitted);
  },
});
