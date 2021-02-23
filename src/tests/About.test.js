import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testing component About.js', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafos = container.querySelectorAll('p');
    expect(paragrafos.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
