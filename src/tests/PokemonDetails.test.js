import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  const pokemonId = '/pokemons/25';
  test('Testa informações detalhadas do pokémon', () => {
    const { getByText, history, queryByText, getByRole } = renderWithRouter(<App />);
    history.push(pokemonId);
    const heading = getByText('Pikachu Details');
    expect(heading).toBeInTheDocument();

    const moreDetails = queryByText('More details');
    expect(moreDetails).toBeNull();

    const headingSum = getByRole('heading', { name: 'Summary' });
    expect(headingSum).toBeInTheDocument();

    const paragraph = getByText('This intelligent Pokémon roasts hard', {
      exact: false,
    });
    expect(paragraph).toBeInTheDocument();
  });

  test('Testa informações dos mapas exibidos na tela', () => {
    const { history, getByRole, getAllByAltText, getByText } = renderWithRouter(<App />);
    history.push(pokemonId);
    const heading = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(heading).toBeInTheDocument();

    const pikachuLocation = 'Pikachu location';
    const location = getAllByAltText(pikachuLocation);
    expect(location).toHaveLength(2);
    expect(location[0]).not.toHaveAttribute('src', '');
    expect(location[0]).toHaveAttribute('alt', pikachuLocation);
    expect(location[1]).not.toHaveAttribute('src', '');
    expect(location[1]).toHaveAttribute('alt', pikachuLocation);

    const firstNameLocation = getByText('Kanto Viridian Forest');
    const secondNameLocation = getByText('Kanto Power Plant');
    expect(firstNameLocation).toBeInTheDocument();
    expect(secondNameLocation).toBeInTheDocument();
  });

  test('Testes do checkbox de favoritar pokemon', () => {
    const { history, getByRole, getByLabelText } = renderWithRouter(<App />);
    history.push(pokemonId);
    const favoriteCheck = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheck).toBeInTheDocument();

    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
