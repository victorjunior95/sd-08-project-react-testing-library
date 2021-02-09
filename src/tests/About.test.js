import React from 'react';
import { About } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing component About.js', () => {
  test('The page must have a h2 heading containing the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('The page must have two paragraphs containing infos about the Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const allParagraphs = container.querySelectorAll('p');
    expect(allParagraphs.length).toBe(2);
  });

  test('The page must have the specified Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
