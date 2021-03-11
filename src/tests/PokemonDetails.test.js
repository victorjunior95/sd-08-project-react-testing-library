import React from 'react';
import pokemons from '../data';
import renderService from '../services/renderService';
import PokemonDetails from '../components/PokemonDetails';

const pokemon = pokemons[0];

const defaultMatch = {
  params: {
    id: `${pokemon.id}`,
  },
};

const renderPokemonDetails = () => renderService(
  <PokemonDetails
    match={ defaultMatch }
    pokemons={ pokemons }
    isPokemonFavoriteById={ { [pokemon.id]: true } }
    onUpdateFavoritePokemons={ () => {} }
  />,
);

describe('Testing PokemonDetails component ', () => {
  test('', () => {
    const { getByText } = renderPokemonDetails();
    const nameDetail = `${pokemon.name} Details`;
    expect(getByText(nameDetail)).toBeInTheDocument();
  });
  test('se a seção de detalhes contém um heading h2 com o texto Summary', () => {
    const { getByRole } = renderPokemonDetails();
    const pageHead = getByRole('heading', {
      level: 2,
      name: /Summary/i });
    expect(pageHead).toBeInTheDocument();
  });
  test('if there is a paragraph in Pokemon Details', () => {
    const { getByText } = renderPokemonDetails();
    const paragraph = getByText(/This intelligent/i);
    expect(paragraph).toBeInTheDocument();
  });
  test('If there is heading h2 with the text Game Locations of name', () => {
    const { getByText } = renderPokemonDetails();
    const gameName = `Game Locations of ${pokemon.name}`;
    expect(getByText(gameName)).toBeInTheDocument();
  });
  test('location image', () => {
    const { getAllByRole } = renderPokemonDetails();
    const image = getAllByRole('img');
    expect(image[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[2]).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
  test('page should display a checkbox that allows you to favor the Pokémon', () => {
    const { getByRole } = renderPokemonDetails();
    const checkbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
