import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Testa a página "About"', () => {
  test('Teste se a página contém um h2 com o texto "About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const headingPokedex = getByText('About Pokédex');
    expect(headingPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos de texto', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  test('Testa se a página tem determinada imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    const value = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveProperty('src', value);
  });
});
