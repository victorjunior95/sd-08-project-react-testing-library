import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('test if the component About contains', () => {
  it('should render Pokédex information', () => {
    const { getByText } = render(<About />);
    const aboutAll = getByText(/This application simulates a Pokédex/i);

    expect(aboutAll).toBeInTheDocument();
  });

  it('should render heading h2 with text "About Pokédex"', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/About Pokédex/i);
  });

  // TODO: I would like something that test have two paragraphs and the content within.
  it('should render two paragraphs with text about Pokédex', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('should render an specific image of a Pokédex', () => {
    const { getByAltText } = render(<About />);
    const altImage = getByAltText('Pokédex');
    expect(altImage).toBeInTheDocument();

    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(altImage.src).toBe(url);
  });
});
