import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste Requisito 3', () => {
  test('Teste se é exibido na tela a frase No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Teste se é exibido na tela a frase No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    const favorite = getByText('Pokémon favoritado?');
    userEvent.click(favorite);
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
