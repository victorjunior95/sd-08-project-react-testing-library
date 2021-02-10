import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pikachu from './pikachu';

describe('pokemonDetails.js test', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, getByRole, container } = renderWithRouter(
      <App />,
    );
    const detailsLink = getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    const nameDetails = getByText(/pikachu details/i);
    expect(nameDetails).toBeInTheDocument();

    expect(detailsLink).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      level: 2,
      name: /summary/i,
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
    const detailsLink = getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    expect(getByText(/Game locations of Pikachu/i)).toBeInTheDocument();

    for (let i = 0; i < pikachu.foundAt.length; i += 1) {
      expect(getByText(pikachu.foundAt[i].location)).toBeInTheDocument();
    }

    const images = container.querySelector(
      '.pokemon-habitat',
    ).getElementsByTagName('img');

    expect(images.length).toBe(pikachu.foundAt.length);

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
    const detailsLink = getByRole('link', { name: /details/i });
    userEvent.click(detailsLink);

    const favorites = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    const label = getByText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    userEvent.click(favorites);

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
