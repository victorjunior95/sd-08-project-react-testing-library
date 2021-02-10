import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const [pk1, pk2] = data;
const favoritedPokemons = [pk1, pk2];
const favoritedNames = [pk1.name, pk2.name];

describe('FavoritePokemons.js tests', () => {
  describe('When receive no pokemons from props', () => {
    it('Should has a specific text in tag `p`', () => {
      render(<FavoritePokemons />);

      const notFoundText = screen.getByText((content, element) => (
        element.tagName === 'P' && content === 'No favorite pokemon found'
      ));
      expect(notFoundText).toBeInTheDocument();
    });
  });

  describe('When it receive some pokemons', () => {
    it('Should has only the passed pokemons cards', () => {
      renderWithRouter(<FavoritePokemons pokemons={ favoritedPokemons } />);

      const favorited = screen.getAllByText((content, element) => (
        element.getAttribute('class') === 'pokemon'
      ));
      expect(favorited.length).toBe(favoritedPokemons.length);

      favorited.forEach((pokemon, index) => {
        const nameElement = pokemon.querySelector('[data-testid=pokemon-name]');
        expect(nameElement.textContent).toBe(favoritedNames[index]);
      });
    });
  });
});
