const getCookie = (cookies, name) => {
  const ca = cookies.split('; ');
  for (let cookie of ca) {
    const [cName, cValue] = cookie.split('=');
    if (cName === name) {
      console.debug('value:', cValue);
      return cValue;
    }
  }
  return null;
};

export default getCookie;
