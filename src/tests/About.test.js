import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('REQUISITO 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokeInfo = getByRole('heading', {
      level: 2,
    });
    expect(pokeInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const tagP = container.querySelectorAll('p');
    expect(tagP.length).toBe(2);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const dexImg = getByAltText('Pokédex');
    expect(dexImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
