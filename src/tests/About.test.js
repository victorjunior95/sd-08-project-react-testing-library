import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testes about', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
