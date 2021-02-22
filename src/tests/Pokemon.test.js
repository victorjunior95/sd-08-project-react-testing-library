import React from 'react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';

const pokemon = pokemons[0];

// Requisito 7 feito com conjunto da Patricia

const defaultMatch = {
  params: {
    id: `${pokemon.id}`,
  },
};

const renderPokemonDetails = () => renderWithRouter(
  <PokemonDetails
    match={ defaultMatch }
    pokemons={ pokemons }
    isPokemonFavoriteById={ { [pokemon.id]: true } }
    onUpdateFavoritePokemons={ () => {} }
  />,
);

describe('Testa o componente PokemonDetails ', () => {
  test('', () => {
    const { getByText } = renderPokemonDetails();
    const nameDetails = `${pokemon.name} Details`;
    expect(getByText(nameDetails)).toBeInTheDocument();
  });
  test('Se a seção de detalhes contém um heading h2 com o texto Summary', () => {
    // renderWithRouter(<PokemonDetails />);
    const { getByRole } = renderPokemonDetails();
    const headingPage = getByRole('heading', {
      level: 2,
      name: /Summary/i });
    expect(headingPage).toBeInTheDocument();
  });
  test('Se há parágrafo no Pokemon Details', () => {
    const { getByText } = renderPokemonDetails();
    const paragraph = getByText(/This intelligent/i);
    expect(paragraph).toBeInTheDocument();
  });
  test('Se existi um heading h2 com o texto Game Locations of <name>>', () => {
    const { getByText } = renderPokemonDetails();
    const nameGame = `Game Locations of ${pokemon.name}`;
    expect(getByText(nameGame)).toBeInTheDocument();
  });
  test('Imagem da localização', () => {
    const { getAllByRole } = renderPokemonDetails();
    const image = getAllByRole('img');
    expect(image[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[2]).toHaveAttribute('alt', `${pokemons[0].name} location`);
  });
  test('Página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByRole } = renderPokemonDetails();
    const checkbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
