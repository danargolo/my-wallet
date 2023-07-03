import {
  SUCESS_API,
  SAVE,
  SUM_CURRENCY,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  CHANGE_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  save:[],
  editor: false,
  idToEdit: 0,
  sumCurrency: '0,00',
  editExpense: {
    currency: '',
    description: '',
    exchangeRates: '',
    method: '',
    tag: '',
    value: '',
  },
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
  switch (action.type) {
  case SUCESS_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE:
    return {
      ...state,
      save: [...state.save, action.save],
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
  case EDIT_EXPENSE:
    return {
      ...state,
      editExpense: action.payload,
      editor: !state.editor,
    };
  case CHANGE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((exp) => {
        if (state.editExpense.id === exp.id) {
          return {
            ...exp,
            value: action.payload.value,
            currency: action.payload.currency,
            method: action.payload.method,
            tag: action.payload.tag,
            description: action.payload.description,
          };
        }
        return exp;
      }),
      editor: !state.editor,
    };
  default:
    return state;
  }
};

export default expensesReducer;
