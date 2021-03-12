import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js', () => {
  it('A página contém as informações sobre a Pokédex', () => {
    // Acessar os elementos da tela
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    // Interagir com eles
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    // Fazer o teste
    expect(pathname).toBe('/about');
  });

  it('A página contém um heading h2 com o texto About Pokédex', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    // Interagir com eles
    fireEvent.click(linkAbout);
    const titulo = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(titulo).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    // Acessar os elementos da tela
    const { getByText } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    // Interagir com eles
    fireEvent.click(linkAbout);
    const paragrafos = document.querySelectorAll('p');
    // Fazer o teste
    expect(paragrafos.length).toBe(2);
  });

  it('A página contém a seguinte imagem de uma Pokédex', () => {
    // Acessar os elementos da tela
    const { getByText, getByRole } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    // Interagir com eles
    fireEvent.click(linkAbout);
    const image = getByRole('img', {
      name: 'Pokédex',
    });
    // Fazer o teste
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
