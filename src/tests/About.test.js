import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testes no About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const aboutPage = getByText(/About Pokédex/i);
    expect(aboutPage).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    }));
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const primeiroP = getByText(/This application simulates a Pokédex/i);
    expect(primeiroP).toBeInTheDocument();
    const segundoP = getByText(/One can filter Pokémons by type/i);
    expect(segundoP).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const img = screen.getByAltText(/Pokédex/i);
    expect(img).toContainHTML('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
