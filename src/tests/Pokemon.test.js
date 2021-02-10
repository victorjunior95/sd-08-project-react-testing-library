import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const POKEMON = pokemons[0];

describe('Testa o componente "Pokemon"', () => {
  it('é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/electric/i)).toBeInTheDocument();
    expect(getByText(/average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(getByRole('img').src).toBe(imageURL);
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it('card do Pokémon indicado na Pokédex contém um link', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite={ false }
    />);

    const detailsLink = getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain('/pokemons/25');
  });

  it('clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  it('existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ POKEMON }
      isFavorite
    />);

    const favIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toContain('/star-icon.svg');
  });
});
