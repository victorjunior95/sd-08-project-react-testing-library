import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Testando o About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const text = screen.getByText(/this application simulates a pokédex/i);
    const firstText = 'This application simulates a Pokédex,'
    + ' a digital encliclopedia containing all Pokémons';

    expect(text.textContent).toBe(firstText);
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const about = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(about.textContent).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const p1 = screen.getByText(/this application simulates a pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Teste se contém a imagem 800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img).toHaveAttribute('src', src);
  });
});
