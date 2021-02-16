import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('teste do componente Pokemon', () => {
  test('verifica se o nome do pokemon renderiza na pagina', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/pikachu/i);
  });
  test('verifica se o tipo do pokemon aparece na pagina', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent(/electric/i);
  });
  test('verifica se o peso medio do pokemon renderiza corretamente', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(/average weight: 6\.0 kg/i);
  });
  test('verifica se a imagem renderiza com fonte e texto alternativo corretos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokeImage = getByRole('img', {
      name: /pikachu sprite/i,
      src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    });
    expect(pokeImage).toBeInTheDocument();
  });
  test('verifica se o link com o texto "more details" renderiza no componente', () => {
    const { getByRole } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
  });
  test('verifica se a estrela de favoritado aparece na tela', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favoriteStart = getByRole('img', {
      altText: /pikachu is marked as favorite/i,
    });
    expect(favoriteStart).toBeInTheDocument();
  });
  test('verifica se link de detalhes funciona', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');    
  });
});
