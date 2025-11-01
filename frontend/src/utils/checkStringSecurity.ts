const regExp = new RegExp(
  '^[0-9A-Za-zА-Яа-яЁё:;_=,"\\.\\?\\-\\+\\*\\(\\)\\/\\\\\\n\\r\\t ]+$',
);

const checkStringSecurity = (s: string): boolean => {
  if (regExp.test(s)) {
    return true;
  }
  return false;
};

export default checkStringSecurity;
