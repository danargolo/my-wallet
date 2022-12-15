import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, sumCurrency } = this.props;
    return (
      <div>
        <div>TrybeWallet</div>
        <p
          data-testid="email-field"
        >
          { `Email: ${email}` }
        </p>
        <p
          data-testid="total-field"
        >
          { sumCurrency }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  sumCurrency: state.wallet.sumCurrency,

});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sumCurrency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
