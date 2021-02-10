import React from 'react';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
    test('Testa se a página contém um heading h2 com o texto "Encountered pokémons. ".', () => {
      const { getByRole } = render(<Pokemon />);
      const h2 = getByRole('heading', { name: /Encountered pokémons./i });
      expect(h2.tagName).toBe('H2');
    });