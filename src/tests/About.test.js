import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Pokedex Info.', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('h2 contains About Pokedex.', () => {
  const { getByRole } = render(<About />);
  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('Two p with text about Pokedex.', () => {
  const { container } = render(<About />);
  const paragraphs = container.querySelectorAll('p');
  const plength = 2;
  expect(paragraphs.length).toBe(plength);
});

test('Pokedex image', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText('Pokédex').src;
  const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(image).toBe(url);
});
