import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa Component About', () => {
  test('Verificar se a página contem um Heading H2',
    () => {
      render(
        <About />,
      );
      const headingh2 = screen.getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      });
      expect(headingh2).toBeInTheDocument();
    });
  test('Verificar se a página com contém dois parágrafos',
    () => {
      render(
        <About />,
      );
      const { container } = render(
        <About />,
      );
      const paragrafo = container.querySelectorAll('p');
      expect(paragrafo).toHaveLength(2);
    });
  test('Verifica se a página carrega a imagem ', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
