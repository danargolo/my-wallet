export const LOGIN = 'LOGIN';

export const login = (data) => {
  console.log('Action login');
  return {
    type: LOGIN,
    user: data,
  };
};
