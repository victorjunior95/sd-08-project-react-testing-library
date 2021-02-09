import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const heading = getByRole(
      'heading',
      { leve: 2 },
      { name: /about pokédex/i },
    );
    expect(heading).toBeInTheDocument();
  });
});
