import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('if the page contains information about Pokédex', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText(/about/i);
  userEvent.click(aboutLink);
  const aboutPokedex = getByRole('heading', {
    level: 2,
    name: /about pokédex/i,
  });
  expect(aboutPokedex).toBeInTheDocument();
  const pokedexImage = getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
