import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const testPokemon = { id: 1,
  name: 'Xablowski',
  image: 'xablau.png',
  type: 'Fire',
  averageWeight: { measurementUnit: 'kg', value: '800' },
  showDetailsLink: true,
  isFavorite: true,
};
describe('tests for Pokemon.js', () => {
  it('shows information of Pokemon', () => {
    const { averageWeight } = testPokemon;
    const { measurementUnit, value } = averageWeight;
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ testPokemon }
      isFavorite={ testPokemon.isFavorite }
    />);
    const pkName = getByTestId('pokemon-name');
    const pkType = getByTestId('pokemonType');
    const pkWeight = getByTestId('pokemon-weight');
    expect(pkName).toHaveTextContent(testPokemon.name);
    expect(pkType).toHaveTextContent(testPokemon.type);
    expect(pkWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });
  it('shows the images correctly', () => {
    const { getAllByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ testPokemon }
      isFavorite={ testPokemon.isFavorite }
    />);
    const allImages = getAllByRole('img');
    expect(allImages).toHaveLength(2);
    const pkImg = getByAltText(`${testPokemon.name} sprite`);
    const favImg = getByAltText(`${testPokemon.name} is marked as favorite`);
    expect(pkImg && favImg).toBeInTheDocument();
    expect(pkImg && favImg).toHaveAttribute('src');
    expect(pkImg.src).toContain(testPokemon.image);
    expect(favImg.src).toContain('/star-icon.svg');
  });

  it('verifies link "more details"', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ testPokemon }
      isFavorite={ testPokemon.isFavorite }
    />);
    const detailsLink = getByRole('link', { name: /More details/ });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);
  });
});
