import {
  ERROR_API,
  REQUEST_API,
  SUCESS_API,
  SAVE_EXPENSES,
  SUM_CURRENCY,
  DELETE_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  sumCurrency: '0,00',
  teste: [],
};

const sum = ({ expenses }) => {
  const empty = 0;
  if (expenses.length === empty) {
    return empty.toFixed(2);
  }
  const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
    const conversion = exchangeRates[currency].ask * value;
    return acc + conversion;
  }, 0);
  return total.toFixed(2);
};

const deleteEx = (stateExpenses, payload) => (stateExpenses.filter((extende) => (
  extende.description !== payload.description
  || extende.value !== payload.value)));

const expensesReducer = (state = INITIAL_STATE, action) => {
  // console.log(action.wallet);
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case SUCESS_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ERROR_API:
    return {
      ...state,
      error: action.error,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case SUM_CURRENCY:
    return {
      ...state,
      sumCurrency: sum(state),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: deleteEx(state.expenses, action.payload),
    };
  default:
    return state;
  }
};

export default expensesReducer;
