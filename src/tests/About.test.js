import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutText = getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphText1 = getByText(/This application simulates a Pokédex/i);
    expect(paragraphText1).toBeInTheDocument();

    const paragraphText2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraphText2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
