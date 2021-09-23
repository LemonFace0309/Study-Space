import { atom } from 'recoil';

export const session = atom({
  key: 'user-session',
  default: null,
});

export const user = atom({
  key: 'user-user',
  default: null,
});
