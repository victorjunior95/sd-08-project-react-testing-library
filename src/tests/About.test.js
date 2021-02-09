import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  it('Conteúdo sobre a pokédex', () => {
    const { getByText, getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
    const p1 = 'This application simulates a Pokédex, '
      + 'a digital encliclopedia containing all Pokémons';
    const p2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';
    expect(getByText(p1)).toBeInTheDocument();
    expect(getByText(p2)).toBeInTheDocument();
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgSrc);
  });
});
