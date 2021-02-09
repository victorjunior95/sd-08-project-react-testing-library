import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('About.js test', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexInfo = getByText(
      /a digital encliclopedia containing all Pokémons/i,
    );
    expect(pokedexInfo).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const info = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(info).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByRole } = renderWithRouter(<About />);
    const paragraphs = getAllByRole('paragraph');
    expect(paragraphs.length).toBe(2);
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('image');
    expect(img.src).toBe(src);
  });
});
