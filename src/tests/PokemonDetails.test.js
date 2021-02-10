import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemon from './pokemon';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, getByRole, container } = renderWithRouter(
      <App />,
    );
    const moreDetails = getByRole('link', { name: /details/i });
    userEvent.click(moreDetails);

    const nameDetails = getByText(/pikachu details/i);
    expect(nameDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

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
  it('Teste se há mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, container } = renderWithRouter(
      <App />,
    );
    const moreDetails = getByRole('link', { name: /details/i });
    userEvent.click(moreDetails);

    expect(getByText(/Game locations of Pikachu/i)).toBeInTheDocument();

    for (let i = 0; i < pokemon.foundAt.length; i += 1) {
      expect(getByText(pokemon.foundAt[i].location)).toBeInTheDocument();
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
  it('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, getByRole } = renderWithRouter(
      <App />,
    );
    const moreDetails = getByRole('link', { name: /details/i });
    userEvent.click(moreDetails);

    const favorites = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    const textFav = getByText('Pokémon favoritado?');
    expect(textFav).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    userEvent.click(favorites);

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
