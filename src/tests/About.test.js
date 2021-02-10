import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente <About.js /.', () => {
  it('Página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const info = 'This application simulates a Pokédex,'
    + ' a digital encliclopedia containing all Pokémons';
    const text = screen.getByText(info);
    expect(text).toBeInTheDocument();
  });

  it('Página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  it('Página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const section = screen.getByRole('img').parentNode;
    console.log(section);
    const filhos = [...section.children].filter((element) => element.tagName === 'P');
    expect(filhos.length).toBe(2);
  });

  it('Página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', url);
  });
});
