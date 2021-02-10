import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('tests for Pokemon.js', () => {
  it('shows the title `Pokemon Pokédex` and corresponding text', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokemon />);
    const title = getByRole('heading', { level: 2, name: /Pokemon Pokédex/ });
    const text1 = getByText(['This application simulates a Pokédex,',
      'a digital encliclopedia containing all Pokémons'].join(' '));
    const text2 = getByText(['One can filter Pokémons by type,',
      'and see more details for each one of them'].join(' '));
    const allTextElements = [title, text1, text2];
    allTextElements.forEach((textElement) => expect(textElement).toBeInTheDocument());
    // expect(title && text1 && text2).toBeInTheDocument();
  });

  it('shows the pokedex image correctly', () => {
    const { getByRole } = renderWithRouter(<Pokemon />);
    const img = getByRole('img');
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const alt = 'Pokédex';
    expect(img.src).toBe(src);
    expect(img.alt).toBe(alt);
  });
});
