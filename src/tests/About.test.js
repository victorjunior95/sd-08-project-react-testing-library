import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('About.js tests', () => {
  it('Should has a h2 with `About Pokédex`', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Should has 2 tags `p` about the Pokédex', () => {
    render(<About />);

    const p1 = screen.getByText((content, element) => (
      element.tagName === 'P' && content.includes('simulates a Pokédex')
    ));
    const p2 = screen.getByText((content, element) => (
      element.tagName === 'P' && content.includes('filter Pokémons')
    ));
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Should has a specific img', () => {
    render(<About />);

    const img = screen.getByRole('img');
    const src = img.getAttribute('src');
    expect(src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
