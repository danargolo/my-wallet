import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpense, editExpense, sumCurrency } from '../redux/actions';

class Table extends Component {
  // state = {
  //   currency: '',
  //   description: '',
  //   exchangeRates: '',
  //   method: '',
  //   tag: '',
  //   value: '',
  // };

  deleteExpense = (exp) => {
    const { dispatch } = this.props;
    dispatch(delExpense(exp));
    dispatch(sumCurrency());
    // console.log(expenses[id]);
  };

  editExpense = (exp) => {
    const { dispatch } = this.props;
    // console.log(exp)
    const { value, description, currency, method, tag, exchangeRates, id } = exp;
    this.setState({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: (exchangeRates[currency].ask),
    }, () => dispatch(editExpense(this.state)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{ exp.description }</td>
              <td>{ exp.tag }</td>
              <td>{ exp.method }</td>
              <td>{ (+exp.value).toFixed(2) }</td>
              {/* <td>{ exp.exchangeRates[exp.currency].name }</td> */}
              {/* <td>{ (+exp.exchangeRates[exp.currency].ask).toFixed(2) }</td> */}
              <td>
                {/* { ((+exp.exchangeRates[exp.currency].ask) * (exp.value)).toFixed(2) } */}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editExpense(exp) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.deleteExpense(exp) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Table);
