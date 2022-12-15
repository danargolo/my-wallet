import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const VALUE_INPUT = 'value-input';
const DESCRIPTION_INPUT = 'description-input';

describe('Teste do componente Wallet', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se os inputs são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_INPUT);
    expect(value).toBeInTheDocument();

    const description = screen.getByTestId(DESCRIPTION_INPUT);
    expect(description).toBeInTheDocument();

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
  });
  it('Verifica se API é chamada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const option = await screen.findByRole('option', {
      name: 'USD',
    });

    expect(option).toBeInTheDocument();
  });
  it('Verifica se Adicionar e Deletar despesa funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const addBtn = screen.getByRole('button', {
      name: /Adicionar despesa/i,
    });
    const value = screen.getByTestId(VALUE_INPUT);
    const description = screen.getByTestId(DESCRIPTION_INPUT);

    userEvent.type(value, '100');
    userEvent.type(description, 'teste');

    userEvent.click(addBtn);

    const tableValue = await screen.findByRole('cell', {
      name: '100.00',
    });
    const tableDescription = await screen.findByRole('cell', {
      name: 'teste',
    });
    const tableCurrency = await screen.findByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    const tableTag = await screen.findByRole('cell', {
      name: /alimentação/i,
    });
    const tableMethod = await screen.findByRole('cell', {
      name: /dinheiro/i,
    });
    const tableAsk = await screen.findByRole('cell', {
      name: /4\.75/i,
    });

    expect(tableValue).toBeInTheDocument();
    expect(tableDescription).toBeInTheDocument();
    expect(tableCurrency).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableAsk).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: /excluir/i,
    });
    userEvent.click(deleteBtn);

    expect(tableValue).not.toBeInTheDocument();
    expect(tableDescription).not.toBeInTheDocument();
    expect(tableCurrency).not.toBeInTheDocument();
    expect(tableTag).not.toBeInTheDocument();
    expect(tableMethod).not.toBeInTheDocument();
    expect(tableAsk).not.toBeInTheDocument();
  });
  it('Verifica se Editar a despesa funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />);

    const addBtn = screen.getByRole('button', {
      name: /Adicionar despesa/i,
    });
    const value = screen.getByTestId(VALUE_INPUT);
    const description = screen.getByTestId(DESCRIPTION_INPUT);

    userEvent.type(value, '100');
    userEvent.type(description, 'teste');

    userEvent.click(addBtn);

    const tableValue = await screen.findByRole('cell', {
      name: '100.00',
    });
    const tableDescription = await screen.findByRole('cell', {
      name: 'teste',
    });
    const tableCurrency = await screen.findByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    const tableTag = await screen.findByRole('cell', {
      name: /alimentação/i,
    });
    const tableMethod = await screen.findByRole('cell', {
      name: /dinheiro/i,
    });
    const tableAsk = await screen.findByRole('cell', {
      name: /4\.75/i,
    });

    expect(tableValue).toBeInTheDocument();
    expect(tableDescription).toBeInTheDocument();
    expect(tableCurrency).toBeInTheDocument();
    expect(tableTag).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableAsk).toBeInTheDocument();

    const editBtn = screen.getByRole('button', {
      name: /editar/i,
    });
    userEvent.click(editBtn);
    userEvent.type(value, '33');
    userEvent.type(description, 'testeDeEdição');

    const changeBtn = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    userEvent.click(changeBtn);

    const editValue = await screen.findByRole('cell', {
      name: '33.00',
    });
    const editDescription = await screen.findByRole('cell', {
      name: 'testeDeEdição',
    });
    const editCurrency = await screen.findByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    const editTag = await screen.findByRole('cell', {
      name: /alimentação/i,
    });
    const editMethod = await screen.findByRole('cell', {
      name: /dinheiro/i,
    });
    const editAsk = await screen.findByRole('cell', {
      name: /4\.75/i,
    });

    expect(editValue).toBeInTheDocument();
    expect(editDescription).toBeInTheDocument();
    expect(editCurrency).toBeInTheDocument();
    expect(editTag).toBeInTheDocument();
    expect(editMethod).toBeInTheDocument();
    expect(editAsk).toBeInTheDocument();
  });
});
