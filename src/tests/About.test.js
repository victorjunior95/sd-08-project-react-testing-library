import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('test About.js', () => {
  it('test if you have h2', () => {
    renderWithRouter(<About />);

    const titleText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(titleText).toBeInTheDocument();
  });

  it('test text on page', () => {
    renderWithRouter(<About />);

    const textPage = screen.getAllByText(/Pokémons/i);

    expect(textPage.length).toBe(2);
  });

  it('page contains img', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
