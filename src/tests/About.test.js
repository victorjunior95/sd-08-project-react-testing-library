import React from 'react';
import { screen, render } from '{@testing-library/react';
import About from '../components/About';

describe('Test the About component', () => {
  test('check if page contains a h2 heading', () => {
    render(<About />);
    const pageHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(pageHeading).toBeInTheDocument();
  });

  test('check if page contains Pokédex info', () => {
    const { container } = render(<About />);
    const pokedexInfo = container.querySelectorAll('p');
    expect(pokedexInfo).toHaveLength(2);
  });

  test('check if page render Pokedex image', () => {
    render(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});
