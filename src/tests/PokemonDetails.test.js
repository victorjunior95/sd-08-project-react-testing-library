import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemonData from '../data';

const mockedPokemon = pokemonData[0];
const moreDetails = /More details/i;

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
  () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    const buttonDetails = getByText(moreDetails);
    userEvent.click(buttonDetails);

    const nomePokemon = getByText(mockedPokemon.name);
    expect(nomePokemon).toBeInTheDocument();

    const pokemonDetails = getByText(`${mockedPokemon.name} Details`);
    expect(pokemonDetails).toBeInTheDocument();

    const titulo = getByRole('heading', { level: 2, name: /Summary/ });
    expect(titulo).toBeInTheDocument();

    const paragrafo = getByText(mockedPokemon.summary);
    expect(paragrafo).toBeInTheDocument();

    const TRES = 3;
    const links = getAllByRole('link');
    expect(links.length).toBe(TRES);
  });

it('Teste se existe na página mapas contendo as localizações do pokémon',
  () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    const buttonDetails = getByText(moreDetails);
    userEvent.click(buttonDetails);

    const title = getByRole('heading',
      { level: 2, name: `Game Locations of ${mockedPokemon.name}` });
    expect(title).toBeInTheDocument();

    const localizacao1 = getByText('Kanto Viridian Forest');
    expect(localizacao1).toBeInTheDocument();

    const localizacao2 = getByText('Kanto Power Plant');
    expect(localizacao2).toBeInTheDocument();

    const map1 = getAllByRole('img');
    expect(map1[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(map1[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(map1[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(map1[2]).toHaveAttribute('alt', 'Pikachu location');
  });

it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
  () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const buttonDetails = getByText(moreDetails);
    userEvent.click(buttonDetails);

    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);

    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
