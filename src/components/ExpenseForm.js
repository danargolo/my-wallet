import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Expense extends Component {
  state = {
    id: 0, 
    type: "expense",
  }

  render() {
    const categories = ['Alimentação', 'Moradia', 'Lazer', 'Saúde', 'Outros'];
    const types = ['Pix', 'Dinheiro', 'Cartão de Crédito', 'Débito em Conta', 'Outros'];

    return (
      <>
        <form className="incomming_form">
          <input type="date" />
          <input type="number" placeholder="R$ 0.0" step="0.1" min="0" />
          <select name="categories">
            <option defaultValue>Selecione a Opção</option>
            {categories.map((c, i) => (
              <option value={ c } key={ i }>{c}</option>
            ))}
          </select>
          <input type="text" maxLength={ 30 } />
          <select name="types">
            <option defaultValue>Selecione a Opção</option>
            {types.map((t, i) => (
              <option value={ t } key={ i }>{t}</option>
            ))}
          </select>
        </form>
        <button type="button">Adicionar Despesa</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.wallet,
});

Expense.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editExpense: PropTypes.shape({
      value: PropTypes.string,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    editor: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Expense);
