import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  validateForms = () => {
    const { email, password } = this.state;
    const regex = /^[a-z0-9._+-]+@[a-z0-9]+\.[a-z]+(\.[a-z]{2,4})?$/i;
    const emailValidation = regex.test(email);

    const passwordLength = 6;
    const passwordValidation = password.length >= passwordLength;

    if (emailValidation && passwordValidation) {
      return this.setState({ isButtonDisabled: false });
    }
    return this.setState({ isButtonDisabled: true });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.type]: target.value }, () => {
      this.validateForms();
    });
  };

  render() {
    const { email, isButtonDisabled } = this.state;
    const { dispatch } = this.props;
    return (
      <>
        <div>Login</div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <Link
            to="/carteira"
          >
            <button
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ () => {
                dispatch(login(email));
              } }
            >
              Entrar
            </button>
          </Link>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
