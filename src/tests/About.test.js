import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

const IMAGE_SOURCE = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

test('renders a heading level 2, containing text `About` `Pokédex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const title = getByRole('heading', { level: 2 });
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('About Pokédex');
});

test(`renders a image with source ${IMAGE_SOURCE}`, () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img', { name: /pokédex/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(IMAGE_SOURCE);
});
