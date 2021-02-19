import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  test('Verifica se a página contém um heading h2 "Encountered pokémons" ', () => {
    renderWithRouter(<App />);

    const aboutMeText = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(aboutMeText).toBeInTheDocument();
  });
});
