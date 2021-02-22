import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

test('check if page contains Pokedex Info', () => {
  const { getByRole } = renderWithRouter(<About />);
  const allAbout = getByRole('heading', { level: 2 });
  expect(allAbout).toBeInTheDocument();
  expect(allAbout).toHaveTextContent('About Pokédex');
});

test('check if page render Pokedex image', () => {
  const pokedexImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img', { name: /pokédex/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(pokedexImage);
});
