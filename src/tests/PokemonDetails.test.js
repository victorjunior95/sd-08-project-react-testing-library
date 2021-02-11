import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 PokemonDetails.js', () => {
  const snorlaxQuery = '/pokemons/143';

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { history, getByRole, queryByRole, getByText } = renderWithRouter(<App />);
      const { name, summary } = pokemons[7];
      history.push(snorlaxQuery);

      const heading = getByRole('heading', { level: 2, name: `${name} Details` });
      expect(heading).toBeInTheDocument();

      const linkDetails = queryByRole('link', {
        name: 'More details',
      });
      expect(linkDetails).toBeNull();

      const summaryHeading = getByRole('heading', { level: 2, name: /summary/i });
      expect(summaryHeading).toBeInTheDocument();

      const pokeSummary = getByText(summary);
      expect(pokeSummary).toBeInTheDocument();
    });
  test('Teste se existe na página uma seção com os mapas contendo as localizações',
    () => {
      const { history, getByRole, getByText } = renderWithRouter(<App />);
      const { name, foundAt: [{ location, map }] } = pokemons[7];
      history.push(snorlaxQuery);

      const heading = getByRole('heading', {
        level: 2,
        name: `Game Locations of ${name}`,
      });
      expect(heading).toBeInTheDocument();

      const pokeLocation = getByText(location);
      expect(pokeLocation).toBeInTheDocument();

      const imageLocation = getByRole('img', {
        name: `${name} location`,
      });
      expect(imageLocation).toBeInTheDocument();
      expect(imageLocation).toHaveAttribute('src', map);
      expect(imageLocation).toHaveAttribute('alt', `${name} location`);
    });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    const { history, getByRole, queryByRole, getByText } = renderWithRouter(<App />);
    history.push(snorlaxQuery);
    const checkbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    const favoriteStar = getByRole('img', {
      name: /snorlax is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();

    fireEvent.click(checkbox);
    const favoriteStarOut = queryByRole('img', {
      name: /snorlax is marked as favorite/i,
    });
    expect(favoriteStarOut).toBeNull();

    const label = getByText(/pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();
  });
});
