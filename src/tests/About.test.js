import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

test('renders a page with a pokemon details', () => {
  const { container } = render(<About />);

  const pageTitle = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  const paragraphs = container.querySelectorAll('p');
  const pokedexImg = container.querySelector('img');
  expect(pageTitle).toBeInTheDocument();
  expect(paragraphs.length).toBe(2);
  expect(pokedexImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
