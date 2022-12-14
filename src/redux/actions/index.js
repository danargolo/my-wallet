import getCurrencies from '../../services/CurrenciesAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCESS_API = 'SUCESS_API';
export const ERROR_API = 'ERROR_API';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SUM_CURRENCY = 'SUM_CURRENCY';

export const login = (data) => ({
  type: LOGIN,
  user: data,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const responseSUCESS = (data) => ({
  type: SUCESS_API,
  currencies: data,
});

export const responseERRO = (error) => ({
  type: ERROR_API,
  error,
});

export const saveExpenses = (data) => ({
  type: SAVE_EXPENSES,
  expenses: data,
});

export const sumCurrency = () => ({
  type: SUM_CURRENCY,
});

export function fetchAPI() {
  return async (dispatch) => {
    dispatch(requestApi());

    try {
      const response = await getCurrencies();
      // console.log(response);
      const newResponse = Object.keys(response);
      dispatch(responseSUCESS(newResponse));
    } catch (error) {
      dispatch(responseERRO(error));
    }
  };
}
