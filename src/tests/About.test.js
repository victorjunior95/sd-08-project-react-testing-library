import React from 'react';
import renderWithRouter from '../services/renderWithRouter';

import { About } from '../components';

describe('About.js', () => {
  test('should show About Pokédex info', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokedexInfo = getByText(/This application simulates a Pokédex/i);

    expect(aboutPokedexInfo).toBeInTheDocument();
  });

  test('should show About Pokédex heading', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedexHeading = getByRole('heading', {
      level: 2,
    });

    expect(aboutPokedexHeading).toHaveTextContent('About Pokédex');
  });

  test('should have two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);

    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = getByText(/One can filter Pokémons by type/i);

    expect(secondParagraph).toBeInTheDocument();
  });

  test('should have a Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const aboutPokedexImg = getByAltText('Pokédex');

    expect(aboutPokedexImg.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
