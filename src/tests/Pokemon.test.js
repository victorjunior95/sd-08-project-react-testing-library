import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const selectedPokemon = pokemons[0];

describe('Testa componente <Pokemon />', () => {
  it('Testa se o Card do pokemon renderiza corretamente', () => {
    const { getByAltText, getByRole, getByText } = renderWithRouter(
      <Pokemon pokemon={ selectedPokemon } isFavorite={ false } />,
    );
    const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const pokemonName = getByText(/pikachu/i);
    const pokemonType = getByText(/electric/i);
    const pokemonWeigth = getByText(/average weight: 6.0 kg/i);
    const pokemonImg = getByRole('img');
    const pkImgAltText = getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeigth).toBeInTheDocument();
    expect(pokemonImg.src).toBe(imageURL);
    expect(pkImgAltText).toBeInTheDocument();
  });

  it('Testa se o link para pokemon "more details" funciona', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
    const pokeNameDetaisl = getByText(/Pikachu Details/i);
    expect(pokeNameDetaisl).toBeInTheDocument();
  });

  it('Should render a star icon for favorited pokemon', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ selectedPokemon } isFavorite />,
    );

    const starIcon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
