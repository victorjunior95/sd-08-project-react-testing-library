import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('1- A página About deve conter as informações da Pokédex.', () => {
  it('A página deve conter um "H2" com o texto "About Pokédex"', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('A página deve conter uma imagem de pokédex específica.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const path = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePath = getByAltText('Pokédex');
    expect(imagePath.src).toBe(path);
  });
});
