import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('Requisito 2, About.js', () => {
  test('There should be some informations about Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(aboutText).toBeInTheDocument();
  });
  test('There should be two paragraphs', () => {
    render(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });
  test('There should be a img', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
