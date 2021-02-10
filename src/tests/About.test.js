import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2 - Teste o componente \\"About"\\', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, getByRole } = render(<About />);

    const titleAbout = getByRole('heading', { name: /about pokédex/i });
    const textApplication = getByText(/This application simulates a pokédex/i
      && /a digital encliclopedia containing all pokémons/i);
    const textCanFilter = getByText(/one can filter pokémons by type, and see/i
      && /more details for each one of them/i);
    const imgPokedex = getByRole('img', { name: /pokédex/i });

    expect(titleAbout).toBeInTheDocument();
    expect(textApplication).toBeInTheDocument();
    expect(textCanFilter).toBeInTheDocument();
    expect(imgPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const text1 = getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(text1).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      const { getByText } = render(<About />);
      const textApplication = getByText(/This application simulates a pokédex/i
      && /a digital encliclopedia containing all pokémons/i);
      const textCanFilter = getByText(/one can filter pokémons by type, and see/i
      && /more details for each one of them/i);

      expect(textApplication).toBeInTheDocument();
      expect(textCanFilter).toBeInTheDocument();
    });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = render(<About />);
    const imgSrc = getByRole('img');
    expect(imgSrc.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
