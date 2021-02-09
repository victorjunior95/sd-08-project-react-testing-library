import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('shows the About when the route is `/about`', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(heading).toBeInTheDocument();
});

test('shows about description', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const aboutText = getByText(/This application simulates a Pokédex/i);

  expect(aboutText).toBeInTheDocument();
});

test('shows image in about', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );

  const image = getByRole('img');

  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
