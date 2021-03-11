import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

describe('Testes no componente Pokémon  Details', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

      const btnDtails = getByText(moreDetails);
      fireEvent.click(btnDtails);

      const nomePokemon = getByText(pokemons[0].name);
      expect(nomePokemon).toBeInTheDocument();

      const pokemonDetails = getByText(`${pokemons[0].name} Details`);
      expect(pokemonDetails).toBeInTheDocument();

      const titulo = getByRole('heading', { level: 2, name: /Summary/ });
      expect(titulo).toBeInTheDocument();

      const paragrafo = getByText(pokemons[0].summary);
      expect(paragrafo).toBeInTheDocument();

      const tres = 3;
      const links = getAllByRole('link');
      expect(links.length).toBe(tres);
    });

  it('Teste se existe na página mapas contendo as localizações do pokémon',
    () => {
      const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

      const btnDtails = getByText(moreDetails);
      fireEvent.click(btnDtails);

      const titulo = getByRole('heading',
        { level: 2, name: `Game Locations of ${pokemons[0].name}` });
      expect(titulo).toBeInTheDocument();

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

      const btnDtails = getByText(moreDetails);
      fireEvent.click(btnDtails);

      const checkbox = getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(true);

      fireEvent.click(checkbox);
      expect(checkbox.checked).toEqual(false);
    });
});
