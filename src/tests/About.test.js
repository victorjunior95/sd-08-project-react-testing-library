import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const textAbout = getByText(/About Pokédex/i);
    expect(textAbout).toBeInTheDocument();

    const textAboutTwo = getByText(/simulates a pokédex/i);
    expect(textAboutTwo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const headingText = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const textOne = getByText(/This application simulates/i);
    expect(textOne).toBeInTheDocument();

    const textTwo = getByText(/One can filter Pokémons/i);
    expect(textTwo).toBeInTheDocument();
  });

  it('Teste se a página contém uma imagem', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const pathImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText(/pokédex/i);

    expect(image).toHaveAttribute('src', pathImage);
  });
});
