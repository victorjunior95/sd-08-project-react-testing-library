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
    expect(aboutHeading).toBeInTheDocument();
  });

  it('has two paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);

    const aboutParagraphs = getAllByTestId('about-paragraph');
    expect(aboutParagraphs).toHaveLength(2);
  });

  it('has a pokedex image', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const aboutImage = getByAltText('Pokédex');
    expect(aboutImage.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
