import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requirement 05', () => {
  it('Teste 01 - É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.innerHTML).toBe('Pikachu');
    const typePokemon = screen.getByTestId('pokemonType');
    expect(typePokemon).toHaveTextContent('Electric');
    const averageWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(averageWeightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    const imagePokemon = screen.getByRole('img');
    expect(imagePokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon.alt).toBe('Pikachu sprite');
  });

  it('Teste 02 - Card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    expect(btnDetails).toBeInTheDocument();
    expect(btnDetails.href).toContain('/pokemons/25');
  });

  it('Teste 03 - Ao clicar no link feito o redirecionamento da aplicação', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(btnDetails);
    const pokeDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pokeDetails).toBeInTheDocument();
  });

  it('Teste 04 - A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(btnDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste 05 - Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
