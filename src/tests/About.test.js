import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const info = screen.getByText(/simulates a Pokédex/);
    expect(info).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
    });
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/a digital encliclopedia/);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/and see more details/);
    expect(p2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    const src = img.getAttribute('src');
    expect(src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
