import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Realiza testes no component About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedex = getByText('About Pokédex');
    expect(pokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container, getByText } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length).toBe(2);

    const firstParagraph1 = 'This application simulates a Pokédex, a';
    const firstParagraph2 = ' digital encliclopedia containing all Pokémons';
    const secondParagraph = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(getByText(firstParagraph1 + firstParagraph2)).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
