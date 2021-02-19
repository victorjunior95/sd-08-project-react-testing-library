import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('as informações do Pokémon selecionado são mostradas', () => {
  test('se página contem um texto <name> Details', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const pokemonDetails = getByText(/pikachu details/i);
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('se não existe link de navegação para os detalhes do Pokémon', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(queryByText(/more details/i)).toBeNull();
  });

  test('se a seção de detalhes tem um heading h2 com o texto Summary', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(queryByText(/summary/i)).toBeInTheDocument();
  });

  test('se contem um resumo do Pokémon específico sendo visualizado.', () => {
    const { queryByText, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    expect(queryByText(/this intelligent pokémon/i)).toBeInTheDocument();
  });
});

describe('existe uma seção com os mapas com localizações do pokémon', () => {
  test('se existe um heading h2 com o texto Game Locations of <name>', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const gameLocation = getByText(/game locations of pikachu/i);
    expect(gameLocation).toBeInTheDocument();
  });
  test('se Todas as localizações do Pokémon são mostradas', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);
    const detailsLink = getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const locationImages = getAllByAltText('Pikachu location');
    expect(locationImages.length).toBe(2);
  });

  test('se exibe o nome da localização e uma imagem com alt e URL', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const locationImages = getAllByAltText('Pikachu location');
    const gameLocationsOfPikachu = getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const imgOne = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imgTwo = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(gameLocationsOfPikachu).toBeInTheDocument();
    expect(locationImages.length).toBe(2);
    expect(locationImages[0]).toHaveAttribute('src', imgOne);
    expect(locationImages[1]).toHaveAttribute('src', imgTwo);
  });
});

describe('o usuário pode favoritar um pokémon', () => {
  test('se na página exibe um checkbox que permite favoritar o Pokémon', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favoriteCheck = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const labelCheck = getByLabelText(/Pokémon favoritado\?/);//
    expect(favoriteCheck).toBeInTheDocument();
    expect(labelCheck).toBeInTheDocument();
  });

  test('se a label do checkbox tem o texto Pokémon favoritado?', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const labelCheck = getByLabelText(/Pokémon favoritado\?/);
    expect(labelCheck).toBeInTheDocument();
  });

  test('se cliques no checkbox adicionam e removem de favoritos', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favoriteCheck = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteCheck.checked).toBeFalsy();
    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toBeTruthy();
    userEvent.dblClick(favoriteCheck);
    expect(favoriteCheck.checked).toBeTruthy();
  });
});
