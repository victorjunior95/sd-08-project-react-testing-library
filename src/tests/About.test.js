import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  it('should have pokedex informations', () => {
    const { queryByText } = renderWithRouter(<About />);
    const aboutText = queryByText('About Pokédex');
    const contentAboutPokedex = queryByText(/This application simulates a Pokédex/i);
    expect(aboutText).toBeInTheDocument();
    expect(contentAboutPokedex).toBeInTheDocument();
  });

  it('should a heading level 2 with "About Pokédex"', () => {
    const { queryByRole } = renderWithRouter(<About />);
    const heading = queryByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  it('should have two paragraphs', () => {
    const { queryByText } = renderWithRouter(<About />);
    const textOne = queryByText(/simulates a Pokédex, a digital/i);
    const textTwo = queryByText(/filter Pokémons by type/i);
    expect(textOne).toBeInTheDocument();
    expect(textTwo).toBeInTheDocument();
  });

  it('should have an image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const path = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText(/Pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', path);
  });
});
