import React from 'react';
import renderWithRouter from '../services/renderWithRouter';

import { About } from '../components';

describe('About.js', () => {
  it('shows About  info', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutInfo = getByText(/This application simulates a Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  it('shows About heading', () => {
    const { getByRole } = renderWithRouter(<About />);

    const aboutHeading = getByRole('heading', {
      level: 2,
    });
    expect(aboutHeading).toHaveTextContent('About Pokédex');
  });

  it('has two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);

    const firstParagraph = getByText(/a digital encliclopedia containing all Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('has a pokedex image', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const aboutImage = getByAltText('Pokédex');
    expect(aboutImage.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
