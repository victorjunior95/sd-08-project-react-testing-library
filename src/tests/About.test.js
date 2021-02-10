import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Render <About /> component,`', () => {
  it('show heading element with text `About Pokédox`', () => {
    render(<About />);
    const headingAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingAbout).toBeInTheDocument();
  });

  it('show paragraphs element with text', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('show image element with alt', () => {
    render(<About />);
    const image = screen.getByAltText(/pokédex/i);
    const URL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', URL);
  });
});
