export type Token = {
  token: string;
  email: string;
  name: string;
};

export const saveTokenToLocalStore = (token: Token) => {
  return localStorage.setItem('sports', JSON.stringify(token));
};

export const getToken = () =>{
    const token = localStorage.getItem('sports')
    return token ? JSON.parse(token) : null
}

export const removeToken = () =>{
    localStorage.removeItem('sports');
}
