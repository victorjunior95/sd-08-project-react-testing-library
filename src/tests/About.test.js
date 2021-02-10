import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from './renderWithRouter';

describe('Testando o componente <About.js />', () => {
  it('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    RenderWithRouter(<About />);

    const textTitle = 'About Pokédex';
    const pokeTitle = screen.getByRole('heading', {
      level: 2,
      name: textTitle,
    });

    expect(pokeTitle).toBeInTheDocument();
  });

  it('Testando se a página contém dois textos sobre a Pokédex', () => {
    const { baseElement } = RenderWithRouter(<About />);
    const paragraphs = {
      textP1: 'This application simulates a Pokédex,',
      contTextP1: ' a digital encliclopedia containing all Pokémons',
      textP2: 'One can filter Pokémons by type,',
      contTextP2: ' and see more details for each one of them',
    };
    const paragraph1 = paragraphs.textP1 + paragraphs.contTextP1;
    const paragraph2 = paragraphs.textP2 + paragraphs.contTextP2;
    const pokeP1 = screen.getByText(paragraph1);
    const pokeP2 = screen.getByText(paragraph2);

    expect(pokeP1).toBeInTheDocument();
    expect(pokeP2).toBeInTheDocument();

    const paragraphsNumber = baseElement.querySelectorAll('p').length;
    expect(paragraphsNumber).toBe(2);
  });

  it('Testando se a página contém uma imagem de um end específico de uma Pokédex', () => {
    RenderWithRouter(<About />);
    const link = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokeImg = screen.getByRole('img');

    expect(pokeImg.src).toBe(link);
  });
});
