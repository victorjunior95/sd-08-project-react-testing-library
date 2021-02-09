import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2 <About />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const infos = container.getElementsByTagName('p');
    expect(infos).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = render(<About />);
    const imagem = getByRole('img', {
      name: /Pokédex/i,
    });
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem).toHaveProperty('src', url);
  });
});
