import Cookies from 'js-cookie';

export type Token = {
  token: string;
  email: string;
  name: string;
  role: string;
};

export const saveToken = (token: Token) => {
  Cookies.set('token', JSON.stringify(token));
};

export const getToken = () => {
  const tokenObj = Cookies.get('token');
  let token;
  if (tokenObj) {
    token = JSON.parse(tokenObj);
  }
  return token ? token : null;
};

export const removeToken = () => {
  Cookies.remove('token');
};
