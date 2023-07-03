import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { changeExpense, fetchAPI, saveExpenses, sumCurrency } from '../redux/actions';
import getCurrencies from '../services/CurrenciesAPI';
import '../styles/form.css';
import Income from './IncommingForm';
import Expense from './ExpenseForm';


export class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    finance: true,
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    // if (target.name === 'value') {
    //   this.setState({
    //     [target.name]: parseFloat(target.value),
    //   })
    // }
    this.setState({
      [target.name]: target.value,
    });
  };

  resetState = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1, // ou sem arrow e id: this.state.id + 1
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  handleClick = async () => {
    // const response = await getCurrencies();
    const { dispatch } = this.props;
    dispatch(saveExpenses(this.state));
    this.resetState();
    dispatch(sumCurrency());

    // this.setState({
    //   exchangeRates: response,
    // }, () => {
    // });
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    dispatch(changeExpense(this.state));
    this.resetState();
    dispatch(sumCurrency());
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      finance } = this.state;

    const { state } = this.props;
    // const { editor, editExpense } = state;

    return (
      <aside className="form">

        <section className="input_selectors">
          <ToggleButtonGroup
            className="mb-2"
            type="radio"
            value={ ['Entrada', 'Saída'] }
            name="radio_inputs"
          >
            <ToggleButton
              className="teste3"
              type="radio"
              id="radio_incomming"
              variant="success"
              checked
              onClick={ () => this.setState({ finance: true }) }
              value="Entrada"
            >
              Receita
            </ToggleButton>
            <ToggleButton
              type="radio"
              id="radio_expense"
              variant="danger"
              onClick={ () => this.setState({ finance: false }) }
              value="Saída"
            >
              Despesa
            </ToggleButton>
          </ToggleButtonGroup>
        </section>
        { finance ? <Income /> : <Expense />}
        {/* <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {state.currencies.map((n, index) => (
            <option
              key={ `${n}${index}` }
              value={ n }
            >
              {n}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>

        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        { editor ? (
          <button
            type="button"
            onClick={ () => this.handleEdit(editExpense) }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        )} */}
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editExpense: PropTypes.shape({
      value: PropTypes.string,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    editor: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
