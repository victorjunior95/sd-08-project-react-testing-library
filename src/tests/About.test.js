import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 01', () => {
  it('Teste 01 - Página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const infoPokemon = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(infoPokemon).toBeInTheDocument();
  });

  it('Teste 02 - Página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste 03 - Página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste 04 - Página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(image);
  });
});
