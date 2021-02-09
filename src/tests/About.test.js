import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const titlePokedex = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titlePokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const titleh2 = screen.getByText('About Pokédex');
    expect(titleh2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pone = screen.getByText(/This application simulates a Pokédex/i);
    const ptwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(pone).toBeInTheDocument();
    expect(ptwo).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgPokedex = getByRole('img');
    expect(imgPokedex.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
