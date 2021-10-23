import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

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
    const randomName = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      style: 'capital',
      separator: ' ',
    });
    currentUsername = null; // may cause bug on reload
  }

  localStorage.setItem(prefixedKey, JSON.stringify(currentUsername));

  return currentUsername;
};

export default getUsername;
