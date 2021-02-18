import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testes componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2About = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(h2About).toBeInTheDocument();
    expect(h2About).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(/This application simulates/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('This application simulates');
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph2).toHaveTextContent('One can filter Pokémons by type');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgPoke = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('pokedex-image');
    expect(img.src).toEqual(imgPoke);
  });
});
