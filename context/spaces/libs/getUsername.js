import { PREFIX } from '@/hooks/useLocalStorage';
import USERNAME_PREFIX_KEY from './usernamePrefixKey';

const getUsername = (user) => {
  const prefixedKey = PREFIX + USERNAME_PREFIX_KEY;
  const jsonValue = localStorage.getItem(prefixedKey);

  let currentUsername = '';

  if (user?.name) {
    currentUsername = user.name;
  } else if (jsonValue != null) {
    currentUsername = JSON.parse(jsonValue);
  } else {
    currentUsername = null;
  }

  localStorage.setItem(prefixedKey, JSON.stringify(currentUsername));

  return currentUsername;
};

export default getUsername;
