import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente App.js', () => {
  it('Teste para verificar se o componente renderiza', () => {
    const { getByText } = renderWithRouter(<App />);
    const textOnScreen = getByText(/Pokédex/i);
    expect(textOnScreen).toBeInTheDocument();
  });

  it('Teste se os Botões renderizam corretamente', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeButton = getByText(/Home/i);
    const aboutButton = getByText(/About/i);
    const favPokemonButton = getByText(/Favorite Pokémon/i);
    expect(homeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
    expect(favPokemonButton).toBeInTheDocument();
  });
});
