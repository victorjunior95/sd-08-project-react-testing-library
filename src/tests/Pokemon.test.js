import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokemon.js', () => {
  test('Testa se é renderizado um card do pokemon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const detailsBtn = getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByText('Electric')).toBeInTheDocument();
    expect(getByText('Average weight: 6.0 kg')).toBeInTheDocument();

    const img = getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa de URL do details', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const detailsBtn = getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    userEvent.click(detailsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste de push na URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(getByText('Pikachu')).toBeInTheDocument();

    history.push('/pokemons/4');
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  test('Testa a imagem de pokemons favoritados', () => {
    const { getByText, history, getByRole, getByAltText } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    expect(getByText('Charmander')).toBeInTheDocument();

    const fav = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(fav).toBeInTheDocument();
    userEvent.click(fav);

    const favImg = getByAltText('Charmander is marked as favorite');
    expect(favImg).toBeInTheDocument();
    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
