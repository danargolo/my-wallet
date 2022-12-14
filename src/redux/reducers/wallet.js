import {
  ERROR_API,
  REQUEST_API,
  SUCESS_API,
  SAVE_EXPENSES,
  SUM_CURRENCY,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  sumCurrency: '0,00',
};

const sum = ({ expenses }) => {
  console.log(expenses.length);
  const empty = 0;
  if (expenses.length === empty) {
    return;
  }
  const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
    const conversion = exchangeRates[currency].ask * value;
    return acc + conversion;
  }, 0);
  return total.toFixed(2)
};

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
  default:
    return state;
  }
};

export default expensesReducer;
