import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('contains info about Pokédex', () => {
  it('contains "About Pokédex" heading', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });
  it('contains 2 paragraphs about pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/this application simulates a pokédex/i);
    const secondParagraph = getByText(/one can filter pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('contains a image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
