import { ERROR_API, REQUEST_API, SUCESS_API } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
      currencies: action.wallet,
    };
  case ERROR_API:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default expensesReducer;
