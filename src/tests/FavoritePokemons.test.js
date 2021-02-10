import React from 'react';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('exibido a mensagem No favorite pokemon found se não tiver pokémons favoritos',
    () => {
      const { getByText } = render(<FavoritePokemons />);
      expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    });
});
