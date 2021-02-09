import React from 'react';
import { screen } from '@testing-library/dom';
import About from '../components/About';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('About.js', () => {
  test('if contain the Pokédex info', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const PokedexInfo = screen.getByRole('heading', { level: 1, name: /pokédex/i });
    expect(PokedexInfo).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if contain a heading h2 with About Pokédex text', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('if contain two paragraphs', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/This application/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('if contain an image', () => {
    renderWithRouter(<About />);

    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
