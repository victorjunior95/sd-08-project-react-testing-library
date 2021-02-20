import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Verifica se a página contem um heading h2', () => {
    render(<About />);
    const headingPage = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(headingPage).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const paragraph = container.querySelectorAll('p');
    expect(paragraph).toHaveLength(2);
  });

  test('Verifica se a página carrega a imagem ', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
