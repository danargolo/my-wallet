import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Teste do componente Login', () => {
  it('Verifica se componente é renderizado no path correto', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    expect(history.location.pathname).toBe('/');
  });
  it('Verifica se o campo Login é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const labelEmail = screen.getByText(/email/i);

    // expect(email).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });
  it('Verifica se o campo Password é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const labelPassword = screen.getByText(/password/i);

    expect(labelPassword).toBeInTheDocument();
  });
  it('Verifica se o botão "Entrar" é renderizado', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeInTheDocument();
  });
  it('Verifica se o botão "Entrar" renderiza inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeDisabled();
  });
  it('Verifica se o botão é habilitado ao ser cumprido os requisitos dos inputs', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    userEvent.type(email, 'teste@test.com');
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).not.toBeDisabled();
  });
  it('Verifica se o botão é habilitado ao ser cumprido os requisitos dos inputs', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    userEvent.type(email, 'teste@test.com');
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
