import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpenses, sumCurrency } from '../redux/actions';
import getCurrencies from '../services/CurrenciesAPI';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
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
    const response = await getCurrencies();

    this.setState({
      exchangeRates: response,
    }, () => {
      const { dispatch } = this.props;
      dispatch(saveExpenses(this.state));
      this.resetState();
      dispatch(sumCurrency());
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { state } = this.props;

    return (
      <div>
        <input
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
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
