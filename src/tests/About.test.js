import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('A página contém as informações sobre a Pokédex', () => {
  test('A página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', { name: 'About Pokédex', level: 2 })).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('A página contém a seguinte imagem de uma Pokédex', () => {
    const imgUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText(/Pokédex/i)).toHaveAttribute('src', imgUrl);
  });
});
