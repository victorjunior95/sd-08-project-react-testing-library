import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];

describe('Testa o componente "Pokemon"', () => {
  test('é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const imgUrl = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/electric/i)).toBeInTheDocument();
    expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(getByRole('img').src).toBe(imgUrl);
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  test('card do Pokémon indicado na Pokédex contém um link', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const linkDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.href).toContain('/pokemons/25');
  });

  test('o clicar no link de navegação do Pokémon, é feito o redirecionamento ', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const linkDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);

    const favImg = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favImg).toBeInTheDocument();
    expect(favImg.src).toContain('/star-icon.svg');
  });
});
