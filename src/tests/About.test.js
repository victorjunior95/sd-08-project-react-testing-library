import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About', () => {
  test('Title `Pokédex`', () => {
    render(<About />);
    const el = screen.getByText(/This application simulates a Pokédex/i);
    expect(el).toBeInTheDocument();
  });

  test('subtitle', () => {
    render(<About />);
    const el = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(el).toBeInTheDocument();
  });

  test('2 x paragraph', () => {
    const about = render(<About />);
    const el = about.container.getElementsByTagName('p');
    expect(el.length).toBe(2);
  });

  test('imagem', () => {
    render(<About />);
    const el = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(el).toBeInTheDocument();

    expect(el).toHaveProperty(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
