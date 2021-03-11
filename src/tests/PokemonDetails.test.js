import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes no componente Pokémon  Details', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { getByTestId, getByRole, getByText } = renderWithRouter(<App />);
      const nomePokemon = getByTestId('pokemon-name');
      expect(nomePokemon).toBeInTheDocument();
      const titulo = getByRole('heading', { level: 2, name: 'Summary' });
      expect(titulo).toBeInTheDocument();
      const paragrafo = getByText(pokemons[0].summary);
      expect(paragrafo).toBeInTheDocument();
    });
});
