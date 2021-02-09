import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = 'One can filter Pokémons by type, and see more details for';
    expect(getByText(new RegExp(text, 'i'))).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const headings = getAllByTestId('about-paragraph');
    expect(headings.length).toBe(2);
  });

  test('Teste se a página contém a imagem de uma Pokédex.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
