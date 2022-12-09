import { combineReducers } from 'redux';
import userReducer from './user';
import expensesReducer from './wallet';

const rootReducer = combineReducers({
  user: userReducer,
  wallet: expensesReducer,
});

export default rootReducer;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
