import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

test('if the page contains information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const pokedexInfos = getByText(/This application simulates a Pokédex/i);
  expect(pokedexInfos).toBeInTheDocument();
});

test('if the page contains a heading h2 with text "About Pokédex"', () => {
  const { getByRole } = renderWithRouter(<About />);

  const pokedexHeading = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(pokedexHeading).toBeInTheDocument();
});

test('if the page contains two paragraphs with text about Pokédex', () => {
  const { container } = render(<About />);
  const paragraph = container.querySelectorAll('p');
  expect(paragraph[0].value).toBe();
  expect(paragraph[1].value).toBe();
  expect(paragraph.length).toBe(2);
});

test('if the page contains this image of a Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const imgPkdx = getByRole('img', {
    name: /Pokédex/i,
  });
  expect(imgPkdx).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
