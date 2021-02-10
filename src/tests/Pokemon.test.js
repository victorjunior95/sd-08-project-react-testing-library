import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';
import App from '../App';

describe('Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe('Pikachu');
    const pokeType = screen.getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Electric');
    const pokeweight = screen.getByTestId('pokemon-weight');
    expect(pokeweight).toHaveTextContent('Average weight: 6.0 kg');
    const pokeImg = screen.getByRole('img');
    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });

  test('Testa o link exibir detalhes do card pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    expect(btnDetails).toBeInTheDocument();
    expect(btnDetails.href).toContain('/pokemons/25');
  });

  test('Testa o link exibir detalhes do card pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(btnDetails);
    const pokeDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Teste se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(btnDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
