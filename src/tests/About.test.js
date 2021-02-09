import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

it('test if the page has Pokédex heading', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', {
    level: 2,
    name: /about Pokédex/i,
  });
  expect(heading).toBeInTheDocument();
  const paragraphOne = getByText(/this application/i);
  const paragraphTwo = getByText(/one can filter/i);
  expect(paragraphOne).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
  const imageAbout = getByRole('img', {
    src: 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  });
  expect(imageAbout).toBeInTheDocument();
  expect(imageAbout.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
