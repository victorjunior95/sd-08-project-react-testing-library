import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes About.js', () => {
  test('Testando se a página contem informações', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Testando o cumprimento dos parágrafos', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('paragraphs');
    expect(paragraphs.length).toBe(2);
  });

  test('Testando a imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
