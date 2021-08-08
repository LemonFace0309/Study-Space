const getCookie = (cookies, name) => {
  let value = null;

  const ca = cookies.split('; ');
  ca.forEach((cookie) => {
    const [cName, cValue] = cookie.split('=');
    if (cName === name) value = cValue;
  });
  return value;
};

export default getCookie;
