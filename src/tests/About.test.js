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
  test('verifica se existe uma imagem na tela', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
