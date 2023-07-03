import getCurrencies from '../../services/CurrenciesAPI';

export const LOGIN = 'LOGIN';
export const SUCESS_API = 'SUCESS_API';
export const SAVE = 'SAVE';
export const SUM_CURRENCY = 'SUM_CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

export const login = (data) => ({
  type: LOGIN,
  user: data,
});

export const responseSUCESS = (data) => ({
  type: SUCESS_API,
  currencies: data,
});

export const saveExpenses = (data) => ({
  type: SAVE,
  save: data,
});

export const sumCurrency = () => ({
  type: SUM_CURRENCY,
});

export const delExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const changeExpense = (payload) => ({
  type: CHANGE_EXPENSE,
  payload,
});

// export function fetchAPI() {
//   return async (dispatch) => {
//     try {
//       const response = await getCurrencies();
//       const newResponse = Object.keys(response);
//       dispatch(responseSUCESS(newResponse));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
