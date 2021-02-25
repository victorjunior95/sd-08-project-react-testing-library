import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('teste About requisito 1#', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const informationAbout = getByRole('heading', {
      level: 2,
      name: /Pokédex/i,
    });
    expect(informationAbout).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const getAbout = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(getAbout).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphOneAbout = getByText(/This application simulates a Pokédex/i);
    const paragraphTwoAbout = getByText(/One can filter Pokémons by type/i);

    expect(paragraphOneAbout).toBeInTheDocument();
    expect(paragraphTwoAbout).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const getImg = getByAltText('Pokédex');

    expect(getImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
