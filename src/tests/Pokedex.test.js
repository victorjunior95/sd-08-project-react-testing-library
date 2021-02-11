import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import RenderWithRouter from './renderWithRouter';
import pokemons from '../data';

const isFavorite = {
  4: true,
  10: true,
  23: true,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testando o componente <Pokedex.js />', () => {
  it('Testando se página contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);
    const pokeTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(pokeTitle).toBeInTheDocument();
  });

  it('Testando se mostra o próximo Pokémon clicando no botão Próximo pokémon', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
    pokemons.forEach(() => userEvent.click(nextButton));
    expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Testando se é mostrado apenas um Pokémon por vez', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Testando se a Pokédex tem os botões de filtro', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const pokeTypes = pokemons.map((typePoke) => (typePoke.type));

    pokeTypes.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      userEvent.click(button);
      expect(button.textContent).toBe(type);
    });
  });

  it('Testando se a Pokédex contém um botão para resetar o filtro (All)', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    userEvent.click(screen.getByRole('button', { name: /bug/i }));
    expect(screen.queryByText(/caterpie/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /all/i }));
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
    pokemons.forEach(() => userEvent.click(nextButton));
    expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Testando se é criado um botão de filtro para cada tipo de Pokémon', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const typesNamber = 7;
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(typesNamber);
  });

  it('O Botão Próximo pokémon é desabilitado quando a lista tiver um só pokémon', () => {
    RenderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavorite }
    />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(screen.getByRole('button', { name: /electric/i }));
    expect(nextButton).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: /bug/i }));
    expect(nextButton).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: /poison/i }));
    expect(nextButton).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: /normal/i }));
    expect(nextButton).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: /dragon/i }));
    expect(nextButton).toBeDisabled();
  });
});
