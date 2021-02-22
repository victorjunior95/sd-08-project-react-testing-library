import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Requirement 2, testing About component', () => {
  test('if page have a heading 2 "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('if there exists two paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    const par = container.querySelectorAll('p');
    expect(par.length).toBe(2);
  });

  test('if there is a determined image and link', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img', {
      name: /Pokédex/i,
    });
    const webLink = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(webLink);
  });
});
