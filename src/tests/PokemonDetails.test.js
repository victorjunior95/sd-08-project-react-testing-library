import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemon from './pokemon';

describe('PokemonDetails.js - the page:', () => {
  // Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela
  test(`Displays detailed information of the
  selected Pokémon is shown on the screen`, () => {
    const { getByText, getByRole, container } = renderWithRouter(<App />);

    const details = getByRole('link', {
      name: /details/i,
    });
    userEvent.click(details);

    const pokemonDetails = getByText(/pikachu details/i);
    expect(pokemonDetails).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const paragraph = container.getElementsByTagName('p');
    expect(paragraph[3].textContent).toBe(
      'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.',
    );
  });

  // Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
  test('Contains a section with maps containing the locations of the pokémon', () => {
    const { getByText, getByRole, container } = renderWithRouter(<App />);

    const details = getByRole('link', {
      name: /details/i,
    });
    userEvent.click(details);

    const pokemonDetails = getByText(/pikachu details/i);
    expect(pokemonDetails).toBeInTheDocument();

    expect(getByText(/Game locations of Pikachu/i)).toBeInTheDocument();

    for (let index = 0; index < pokemon.foundAt.length; index += 1) {
      expect(getByText(pokemon.foundAt[index].location)).toBeInTheDocument();
    }

    const images = container.querySelector(
      '.pokemon-habitat',
    ).getElementsByTagName('img');

    expect(images.length).toBe(pokemon.foundAt.length);

    expect(getByText(/kanto viridian forest/i)).toBeInTheDocument();

    expect(getByText(/kanto power plant/i)).toBeInTheDocument();

    expect(images[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[0]).toHaveAttribute('alt', 'Pikachu location');

    expect(images[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  // Teste se o usuário pode favoritar um pokémon através da página de detalhes.
  test(`When the user accesses, he can bookmark
  a pokémon through the details page`, () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const details = getByRole('link', {
      name: /details/i,
    });
    userEvent.click(details);

    const toFavorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    const askFavorited = getByText('Pokémon favoritado?');
    expect(askFavorited).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    userEvent.click(toFavorite);

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
