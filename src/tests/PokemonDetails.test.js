import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const fakeMatch = { params: { id: '25' } };
const allFavs = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const fakeFn = () => allFavs;

describe('Requisito 7', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ allFavs }
      match={ fakeMatch }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ fakeFn }
    />);

    const name = screen.getAllByRole('heading', {
      level: 2,
    });
    expect(name[0]).toHaveTextContent('Pikachu Details');
    expect(name[1]).toHaveTextContent('Summary');
  });

  it('Teste se descricao do Pokemon esta na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ allFavs }
      match={ fakeMatch }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ fakeFn }
    />);

    const text = screen.getByText(/tender enough to eat./);
    expect(text).toBeInTheDocument();
  });

  it('Teste se botao favorito tem texto certo', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ allFavs }
      match={ fakeMatch }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ fakeFn }
    />);

    const labelText = screen.getByText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });

  it('Teste se game locations contem texto correto', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ allFavs }
      match={ fakeMatch }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ fakeFn }
    />);

    const name = screen.getAllByRole('heading', {
      level: 2,
    });
    expect(name[2]).toHaveTextContent('Game Locations of Pikachu');
  });

  it('Teste imagens possuem atributos corretos', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ allFavs }
      match={ fakeMatch }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ fakeFn }
    />);

    const imagens = screen.getAllByRole('img');
    const imgSrc = imagens[2].getAttribute('src');
    const imgAlt = imagens[2].getAttribute('alt');
    expect(imgSrc).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgAlt).toBe('Pikachu location');
  });
});
