import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Req II - About tests', () => {
  it('should contains h2 About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexHeading = getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('should constains two p that contains text about pokédex', () => {
    render(<About />);
    const paragraphs = document.getElementsByTagName('p');
    expect(paragraphs.length).toBe(2);
  });

  it('should constains img', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
