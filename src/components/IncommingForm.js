import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeExpense,  saveExpenses, sumCurrency } from '../redux/actions';

class Income extends Component {
  state = {
    id: 0, 
    type: "income",
  }
  constructor() {
    super();
    // this.handle = new WalletForm();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const categories = ['Salário', 'Freelancer', 'Venda de Produto', 'Aposta', 'Outros'];
    const types = ['Pix', 'Dinheiro', 'Crédito Salário', 'Transferência Bancária', 'Outros'];

    return (
      <>
        <form className="income_form">
          <input type="date" name="date" onChange={ this.handleChange } />
          <input type="number" name="value" placeholder="R$ 0.0" step="0.1" min="0" onChange={ this.handleChange } />
          <select name="categories" onChange={ this.handleChange }>
            <option defaultValue>Selecione a Opção</option>
            {categories.map((c, i) => (
              <option value={ c } key={ i }>{c}</option>
            ))}
          </select>
          <input type="text" name="description" maxLength={ 30 } onChange={ this.handleChange } />
          <select name="types" onChange={ this.handleChange }>
            <option defaultValue>Selecione a Opção</option>
            {types.map((t, i) => (
              <option value={ t } key={ i }>{t}</option>
            ))}
          </select>
        </form>
        <button type="button" onClick={ () => this.props.dispatch(saveExpenses(this.state)) }>Adicionar Receita</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.wallet,
});

Income.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editExpense: PropTypes.shape({
      value: PropTypes.string,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    editor: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Income);

