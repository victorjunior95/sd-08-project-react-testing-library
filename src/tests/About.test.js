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
    const { getByText } = renderWithRouter(<About />);
    const pOneText = 'This application simulates a Pokédex, a '
      + 'digital encyclopedia containing all Pokémons';
    const pTwoText = 'One can filter Pokémons by type, '
      + 'and see more details for each one of them';
    const pOne = getByText(pOneText);
    const pTwo = getByText(pTwoText);
    expect(pOne).toBeInTheDocument();
    expect(pTwo).toBeInTheDocument();
  });

  it('should have an image of a Pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
