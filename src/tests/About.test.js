import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testa o componente "About', () => {
  test('a página contém informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutTitle = getByText(/About Pokédex/i);
    expect(aboutTitle).toBeInTheDocument();
  });

  test('a página possui um heading h2 com o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingText = getByRole('heading', {
      level: 2,
    });
    expect(headingText).toHaveTextContent('About Pokédex');
  });

  test('a página contém dois pararágrafos', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('a página cibten uma imagem da pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toBe(imgUrl);
  });
});
