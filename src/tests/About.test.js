import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste do component About', () => {
  test('verifica se o component renderiza no path correto', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeader = getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutHeader).toBeInTheDocument();
  });
  test('verifica se a imagem renderiza com a fonte correta', () => {
    renderWithRouter(<About />);
    const img = document
      .querySelector('img[src="https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"]');
    expect(img).toBeInTheDocument();
  });

  test('verifica se existem dois paragrafos na tela com textos sobre a pokedex', () => {
    renderWithRouter(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]).toHaveTextContent(/This application simulates a Pokédex/i);
    expect(paragraphs[1]).toHaveTextContent(/one can filter pokémons by type/i);
  });
});
