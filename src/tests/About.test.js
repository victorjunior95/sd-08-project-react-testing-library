import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import { About } from '../components';

describe('Teste About.js', () => {
  it('testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('This application simulates a Pokédex', { exact: false }))
      .toBeInTheDocument();
  });

  it('testa se a página contém um "h2" contendo "About Pokédex"', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('About Pokédex');
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('testa se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const IMAGE = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img', { src: IMAGE }).src).toBe(IMAGE);
  });
});
