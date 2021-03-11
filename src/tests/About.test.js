import React from 'react';
import renderWithRouter from '../renderWithRouter';

import About from '../components/About';

describe('Test component About', () => {
  it('should have informations about the Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('should have two paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('about-pokedex');
    expect(paragraphs.length).toBe(2);
  });

  it('should have an image of a Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
