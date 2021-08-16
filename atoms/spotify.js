import { atom } from 'recoil';

/**
 * default property shape: {
    expiresIn: null, // in milliseconds
    expireDate: null,
    refreshDate: null,
  }
 */
export const refresh = atom({
  key: 'spotify-refresh',
  default: null,
});
