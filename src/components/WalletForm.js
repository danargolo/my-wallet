import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { state } = this.props;

    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
        />
        <input
          type="text"
          data-testid="description-input"
        />
        <select
          data-testid="currency-input"
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
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>

        </select>
        <select
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
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
