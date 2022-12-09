import getCurrencies from '../../services/CurrenciesAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCESS_API = 'SUCESS_API';
export const ERROR_API = 'ERROR_API';

export const login = (data) => ({
  type: LOGIN,
  user: data,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const responseSUCESS = (data) => ({
  type: SUCESS_API,
  wallet: data,
});

export const responseERRO = (error) => ({
  type: ERROR_API,
  error,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestApi());

    try {
      const response = await getCurrencies();
      const newResponse = Object.keys(response).filter((c) => !c.includes('USDT'));
      dispatch(responseSUCESS(newResponse));
    } catch (error) {
      dispatch(responseERRO(error));
    }
  };
}
